import React, { Component } from "react";

export default class Label extends Component {
  render() {
    const { labels } = this.props;
    return (
      <div>
        {labels.map(label => {
          return <a key={label.id}>{label.name}</a>;
        })}
      </div>
    );
  }
}
