import * as React from "react";

import HardChart from "~/components/stats/HardChart";
import Chart from "~/components/stats/Chart";

const mockData = [
  { id: 1, date: "December 17, 1995 03:24:00", category: "1", value: 100 },
  { id: 2, date: "December 17, 2000 03:24:00", category: "1", value: 150 },
  { id: 3, date: "December 17, 2005 03:24:00", category: "1", value: 200 },
  { id: 4, date: "December 17, 2007 03:24:00", category: "1", value: 100 },
  { id: 5, date: "December 17, 2008 03:24:00", category: "1", value: 250 },
  { id: 6, date: "December 17, 2010 03:24:00", category: "1", value: 110 },
  { id: 7, date: "December 17, 1995 03:24:00", category: "2", value: 150 },
  { id: 8, date: "December 17, 2000 03:24:00", category: "2", value: 200 },
  { id: 9, date: "December 17, 2005 03:24:00", category: "2", value: 100 },
  { id: 10, date: "December 17, 2010 03:24:00", category: "2", value: 150 },
  { id: 11, date: "December 17, 1995 03:24:00", category: "3", value: 200 },
  { id: 12, date: "December 17, 2000 03:24:00", category: "3", value: 100 },
  { id: 13, date: "December 17, 2005 03:24:00", category: "3", value: 150 },
  { id: 14, date: "December 17, 2010 03:24:00", category: "3", value: 200 },
];

// Use this to determine how many tick marks to be written on X axis
const tickNumber = 4;

//Use this to choose how much of the chart is filled vertically displayMax = 500
const yCeiling = 400;

//Use this to choose how much of the chart is filled horizontally displayMax = 550
const xWall = 500;

function ChartParent() {
  return (
    <React.Fragment>
      {/*<HardChart />*/}
      <Chart
            data={mockData}
            maxTicks={tickNumber}
            yCeiling={yCeiling}
            xWall={xWall}
          />
    </React.Fragment>
  );
}

export default ChartParent;
