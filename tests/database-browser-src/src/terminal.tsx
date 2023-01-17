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

    @observable private queryOutput: any[] | string = [];
    @observable private stats: SqliteStats | null = null;
    @observable private lastUpdated: number | null = null;

    constructor(vfs: any) {
        super(vfs);
        this.worker = vfs.worker;
        this.db = vfs.db;
        this.dbConfig = vfs.configs;

        this.RunQuery = this.RunQuery.bind(this);
        makeObservable(this);
    }

    // Runs a query against the connected database and updates the query output
    private async RunQuery() {
        const query = (document.getElementById("query") as HTMLTextAreaElement)?.value;
        this.queryOutput = "Loading...";
        let result = [];
        let rowCount = 0;
        try {
            result = await this.db?.query(query) as any[];
            rowCount = result.length;
        } catch(err: any) {
            result = err.message;
        }
        this.stats = (await this.worker?.getStats()) || null;
        if(this.stats) {
            this.stats.rowsReturned = rowCount;
        }
        this.queryOutput = result;
    }

    render() {
        return (
            <div style={{display: "Flex", flexFlow: "column", height: "100%", overflow: "scroll"}}>
                <div id="terminal" style={{ padding: "15px", background: "#151515" }}>
                    <textarea id="query" style={{ width: "400px", height: "100px" }} defaultValue="select * from card_diff"></textarea><br/>
                    <button id="run" onClick={this.RunQuery}>Run</button>
                </div>
                <div style={{padding: "10px"}}>{this.stats ? <div>
                    Database stats: fetched {formatBytes(this.stats.totalFetchedBytes)} in{" "}
                    {this.stats.totalRequests} requests (DB size: {formatBytes(this.stats.totalBytes)}){this.stats.rowsReturned !== undefined ? " | " + this.stats.rowsReturned + " rows returned" : ""}
                  </div> : ""}</div>
                {typeof this.queryOutput === 'string' ? <h2 style={{padding: "10px"}}>{this.queryOutput}</h2> : 
                <table style={{textAlign: "left", marginTop: 0, flex: "1 1 auto", overflow: "auto"}}>
                    <tbody>
                    <tr style={{position: "sticky", top: 0, background: "#151515"}}>{Object.keys(this.queryOutput[0] ?? []).map(h => (<th key={"header-"+h}>{h}</th>))}</tr>
                    {this.queryOutput?.map((item: any) => (<tr key={"row-"+item.id}>{Object.keys(item).map((key: any) => (<td key={key + item['id']}>{item[key]}</td>))}</tr>))}
                    </tbody>
                </table> }
            </div>
        );
    }
}

// The sqlite stats, tracks all requests from init
type SqliteStats = {
    filename: string;
    totalBytes: number;
    totalFetchedBytes: number;
    totalRequests: number;
    rowsReturned?: number;
};

// Converts the bytes transfered to human readible values
function formatBytes(b: number) {
    if (b > 1e6) {
        return (b / 1e6).toFixed(2) + "MB";
    }
    if (b > 1e3) {
        return (b / 1e3).toFixed(2) + "KB";
    }
    return b + "B";
}