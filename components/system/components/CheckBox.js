import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const STYLES_CHECKBOX = css`
  font-family: ${Constants.font.text};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_CHECKBOX_FIGURE = css`
  box-shadow: 0 0 0 1px ${Constants.system.darkGray};
  background-color: ${Constants.system.white};
  height: 32px;
  width: 32px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  margin-right: 16px;
  flex-shrink: 0;
`;

const STYLES_CHECKBOX_INPUT = css`
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  height: 1px;
  width: 1px;
  position: absolute;
  top: 0;
  left: 0;
`;

const STYLES_CHECKBOX_LABEL = css`
  font-size: 14px;
  min-width: 10%;
  width: 100%;
  line-height: 1.5;
  padding-top: 2px;
  overflow-wrap: break-word;

  strong {
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
        <figure css={STYLES_CHECKBOX_FIGURE}>
          {this.props.value ? <SVG.CheckBox height="20px" /> : null}
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
