import * as React from "react";
import * as Constants from "~/common/constants";
import ReactDOM from "react-dom";

import { css } from "@emotion/core";

const STYLES_GRAPH_CONTAINER = css`
  display: flex;
`;

const STYLES_GRAPH = css`
  height: 600px;
  margin: auto;
`;

const STYLES_X_LINE = css`
  stroke: ${Constants.system.black};
`;

const STYLES_CHART_CIRCLE = css`
  stroke: none;
  fill: ${Constants.system.brand};
`;

const STYLES_CHART_LINE = css`
  stroke: ${Constants.system.brand};
  fill: none;
`;

const STYLES_CHART_TEXT = css`
  fill: ${Constants.system.black};
`;

export default class CreateChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.createLines();
    this.createCircles();
    this.createTicks();
  }

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  createCircles = () => {
    const { organizedData } = this.props;
    let oData = organizedData.flat(2);
    let allCircles = oData.map((g, index) => {
      return <circle key={index} cx={g.x} cy={g.y} r="2" css={STYLES_CHART_CIRCLE} />;
    });
    ReactDOM.render(allCircles, document.getElementById("circles"));
  };

  createLines = () => {
    const { organizedData } = this.props;

    if (organizedData.length) {
      let allLines = [];
      for (let groups of organizedData) {
        for (let group of groups) {
          let polyLines = this.loopData(group);
          allLines.push(polyLines);
        }

        ReactDOM.render(allLines, document.getElementById("lines"));
      }
    }
  };

  loopData = (g) => {
    let coordinates = [];
    let i = {};
    console.log(g);
    g.map((o, index) => {
      coordinates.push(o.x);
      coordinates.push(o.y);
      i[`id`] = o.id;
    });
    let polyLine = (
      <polyline css={STYLES_CHART_LINE} key={i.id} points={this.drawPoints(coordinates)} />
    );
    return polyLine;
  };

  drawPoints = (a) => {
    const c = a.toString();
    const regex = /([0-9]+),\s([0-9]+),\s/g;
    const cOrganized = c.replace(regex, "$1,$2 ");
    return cOrganized;
  };

  createTicks = () => {
    const { ticks } = this.props;
    const fTicks = ticks.flat(1);
    const tickLines = [];

    for (let tick of fTicks) {
      const tDate = new Date(tick.date);
      const month = this.monthNames[tDate.getMonth()];
      const year = tDate.getUTCFullYear();

      let tickLine = (
        <g>
          <line css={STYLES_X_LINE} x1={tick.x} y1="550" x2={tick.x} y2="560" />
          <text css={STYLES_CHART_TEXT} textAnchor="middle" x={tick.x} y="575">
            {`${month} ${year}`}
          </text>
        </g>
      );
      tickLines.push(tickLine);
    }
    ReactDOM.render(tickLines, document.getElementById("tickContainer"));
  };

  render() {
    return (
      <div css={STYLES_GRAPH_CONTAINER}>
        <svg css={STYLES_GRAPH} viewBox="0 0 600 600">
          <g id="circles" />
          <g id="lines" />
          <g>
            <line css={STYLES_X_LINE} x1="25" y1="550" x2="575" y2="550" />
          </g>
          <g id="tickContainer" />
        </svg>
      </div>
    );
  }
}
