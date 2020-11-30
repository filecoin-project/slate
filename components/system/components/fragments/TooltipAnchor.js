import * as React from "react";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_TOOLTIP_ANCHOR = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

export class TooltipAnchor extends React.Component {
  render() {
    return (
      <span css={STYLES_TOOLTIP_ANCHOR} style={this.props.style}>
        {this.props.children ? (
          this.props.children
        ) : (
          <SVG.Information height={this.props.height ? this.props.height : "24px"} />
        )}
      </span>
    );
  }
}
