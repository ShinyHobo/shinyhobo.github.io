import React from "react";
import { CommonDBFunctions, Database, SqliteStats } from "../utils/database-helpers";
import _ from "lodash";
import { SqliteWorker } from "sql.js-httpvfs";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";

@observer
export default class Timeline2 extends React.Component {
    private db: Database= null;
    private worker: SqliteWorker | null = null;

    @observable private working: boolean = true;

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;
        this.worker = vfs.worker;
        this.working = true;

        makeObservable(this);

        CommonDBFunctions.getDeltaList(this.db).then(deltas => {
            //CommonDBFunctions.getClosestDeltaDate(this.db, deltas[0]).then(r => {
            //    console.info(r);
                console.info("starting deliverable builds");
                let now = Date.now();
                let take = 1000;
                let skip = 0;
                Promise.all([CommonDBFunctions.buildCompleteDeliverables(this.db, deltas[0],take,skip), CommonDBFunctions.buildCompleteDeliverables(this.db, deltas[1],take,skip)]).then(async test => {
                    console.info(test);
                    let stats = await this.worker?.getStats() as SqliteStats;
                    console.info("fetched: ", CommonDBFunctions.formatBytes(stats.totalFetchedBytes));
                    console.info("total: ", CommonDBFunctions.formatBytes(stats.totalBytes));
                    console.info("time: ", (Date.now() - now) / 1000, " seconds");
                    this.working = false;
                });
            //});
        });
    }

    render() {
        return (
            <div>{this.working ? "Loading timeline..." : "Timeline loading complete."}</div>
        );
    }
}