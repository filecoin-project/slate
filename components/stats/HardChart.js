import React from "react";

const STYLES_CONTAINER = {
  width: "100%",
  height: "auto",
};

const STYLES_GRAPH = {
  viewBox: "0 0 600 600",
  // backgroundColor: "#f7f7f7",
  borderRadius: "4px",
  height: "600px",
  width: "600px",
};

const STYLES_XLINE = {
  stroke: "#b2b2b2",
  srokeWidth: "1",
  fill: "none",
};

const STYLES_LINE1 = {
  position: "relative",
  stroke: "#0047ff",
  fill: "none",
};

const STYLES_LINE2 = {
  position: "relative",
  stroke: "#1b1f23",
  fill: "none",
};

const STYLES_LINE3 = {
  position: "relative",
  stroke: "#ffc940",
  fill: "none",
};

const STYLES_CAT1 = {
  fontSize: "0.75em",
  fill: "#0047ff",
  stroke: "none",
};

const STYLES_CAT2 = {
  fontSize: "0.75em",
  fill: "#1b1f23",
  stroke: "none",
};

const STYLES_CAT3 = {
  fontSize: "0.75em",
  fill: "#ffc940",
  stroke: "none",
};

function HardChart() {
  return (
    <div style={STYLES_CONTAINER}>
      <svg style={STYLES_GRAPH}>
        {/*Circle Plots*/}
        <g>
          <circle cx="25" cy="540" r="2" style={STYLES_CAT1} />
          <circle cx="150" cy="500" r="2" style={STYLES_CAT1} />
          <circle cx="300" cy="490" r="2" style={STYLES_CAT1} />
          <circle cx="375" cy="350" r="2" style={STYLES_CAT1} />
          <circle cx="520" cy="200" r="2" style={STYLES_CAT1} />
          <circle cx="560" cy="10" r="2" style={STYLES_CAT1} />
          <circle cx="25" cy="480" r="2" style={STYLES_CAT2} />
          <circle cx="150" cy="420" r="2" style={STYLES_CAT2} />
          <circle cx="300" cy="300" r="2" style={STYLES_CAT2} />
          <circle cx="375" cy="250" r="2" style={STYLES_CAT2} />
          <circle cx="520" cy="275" r="2" style={STYLES_CAT2} />
          <circle cx="560" cy="300" r="2" style={STYLES_CAT2} />
          <circle cx="25" cy="300" r="2" style={STYLES_CAT3} />
          <circle cx="150" cy="350" r="2" style={STYLES_CAT3} />
          <circle cx="300" cy="325" r="2" style={STYLES_CAT3} />
          <circle cx="375" cy="375" r="2" style={STYLES_CAT3} />
          <circle cx="520" cy="400" r="2" style={STYLES_CAT3} />
          <circle cx="560" cy="420" r="2" style={STYLES_CAT3} />
        </g>
        {/*Connected Line Plots*/}
        <g>
          <polyline
            style={STYLES_LINE1}
            points="25,540 150,500 300,490 375,350 520,200 560,10"
          >
            <title>Category 1</title>
          </polyline>
          <polyline
            style={STYLES_LINE2}
            points="25,480 150,420 300,300 375,250 520,275 560,300"
          >
            <title>Category 2</title>
          </polyline>
          <polyline
            style={STYLES_LINE3}
            points="25,300 150,350 300,325 375,375 520,400 560,420"
          >
            <title>Category 3</title>
          </polyline>
        </g>
        {/* Alt Configuration - Show Straight Lines connecting first/last plots
          <g>
            <line x1="10" y1="90" x2="190" y2="10" stroke="gray" />
            <line x1="10" y1="20" x2="190" y2="70" stroke="gray" />
            <line x1="10" y1="50" x2="190" y2="30" stroke="gray" />
          </g>
          */}
        {/*X Axis Line*/}
        <g>
          <line style={STYLES_XLINE} x1="25" y1="550" x2="575" y2="550" />
        </g>
        {/*X Axis Tick Marks*/}
        <g>
          <line style={STYLES_XLINE} x1="75" y1="550" x2="75" y2="560" />
          <text className="chart-text" textAnchor="middle" x="75" y="575">
            Sep 2017
          </text>
          <line style={STYLES_XLINE} x1="225" y1="550" x2="225" y2="560" />
          <text className="chart-text" textAnchor="middle" x="225" y="575">
            Jun 2018
          </text>
          <line style={STYLES_XLINE} x1="375" y1="550" x2="375" y2="560" />
          <text className="chart-text" textAnchor="middle" x="375" y="575">
            Mar 2019
          </text>
          <line style={STYLES_XLINE} x1="525" y1="550" x2="525" y2="560" />
          <text className="chart-text" textAnchor="middle" x="525" y="575">
            Dec 2019
          </text>
        </g>
        {/* Alt Configuration - Show Legend
          <g>
            <polyline
              points=" 215,100 215,40 285,40 285,100 215,100"
              stroke="#b2b2b2"
              fill="none"
            />
            <text className="STYLES_CAT1" text-anchor="middle" x="250" y="60">
              Category 1
            </text>
            <text className="STYLES_CAT2" text-anchor="middle" x="250" y="75">
              Category 2
            </text>
            <text className="STYLES_CAT3" text-anchor="middle" x="250" y="90">
              Category 3
            </text>
          </g>
          */}
      </svg>
    </div>
  );
}

// const chartText = {
//   fontSize: "0.9em",
//   fill: "#b2b2b2",
//   stroke: "none",
// };

export default HardChart;
