import React from "react";
import { CommonDBFunctions, Database, SqliteStats } from "../utils/database-helpers";
import _ from "lodash";
import * as he from 'he';
import { SqliteWorker } from "sql.js-httpvfs";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";

import { format } from "date-fns";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions
} from "chart.js";

import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-adapter-date-fns";
import { useSearchParams } from "react-router-dom";

@observer
export default class Timeline2 extends React.Component {
    private db: Database= null;
    private worker: SqliteWorker | null = null;

    @observable private working: boolean = true;
    private data: any;
    private options!: ChartOptions<"bar">;
    @observable private height: number = 100;
    private testData: any[] = [];
    private take: number = 20;
    private skip: number = 0;

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;
        this.worker = vfs.worker;

        this.working = true;

        makeObservable(this);

        ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend,
            ChartDataLabels,
            TimeScale
        );

        const params = window.location.hash.split('?');
        if(params.length > 1) {
            const queryParameters = new URLSearchParams(params[1]);
            this.skip = Number.parseInt(queryParameters.get("skip") ?? "0");
        }

        this.loadData();
    }

    loadData() {
        this.working = true;
        this.testData = [];
        CommonDBFunctions.getDeltaList(this.db).then(deltas => {
            //CommonDBFunctions.getClosestDeltaDate(this.db, deltas[0]).then(r => {
            //    console.info(r);
            //});
            console.info("starting deliverable builds");
            let now: number = Date.now();
            Promise.all([CommonDBFunctions.buildCompleteDeliverables(this.db, deltas[0],this.take,this.skip)]).then(async data => {
                let stats = await this.worker?.getStats() as SqliteStats;
                console.info("fetched: ", CommonDBFunctions.formatBytes(stats.totalFetchedBytes));
                console.info("total: ", CommonDBFunctions.formatBytes(stats.totalBytes));
                console.info("time: ", (Date.now() - now) / 1000, " seconds");

                data[0].forEach((deliverable: any)=> {
                    if(deliverable.teams) {
                        deliverable.teams.forEach((team: any) => {
                            if(team.timeAllocations) {
    
                                // group by start/end date composit to determine number of tasks per time period
                                //let sprints = _.chain(_.groupBy(team.timeAllocations, time => [time.startDate, time.endDate].join())).map((v:any)=>v).value();

                                let timeAllocations = team.timeAllocations.sort((a:any,b:any)=>a.startDate - b.startDate);
                                let disciplines = _.chain(_.groupBy(timeAllocations, time => [time.discipline_id, time.deliverable_id, time.team_id].join())).map((v:any)=>v).value();

                                disciplines.forEach((discipline: any) => {
                                    let returnRanges = [];
                                    let currentRange: any= null;
                                    discipline.forEach((r:any) => {
                                        // bypass invalid value
                                        if (r.startDate >= r.endDate) {
                                            return;
                                        }
                                        //fill in the first element
                                        if (!currentRange) {
                                            currentRange = r;
                                            return;
                                        }
    
                                        const currentEndDate = new Date(currentRange.endDate);
                                        currentEndDate.setDate(currentEndDate.getDate() + 4); // covers time overlap when sprint ends on a weekend
                                        const currentEndTime = currentEndDate.getTime();
    
                                        if (currentEndTime < r.startDate) {
                                            returnRanges.push(currentRange);
                                            currentRange = r;
                                        } else if (currentRange.endDate < r.endDate) {
                                            currentRange.endDate = r.endDate;
                                            currentRange.partTime = typeof currentRange.partTime == 'number' ? currentRange.partTime : 0;
                                            currentRange.fullTime = typeof currentRange.fullTime == 'number' ? currentRange.fullTime : 0;
                                            currentRange.partTime += r.partialTime;
                                            currentRange.fullTime += Math.abs(1 - r.partialTime);
                                        }
                                    });
    
                                    if(currentRange) {
                                        returnRanges.push(currentRange);
                                    }
    
                                    returnRanges.forEach((time: any) => {
                                        let titleArr: string[] = deliverable.title.match(/\S.{1,20}(?=\s|$)/g);
                                        let title = titleArr.length > 1 ? titleArr[0] + "..." : titleArr[0];
                                        //let title = deliverable.title;
                                        if(title === 'Unannounced') {
                                            title = deliverable.description;
                                        }
                                        const event: Event = {
                                            EventName: time.partialTime === 0 ? "Full-time" : time.partialTime === 1 ? "Part-time" : "Unscheduled",
                                            EventSource: `(${deliverable.slug}) ${he.unescape(title)}`,//title,
                                            Discipline: `${team.abbreviation} (${time.title})`,
                                            Start: new Date(time.startDate),
                                            End: new Date(time.endDate),
                                        };
                                        this.testData.push(event);
                                    });
                                });
                            }
                        });
                    }
                });

                console.info("events loaded");
                this.loadChart();
            });
        });

        class Event {
            EventName: string = "";
            EventSource: string = "";
            Discipline: string = "";
            Start: Date = new Date;
            End: Date = new Date();
        }
    }

    loadChart() {
        let data = this.testData;

        // const labels = [...new Set(testData.map((data) => data.EventSource.length > 20 ? 
        //     data.EventSource.match(/\S.{1,20}(?=\s|$)/g) : data.EventSource))];
        const labels = [...new Set(data.map((data) => data.EventSource))];
        const eventNames = ["Full-time", "Part-time", "Unscheduled", "Dev specific time (full)", "Dev specific time (part)", "Dev specific time (unscheduled)"];
        const eventColors = eventNames
            .map((val, i) => {
            switch(val) {
                case "Full-time":
                    return "green";
                case "Part-time":
                    return "orange";
                case "Unscheduled":
                    return "red";
                case "Dev specific time (part)":
                    return "yellow";
                case "Dev specific time (full)":
                    return "cyan";
                default:
                    return "black";
            }
            });
        
        const labelGrouping: StackData[][] = [];
        
        const sortedData = data.sort(
            (a, b) => a.Start.getTime() - b.Start.getTime()
        );

        const datasets = sortedData.map((event: any) => {
            let start = event.Start.getTime();
            let end = event.End.getTime();
            
            let stack: StackData | undefined = undefined;
            let firstStackEntry: boolean = false;
            
            if (labelGrouping[event.EventSource] === undefined) {
                stack = { Stack: "Stack0", LastDate: event.End };
                labelGrouping[event.EventSource] = [stack];
                firstStackEntry = true;
            } else {
                labelGrouping[event.EventSource].forEach((item, index) => {
                if (
                    stack === undefined &&
                    item.LastDate.getTime() <= event.Start.getTime()
                ) {
                    stack = { ...item };
                    item.LastDate = event.End;
                }
                });
                if (stack === undefined) {
                const stackIndex = labelGrouping[event.EventSource].length;
                stack = { Stack: "Stack" + stackIndex, LastDate: event.End };
                labelGrouping[event.EventSource].push(stack);
                firstStackEntry = true;
                }
            }
            
            let data: any[] = labels.map(() => null);
            
            if (!firstStackEntry) {
                start -= stack.LastDate.getTime();
                end -= stack.LastDate.getTime();
            }
            data[labels.indexOf(event.EventSource)] = [
                start,
                end,
                format(event.Start, "HH:mm:ss.SSS") +
                " - " +
                format(event.End, "hh:mm:ss.SSS")
            ];
            
            return {
                label: event.EventName,
                team_info: event.Discipline,
                data: data,
                skipNull: true,
                backgroundColor: eventColors[eventNames.indexOf(event.EventName)],
                stack: event.EventSource + "_" + stack.Stack,
                datalabels: {
                    formatter: () => event.EventName
                }
            };
            });
            
        this.data = {
            labels,
            datasets: datasets
        };

        this.options = {
            maintainAspectRatio: false,
            indexAxis: "y" as const,
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: function(tooltipItem:any) {
                            return tooltipItem[0].dataset.team_info;
                        },
                        label: function(tootltipItem:any) {
                            return tootltipItem.dataset.label;
                        }
                    },
                },
                legend: {
                    display: false
                },
                datalabels: {
                    color: "black",
                    anchor: "start",
                    align: "right",
                    display: false,
                    font: {
                        weight: "bold",
                        size: 20
                    }
                }
            },
            
            scales: {
                x: {
                    min: Math.min(Date.parse("2021-01-01")),
                    max: Math.max(Date.parse("2023-12-31")),
                    ticks: {
                        maxTicksLimit: 24,
                        color: "white",
                    },
                    type: "time",
                    time: {
                        displayFormats: {
                        millisecond: "HH:mm:ss.SSS",
                        second: "yyyy-MM-dd HH:mm:ss.SSS",
                        minute: "yyyy-MM-dd HH:mm:ss.SSS",
                        hour: "yyyy-MM-dd HH:mm:ss.SSS",
                        day: "yyyy-MM-dd",
                        week: "yyyy-MM-dd HH:mm:ss.SSS",
                        month: "yyyy-MM-dd HH:mm:ss.SSS",
                        quarter: "yyyy-MM-dd HH:mm:ss.SSS",
                        year: "yyyy-MM-dd HH:mm:ss.SSS"
                        },
                        unit: "day"
                    },
                    stacked: true
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: "white",
                        font: {
                            size: 20
                        },
                    }
                }
            },
            animation: false
        };

        console.info("data loaded:",this.data);

        this.height = 60 * labels.length;

        this.working = false;

        interface StackData {
            Stack: string;
            LastDate: Date;
        }
    }

    private previous() {
        this.skip -= this.take;
        this.skip = this.skip < 0 ? 0 : this.skip;
        console.info("prev", this.skip);
        window.history.replaceState('','',this.updateURLParameter(window.location.href,"skip",this.skip.toString()));
        this.loadData();
    }

    private next() {
        this.skip += this.take;
        console.info("next", this.skip);
        window.history.replaceState('','',this.updateURLParameter(window.location.href,"skip",this.skip.toString()));
        this.loadData();
    }

    // Updates the url parameters
    updateURLParameter(url: string, param: string, paramVal: string)
    {
        var TheAnchor = null;
        var newAdditionalURL = "";
        var tempArray = url.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";

        if (additionalURL) 
        {
            var tmpAnchor = additionalURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor = tmpAnchor[1];
            if(TheAnchor)
                additionalURL = TheParams;

            tempArray = additionalURL.split("&");

            for (var i=0; i<tempArray.length; i++)
            {
                if(tempArray[i].split('=')[0] != param)
                {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }        
        }
        else
        {
            var tmpAnchor = baseURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor  = tmpAnchor[1];

            if(TheParams)
                baseURL = TheParams;
        }

        if(TheAnchor)
            baseURL  += "#" + TheAnchor;

        var rows_txt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rows_txt;
    }

    render() {
        return (
            <>
                <div>{this.working ? "Loading timeline..." : "Timeline loading complete."}</div>
                {!this.working ? 
                <div style={{ height: `${this.height}px` }}>
                    <button id="previous" onClick={this.previous.bind(this)}>previous</button>
                    <button id="next" onClick={this.next.bind(this)}>next</button>
                    <Bar options={this.options} data={this.data} />
                </div>
                : <></>}
            </>
        );
    }
}