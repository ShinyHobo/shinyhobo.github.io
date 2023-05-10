import React from "react";
import { CommonDBFunctions, Database, SqliteStats } from "../utils/database-helpers";
import _ from "lodash";
import * as he from 'he';
import { SqliteWorker } from "sql.js-httpvfs";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import InfiniteScroll from 'react-infinite-scroll-component'

@observer
export default class Timeline3 extends React.Component {
    private db: Database= null;
    private worker: SqliteWorker | null = null;

    @observable private loading: boolean = true;
    private deltaDatetimes: number[] = [];
    private selectedDelta: string = "";
    private deliverables: any[] = [];
    @observable private loadedDeliverables: any[] = [];
    private take: number = 20;
    private skip: number = 0;
    private hasMore: boolean = true;

    private months: Date[] = [];

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;
        this.worker = vfs.worker;

        makeObservable(this);

        document.body.style.overflowX = "hidden";

        this.initializeData();
    }

    /**
     * Initializes the selectable delta values and the corresponding unique deliverable list for the most recent delta
     */
    private initializeData() {
        this.getTimelineMonths();

        CommonDBFunctions.getDeltaList(this.db).then(async (deltas:string[]) => {
            // only use latest pull time for each day
            this.deltaDatetimes = _(deltas.map((d:string)=>new Date(Number.parseInt(d)))).groupBy((d:Date)=>d.toDateString()).map((d:Date[])=>d[0].getTime()).value();
            this.selectedDelta = deltas[0];
            await this.getDeliverablesForDelta();
            const firstSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, this.getDeliverableSubset());
            this.loadedDeliverables = [...firstSet];
            this.hasMore = this.loadedDeliverables.length !== this.deliverables.length;
            
            this.loading = false;
        });
    }

    /**
     * Gets the list of months between Jan 1, 2021 and the end of the next year
     */
    private getTimelineMonths() {
        let start = new Date(Date.parse("2021-01-01"));
        const now = new Date(Date.now());
        const end = new Date(Date.parse(`${now.getFullYear()+1}-11-30`));
        
        while(start < end) {
            let d = start.getDate();
            start.setMonth(start.getMonth()+1);
            //start.setDate(0)
            if(start.getDate() != d) {
                start.setDate(0);
            }
            
            this.months.push(new Date(start.getFullYear(), start.getMonth(), 1));
        }
    }

    /**
     * Gets the deliverables for the selected delta
     */
    private async getDeliverablesForDelta() {
        this.loading = true;
        this.deliverables = await CommonDBFunctions.getUniqueDeliverables(this.db, this.selectedDelta.toString());
    }

    /**
     * Gets a subset of deliverables using the set skip and take options
     * @returns The subset of deliverables
     */
    private getDeliverableSubset() {
        return _(this.deliverables).drop(this.skip).take(this.take).value();
    }

    /**
     * Updates the selected delta value, representing the datetime in milliseconds of the data pull
     * @param e The change event
     */
    private async deltaSelected(e:any) {
        this.hasMore = true;
        this.skip = 0;
        this.loadedDeliverables = [];
        this.selectedDelta = e.target.value;
        await this.getDeliverablesForDelta();
        const firstSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, this.getDeliverableSubset());
        this.loadedDeliverables = [...firstSet];
        this.hasMore = this.loadedDeliverables.length !== this.deliverables.length;
        
        this.loading = false;
    }

    private async fetchData() {
        this.skip += 20;
        const subSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, this.getDeliverableSubset());
        this.loadedDeliverables.push(...subSet);
        this.hasMore = this.loadedDeliverables.length !== this.deliverables.length;
    }

    /**
     * Groups deliverable team time allocations and stitches relavent time allocations together
     * @param deliverable The deliverable to collect
     * @returns The deliverable team/time groups
     */
    private collectDeliverableTimeline(deliverable: any): any[] {
        let returnData: any[] = [];
        if(deliverable.teams) {
            deliverable.teams.forEach((team: any) => {
                if(team.timeAllocations) {
                    let timeAllocations = team.timeAllocations.slice().sort((a:any,b:any)=>a.startDate - b.startDate);
                    let disciplines = _.chain(_.groupBy(timeAllocations, time => [time.discipline_id, time.deliverable_id, time.team_id, time.partialTime].join("-"))).map((v:any)=>v).value();
    
                    disciplines.forEach((discipline: any) => {
                        let returnRanges = [];
                        let currentRange: any= null;
                        discipline.forEach((r:any) => {
                            // bypass invalid value
                            if (r.startDate >= r.endDate) {
                                return;
                            }
                            //fill in the first element
                            if (!currentRange) {
                                currentRange = r;
                                return;
                            }
    
                            const currentEndDate = new Date(currentRange.endDate);
                            currentEndDate.setDate(currentEndDate.getDate() + 4); // covers time overlap when sprint ends on a weekend
                            const currentEndTime = currentEndDate.getTime();
    
                            if (currentEndTime < r.startDate) {
                                returnRanges.push(currentRange);
                                currentRange = r;
                            } else if (currentRange.endDate < r.endDate) {
                                currentRange.endDate = r.endDate;
                                currentRange.partTime = typeof currentRange.partTime == 'number' ? currentRange.partTime : 0;
                                currentRange.fullTime = typeof currentRange.fullTime == 'number' ? currentRange.fullTime : 0;
                                currentRange.partTime += r.partialTime;
                                currentRange.fullTime += Math.abs(1 - r.partialTime);
                            }
                        });
    
                        if(currentRange) {
                            returnRanges.push(currentRange);
                        }
    
                        returnRanges.forEach((time: any) => {
                            returnData.push({start: time.startDate, end: time.endDate, partial: time.partialTime, abbr: team.abbreviation, disc: time.title})
                        });
                    });
                }
            });
        }
        const teamGroupsObj = _.mapValues(_.groupBy(returnData, d => d.abbr),team => _.groupBy(team, t => t.disc));
        const teamGroups = _.map(teamGroupsObj, (v:any, team:any)=>({team, discs: _.map(v, (c:any,name:any)=>({name, times: [...c]}))})) as any[];
        return teamGroups;
    }

    componentDidUpdate() {    
        this.timelineTable = document.querySelector('.deliverable-timeline');
        this.timelineTableMonthHeader = document.getElementById("month-header");
        // resets the month header position on page load
        if(this.timelineTable && this.timelineTableMonthHeader) {
            this.timelineTableMonthHeader.style.left = -this.timelineTable.scrollLeft
        }
    }

    render() {
        return (
            <>
                {!this.loading ? 
                <>
                    <select name="selectedDelta" value={this.selectedDelta} onChange={this.deltaSelected.bind(this)}>
                        {this.deltaDatetimes.map((e:any) => {
                            return <option key={e} value={e}>{new Date(Number.parseInt(e)).toLocaleDateString()}</option>;
                        })}
                    </select>
                    <div id="scrollable-timeline">
                    <InfiniteScroll
                        dataLength={this.loadedDeliverables.length}
                        next={this.fetchData.bind(this)}
                        hasMore={this.hasMore}
                        loader={<h3>Loading...</h3>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>All deliverables loaded</b>
                            </p>
                        }
                    >
                        <div className="deliverable-list-container">
                            <div className="deliverable-info">
                                <div className="deliverable-info-header" style={{display: "flex", width: "100%"}}>
                                    <div style={{width: "100%", zIndex: 2}}>
                                        <h2 style={{backgroundColor: "black", margin: 0, height: "100%", borderRight: "1px solid white"}}>Deliverables</h2>
                                    </div>
                                    <div style={{position: "relative", top: 0}}>
                                        <div style={{position: "absolute", width: `calc(101px*${this.months.length}`, borderBottom: "1px solid white"}} id="month-header">
                                            {this.months.map((date:Date, index:number)=> (
                                                <div key={index} style={{width: 100, float:"left", backgroundColor:"black", height: 56, borderRight: "1px solid white"}}>
                                                    <h3>{date.toLocaleDateString(undefined, {month:"short",year: "numeric"})}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                <div key={index} className="deliverable-info-box">
                                    <h3>{deliverable.title === "Unannounced" ? deliverable.description : he.unescape(deliverable.title)}</h3>
                                    <h4 className="projects">{deliverable.project_ids}</h4>
                                    <div className="description">{deliverable.title === "Unannounced" ? "" : he.unescape(deliverable.description)}</div>
                                </div>
                                ))}
                            </div>
                            <div className="deliverable-timeline">
                                <div className="timeline-scroll" 
                                    onMouseDown={this.clickTimeline.bind(this)} 
                                    onMouseUp={this.unclickTimeline.bind(this)} 
                                    onMouseMove={this.moveTimeline.bind(this)} 
                                    onMouseLeave={this.unclickTimeline.bind(this)}
                                >
                                    <div className="months">
                                    {this.months.map((date:Date, index:number)=> (
                                        <div key={index} className="month"/>
                                    ))}
                                        <div className="deliverable-rows">
                                        {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                            <div key={index} className="deliverable-row">
                                                {this.collectDeliverableTimeline(deliverable).map((teamGroup:any, index:number)=>(
                                                    <div key={index} className="team">
                                                        {teamGroup.team}
                                                        {teamGroup.discs.map((disc:any, index:number)=>(
                                                            <div key={index}>
                                                                <h6 style={{margin:0}}>{disc.name}</h6>
                                                                {disc.times.map((time:any, index: number)=>(
                                                                    <div key={index}>
                                                                        {time.start}-{time.end}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                </>
                : <></>}
                <h5 style={{margin: "10px"}}>{this.loading ? "Loading timeline..." : ""}</h5>
            </>
        );
    }

    private timelineClicked: boolean = false;
    private scrollLeft: number = 0;
    private startX: number = 0;
    private timelineTable: any | null = null;
    private timelineTableMonthHeader: any | null = null;

    private clickTimeline(e:any) {
        this.timelineClicked = true;
        this.timelineTable = document.querySelector('.deliverable-timeline');
        this.timelineTableMonthHeader = document.getElementById("month-header");
        if(this.timelineTable && this.timelineTableMonthHeader) {
            this.startX = e.pageX - this.timelineTable.offsetLeft;
            this.scrollLeft = this.timelineTable.scrollLeft;
        }
    }

    private unclickTimeline(e:any) {
        this.timelineClicked = false;
    }

    private moveTimeline(e:any) {
        if(this.timelineClicked) {
            if(this.timelineTable && this.timelineTableMonthHeader) {
                const x = e.pageX - this.timelineTable.offsetLeft;
                const scroll = x - this.startX;
                this.timelineTable.scrollLeft = this.scrollLeft - scroll;
                this.timelineTableMonthHeader.style.left = -this.timelineTable.scrollLeft
            }
        }
    }
}