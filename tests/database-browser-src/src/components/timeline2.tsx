import React from "react";
import { CommonDBFunctions, Database, SqliteStats } from "../utils/database-helpers";
import _ from "lodash";
import { SqliteWorker } from "sql.js-httpvfs";

export default class Timeline2 extends React.Component {
    private db: Database= null;
    private worker: SqliteWorker | null = null;

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;
        this.worker = vfs.worker;

        CommonDBFunctions.getDeltaList(this.db).then(deltas => {
            //CommonDBFunctions.getClosestDeltaDate(this.db, deltas[0]).then(r => {
            //    console.info(r);
                console.info("starting deliverable builds");
                Promise.all([CommonDBFunctions.buildCompleteDeliverables(this.db, deltas[0]), CommonDBFunctions.buildCompleteDeliverables(this.db, deltas[1])]).then(async test => {
                    console.info(test);
                    let stats = await this.worker?.getStats() as SqliteStats;
                    console.info("fetched: ", CommonDBFunctions.formatBytes(stats.totalFetchedBytes));
                    console.info("total: ", CommonDBFunctions.formatBytes(stats.totalBytes));
                });
            //});
        });
    }

    render() {
        return (
            <div></div>
        );
    }
}