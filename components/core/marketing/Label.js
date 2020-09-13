import * as React from "react";

export default class Label extends React.Component {
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
