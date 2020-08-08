import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_POPOVER = css`
  z-index: ${Constants.zindex.tooltip};
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  position: absolute;
  width: 204px;
  border-radius: 4px;
  user-select: none;
  background-color: ${Constants.system.white};
  color: ${Constants.system.pitchBlack};
  box-shadow: inset 0 0 0 1px ${Constants.system.border},
    0 1px 4px rgba(0, 0, 0, 0.07);
`;

const STYLES_POPOVER_ITEM = css`
  font-family: ${Constants.font.medium};
  box-sizing: border-box;
  top: 0;
  left: 0;
  padding: 8px 24px 8px 24px;
  margin: 8px 0 8px 0;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: ${Constants.typescale.lvl1};
  transition: 200ms ease all;
  cursor: pointer;
  font-size: 12px;

  :hover {
    background-color: ${Constants.system.brand};
    color: ${Constants.system.white};
  }
`;

export class PopoverNavigation extends React.Component {
  static defaultProps = {
    onNavigateTo: () => {
      console.error("requires onNavigateTo");
    },
  };

  render() {
    return (
      <div css={STYLES_POPOVER} style={this.props.style}>
        {this.props.navigation.map((each) => {
          if (each.action === "SIGN_OUT") {
            return (
              <div
                key={each.value}
                css={STYLES_POPOVER_ITEM}
                onClick={this.props.onSignOut}
              >
                {each.text}
              </div>
            );
          }

          return (
            <div
              key={each.value}
              css={STYLES_POPOVER_ITEM}
              onClick={() => this.props.onNavigateTo({ id: each.value })}
            >
              {each.text}
            </div>
          );
        })}
      </div>
    );
  }
}
