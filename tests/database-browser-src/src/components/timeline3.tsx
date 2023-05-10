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
                        <table className="deliverable-info">
                            <thead>
                                <tr><td><h2>Deliverables</h2></td></tr>
                            </thead>
                            <tbody>
                            {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                <tr key={index} className="deliverable-info">
                                    <td>
                                        <h3>{deliverable.title === "Unannounced" ? deliverable.description : he.unescape(deliverable.title)}</h3>
                                        <h4 className="projects">{deliverable.project_ids}</h4>
                                        <div className="description">{deliverable.title === "Unannounced" ? "" : he.unescape(deliverable.description)}</div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="table-scroll">
                            <table className="deliverable-timeline" 
                                onMouseDown={this.clickTimeline.bind(this)} 
                                onMouseUp={this.unclickTimeline.bind(this)} 
                                onMouseMove={this.moveTimeline.bind(this)} 
                                onMouseLeave={this.unclickTimeline.bind(this)}>
                                <thead>
                                    <tr>
                                        <td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td><td>january 2021</td>
                                        <td>february 2021</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.loadedDeliverables.map((deliverable:any, index:number)=> (
                                    <tr key={index} className="deliverable-info">
                                        <td style={{width:60}}>
                                            {deliverable.startDate}    
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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
        this._scroller = document.querySelector('.table-scroll');
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
                //let left = _scroller.scrollLeft - window.scrollX + e.clientX;
                //let top = _scroller.scrollTop - window.scrollY + e.clientY;
                // _scroller.scroll({
                //     top: top,
                //     left: left,
                //     behavior: "smooth"
                // })

                const x = e.pageX - this._scroller.offsetLeft;
                const scroll = x - this.startX;
                this._scroller.scrollLeft = this.scrollLeft - scroll;
    
                //console.info(_scroller.scrollLeft, window.scrollX, e.clientX, left)
                //console.info(left, _scroller.scrollLeft, e.clientX, window.scrollX)
            }
        }
    }
}