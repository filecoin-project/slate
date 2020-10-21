import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_CHECKBOX = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const STYLES_CHECKBOX_FIGURE = css`
  box-sizing: border-box;
  box-shadow: 0 0 0 1px ${Constants.system.darkGray};
  background-color: ${Constants.system.white};
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  flex-shrink: 0;
  height: 24px;
  width: 24px;
  margin: 0;
  padding: 0;
`;

const STYLES_CHECKBOX_INPUT = css`
  box-sizing: border-box;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  height: 1px;
  width: 1px;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

const STYLES_CHECKBOX_LABEL = css`
  box-sizing: border-box;
  font-size: 14px;
  min-width: 10%;
  width: 100%;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  padding-top: 2px;
  padding-left: 16px;
  overflow-wrap: break-word;

  strong {
    box-sizing: border-box;
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export class CheckBox extends React.Component {
  _handleChange = (value) => {
    this.props.onChange({
      target: { name: this.props.name, value: !this.props.value },
    });
  };

  render() {
    return (
      <label css={STYLES_CHECKBOX} style={this.props.style}>
        <figure
          css={STYLES_CHECKBOX_FIGURE}
          style={
            this.props.value
              ? {
                  backgroundColor: Constants.system.brand,
                  boxShadow: `0 0 0 1px ${Constants.system.brand}`,
                  ...this.props.boxStyle,
                }
              : {
                  backgroundColor: Constants.system.white,
                  ...this.props.boxStyle,
                }
          }
        >
          {this.props.value ? (
            <SVG.CheckBox
              height="12px"
              strokeWidth="4"
              style={{ color: Constants.system.white }}
            />
          ) : null}
        </figure>
        <input
          css={STYLES_CHECKBOX_INPUT}
          name={this.props.name}
          type="checkbox"
          checked={this.props.value}
          onChange={() => this._handleChange(this.props.value)}
        />
        <span css={STYLES_CHECKBOX_LABEL}>{this.props.children}</span>
      </label>
    );
  }
}
