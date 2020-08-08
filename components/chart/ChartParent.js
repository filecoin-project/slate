import React, { Component } from "react";
import HardChart from "./HardChart";
import Chart from "./Chart";
import { autoUpdater } from "electron";

const mockData = [
  { date: "December 17, 1995 03:24:00", category: "1", value: 100 },
  { date: "December 17, 2000 03:24:00", category: "1", value: 150 },
  { date: "December 17, 2005 03:24:00", category: "1", value: 200 },
  { date: "December 17, 2010 03:24:00", category: "1", value: 100 },
  { date: "December 17, 2015 03:24:00", category: "2", value: 150 },
  { date: "December 17, 2020 03:24:00", category: "2", value: 200 },
  { date: "December 17, 2025 03:24:00", category: "2", value: 100 },
  { date: "December 17, 2030 03:24:00", category: "2", value: 150 },
  { date: "December 17, 2035 03:24:00", category: "3", value: 200 },
  { date: "December 17, 2040 03:24:00", category: "3", value: 100 },
  { date: "December 17, 2045 03:24:00", category: "3", value: 150 },
  { date: "December 17, 2050 03:24:00", category: "3", value: 200 },
];

function ChartParent() {
  return (
      <div style={container}>
          <HardChart />
        {/*<div className="chart-container">
          <Chart data={mockData} />
        </div> */}
      </div>
  );
}

const container = {
    width: "100%",
    height: "auto"
}


export default ChartParent;