import * as React from "react";
import CreateChart from "./CreateChart";

class Chart extends React.Component {
  state = {
    minX: {},
    maxX: {},
    minY: {},
    maxY: {},
    ticks: {},
    xLabel: {},
    yLabel: {},
    organizedData: [],
  };

  componentDidMount() {
    this.getXLabel();
    this.getYLabel();
    this.getMinX();
    this.getMaxX();
    this.getMinY();
    this.getMaxY();
    this.getTicks();
    this.sepCategories();
  }

  //Set Axis Labels
  getXLabel() {
    const { data } = this.props;
    let allLabels = Object.keys(data[0]);
    this.setState({
      xLabel: allLabels[0],
    });
  }

  getYLabel() {
    const { data } = this.props;
    let allLabels = Object.keys(data[0]);
    this.setState({
      yLabel: allLabels[2],
    });
  }

  //Get Min & Max X
  getMinX() {
    const { data } = this.props;
    this.setState({
      minX: data[0].date,
    });
  }

  getMaxX() {
    const { data } = this.props;
    this.setState({
      maxX: data[data.length - 1].date,
    });
    return data[data.length - 1].date;
  }

  //Get Min & Max Y Values
  getMinY() {
    const { data } = this.props;
    let y = {};
    let values = data.map((x) => {
      y = x.value;
      return y;
    });

    this.setState({
      //Spread operator is slow!! refactor to use for loop or .reduce
      minY: Math.min(...values),
    });
  }

  getMaxY() {
    const { data } = this.props;
    let y = {};
    let values = data.map((x) => {
      y = x.value;
      return y;
    });
    this.setState({
      maxY: Math.max(...values),
    });
    return Math.max(...values);
  }

  //Work on logic to pull only 4 values evenly distributed
  getTicks() {
    const { data } = this.props;
    const ticks = [];
    const maxTicks = 4;
    let y = {};
    const dates = data.map((x) => {
      y = x.date;
      return y;
    });
    const delta = Math.ceil(dates.length / maxTicks);
    for (let i = 0; i < dates.length; i = i + delta) {
      ticks.push(dates[i]);
    }
    this.setState({
      ticks: ticks,
    });
  }

  //Organize Categories Into Seperate Arrays within a Larger Array
  sepCategories() {
    const { data } = this.props;
    if (data) {
      const oData = [];
      const category1 = [];
      const category2 = [];
      const category3 = [];

      data.forEach((data) => {
        if (data.category == "1") {
          category1.push(data);
        }
        if (data.category == "2") {
          category2.push(data);
        }
        if (data.category == "3") {
          category3.push(data);
        }
      });

      oData.push(category1);
      oData.push(category2);
      oData.push(category3);

      //!bug! Not sure why state is updated but then console.log's nothing
      this.setState((prevState) => ({
        organizedData: [...prevState.organizedData, oData],
      }));
      this.createCoordinates(oData);
    }
  }

  //Map through arrays of arrays of an array of objects and add x and y key/value pairs to each object.
  createCoordinates(z) {
    const oData = z;
    const mX = this.getMaxX();
    const mY = this.getMaxY();
    const deltaY = 600 / mY;
    const deltaX = 600 / Date.parse(mX);

    for (let group of oData) {
      for (let i = 0; i < group.length; i++) {
        if (group[i].category) {
          let yPoints = group.map((y) => {
            y["y"] = Math.floor(y.value * deltaY);
          });
          let xPoints = group.map((x) => {
            x["x"] = Math.floor(Date.parse(x.date) * deltaX);
          });
        }
      }
    }
  }

  //Get All Y Coordinates

  render() {
    return (
      <CreateChart
        minX={this.state.minX}
        maxX={this.state.maxX}
        minY={this.state.minY}
        maxY={this.state.maxY}
        ticks={this.state.minX.ticks}
        xLabel={this.state.xLabel}
        yLabel={this.state.yLabel}
        organizedData={this.state.organizedData}
      />
    );
  }
}

export default Chart;
