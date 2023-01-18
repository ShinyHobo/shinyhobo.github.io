import React from "react";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { SqliteWorker } from "sql.js-httpvfs";
import { LazyHttpDatabase, SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";
import { useVirtualizer } from '@tanstack/react-virtual';

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

    VirtualizedQueryResultsTable(input: any): JSX.Element {
        const parentRef = React.useRef();

        if(!input.queryOutput.length) {
            return (<>done</>)
        }

        const rowVirtualizer = useVirtualizer({
            count: input.queryOutput.length,
            getScrollElement: () => parentRef.current ?? null,
            estimateSize: () => 100,
            overscan: 5
        });

        return (
            <table 
                ref={parentRef as any}    
            style={{
                height: `200px`,
                width: `400px`,
                overflow: 'auto',
              }} >
                {/* <thead style={{position: "sticky", top: 0, background: "#151515"}}>
                    <tr>{Object.keys(input.queryOutput[0] ?? []).map(h => (<th key={"header-"+h}>{h}</th>))}</tr>
                </thead> */}
                <tbody style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}>
                    {rowVirtualizer.getVirtualItems()?.map((virtualRow) => (
                        <tr key={virtualRow.index} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}><td>asdf</td></tr>
                    )
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <div id="terminal" style={{ padding: "15px", background: "#151515" }}>
                    <textarea id="query" style={{ width: "400px", height: "100px" }} defaultValue="select * from card_diff"></textarea><br/>
                    <button id="run" onClick={this.RunQuery}>Run</button>
                </div>
                <div style={{padding: "10px"}}>{this.stats ? <div>
                    Database stats: fetched {formatBytes(this.stats.totalFetchedBytes)} in{" "}
                    {this.stats.totalRequests} requests (DB size: {formatBytes(this.stats.totalBytes)}){this.stats.rowsReturned !== undefined ? " | " + this.stats.rowsReturned + " rows returned" : ""}
                  </div> : ""}</div><br/>
                {/* {typeof this.queryOutput === 'string' ? <h2 style={{padding: "10px"}}>{this.queryOutput}</h2> : <this.VirtualizedQueryResultsTable queryOutput={this.queryOutput} />} */}
                {typeof this.queryOutput === 'string' ? <h2 style={{padding: "10px"}}>{this.queryOutput}</h2> : <RowVirtualizerFixed queryOutput={this.queryOutput }/>}
            </div>
        );
    }
}

function RowVirtualizerFixed({queryOutput}: {queryOutput: any[]}) {
    if(!queryOutput || !queryOutput.length) {
        return (<>nothing</>);
    }
    const parentRef = React.useRef() as any;
    const rowVirtualizer = useVirtualizer({
      count: queryOutput.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 35,
      overscan: 5,
    })
  
    return (
        <div
          ref={parentRef}
          className="List"
          style={{
            height: `200px`,
            width: `400px`,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.index}
                className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                Row {virtualRow.index}
              </div>
            ))}
          </div>
        </div>
    )
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