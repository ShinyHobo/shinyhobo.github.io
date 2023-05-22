import React from "react";
import { CommonDBFunctions, Database, SqliteStats } from "../utils/database-helpers";
import _ from "lodash";
import * as he from 'he';
import { SqliteWorker } from "sql.js-httpvfs";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CommonNavigationFunctions } from "../utils/navigation-helpers";

@observer
export default class Timeline3 extends React.Component {
    private db: Database= null;
    private worker: SqliteWorker | null = null;

    @observable private loading: boolean = true;
    private deltaDatetimes: number[] = [];
    private selectedDelta: string = "";
    private beganTeamTracking: number = 1644732000000; // team tracking began on Feb 13, 2022
    private deliverables: any[] = [];
    @observable private loadedDeliverables: any[] = [];
    private take: number = 10;
    private skip: number = 0;
    private hasMore: boolean = true;
    private scrolledToToday: boolean = false;
    private horizontalScrollPosition: number = 0;
    private searchTextField: any;

    private months: Date[] = [];

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;
        this.worker = vfs.worker;

        makeObservable(this);

        document.body.style.overflowX = "hidden";

        this.deliverableTtimelineDiv = React.createRef();
        this.searchTextField = React.createRef();

        this.initializeData();
    }

    /**
     * Initializes the selectable delta values and the corresponding unique deliverable list for the most recent delta
     */
    private initializeData() {
        this.initializeParameters();
        this.getTimelineMonths();
        try {
            CommonDBFunctions.getDeltaList(this.db).then(async (deltas:string[]) => {
                // only use latest pull time for each day
                this.deltaDatetimes = _(deltas.map((d:string)=>new Date(Number.parseInt(d)))).groupBy((d:Date)=>d.toDateString()).map((d:Date[])=>d[0].getTime()).value();
                if(!this.selectedDelta||!deltas.filter(d => d === this.selectedDelta).length) {
                    this.selectedDelta =  deltas[0];
                }
                await this.getDeliverablesForDelta();
                const firstSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, await this.getDeliverableSubset());
                this.loadedDeliverables = [...firstSet];
                this.hasMore = this.loadedDeliverables.length !== this.searchingDeliverables.length;
                this.sampledLine = (Number.parseInt(this.selectedDelta) - this.start) / this.timeSpan * this.totalWidth;
                this.loading = false;
            });
        } catch(e) {
            alert("Failed to access and load the database! Please report this on my github, if possible. Make sure to include the url or list the filters used.");
        }
    }

    /**
     * Initializes the model parameters based on the url parameters
     */
    private initializeParameters() {
        const params = window.location.hash.split('?');
        if(params.length > 1) {
            const queryParameters = new URLSearchParams(params[1]);
            this.searchText = decodeURI(queryParameters.get("searchText") ?? "");
            this.sq42Filter = queryParameters.get("sq42") === "1";
            this.scFilter = queryParameters.get("sc") === "1";
            this.bothFilter = queryParameters.get("both") === "1";
            this.inProgressFilter = queryParameters.get("inProgress") === "1";
            this.selectedDelta = queryParameters.get("date") ?? "";
        }
    }

    private monthCount: number = 0;
    private start: number = 0;
    private end: number = 0;
    private totalWidth: number = 0;
    private timeSpan: number = 0;
    private todayLine: number = 0;
    private sampledLine: number = 0;
    private inProgressIds: number[] = []; // deliverable ids

    /**
     * Gets the list of months between Jan 1, 2021 and the end of the next year
     */
    private getTimelineMonths() {
        let start = new Date(Date.parse("2021-01-01"));
        const now = new Date(Date.now());
        const end = new Date(Date.parse(`${now.getFullYear()}-11-30`));
        
        while(start < end) {
            let d = start.getDate();
            start.setMonth(start.getMonth()+1);
            //start.setDate(0)
            if(start.getDate() != d) {
                start.setDate(0);
            }
            
            this.months.push(new Date(start.getFullYear(), start.getMonth(), 1));
        }

        this.monthCount = this.months.length;
        this.start = this.months[0].getTime();
        let endOfTimeline = new Date(this.months[this.monthCount-1].getTime());
        endOfTimeline.setDate(31);
        this.end = endOfTimeline.getTime();
        this.totalWidth = 100*this.monthCount;
        this.timeSpan = this.end - this.start;

        this.todayLine = (now.getTime() - this.start) / this.timeSpan * this.totalWidth;
    }

    /**
     * Gets the deliverables for the selected delta
     */
    private async getDeliverablesForDelta() {
        this.loading = true;
        this.deliverables = await CommonDBFunctions.getUniqueDeliverables(this.db, this.selectedDelta.toString());
        this.inProgressIds = await CommonDBFunctions.getInProgressDelivarables(this.db, this.selectedDelta, this.deliverables.filter(d => d.endDate >= this.selectedDelta));
    }

    /**
     * Gets a subset of deliverables using the set skip and take options
     * @returns The subset of deliverables
     */
    private async getDeliverableSubset() {
        // Separating the listed deliverables from the full list to allow searching without re-querying the database
        this.searchingDeliverables = this.deliverables;
        
        // filter on time allocation start/end dates in proximity to delta date
        if(this.inProgressFilter) {
            const delta = parseInt(this.selectedDelta);
            const wasTrackingTeams = delta >= this.beganTeamTracking;
            this.searchingDeliverables = this.searchingDeliverables.filter(d => (wasTrackingTeams && this.inProgressIds.includes(d.id)) || (!wasTrackingTeams && d.startDate <= delta && delta <= d.endDate));
        }

        // filter on title and description
        if(this.searchText) {
            this.searchingDeliverables = this.searchingDeliverables.filter(d => he.unescape(d.title).toLowerCase().includes(this.searchText) || he.unescape(d.description).toLowerCase().includes(this.searchText));
        }

        // filter on project
        if(this.scFilter || this.sq42Filter || this.bothFilter) {
            this.searchingDeliverables = this.searchingDeliverables.filter(d => 
                (this.scFilter && d.project_ids === 'SC') || 
                (this.sq42Filter && d.project_ids === 'SQ42') ||
                (this.bothFilter && d.project_ids === 'SC,SQ42'));
        }

        return _(this.searchingDeliverables).drop(this.skip).take(this.take).value();
    }

    /**
     * Updates the selected delta value, representing the datetime in milliseconds of the data pull
     * @param e The change event
     */
    private async deltaSelected(e:any) {
        try {
            this.hasMore = true;
            this.skip = 0;
            this.loading = true;
            if(e) {
                this.selectedDelta = e.target.value;
                this.scrolledToToday = false;
                await this.getDeliverablesForDelta();
            }
            const subset = await this.getDeliverableSubset();
            const firstSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, subset);
            this.loadedDeliverables = [...firstSet];
            this.hasMore = this.loadedDeliverables.length !== this.searchingDeliverables.length;
            this.sampledLine = (Number.parseInt(this.selectedDelta) - this.start) / this.timeSpan * this.totalWidth;
            this.setFilterUrlParameters();
            this.loading = false;
        } catch(e) {
            // if a DHR error pops up, it can usually work to set the url parameters and completely reset the database connection through a page refresh
            this.setFilterUrlParameters();
            window.location.reload();
        }
    }

    /**
     * Gets more data from the database, triggers the view to update
     */
    private async fetchData() {
        if(this.deliverableTtimelineDiv.current?.scrollHeight) {
            this.skip += this.take;
            const subSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, await this.getDeliverableSubset());
            this.loadedDeliverables.push(...subSet);
            this.hasMore = this.loadedDeliverables.length !== this.searchingDeliverables.length;
        }
    }

    private searchText: string = "";
    private searchingDeliverables: any[] = [];
    private sq42Filter: boolean = false;
    private scFilter: boolean = false;
    private bothFilter: boolean = false;
    private inProgressFilter: boolean = false;
    private deliverableTtimelineDiv: any;

    /**
     * Begin searching for deliverables whose titles and descriptions contain the search term
     * @param e The click event
     */
    private searchInitiated() {
        this.deltaSelected(null);
    }

    /**
     * Sets the url parameters based on the selected filters
     */
    private setFilterUrlParameters() {
        CommonNavigationFunctions.resetUrl();
        CommonNavigationFunctions.updateURLParameter("date",this.selectedDelta.toString());
        if(this.searchText) {
            CommonNavigationFunctions.updateURLParameter("searchText", this.searchText);
        }
        if(this.sq42Filter) {
            CommonNavigationFunctions.updateURLParameter("sq42","1");
        }
        if(this.scFilter) {
            CommonNavigationFunctions.updateURLParameter("sc","1");
        }
        if(this.bothFilter) {
            CommonNavigationFunctions.updateURLParameter("both","1");
        }
        if(this.inProgressFilter) {
            CommonNavigationFunctions.updateURLParameter("inProgress","1");
        }
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
                    let disciplines = _.chain(_.groupBy(timeAllocations, time => [time.discipline_id, time.deliverable_id, time.team_id].join("-"))).map((v:any[])=>v).value();
                    disciplines.forEach((discipline: any[]) => {
                        const timeGroups = _.chain(_.groupBy(discipline, x => [x.startDate,x.endDate,x.partialTime].join("-"))).map(x=>x).value();

                        timeGroups.forEach((group: any[])=>{
                            const tasks = group.length;
                            let returnRanges = [];
                            let currentRange: any= null;
                            group.forEach((r:any) => {
                                // bypass invalid value
                                if (r.startDate >= r.endDate) {
                                    return;
                                }
                                //fill in the first element
                                if (!currentRange) {
                                    currentRange = r;
                                    return;
                                }
        
                                //const currentEndDate = new Date(currentRange.endDate);
                                //currentEndDate.setDate(currentEndDate.getDate()+4); // covers time overlap when sprint ends on a weekend
                                const currentEndTime = currentRange.endDate; //currentEndDate.getTime();
        
                                if (currentEndTime < r.startDate) {
                                    returnRanges.push(currentRange);
                                    currentRange = r;
                                } else if (currentRange.endDate < r.endDate) {
                                    currentRange.endDate = r.endDate;
                                }
                            });
        
                            if(currentRange) {
                                returnRanges.push(currentRange);
                            }
        
                            returnRanges.forEach((time: any) => {
                                returnData.push({start: time.startDate, end: time.endDate, partial: time.partialTime, abbr: team.abbreviation, disc: time.title, tasks: tasks, discipline_id: time.discipline_id, devs: time.numberOfMembers, deliverable_id: deliverable.id});
                            });
                        });
                    });
                }
            });
        } else {
            returnData.push({start: deliverable.startDate, end: deliverable.endDate});
        }

        const discGroup = _(returnData).groupBy('abbr');
        const teamMin: any[] = discGroup.map((group) => _.minBy(group, 'start')).value();
        const teamMax: any[] = discGroup.map((group) => _.maxBy(group, 'end')).value();

        //const deliverableMin: any = _.minBy(teamMin, 'start').start;
        //const deliverableMax: number = _.maxBy(teamMax, 'end').end;

        const teamGroupsObj = _.mapValues(_.groupBy(returnData, d => d.abbr),team => _.groupBy(team, t => t.disc));
        const teamGroups = _.map(teamGroupsObj, (v:any, team:any)=>({team, 
            start: this.calculateTimeLeft((teamMin[0].abbr && teamMin.filter(tm => tm.abbr === team)[0].start) ?? teamMin[0].start), end: this.calculateTimeRight((teamMax[0].abbr && teamMax.filter(tm => tm.abbr === team)[0].end) ?? teamMax[0].end), 
            discs: _.map(v, (c:any,name:any)=>({name, times: [...c]}))})) as any[];

        return teamGroups;
    }

    componentDidUpdate() {
        this.timelineTable = document.querySelector('.deliverable-timeline');
        this.timelineTableMonthHeader = document.getElementById("month-header");
        // resets the month header position on page load
        if(this.timelineTable && this.timelineTableMonthHeader) {
            this.timelineTableMonthHeader.style.left = -this.timelineTable.scrollLeft;
        }

        let timeline = document.querySelector(".deliverable-timeline") as any;
        if(timeline) {
            let pageContainer = document.getElementById("scrollable-timeline") as any;
            pageContainer.style.height = timeline.clientHeight + 100;
            if(this.scrolledToToday) {
                timeline.scroll(this.horizontalScrollPosition,0);
            } else {
                const scrollPos = this.todayLine - 100;
                timeline.scroll(scrollPos,0);
                this.horizontalScrollPosition = scrollPos;
                this.scrolledToToday = true;
            }
        }

        var searchField = document.getElementById("search-field") as HTMLInputElement;
        if(searchField) {
            searchField.value = this.searchText;
        }

        let infoBoxes = document.querySelectorAll(".deliverable-info-box");
        if(infoBoxes) {
            infoBoxes.forEach((i: any) => {
                let id = i.id.split("deliverable-info-")[1];
                let row = document.getElementById("deliverable-row-"+id);
                i.style.height = row?.clientHeight;
            });
        }
    }

    render() {
        return (
            <>
                <div style={{width:300, margin: 10, padding: 5, border: "1px solid white", display: "inline-block"}}>
                    <h4 style={{margin: 2}}>Legend</h4>
                    <p style={{margin: 2}}><span style={{margin: 0, height: 10, width: 10, backgroundColor: "orange", display: "inline-block"}}/> Indicates part time work</p>
                    <p style={{margin: 2}}><span style={{margin: 0, height: 10, width: 10, backgroundColor: "green", display: "inline-block"}}/> Indicates full time work</p>
                    <p style={{margin: 2}}><span style={{marginBottom: 0, marginLeft: 3, height: 10, width: 3, backgroundColor: "red", display: "inline-block"}}/> Indicates the sample date</p>
                    <p style={{margin: 2}}><span style={{marginBottom: 0, marginLeft: 3, height: 10, width: 3, backgroundColor: "yellow", display: "inline-block"}}/> Indicates today</p>
                </div>
                <div style={{marginLeft: 10, display: "inline-block"}}>
                    <p>Click and drag to scroll the timeline</p>
                    <p>Hover over a timeline block to view details</p>
                    <p>Change the sample date below to view timeline snapshots (dates prior to 2022-02-13 lack discrete team schedules)</p>
                    <p className={`filter-fields ${this.loading?"filter-disable":""}`}>
                        <select name="selectedDelta" value={this.selectedDelta} onChange={this.deltaSelected.bind(this)} onFocus={(e:any) => e.target.selectedOptions[0].scrollIntoView()}>
                        {!this.deltaDatetimes.length ? <option>Loading...</option>:<></>}
                        {this.deltaDatetimes.map((e:any) => {
                            return <option key={e} value={e}>{new Date(Number.parseInt(e)).toLocaleDateString(undefined, {month:"short", day: "2-digit", year: "numeric"})}</option>;
                        })}
                        </select>
                        <span style={{marginRight: -15}}>
                            <input ref={this.searchTextField} type="text" style={{paddingRight: 20}} id="search-field" onChange={e => this.searchText = e.target.value.toLowerCase()} placeholder="Deliverable search" onKeyDown={e => {if(e.key === 'Enter') {this.searchInitiated()}}}/>
                            <button style={{appearance: "none", cursor: "pointer", borderRadius: "50%", width: 17, height: 17, lineHeight: 0, left: -20, position: "relative"}} title="Clear search text" onClick={() => {this.searchText = ""; this.searchTextField.current.value = ""} }>
                                <span style={{position: "relative", left: -1, top: -1}}>x</span>
                            </button>
                        </span>
                        <span style={{display: "inline-block"}} className="filter-options">
                            <label title="Show deliverables that are only for Squadron 42"><input type="checkbox" defaultChecked={this.sq42Filter} onChange={e => {this.sq42Filter = !this.sq42Filter;}}/>SQ42</label>
                            <label title="Show deliverables that are only for Star Citizen"><input type="checkbox" defaultChecked={this.scFilter} onChange={e => {this.scFilter = !this.scFilter;}}/>SC</label>
                            <label title="Show deliverables that are for both SC and SQ42"><input type="checkbox" defaultChecked={this.bothFilter} onChange={e => {this.bothFilter = !this.bothFilter;}}/>Both</label>
                            <label title="Show deliverables that are currently (or soon to be) scheduled"><input type="checkbox" defaultChecked={this.inProgressFilter} onChange={e => {this.inProgressFilter = !this.inProgressFilter;}}/>In Progress</label>
                        </span>
                        <button onClick={this.searchInitiated.bind(this)} style={{marginLeft: 5}}>Apply Filters</button>
                    </p>
                </div>
                {!this.loading ? 
                <>
                <div style={{height: "100vh", overflowX: "hidden", scrollbarWidth: "none", borderBottom: "1px solid white"}} id="scrollableDiv">
                <div id="scrollable-timeline">
                    <InfiniteScroll
                        dataLength={this.loadedDeliverables.length}
                        next={this.fetchData.bind(this)}
                        hasMore={this.hasMore}
                        loader={<h3>Loading...</h3>}
                        scrollableTarget="scrollableDiv"
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>All deliverables loaded</b>
                            </p>
                        }
                    >
                        <div className="deliverable-list-container">
                            <div className="deliverable-info">
                                <div className="deliverable-info-header" style={{display: "flex", width: "100%", position: "sticky", zIndex: 10}}>
                                    <div style={{width: "100%", zIndex: 2}}>
                                        <h3 style={{backgroundColor: "black", margin: 0, height: "100%", borderRight: "1px solid white"}}>Deliverables ({this.searchingDeliverables.length})</h3>
                                    </div>
                                    <div style={{position: "relative", top: 0}}>
                                        <div style={{position: "absolute", width: `calc(100px*${this.months.length}`, borderBottom: "1px solid white"}} id="month-header">
                                            {this.months.map((date:Date, index:number)=> (
                                                <div key={index} style={{width: 100, float:"left", backgroundColor:"black", height: 56, borderRight: "1px solid white", boxSizing: "border-box"}}>
                                                    <h3>{date.toLocaleDateString(undefined, {month:"short",year: "numeric"})}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                <div key={index} className="deliverable-info-box" id={"deliverable-info-"+deliverable.id} style={{height: 60}}>
                                    <div style={{display: "flex"}}>
                                        <a href={`https://robertsspaceindustries.com/roadmap/progress-tracker/deliverables/${deliverable.slug}`} target="_blank" title={`${new Date(deliverable.startDate).toLocaleDateString()} - ${new Date(deliverable.endDate).toLocaleDateString()}`}>
                                            <h3>{deliverable.title === "Unannounced" ? deliverable.description : he.unescape(deliverable.title)}</h3>
                                        </a>
                                        <h4 className="projects">{deliverable.project_ids}</h4>
                                    </div>
                                    <div style={{display: "contents"}}>
                                        <div className="description">{deliverable.title === "Unannounced" ? "" : he.unescape(deliverable.description)}</div>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="deliverable-timeline" onScroll={this.scrollTimelineHeader.bind(this)}  ref={this.deliverableTtimelineDiv}>
                                <div className="timeline-scroll" 
                                    onMouseDown={this.clickTimeline.bind(this)} 
                                    onTouchStart={this.clickTimeline.bind(this)} 
                                    onMouseUp={this.unclickTimeline.bind(this)} 
                                    onTouchEnd={this.unclickTimeline.bind(this)}
                                    onMouseMove={this.moveTimeline.bind(this)} 
                                    onTouchMove={this.moveTimeline.bind(this)}
                                    onMouseLeave={this.unclickTimeline.bind(this)}
                                >
                                    <div className="months">
                                    {this.months.map((date:Date, index:number)=> (
                                        <div key={index} className="month" style={{backgroundColor: index % 6 < 3 ? "#202020" : "none", opacity: 0.5 }}/>
                                    ))}
                                        <div className="today-line" style={{left: this.todayLine, borderRight: "1px solid yellow"}}></div>
                                        <div className="sampled-line" style={{left: this.sampledLine, borderRight: "1px solid red" }}></div>
                                    </div>
                                    <div className="deliverable-rows" onMouseMove={this.hoverTimeline.bind(this)}>
                                        {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                            <div key={index} className="deliverable-row" id={"deliverable-row-"+deliverable.id}>
                                                {this.collectDeliverableTimeline(deliverable).map((teamGroup:any, teamIndex:number, teamRow: any)=>(
                                                    <div key={teamIndex} className="team">
                                                        {teamGroup.team !== "undefined" && teamGroup.discs.map((disc:any, disciplineIndex:number, row: any)=>(
                                                            <div key={disciplineIndex} className="discipline">
                                                            {disc.times.map((time:any, index: number)=>(
                                                                <div key={index} className="time-box">
                                                                    {this.createBox(time, disc.times)}
                                                                </div>
                                                            ))}
                                                            </div>
                                                        ))}
                                                        <div style={{position: "absolute", height: 12 * teamGroup.discs.length - 2, left: teamGroup.start - 10, right: teamGroup.end - 10, 
                                                            top: -1, zIndex: -1, border: "1px solid dimgray", backgroundColor: "white", opacity: 0.2, borderRadius: 10}}/>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                </div>
                </>
                : <></>}
                <h5 style={{margin: "10px"}}>{this.loading ? "Loading timeline..." : ""}</h5>
            </>
        );
    }

    private popupWidth: number = 240;

    /**
     * Displays a popup with schedule information when moused over
     * @param e The event
     */
    private hoverTimeline(e:any) {
        const _overlapped = document.elementsFromPoint(e.pageX - window.pageXOffset, e.pageY - window.pageYOffset)
        let filtered = _overlapped.filter(el=>el.classList.contains("timeline-bar")) as any[];
        let popup = document.querySelector(".timeline-bar-popup");
        if(popup && popup.parentNode) {
            popup.parentNode.removeChild(popup)
        }
        if(filtered.length) {
            let data = filtered[0].dataset;

            let startDisplay = (new Date(Number.parseInt(data.start))).toLocaleDateString(undefined, {month:"short",day: "2-digit", year: "2-digit"});
            let endDisplay = (new Date(Number.parseInt(data.end))).toLocaleDateString(undefined, {month:"short",day: "2-digit",year: "2-digit"});

            filtered[0].parentNode.insertAdjacentHTML("beforeend",
            `<div class="timeline-bar-popup" style="position: fixed; width: ${this.popupWidth}px; z-index: 10000; background-color: black; text-align: center; font-size: 14; margin-top: 14px; left: ${e.pageX-120}; top: ${e.pageY-window.scrollY}" >
                <div>${data.abbr} (${data["disc"]})</div>
                <div>${data.tasks} tasks</div>
                <div>${startDisplay} - ${endDisplay}</div>
            </div>`);
        }
    }

    /**
     * Generates a timespan box for display
     * @param time The time information to use
     * @returns the timespan box for display
     */
    private createBox(time:any, times:any[]) {
        let right = this.calculateTimeRight(time.end);
        let left = this.calculateTimeLeft(time.start);
        let matches = times.filter(x => x.start === time.start && x.end === time.end && x.discipline_id === time.discipline_id && x.deliverable_id == time.deliverable_id);
        let matched = matches.length > 1;
        let index = 0;
        if(matched) {
            index = matches.indexOf(time);
        }

        return <>
            <span style={{left: left, right: right, backgroundColor: time.partial ? "orange" : "green", position: "absolute", height: matched ? 5 : 10, top: index ? 5 : 0}} className="timeline-bar"
                data-start={time.start} data-end={time.end} data-abbr={time.abbr} data-disc={time.disc} data-tasks={time.tasks}/>
        </>;
    }

    /**
     * Calculates the pixels from the left to position a time div
     * @param startTime The start time
     * @returns 
     */
    private calculateTimeLeft(startTime: number) {
        const fromStart = startTime- this.start;
        const percentOfTimespan = fromStart / this.timeSpan;
        return percentOfTimespan * this.totalWidth;
    }

    /**
     * Calculates the pixels from the right to position a time div
     * @param endTime The end date
     * @returns The pixel positioning
     */
    private calculateTimeRight(endTime: number) {
        const fromStart = endTime- this.start;
        const percentOfTimespan = fromStart / this.timeSpan;
        return this.totalWidth-(percentOfTimespan * this.totalWidth);
    }

    //#region Timeline dragging
    private timelineClicked: boolean = false;
    private scrollLeft: number = 0;
    private startX: number = 0;
    private timelineTable: any | null = null;
    private timelineTableMonthHeader: any | null = null;

    private clickTimeline(e:any) {
        if (e.button === 1) return false;
        this.timelineClicked = true;
        this.timelineTable = document.querySelector('.deliverable-timeline');
        this.timelineTableMonthHeader = document.getElementById("month-header");
        if(this.timelineTable && this.timelineTableMonthHeader) {
            let pageX = e.pageX || e.touches[0].pageX;
            this.startX = pageX - this.timelineTable.offsetLeft;
            this.scrollLeft = this.timelineTable.scrollLeft;
        }
    }

    private unclickTimeline(e:any) {
        this.timelineClicked = false;
    }

    private moveTimeline(e:any) {
        if(this.timelineClicked) {
            if(this.timelineTable && this.timelineTableMonthHeader) {
                let pageX = e.pageX || e.touches[0].pageX;
                const x = pageX - this.timelineTable.offsetLeft;
                const scroll = x - this.startX;
                this.timelineTable.scrollLeft = this.scrollLeft - scroll;
                this.horizontalScrollPosition = this.timelineTable.scrollLeft;
            }
        }
    }

    /**
     * Forces the timeline header position to match the timeline grid position
     * @param e The scroll event
     */
    private scrollTimelineHeader(e:any) {
        this.timelineTableMonthHeader.style.left = -this.timelineTable.scrollLeft;
    }
    //#endregion
}