import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_PILL = css`
  position: absolute;
  padding: 0 8px 0px 8px;
  height: 16px;
  background: #ff0000;
  font-family: "mono";
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.1px;
  color: ${Constants.system.white};
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 10px;
  z-index: 3;
`;

export default class Pill extends React.Component {
  render() {
    return (
      <figure css={STYLES_PILL} onClick={this.props.onClick} style={this.props.style}>
        {this.props.children}
      </figure>
    );
  }
}
