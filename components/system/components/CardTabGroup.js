import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const TAB_GROUP_SIZE_MAP = {
  1: "100%",
  2: "50%",
  3: "33.33%",
  4: "25%",
};

const STYLES_CARD_TAB_GROUP = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  width: 100%;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 -1px 0 0 ${Constants.system.border},
    0 1px 0 0 ${Constants.system.border};
`;

const STYLES_CARD_TAB_GROUP_TAB = css`
  background: #fdfdfd;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  font-family: ${Constants.font.semiBold};
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease all;
  user-select: none;
  border-bottom: 2px solid transparent;

  :last-child {
    box-shadow: none;
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

export class CardTabGroup extends React.Component {
  _handleChange = (value) => {
    this.props.onChange({
      target: { name: this.props.name, value },
    });
  };

  render() {
    return (
      <div css={STYLES_CARD_TAB_GROUP} style={this.props.style}>
        {this.props.options.map((tab) => {
          const selected = tab.value === this.props.value;

          return (
            <div
              css={STYLES_CARD_TAB_GROUP_TAB}
              key={tab.value}
              style={{
                color: selected ? Constants.system.brand : null,
                backgroundColor: selected ? Constants.system.white : null,
                borderBottom: selected
                  ? `2px solid ${Constants.system.brand}`
                  : null,
                width: TAB_GROUP_SIZE_MAP[this.props.options.length],
                cursor: !selected ? "pointer" : null,
              }}
              onClick={() => this._handleChange(tab.value)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    );
  }
}
