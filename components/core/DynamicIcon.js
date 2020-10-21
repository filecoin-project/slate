import * as React from "react";
import * as Constants from "~/common/constants";

export class DynamicIcon extends React.Component {
  state = {
    clicked: false,
  };

  _handleClick = (e) => {
    this.props.onClick(e);
    this.setState({ clicked: true });
    setTimeout(
      () => this.setState({ clicked: false }),
      this.props.timeout || 1000
    );
  };

  render() {
    return (
      <div
        style={{ cursor: "pointer", ...this.props.style }}
        onClick={this._handleClick}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        css={this.props.css}
      >
        {this.state.clicked ? this.props.successState : this.props.children}
      </div>
    );
  }
}
