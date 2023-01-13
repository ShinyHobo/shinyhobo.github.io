import { WorkerHttpvfs } from "sql.js-httpvfs";
import { LazyHttpDatabase } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";

export default class Terminal {
    db: Comlink.Remote<LazyHttpDatabase>;

    constructor(worker: WorkerHttpvfs) {
        this.db = worker.db;
    }

    public run() {
        document.getElementById("loading")?.remove();
        document.getElementById("run")?.addEventListener("click", () => this.RunQuery());
        let terminal = document.getElementById("terminal");
        if(terminal) {
            terminal.style.display = 'block';
        }
    }

    private async RunQuery() {
        const query = (document.getElementById("query") as HTMLTextAreaElement)?.value;
        let result = "";
        try {
            result = JSON.stringify(await this.db.query(query), null, 2);
        } catch(err: any) {
            result = err.message;
        }
        var output = document.getElementById("output");
        if(output) {
            output.innerText = result;
        }
    }
}