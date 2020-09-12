import React, { Component } from "react";

export default class Label extends Component {
  render() {
    const { labels } = this.props;
    return (
      <>
        <div className="content">
          {labels.map(label => {
            return (
              <a key={label.id} className={"ui tag label"}>
                {label.name}
              </a>
            );
          })}
        </div>
      </>
    );
  }
}
