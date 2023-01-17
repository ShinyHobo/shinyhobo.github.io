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
        let result = "";
        let resultRaw = [];
        try {
            result = JSON.stringify(await this.db?.query(query), null, 2);
            resultRaw = await this.db?.query(query) as any[];
        } catch(err: any) {
            console.log("err", err);
            result = err.message;
        }
        this.stats = (await this.worker?.getStats()) || null;
        let something = this.dbConfig;
        console.log(something);
        this.queryOutput = resultRaw;
    }

    render() {
        return (
            <div style={{display: "Flex", flexFlow: "column", height: "100%"}}>
                <div id="terminal" style={{ textAlign: "center", position: "sticky", top: 0, background: "#151515" }}>
                    <textarea id="query" style={{ width: "400px", height: "100px" }} defaultValue="select * from card_diff"></textarea><br/>
                    <button id="run" onClick={this.RunQuery}>Run</button>
                </div>
                {/* <pre style={{textAlign: "left", marginTop: 0, flex: "1 1 auto", overflow: "auto"}}><div id="output" style={{maxHeight: "700px", overflow: "auto"}}/>{this.queryOutput}</pre> */}
                <table style={{textAlign: "left", marginTop: 0, flex: "1 1 auto", overflow: "auto"}}>
                    <tr>{Object.keys(this.queryOutput[0] ?? []).map(h => (<th>{h}</th>))}</tr>
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