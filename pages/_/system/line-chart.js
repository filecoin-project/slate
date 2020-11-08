import * as React from "react";
import * as System from "~/components/system";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";
import Chart from "~/components/stats/Chart";

const data = [
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

export default class SystemPageLineCharts extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Line Chart"
        description="..."
        url="https://fps.onrender.com/system/line-chart"
      >
        <System.H1>
          Line Chart <ViewSourceLink file="system/line-chart.js" />
        </System.H1>
        <br />
        <br />

        <System.P>
          The Line Chart component displays categories of data points on a line chart.
        </System.P>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Create an array of data.</System.P>
        <br />
        <CodeBlock>{`
const data = [
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
`}</CodeBlock>
        <br />
        <System.P>Configure chart layout.</System.P>
        <br />
        <CodeBlock>{`// Use this to determine how many tick marks to be written on X axis
const tickNumber = 4;

//Use this to choose how much of the chart is filled vertically displayMax = 500
const yCeiling = 400;

//Use this to choose how much of the chart is filled horizontally displayMax = 550
const xWall = 500;`}</CodeBlock>
        <br />
        <System.P>Declare the LineChart component.</System.P>
        <br />
        <CodeBlock>{`
<Chart 
  data={data} 
  maxTicks={tickNumber} 
  yCeiling={yCeiling} 
  xWall={xWall} 
/>`}</CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <Chart data={data} maxTicks={tickNumber} yCeiling={yCeiling} xWall={xWall} />
        <hr />
        <br />
        <br />
        <br />
        <System.H2>Props</System.H2>
        <hr />
        <br />
        <Group title="LineChart">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "data",
                  b: "array",
                  c: "null",
                  d: "The value listed in the header of the LineChart",
                },
                {
                  id: 2,
                  a: "maxTicks",
                  b: "number",
                  c: "null",
                  d: "Determine how many tick marks to be written on X axis",
                },
                {
                  id: 3,
                  a: "yCeiling",
                  b: "number",
                  c: "null",
                  d: "Choose how much of the chart is filled vertically",
                },
                {
                  id: 3,
                  a: "xWall",
                  b: "number",
                  c: "null",
                  d: "Choose how much of the chart is filled horizontally",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
