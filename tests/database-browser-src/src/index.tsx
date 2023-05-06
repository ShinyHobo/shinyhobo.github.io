import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import BrowserUI from "./pages/browser/BrowserUI";
import TimelineUI from "./pages/timeline/TimelineUI";
import Layout from "./Layout";

import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { SqliteWorker } from "sql.js-httpvfs";
import { LazyHttpDatabase, SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";
import { createDbWorker } from "sql.js-httpvfs";

@observer
export default class App extends React.Component {
    private db: Comlink.Remote<LazyHttpDatabase> | null = null;
    private worker: SqliteWorker | null = null;
    private configs: SplitFileConfig[] | null = null;

    @observable private loadingState: string = "Loading...";

    constructor(p: {}) {
        super(p);
        this.init();
        makeObservable(this);
    }

    // initializes the virtual file system web worker and opens the database connection
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
                  requestChunkSize: 65536//16384//4096
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
      return (
        <div>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="browser" element={<BrowserUI {...vfs}/>} />
                <Route path="timeline" element={<TimelineUI {...vfs}/>} />
              </Route>
            </Routes>
          </HashRouter>
        </div>
      );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);