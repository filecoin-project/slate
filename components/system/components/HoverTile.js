import * as React from "react";

import { css } from "@emotion/react";

const STYLES_TILE = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.6s, box-shadow 0.65s ease;
  transform-style: preserve-3d;
  z-index: -1;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;

const STYLES_TILE_CONTAINER = css`
  width: 300px;
  height: 300px;
  position: relative;
  perspective: 600px;
  display: inline-block;
`;

export class HoverTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileStyle: {},
    };

    this.containerRef = React.createRef();
  }

  handleMovement = (e) => {
    const { offsetLeft, offsetTop } = this.containerRef.current;
    const width = this.props.width ? this.props.width : 300;
    const height = this.props.height ? this.props.height : 300;
    const relativeX = e.pageX - offsetLeft;
    const relativeY = e.pageY - offsetTop;

    let xP = (relativeX / width - 0.5) * 10;
    let yP = (relativeY / height - 0.5) * 10;

    if (xP >= 0 && yP >= 0) {
      this.setTransform(4, 4);
    } else if (xP < 0 && yP >= 0) {
      this.setTransform(-4, 4);
    } else if (xP < 0 && yP < 0) {
      this.setTransform(-4, -4);
    } else {
      this.setTransform(4, -4);
    }
  };

  handleExit = () => {
    this.setState({ tileStyle: { transform: "none", boxShadow: "none" } });
  };

  setTransform = (x, y) => {
    this.setState({
      tileStyle: {
        transform: `scale(.97) rotateY(${x}deg) rotateX(${y * -1}deg)`,
        boxShadow: `${x * -1 * 0.75}px ${y * -1 * 1.2}px 25px rgba(0, 0, 0, .15)`,
      },
    });
  };

  render() {
    return (
      <div
        css={STYLES_TILE_CONTAINER}
        style={{ width: this.props.width, height: this.props.height }}
        onMouseEnter={this.handleMovement}
        onMouseMove={this.handleMovement}
        onMouseLeave={this.handleExit}
        ref={this.containerRef}
      >
        <div css={STYLES_TILE} style={{ ...this.state.tileStyle, ...this.props.style }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
