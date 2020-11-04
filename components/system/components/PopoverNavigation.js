import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

const STYLES_POPOVER = css`
  z-index: ${Constants.zindex.tooltip};
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  width: 204px;
  border-radius: 4px;
  user-select: none;
  position: absolute;
  background-color: ${Constants.system.white};
  color: ${Constants.system.pitchBlack};
  border: 1px solid ${Constants.system.lightBorder};
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  padding: 8px 0px;
`;

const STYLES_POPOVER_ITEM = css`
  font-family: ${Constants.font.medium};
  box-sizing: border-box;
  top: 0;
  left: 0;
  padding: 16px 24px 16px 24px;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: ${Constants.typescale.lvl1};
  transition: 200ms ease all;
  cursor: pointer;
  font-size: 12px;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export class PopoverNavigation extends React.Component {
  render() {
    return (
      <div css={STYLES_POPOVER} style={this.props.style}>
        {this.props.navigation.map((each, i) => (
          <div
            key={i}
            css={STYLES_POPOVER_ITEM}
            style={this.props.itemStyle}
            onClick={each.onClick}
          >
            {each.text}
          </div>
        ))}
      </div>
    );
  }
}
