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

    @observable queryOutput: any[] = [];//string = "";
    @observable private stats: SqliteStats | null = null;

    constructor(vfs: any) {
        super(vfs);
        this.worker = vfs.worker;
        this.db = vfs.db;
        this.dbConfig = vfs.configs;

        this.RunQuery = this.RunQuery.bind(this);
        makeObservable(this);
    }

    private interval: any = 0;
    componentDidMount() {
        this.interval = setInterval(async () => {
            this.stats = (await this.worker?.getStats()) || null;
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    private async RunQuery() {
        const query = (document.getElementById("query") as HTMLTextAreaElement)?.value;
        console.log(this.db);
        let resultRaw = [];
        try {
            resultRaw = await this.db?.query(query) as any[];
        } catch(err: any) {
            console.log("err", err);
        }
        this.stats = (await this.worker?.getStats()) || null;
        let something = this.dbConfig;
        console.log(something);
        this.queryOutput = resultRaw;
    }

    render() {
        return (
            <div style={{display: "Flex", flexFlow: "column", height: "100%", overflow: "scroll"}}>
                <div id="terminal" style={{ textAlign: "center", background: "#151515" }}>
                    <textarea id="query" style={{ width: "400px", height: "100px" }} defaultValue="select * from card_diff"></textarea><br/>
                    <button id="run" onClick={this.RunQuery}>Run</button>
                </div>
                <table style={{textAlign: "left", marginTop: 0, flex: "1 1 auto", overflow: "auto"}}>
                    <tr style={{position: "sticky", top: 0, background: "#151515"}}>{Object.keys(this.queryOutput[0] ?? []).map(h => (<th>{h}</th>))}</tr>
                    {this.queryOutput?.map((item: any) => (<tr>{Object.keys(item).map((key) => (<td>{item[key]}</td>))}</tr>))}
                </table>
            </div>
        );
    }
}

type SqliteStats = {
    filename: string;
    totalBytes: number;
    totalFetchedBytes: number;
    totalRequests: number;
};