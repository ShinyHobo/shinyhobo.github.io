import React from "react";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { SqliteWorker } from "sql.js-httpvfs";
import { SplitFileConfig } from "sql.js-httpvfs/dist/sqlite.worker";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMeasure } from '@react-hookz/web/esm';
import { SqliteStats, Database, CommonDBFunctions } from "../utils/database-helpers";

// The query terminal for accessing the database with sqlite commands
@observer
export default class Terminal extends React.Component {
    private db: Database = null;
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

        document.body.style.overflowX = "hidden";

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
          <>
            <div>
              <div id="terminal" style={{ padding: "15px", background: "#151515" }}>
                  <textarea id="query" style={{ width: "400px", height: "100px" }} defaultValue="select * from card_diff"></textarea><br/>
                  <button id="run" onClick={this.RunQuery}>Run</button>
              </div>
              <h5 style={{padding: "10px"}}>
                {this.stats ? 
                <div>
                  Fetched {CommonDBFunctions.formatBytes(this.stats.totalFetchedBytes)} in{" "}
                  {this.stats.totalRequests} requests (DB size: {CommonDBFunctions.formatBytes(this.stats.totalBytes)}){this.stats.rowsReturned !== undefined ? " | " + this.stats.rowsReturned + " rows returned" : ""}
                </div>
                : <></>}
              </h5>
            </div>
            <div id="query-results" style={{height: "100%", display: "flex", flexDirection: "column", width: "100%", overflowX: "auto", scrollbarWidth: "thin"}}>
              {typeof this.queryOutput === 'string' || !this.queryOutput.length ? <h2 style={{padding: "10px"}}>{this.queryOutput}</h2> : <VirtualQueryResultsTable data={this.queryOutput}/>}
            </div>
          </>
        );
    }
}

// Renders the query results as a virtual table
function VirtualQueryResultsTable({data}: {data: any[]}): JSX.Element {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [theadSize, theadRef] = useMeasure<HTMLTableSectionElement>();

  const rowHeight = 100;
  const maxSize = 8500000; // firefox stops rendering sometime after this
  let tooLarge = 0;
  if(rowHeight * data.length > maxSize) {
    const truncatedSize = maxSize / rowHeight;
    tooLarge = data.length - truncatedSize;
    data = data.slice(0, truncatedSize);
  }
  
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: React.useCallback(() => 100, []),
    overscan: 5,
    paddingStart: theadSize?.height ?? 0,
    scrollPaddingStart: theadSize?.height ?? 0,
  });

  return (
    <>
      {tooLarge ? (<h3 style={{padding: 10}}>Query too large to render. {tooLarge} items have been truncated.</h3>) : (<></>) }
      <div ref={parentRef} className="List">
        <table style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', direction: 'ltr' }}>
          <thead ref={theadRef}>
          <tr style={{position: "sticky", top: 0, background: "#151515"}}>{Object.keys(data[0] ?? []).map(h => (<th key={h} style={{width: calculateColumnWidth(h)}}>{h}</th>))}</tr>
          </thead>
          <tbody>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <tr
                key={virtualRow.index}
                className={ virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven' }
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {Object.keys(data[virtualRow.index]).map((key: any) => (
                  <td style={{width: calculateColumnWidth(key), scrollbarWidth: "thin", wordBreak: "break-word"}} key={key + data[virtualRow.index]['id']}>{data[virtualRow.index][key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Manually setting column widths
function calculateColumnWidth(columnName: string) {
  switch(columnName) {
    case "id":
    case "tid":
      return 60;
    case "release_id":
      return 120;
    case "description":
    case "thumbnail":
    case "uuid":
      return 425;
    case "startDate":
    case "endDate":
    case "addedDate":
    case "updateDate":
    case "release_title":
      return 130;
    case "partialTime":
    case "team_id":
      return 115;
    default: 
      return 200;
  }
}