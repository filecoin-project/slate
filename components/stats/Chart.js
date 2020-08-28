import * as React from "react";

import CreateChart from "~/components/stats/CreateChart";

export default class Chart extends React.Component {
  state = {
    minX: {},
    maxX: {},
    minY: {},
    maxY: {},
    deltaX: {},
    deltaY: {},
    bufferX: {},
    ticks: [],
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
    this.sepCategories();
    this.getTicks();
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
      let dates = data.sort(this.sortDates("date"));
      this.setState({
        minX: dates[0].date,
      });
      return dates[0].date;
    }
  
    getMaxX() {
      const { data } = this.props;
      let dates = data.sort(this.sortDates("date"));
      this.setState({
        maxX: dates[data.length - 1].date,
      });
      return dates[data.length - 1].date;
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
    return Math.min(...values);
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

  getTicks() {
    const { data } = this.props;
    const { maxTicks } = this.props;
    const { xWall } = this.props;
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    let diffX = maxX - minX;
    let dX = xWall / diffX;
    let bufferX = (600 - xWall) / 2;
    const allTicks = [];
    const dates = data.map((z) => {
      let t = {
        date: "",
        x: "",
      };
      t.date = z.date;
      t.x = Math.floor((Date.parse(z.date) - minX) * dX + bufferX);
      return t;
    });
    dates.sort(this.sortDates("x"));
    const delta = Math.ceil(dates.length / maxTicks);
    for (let i = 0; i < dates.length; i = i + delta) {
      allTicks.push(dates[i]);
    }
    this.setState((prevState) => ({
      ticks: [...prevState.ticks, allTicks],
    }));
  }

  sortDates(key) {
    return function innerSort(a, b) {
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return comparison;
    };
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

      this.setState((prevState) => ({
        organizedData: [...prevState.organizedData, oData],
      }));
      this.createCoordinates(oData);
    }
  }

  //Map through arrays of arrays of an array of objects and add x and y key/value pairs to each object.
  createCoordinates(z) {
    const { yCeiling } = this.props;
    const { xWall } = this.props;
    const oData = z;
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    const maxY = this.getMaxY();
    const minY = this.getMinY();
    let diffY = maxY - minY;
    let diffX = maxX - minX;
    let dY = yCeiling / diffY;
    let dX = xWall / diffX;
    let bufferY = (600 - yCeiling) / 2;
    let bufferX = (600 - xWall) / 2;

    this.setState({ deltaX: dX });
    this.setState({ deltaY: dY });
    this.setState({ bufferX });

    for (let group of oData) {
      for (let i = 0; i < group.length; i++) {
        if (group[i].category) {
          let yPoints = group.map((y) => {
            let yValue = Math.floor((y.value - minY) * dY);
            y["y"] = yCeiling - yValue + bufferY;
          });

          let xPoints = group.map((x) => {
            let xValue = Math.floor((Date.parse(x.date) - minX) * dX);
            x["x"] = xValue + bufferX;
          });
        }
      }
    }
  }

  render() {
    if (this.state.organizedData.length) {
      return (
        <React.Fragment>
          <CreateChart
            minX={this.state.minX}
            maxX={this.state.maxX}
            minY={this.state.minY}
            maxY={this.state.maxY}
            deltaX={this.state.deltaX}
            deltaY={this.state.deltaY}
            ticks={this.state.ticks}
            xLabel={this.state.xLabel}
            yLabel={this.state.yLabel}
            organizedData={this.state.organizedData}
          />
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}
