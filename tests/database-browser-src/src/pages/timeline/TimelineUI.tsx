import React from "react";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { SqliteWorker } from "sql.js-httpvfs";
import { LazyHttpDatabase, SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";
import { createDbWorker } from "sql.js-httpvfs";
import { Timeline } from "../../components/timeline";

@observer
export default class TimelineUI extends React.Component {
    private db: Comlink.Remote<LazyHttpDatabase> | null = null;
    private worker: SqliteWorker | null = null;
    private configs: SplitFileConfig[] | null = null;

    @observable private loadingState: string = "Loading...";

    constructor(p: {}) {
        super(p);
        this.init();
        makeObservable(this);
    }

    async init() {
        this.loadingState = "Connecting to database...";
        const workerUrl = new URL(
            "sql.js-httpvfs/dist/sqlite.worker.js",
            import.meta.url
        );
        const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
          
        const vfs = await createDbWorker(
            [
              {
                from: "inline",
                config: {
                  serverMode: "full",
                  url: "/data/delta.db",
                  requestChunkSize: 4096,
                },
              },
            ],
            workerUrl.toString(),
            wasmUrl.toString()
        );

        try {
            this.worker = vfs.worker;
            this.db = vfs.db;
            this.configs = vfs.configs;
        } catch(err) {
            this.loadingState = "Failed to connect to database!";
            return;
        }
        
        this.loadingState = "";
    }

    render() {
        if (this.loadingState) return <div style={{padding: 10}}>{this.loadingState}</div>;
        const vfs = {
            db: this.db,
            worker: this.worker,
            configs: this.configs
        };
        return (<div><Timeline/></div>);
    }
}