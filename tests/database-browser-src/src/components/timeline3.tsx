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
    @observable private selectedTeam: string = "";
    private beganTeamTracking: number = 1644732000000; // team tracking began on Feb 13, 2022
    private deliverables: any[] = [];
    @observable private loadedDeliverables: any[] = [];
    private take: number = 20;
    private skip: number = 0;
    private hasMore: boolean = true;
    private scrolledToToday: boolean = false;
    private horizontalScrollPosition: number = 0;
    private searchTextField: any;
    private fetching: boolean = false;

    private months: Date[] = [];

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;
        this.worker = vfs.worker;

        makeObservable(this);

        document.body.style.overflowX = "hidden";

        this.deliverableTtimelineDiv = React.createRef();
        this.searchTextField = React.createRef();

        // account for zoom out
        window.addEventListener('resize', () => {this.fixDataForPageHeight()});

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
            alert("Failed to access and load the database! First, clear your cache (Ctrl-F5). If the issue persists, please report this on my github, if possible. Make sure to include the url or list the filters used.");
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
    private deliverableTeams: { key: string; deliverables: any[]; }[]= [];

    /**
     * Gets the list of months between Jan 1, 2021 and the end of the next year
     */
    private getTimelineMonths() {
        const start = new Date(Date.parse("2021-01-01T00:00:00"));
        const now = new Date(Date.now());
        const end = new Date(Date.parse(`${now.getUTCFullYear()}-12-31T00:00:00`));

        const yearCount = end.getUTCFullYear() - start.getUTCFullYear() + 1;

        for(let year = start.getUTCFullYear(); year <= yearCount + start.getUTCFullYear(); year++) {
            for(let month = 0; month < 12; month++) {
                this.months.push(new Date(year, month, 1));
            }
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
        //this.inProgressIds = await CommonDBFunctions.getInProgressDeliverables(this.db, this.selectedDelta, this.deliverables.filter(d => d.endDate >= this.selectedDelta));
        this.inProgressIds = await CommonDBFunctions.getInProgressDeliverablesCache(this.db, this.selectedDelta);
        this.deliverableTeams = await CommonDBFunctions.getDeliverableTeams(this.db, this.deliverables);
    }

    /**
     * Gets the team information for the selected team
     * @returns The team info
     */
    private getSelectedTeamInfo() {
        return this.deliverableTeams.filter((dt:any) => dt.key === this.selectedTeam)[0];
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
                this.inProgressTeams = [];
                this.deliverableTeams = [];
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
     * Gets the team ids for use with queries
     * @returns The unique list of team ids as a comma delimited string
     */
    private getTeamIdsForSelectedTeam() {
        if(this.selectedTeam) {
            const team = this.getSelectedTeamInfo();
            if(team) {
                return [...new Set(team.deliverables.map(d=>d.team_id))].toString();
            }
        }
        return "";
    }

    /**
     * Gets more data from the database, triggers the view to update
     */
    private async fetchData() {
        if(this.deliverableTtimelineDiv.current?.scrollHeight) {
            this.skip += this.take;
            this.fetching = true;
            const subSet = await CommonDBFunctions.buildCompleteDeliverables(this.db, this.selectedDelta, await this.getDeliverableSubset());
            this.loadedDeliverables.push(...subSet);
            this.hasMore = this.loadedDeliverables.length !== this.searchingDeliverables.length;
            this.fetching = false;
        }
    }

    private fixDataForPageHeight() {
        if(!this.fetching) {
            let scrollableDiv = document.getElementById("scrollableDiv");
            let infiniteScroller = document.getElementsByClassName("infinite-scroll-component");
            if((scrollableDiv && infiniteScroller.length) && scrollableDiv?.clientHeight > infiniteScroller[0]?.scrollHeight) {
                this.fetchData();
            }
        }
    }

    //#region Filters
    private searchText: string = "";
    private searchingDeliverables: any[] = [];
    private inProgressTeams: any[] = [];
    private sq42Filter: boolean = false;
    private scFilter: boolean = false;
    private bothFilter: boolean = false;
    private inProgressFilter: boolean = false;
    private deliverableTtimelineDiv: any;

    private searchTextBacking: string = "";
    private sq42FilterBacking: boolean = false;
    private scFilterBacking: boolean = false;
    private bothFilterBacking: boolean = false;
    private inProgressFilterBacking: boolean = false;
    private selectedTeamBacking: string = "";

    /**
     * Begin searching for deliverables whose titles and descriptions contain the search term
     * @param e The click event
     */
    private searchInitiated() {
        this.updateBackingFilters();
        this.deltaSelected(null);
    }

    private updateBackingFilters() {
        this.searchTextBacking = this.searchText;
        this.sq42FilterBacking = this.sq42Filter;
        this.scFilterBacking = this.scFilter;
        this.bothFilterBacking = this.bothFilter;
        this.inProgressFilterBacking = this.inProgressFilter;
        this.selectedTeamBacking = this.selectedTeam;
    }

    /**
     * Gets a subset of deliverables using the set skip and take options
     * @param skipAdjustment The amount to adjust the skip/take amount
     * @returns The subset of deliverables
     */
    private async getDeliverableSubset() {
        // Separating the listed deliverables from the full list to allow searching without re-querying the database
        this.searchingDeliverables = this.deliverables;
        // filter on time allocation start/end dates in proximity to delta date
        if(this.inProgressFilterBacking) {
            const delta = parseInt(this.selectedDelta);
            const wasTrackingTeams = delta >= this.beganTeamTracking;
            this.searchingDeliverables = this.searchingDeliverables.filter(d => (wasTrackingTeams && this.inProgressIds.includes(d.id)) || (!wasTrackingTeams && d.startDate <= delta && delta <= d.endDate));
        }

        if(this.selectedTeamBacking) {
            const team = this.getSelectedTeamInfo();
            if(team) {
                const deliverableIds = team.deliverables.map((d:any)=>d.deliverable_id);
                if(this.inProgressFilterBacking) {
                    if(!this.inProgressTeams.length) {
                        this.inProgressTeams = await CommonDBFunctions.getInProgressDeliverables(this.db, this.selectedDelta, this.searchingDeliverables.filter(sd => deliverableIds.some(di => di === sd.id)), this.getTeamIdsForSelectedTeam());
                    }
                    this.searchingDeliverables = this.searchingDeliverables.filter(d => this.inProgressTeams.some(di => di === d.id));
                } else {
                    this.searchingDeliverables = this.searchingDeliverables.filter(d => deliverableIds.some(di => di === d.id));
                }
            }
        }

        // filter on title and description
        if(this.searchTextBacking) {
            this.searchingDeliverables = this.searchingDeliverables.filter(d => he.unescape(d.title).toLowerCase().includes(this.searchTextBacking) || he.unescape(d.description).toLowerCase().includes(this.searchTextBacking));
        }

        // filter on project
        if(this.scFilterBacking || this.sq42FilterBacking || this.bothFilterBacking) {
            this.searchingDeliverables = this.searchingDeliverables.filter(d =>
                (this.scFilterBacking && d.project_ids === 'SC') ||
                (this.sq42FilterBacking && d.project_ids === 'SQ42') ||
                (this.bothFilterBacking && d.project_ids === 'SC,SQ42'));
        }

        return _(this.searchingDeliverables).drop(this.skip).take(this.take).value();
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
            this.selectedTeam = queryParameters.get("team") ?? "";

            this.updateBackingFilters();
        }
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
        if(this.selectedTeam) {
            CommonNavigationFunctions.updateURLParameter("team", this.selectedTeam);
        }
    }
    //#endregion

    /**
     * Groups deliverable team time allocations and stitches relavent time allocations together
     * @param deliverable The deliverable to collect
     * @returns The deliverable team/time groups
     */
    private collectDeliverableTimeline(deliverable: any): any[] {
        let returnData: any[] = [];
        if(deliverable.teams.length) {
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
                                returnData.push({start: time.startDate, end: time.endDate, partial: time.partialTime, team_id: team.id, abbr: team.abbreviation, disc: time.title, 
                                    tasks: tasks, discipline_id: time.discipline_id, devs: time.numberOfMembers, deliverable_id: deliverable.id});
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
            startTime: teamMin.filter(tm => tm.abbr === team)[0]?.start ?? teamMin[0].start, endTime: teamMax.filter(tm => tm.abbr === team)[0]?.end ?? teamMax[0].end,
            start: this.calculateTimeLeft((teamMin[0].abbr && teamMin.filter(tm => tm.abbr === team)[0].start) ?? teamMin[0].start), end: this.calculateTimeRight((teamMax[0].abbr && teamMax.filter(tm => tm.abbr === team)[0].end) ?? teamMax[0].end),
            discs: _.map(v, (c:any,name:any)=>({name, times: [...c]}))})) as any[];

        return teamGroups;
    }

    private showTeamLabels = false;
    private toggleTeamLabels(e: any) {
        if(e) {
            this.showTeamLabels = e.target.checked;
        }
        let divs = document.getElementsByClassName("team-list-abbr") as any;
        for(let i=0, len=divs.length; i<len; i++)
        {
            divs[i].style.display = this.showTeamLabels ? "block" : "none";
        }
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
                // TODO - use today/delta selected here
                const scrollPos = this.sampledLine - 100;
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
        
        this.fixDataForPageHeight();
        this.toggleTeamLabels(null);
    }

    render() {
        const teamInfo = this.getSelectedTeamInfo();
        const teamAbbr = teamInfo?.deliverables[0].abbreviation;
        const delta = parseInt(this.selectedDelta);
        const wasTrackingTeams = delta >= this.beganTeamTracking;
        return (
            <>
                <div id="timeline-info-box">
                    <h1 style={{marginBottom: 0, marginLeft: 10}}>Scheduled Work Timeline</h1>
                    <div style={{marginLeft: 10, marginRight:20, display: "inline-block"}}>
                        <div>
                            <div style={{marginLeft:10,maxWidth:1000}}>This is the Scheduled Work Timeline, an enhanced verion of the Progress Tracker. On it, you can see how each teams' time schedules are broken up, their priority, and the number of tasks assigned per segment. You can:</div>
                            <ul>
                                <li>Click and drag to scroll the timeline</li>
                                <li>Hover over a time schedule block to view more details</li>
                                <li>Change the sample date to view timeline snapshots (dates prior to Feb 13, 2022 lack discrete team schedules)</li>
                                <li>Filter by game, team, and/or the schedules that are active within two weeks of the selected sample date</li>
                            </ul>
                            <div style={{marginLeft:10,maxWidth:1000}}>This is a work in progress, so stay tuned for additional features and ways to visualize the data.</div>
                            <div style={{width:300, margin: 10, padding: 5, border: "1px solid white", display: "inline-block"}}>
                                <h4 style={{margin: 2}}>Legend</h4>
                                <p style={{margin: 2}}><span style={{margin: 0, height: 10, width: 10, backgroundColor: "orange", display: "inline-block"}}/> Indicates part time work</p>
                                <p style={{margin: 2}}><span style={{margin: 0, height: 10, width: 10, backgroundColor: "green", display: "inline-block"}}/> Indicates full time work</p>
                                <p style={{margin: 2}}><span style={{marginBottom: 0, marginLeft: 3, height: 10, width: 3, backgroundColor: "red", display: "inline-block"}}/> Indicates the sample date</p>
                                <p style={{margin: 2}}><span style={{marginBottom: 0, marginLeft: 3, height: 10, width: 3, backgroundColor: "yellow", display: "inline-block"}}/> Indicates today</p>
                            </div>
                        </div>
                        <p className={`filter-fields ${this.loading?"filter-disable":""}`}>
                            <select name="selectedDelta" value={this.selectedDelta} onChange={this.deltaSelected.bind(this)} onFocus={(e:any) => e.target.selectedOptions[0].scrollIntoView()} style={{marginRight: 5}}>
                            {!this.deltaDatetimes.length ? <option>Loading...</option>:<></>}
                            {this.deltaDatetimes.map((e:any) => {
                                return <option key={e} value={e}>{new Date(Number.parseInt(e)).toLocaleDateString(undefined, {month:"short", day: "2-digit", year: "numeric"})}</option>;
                            })}
                            </select>
                            <span style={{marginRight: 5}}>
                                <span style={{marginRight: -15}}>
                                    <input ref={this.searchTextField} type="text" style={{paddingRight: 20}} id="search-field" onChange={e => this.searchText = e.target.value.toLowerCase()} placeholder="Deliverable search" onKeyDown={e => {if(e.key === 'Enter') {this.searchInitiated()}}}/>
                                    <button style={{appearance: "none", cursor: "pointer", borderRadius: "50%", width: 18, height: 18, border: "none", lineHeight: 0, left: -20, position: "relative"}} title="Clear search text" onClick={() => {this.searchText = ""; this.searchTextField.current.value = ""} }>
                                        <span style={{position: "relative", left: -1, top: -1}}>x</span>
                                    </button>
                                </span>
                            </span>
                            <select name="selectedTeam" value={this.selectedTeam} onChange={(e:any)=>this.selectedTeam = e.target.value} onFocus={(e:any) => e.target.selectedOptions[0].scrollIntoView()}>
                            {!this.deliverableTeams.length ? <option>Loading...</option>:<option value="" >Select team (none)</option>}
                            {this.deliverableTeams.map((dt:any)=>{
                                return <option key={dt.key} value={dt.key}>{dt.key} ({dt.deliverables[0].abbreviation})</option>
                            })}
                            </select>
                            <span style={{display: "inline-block", marginRight: 5}} className="filter-options">
                                <label title="Show deliverables that are only for Squadron 42"><input type="checkbox" defaultChecked={this.sq42Filter} onChange={e => {this.sq42Filter = !this.sq42Filter;}}/>SQ42</label>
                                <label title="Show deliverables that are only for Star Citizen"><input type="checkbox" defaultChecked={this.scFilter} onChange={e => {this.scFilter = !this.scFilter;}}/>SC</label>
                                <label title="Show deliverables that are for both SC and SQ42"><input type="checkbox" defaultChecked={this.bothFilter} onChange={e => {this.bothFilter = !this.bothFilter;}}/>Both</label>
                                <label title="Show deliverables that are currently (or soon to be) scheduled"><input type="checkbox" defaultChecked={this.inProgressFilter} onChange={e => {this.inProgressFilter = !this.inProgressFilter;}}/>In Progress</label>
                            </span>
                            <button onClick={this.searchInitiated.bind(this)}>Apply Filters</button>
                        </p>
                    </div>
                </div>
                {!this.loading ?
                <>
                <div id="scrollableDiv">
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
                                    <div className="deliverable-info-header">
                                        <div style={{backgroundColor: "black", width: "100%", height: "100%", zIndex: 2, borderRight: "1px solid white"}}>
                                            <h3 style={{margin: 0}}>Deliverables ({this.searchingDeliverables.length})</h3>
                                            {wasTrackingTeams?<label title="Show/hide team abbreviations next to each deliverable"><input type="checkbox" defaultChecked={this.showTeamLabels} onChange={e => {this.toggleTeamLabels(e)}}/>Show Team Labels</label>:<></>}
                                        </div>
                                        <div style={{position: "relative", top: 0}}>
                                            <div id="month-header">
                                                <div id="quarters" style={{display: "flex", width: "101%"}}>
                                                {this.months.filter((v,i)=>i%3==0).map((date:Date, index:number)=> (
                                                    <div key={index} className="quarter-group" style={{backgroundColor: index % 2 == 0 ? "#282828" : "#181818", borderLeft: index % 4 == 0?"1px solid white":"none" }}>
                                                        <h3>Q{index%4+1} {date.toLocaleDateString(undefined, {year:"numeric"})}</h3>
                                                    </div>
                                                ))}
                                                </div>
                                                <div id="months" style={{display: "flex", width: "101%"}}>
                                                {this.months.map((date:Date, index:number)=> (
                                                    <div key={index} className="month-box" style={{backgroundColor: index % 6 < 3 ? "#282828" : "#181818", borderLeft: index % 12 == 0?"1px solid white":"none" }}>
                                                        <h4>{date.toLocaleDateString(undefined, {month:"short"})}</h4>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                    <div key={index} className="deliverable-info-box" id={"deliverable-info-"+deliverable.id} style={{height: 60}}>
                                        <div style={{display: "flex"}}>
                                            <a href={`https://${CommonDBFunctions.rsi}/roadmap/progress-tracker/deliverables/${deliverable.slug}`} target="_blank" title={`${new Date(deliverable.startDate).toLocaleDateString()} - ${new Date(deliverable.endDate).toLocaleDateString()}`}>
                                                <h3>{deliverable.title === "Unannounced" ? deliverable.description : he.unescape(deliverable.title)}</h3>
                                            </a>
                                            <h4 className="projects">{deliverable.project_ids.split(',').map((pid:string)=>(
                                                <span key={pid}><img src={`https://${CommonDBFunctions.rsi}${CommonDBFunctions.ProjectImages[pid]}`}/></span>
                                            ))}</h4>
                                        </div>
                                        <div style={{display: "contents"}}>
                                            <div className="description">{deliverable.title === "Unannounced" ? "" : he.unescape(deliverable.description)}</div>
                                        </div>
                                        <div className="team-list">
                                            {this.collectDeliverableTimeline(deliverable).map((teamGroup:any, teamIndex:number, teamRow: any)=>(
                                                <div key={teamIndex} className="team">
                                                    {teamGroup.team !== "undefined" && teamGroup.discs.map((disc:any, disciplineIndex:number, row: any)=>(
                                                        <div key={disciplineIndex} className="discipline"/>
                                                    ))}
                                                    {teamGroup.team !== "undefined"?<span className="team-list-abbr">{teamGroup.team}</span>:<></>}
                                                </div>
                                            ))}
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
                                        <div className="deliverable-rows">
                                            {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                                <div key={index} className="deliverable-row" id={"deliverable-row-"+deliverable.id}>
                                                    {this.collectDeliverableTimeline(deliverable).map((teamGroup:any, teamIndex:number, teamRow: any)=>(
                                                        <div key={teamIndex} className="team" data-team={teamGroup.team} data-start={teamGroup.startTime} data-end={teamGroup.endTime} onMouseMove={this.hoverTimeline.bind(this)} onMouseLeave={this.hoverTimeline.bind(this)}>
                                                            {teamGroup.team !== "undefined" && teamGroup.discs.map((disc:any, disciplineIndex:number, row: any)=>(
                                                                <div key={disciplineIndex} className="discipline">
                                                                {disc.times.map((time:any, index: number)=>(
                                                                    <div key={index} className="time-box">
                                                                        {this.createBox(time, disc.times)}
                                                                    </div>
                                                                ))}
                                                                </div>
                                                            ))}
                                                            <div className={`team-group${teamAbbr==teamGroup.team?" selected-team":""}`} style={{height: 12 * teamGroup.discs.length - 2, left: teamGroup.start - 10, right: teamGroup.end - 10}}/>
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
    private popupIsTimelineBar: boolean = false;
    private selectedPopupBox: any;

    /**
     * Displays a popup with schedule information when moused over
     * @param e The event
     */
    private hoverTimeline(e:any) {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const isTeamGroup = elements.some((el:any) => el.classList.contains("team-group"));
        const isTimelineBar = elements.some((el:any) => el.className === "timeline-bar");

        let popup = document.querySelector(".timeline-bar-popup") as any;
        if(popup && popup.parentNode && (e.type == "mouseleave" || isTimelineBar !== this.popupIsTimelineBar || !isTeamGroup)) {
            popup.parentNode.removeChild(popup);
        }
        
        this.popupIsTimelineBar = isTimelineBar;
        
        if(e.target && e.type == "mousemove" && isTeamGroup) {
            const leftShift = this.popupWidth / 2;
            if(popup && this.selectedPopupBox === e.target) {
                popup.style.left = e.pageX-leftShift;
                popup.style.top = e.pageY-window.scrollY;
            } else if(isTimelineBar) {
                
                const data = e.target.dataset;
                const startDisplay = (new Date(Number.parseInt(data.start))).toLocaleDateString(undefined, {month:"short",day: "2-digit", year: "numeric"});
                const endDisplay = (new Date(Number.parseInt(data.end))).toLocaleDateString(undefined, {month:"short",day: "2-digit",year: "numeric"});
                const teamTitle = this.deliverableTeams.filter(dt => dt.deliverables.some(d => d.abbreviation == data.abbr))[0]?.key;

                e.target.parentNode.insertAdjacentHTML("beforeend",
                `<div class="timeline-bar-popup" style="width: ${this.popupWidth}px; left: ${e.pageX-leftShift}; top: ${e.pageY-window.scrollY}">
                    <div>${teamTitle}</div>
                    <div>(${data.abbr})</div>
                    <div>${data.disc} - ${data.tasks} task${data.tasks>1?"s":""}</div>
                    <div>${startDisplay} - ${endDisplay}</div>
                </div>`);
                if(this.selectedPopupBox !== e.target && popup && popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            } else if(false) { // shelving for now
                const team = elements.find((el:any) => el.className === "team") as any;
                const data = team.dataset;
                const teamTitle = this.deliverableTeams.filter(dt => dt.deliverables.some(d => d.abbreviation == data.team))[0]?.key;
                const startDate = new Date(Number.parseInt(data.start));
                const startDisplay = startDate.toLocaleDateString(undefined, {month:"short",day: "2-digit", year: "numeric"});
                const endDate = new Date(Number.parseInt(data.end));
                const endDisplay = endDate.toLocaleDateString(undefined, {month:"short",day: "2-digit",year: "numeric"});
                const totalWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

                const scheduledWeeks = 10;
                e.target.parentNode.insertAdjacentHTML("beforeend",
                `<div class="timeline-bar-popup" style="width: ${this.popupWidth}px; left: ${e.pageX-leftShift}; top: ${e.pageY-window.scrollY}">
                    <div>${teamTitle}</div>
                    <div>(${data.team})</div>
                    <div>${startDisplay} - ${endDisplay}</div>
                    <div>${scheduledWeeks}/${totalWeeks} weeks scheduled</div>
                    <div>part-time</div>
                </div>`);
                if(this.selectedPopupBox !== e.target && popup && popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }
        }
        this.selectedPopupBox = e.target;
    }

    /**
     * Generates a timespan box for display
     * @param time The time information to use
     * @returns the timespan box for display
     */
    private createBox(time:any, times:any[]) {
        let matches = times.filter(x => x.start === time.start && x.end === time.end && x.discipline_id === time.discipline_id && x.deliverable_id == time.deliverable_id && x.team_id == time.team_id);
        let matched = matches.length > 1;

        let right = this.calculateTimeRight(time.end);
        let left = this.calculateTimeLeft(time.start);

        return <>
            <span style={{left: left, right: right, backgroundColor: time.partial ? "orange" : "green", height: matched ? 5 : 10, top: matched && time.partial ? 5 : 0}} className="timeline-bar"
                data-start={time.start} data-end={time.end} data-abbr={time.abbr} data-disc={time.disc} data-tasks={time.tasks} data-team_id={time.team_id}/>
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
