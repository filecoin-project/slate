import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const STYLES_RADIO = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  cursor: pointer;
  padding: 8px 10px;
  border: 1px solid ${Constants.system.gray30};
  border-radius: 4px;

  :last-child {
    margin-bottom: 0px;
  }
`;

const STYLES_RADIO_INPUT = css`
  box-sizing: border-box;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  height: 1px;
  width: 1px;
  position: absolute;
  top: 0;
  left: 0;
`;

const STYLES_RADIO_CUSTOM = css`
  box-sizing: border-box;
  background-color: ${Constants.system.bgGray};
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  flex-shrink: 0;
`;

const STYLES_RADIO_CUSTOM_SELECTED = css`
  box-sizing: border-box;
  background-color: ${Constants.system.bgGrayLight};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  height: 16px;
  width: 16px;
  border-radius: 16px;
  pointer-events: none;
  opacity: 0;
  transition: 200ms ease opacity;
  z-index: 1;
`;

const STYLES_RADIO_LABEL = css`
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  min-width: 10%;
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export class RadioGroup extends React.Component {
  _handleChange = (value) => {
    this.props.onChange({
      target: { name: this.props.name, value },
    });
  };

  render() {
    return (
      <div style={this.props.style}>
        <DescriptionGroup
          full={this.props.full}
          tooltip={this.props.tooltip}
          label={this.props.label}
          description={this.props.description}
        />
        <form>
          {this.props.options.map((radio) => {
            const checked = this.props.selected === radio.value;

            return (
              <label
                css={STYLES_RADIO}
                style={this.props.containerStyle}
                key={`radio-${radio.value}`}
              >
                <span css={STYLES_RADIO_LABEL} style={this.props.labelStyle}>
                  {radio.label}
                </span>
                <span css={STYLES_RADIO_CUSTOM}>
                  <span css={STYLES_RADIO_CUSTOM_SELECTED} style={{ opacity: checked ? 1 : 0 }} />
                </span>
                <input
                  css={STYLES_RADIO_INPUT}
                  type="radio"
                  value={radio.value}
                  checked={checked}
                  onChange={() => this._handleChange(radio.value)}
                />
              </label>
            );
          })}
        </form>
      </div>
    );
  }
}
