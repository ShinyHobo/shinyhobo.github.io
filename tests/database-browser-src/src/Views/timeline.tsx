import testData from "../TestData";
import React from "react";
import { de } from "date-fns/locale";
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
  TooltipPositionerMap,
  ChartOptions
} from "chart.js";

import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-adapter-date-fns";

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

interface CustomTooltip extends TooltipPositionerMap {
  custom: any;
}

(Tooltip.positioners as CustomTooltip).custom = (elements: any, eventPosition: any) => {
  return {
    x: eventPosition.x,
    y: eventPosition.y
  };
};

interface StackData {
  Stack: string;
  LastDate: Date;
}

const labels = [...new Set(testData.map((event) => event.EventSource))];

const eventNames = [...new Set(testData.map((event) => event.EventName))];
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

const sortedData = testData.sort(
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
    data: data,
    skipNull: true,
    backgroundColor: eventColors[eventNames.indexOf(event.EventName)],
    stack: event.EventSource + "_" + stack.Stack,
    datalabels: {
      formatter: () => event.EventName
    }
  };
});

const data = {
  labels,
  datasets: datasets
};

export const options: ChartOptions<"bar"> = {
  indexAxis: "y" as const,
  plugins: {
    tooltip: {
      callbacks: {
        title: () => "",
        afterBody: (items) =>
          data.datasets[items[0].datasetIndex].data[items[0].dataIndex][2],
        label: (item) => data.datasets[item.datasetIndex].label
      },
      position: "custom" as "average"
    },
    legend: {
      display: false
    },
    datalabels: {
      color: "black",
      anchor: "start",
      align: "right",
      display: (context: any) => {
        return context.dataset.data[context.dataIndex] !== null
          ? "auto"
          : false;
      },
      font: function (context: any) {
        var width = context.chart.width;
        var size = width / 100;
        return {
          weight: "bold",
          size: size
        };
      }
    }
  },
  scales: {
    x: {
      min: Math.min(...testData.map((event) => event.Start.getTime())),
      max: Math.max(...testData.map((event) => event.End.getTime())),
      ticks: {
        maxTicksLimit: 10,
        color: "white",
      },
      type: "time",
      time: {
        displayFormats: {
          millisecond: "HH:mm:ss.SSS",
          second: "yyyy-MM-dd HH:mm:ss.SSS",
          minute: "yyyy-MM-dd HH:mm:ss.SSS",
          hour: "yyyy-MM-dd HH:mm:ss.SSS",
          day: "yyyy-MM-dd HH:mm:ss.SSS",
          week: "yyyy-MM-dd HH:mm:ss.SSS",
          month: "yyyy-MM-dd HH:mm:ss.SSS",
          quarter: "yyyy-MM-dd HH:mm:ss.SSS",
          year: "yyyy-MM-dd HH:mm:ss.SSS"
        },
        unit: "millisecond"
      },
      adapters: {
        date: {
          locale: de
        }
      },
      stacked: true
    },
    y: {
      stacked: true,
      ticks: {
        color: "white",
        font: {
          size: 20
        }
      }
    }
  }
};

export function Timeline() {
  return (<Bar options={options} data={data} />);
}