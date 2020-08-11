import * as React from "react";

import HardChart from "~/components/stats/HardChart";
import Chart from "~/components/stats/Chart";

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

function ChartParent() {
  return (
    <div>
      <HardChart />
      <div className="chart-container">
        <Chart data={MOCKDATA} />
      </div>
    </div>
  );
}

export default ChartParent;
