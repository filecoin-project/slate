import React, { Component } from "react";
import "./Chart.css";

//WIP - Circle creation function is not set up correctly. Polylines
//and ticks functions are not created. Dream set up is to have preset color
//classes in css that are dynamically assigned to new categories.

class CreateChart extends Component {
  //Function does not work. It should loop through
  //organizedData to pull x and y and category name
  //and then set those to the corrosponding attributes
  //to ultimately return a cluster of unique circle elements

  createCircles = () => {
    const { organizedData } = this.props;
    for (let group of organizedData) {
      for (let i = 0; i < group.length; i++) {
        let circles = group.map((g) => {
          let classN = g.category;
          let x = g.x;
          let y = g.y;
          console.log(g);
          return <circle cx={x} cy={y} r="2" className={classN} />;
        });
      }
    }
  };

  render() {
    const {
      minX,
      maxX,
      minY,
      maxY,
      ticks,
      xLabel,
      yLabel,
      organizedData,
    } = this.props;

    return (
      <div className="container">
        <svg className="graph" viewBox="0 0 600 600">
          {/*X Axis - could be made dynamic by allowing viewbox to be set by user or api*/}
          <g>
            <line className="x-line" x1="25" y1="550" x2="575" y2="550" />
          </g>
          <g>{this.createCircles()}</g>
        </svg>
      </div>
    );
  }
}

export default CreateChart;

