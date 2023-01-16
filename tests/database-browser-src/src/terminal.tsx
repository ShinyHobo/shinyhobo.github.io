import React from "react";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { SqliteWorker } from "sql.js-httpvfs";
import { LazyHttpDatabase, SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";


export default class Terminal extends React.Component {
    private db: Comlink.Remote<LazyHttpDatabase> | null = null;
    private worker: SqliteWorker | null = null;
    private dbConfig: SplitFileConfig[] | null = null;

    //queryOutput: string = "";

    constructor(vfs: any) {
        super(vfs);
        this.worker = vfs.worker;
        this.db = vfs.db;
        this.dbConfig = vfs.configs;

        this.RunQuery = this.RunQuery.bind(this);
        console.log("terminal con", vfs);
        //makeObservable(this);
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
        let stats = await this.worker?.getStats()
        let something = this.dbConfig;
        console.log(something);
        var output = document.getElementById("output");
        //if(output) {
            //output.innerText = result;
        //}
    }

    render() {
        return (
            <div>
                <div id="terminal" style={{ textAlign: "center" }}>
                    <textarea id="query" style={{ width: "400px", height: "100px" }}></textarea><br/>
                    <button id="run" onClick={this.RunQuery}>Run</button>
                    <pre><div id="output" style={{maxHeight: "700px", overflow: "auto", textAlign: "left"}}/></pre>
                </div>
            </div>
        );
    }
}