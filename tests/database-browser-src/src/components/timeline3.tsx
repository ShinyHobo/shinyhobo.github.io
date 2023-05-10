import React, { createRef } from "react";
import { CommonDBFunctions, Database, SqliteStats } from "../utils/database-helpers";
import _ from "lodash";
import * as he from 'he';
import { SqliteWorker } from "sql.js-httpvfs";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import InfiniteScroll from 'react-infinite-scroll-component'

import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';

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
            if(start.getDate() != d) {
                start.setDate(0);
            }
            
            this.months.push(new Date(start));
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

    render() {
        return (
            <>
                {!this.loading ? 
                <div style={{margin: "10px"}}>
                    <select name="selectedDelta" value={this.selectedDelta} onChange={this.deltaSelected.bind(this)}>
                        {this.deltaDatetimes.map((e:any) => {
                            return <option key={e} value={e}>{new Date(Number.parseInt(e)).toLocaleDateString()}</option>;
                        })}
                    </select>
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
                        <div  className="deliverable-list-container">
                            <div className="deliverable-info">
                            <h2>Deliverables</h2>
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
                                        <div key={index} className="month">
                                            <h3>{date.toLocaleDateString(undefined, {month:"short",year: "numeric"})}</h3>
                                        </div>
                                    ))}
                                        <div className="deliverable-rows">
                                        {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                            <div key={index} className="deliverable-row">
                                                {deliverable.startDate} 
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </InfiniteScroll>
                </div>
                : <></>}
                <h5 style={{margin: "10px"}}>{this.loading ? "Loading timeline..." : ""}</h5>
            </>
        );
    }

    private timelineClicked: boolean = false;
    private scrollLeft: number = 0;
    private startX: number = 0;
    private _scroller: any | null = null;

    private clickTimeline(e:any) {
        this.timelineClicked = true;
        this._scroller = document.querySelector('.deliverable-timeline');
        if(this._scroller) {
            this.startX = e.pageX - this._scroller.offsetLeft;
            this.scrollLeft = this._scroller.scrollLeft;
        }
    }

    private unclickTimeline(e:any) {
        this.timelineClicked = false;
    }

    private moveTimeline(e:any) {
        if(this.timelineClicked) {
            if(this._scroller) {
                const x = e.pageX - this._scroller.offsetLeft;
                const scroll = x - this.startX;
                this._scroller.scrollLeft = this.scrollLeft - scroll;
            }
        }
    }
}