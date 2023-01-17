import React from "react";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { SqliteWorker } from "sql.js-httpvfs";
import { LazyHttpDatabase, SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";

@observer
export default class Terminal extends React.Component {
    private db: Comlink.Remote<LazyHttpDatabase> | null = null;
    private worker: SqliteWorker | null = null;
    private dbConfig: SplitFileConfig[] | null = null;

    @observable queryOutput: string = "";

    constructor(vfs: any) {
        super(vfs);
        this.worker = vfs.worker;
        this.db = vfs.db;
        this.dbConfig = vfs.configs;

        this.RunQuery = this.RunQuery.bind(this);
        console.log("terminal con", vfs);
        makeObservable(this);
    }

    private async RunQuery() {
        const query = (document.getElementById("query") as HTMLTextAreaElement)?.value;
        console.log(this.db);
        let result = "";
        try {
            result = JSON.stringify(await this.db?.query(query), null, 2);
        } catch(err: any) {
            console.log("err", err);
            result = err.message;
        }
        let stats = await this.worker?.getStats();
        let something = this.dbConfig;
        console.log(something);
        this.queryOutput = result;
    }

    render() {
        return (
            <div style={{display: "Flex", flexFlow: "column", height: "100%"}}>
                <div id="terminal" style={{ textAlign: "center", position: "sticky", top: 0, background: "#151515" }}>
                    <textarea id="query" style={{ width: "400px", height: "100px" }}>select * from card_diff</textarea><br/>
                    <button id="run" onClick={this.RunQuery}>Run</button>
                </div>
                <pre style={{textAlign: "left", marginTop: 0, flex: "1 1 auto", overflow: "auto"}}><div id="output" style={{maxHeight: "700px", overflow: "auto"}}/>{this.queryOutput}</pre>
            </div>
        );
    }
}