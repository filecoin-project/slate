import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_TAB_GROUP = css`
  margin: 44px 0px 24px 0px;
  padding: 0 0 0 2px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px 0px 24px 0px;
  }
`;

const STYLES_TAB = css`
  padding: 8px 8px 8px 0px;
  margin-right: 24px;
  display: inline-block;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl2};
  user-select: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 12px;
    font-size: ${Constants.typescale.lvl1};
  }
`;

export class TabGroup extends React.Component {
  render() {
    return (
      <div css={STYLES_TAB_GROUP} style={this.props.style}>
        {this.props.tabs.map((tab, i) => (
          <div
            css={STYLES_TAB}
            key={tab}
            style={{
              color:
                this.props.disabled || this.props.value === i
                  ? Constants.system.black
                  : "rgba(0,0,0,0.25)",
              cursor: this.props.disabled ? "auto" : "pointer",
              ...this.props.itemStyle,
            }}
            onClick={this.props.disabled ? () => {} : () => this.props.onChange(i)}
          >
            {tab}
          </div>
        ))}
      </div>
    );
  }
}
