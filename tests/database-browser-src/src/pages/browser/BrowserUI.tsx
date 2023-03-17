import React from "react";
import { SqliteWorker } from "sql.js-httpvfs";
import { LazyHttpDatabase, SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";
import Terminal from "../../components/terminal"

export default class BrowserUI extends React.Component {
    private db: Comlink.Remote<LazyHttpDatabase> | null = null;
    private worker: SqliteWorker | null = null;
    private configs: SplitFileConfig[] | null = null;

    constructor(p: any) {
        super(p);
        this.db = p.db;
        this.configs = p.configs;
        this.worker = p.worker;
    }

    render() {
        const vfs = {
            db: this.db,
            worker: this.worker,
            configs: this.configs
        };
        return (<div id="terminal-container"><Terminal {...vfs}/></div>);
    }
}