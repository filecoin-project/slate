import React, { Component } from "react";
import HardChart from "./HardChart";
import Chart from "./Chart";

const MOCKDATA = [
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

const STYLE_CONTAINER = {
  width: "100%",
  height: "600px",
  width: "600px",
};

function ChartParent() {
  return (
    <div style={STYLE_CONTAINER}>
      <HardChart />
      <div className="chart-container">
        <Chart data={MOCKDATA} />
      </div>
    </div>
  );
}

export default ChartParent;
