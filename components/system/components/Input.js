import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const INPUT_STYLES = `
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  transition: 200ms ease all;
`;

const STYLES_UNIT = css`
  font-family: ${Constants.font.text};
  font-size: 14px;
  color: ${Constants.system.darkGray};
  position: absolute;
  top: 12px;
  right: 24px;
`;

const STYLES_INPUT_CONTAINER = css`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  max-width: 480px;
  min-width: 188px;
`;

const STYLES_INPUT_CONTAINER_FULL = css`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  min-width: 188px;
`;

const STYLES_INPUT = css`
  ${INPUT_STYLES}

  padding: 0 16px 0 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0 0 0 1px ${Constants.system.border} inset;

  :focus {
    outline: 0;
    border: 0;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.darkGray};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.darkGray};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.darkGray};
  }
`;

const STYLES_ICON = css`
  box-sizing: border-box;
  position: absolute;
  right: 12px;
  margin-top: 1px;
  bottom: 12px;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const INPUT_COLOR_MAP = {
  SUCCESS: Constants.system.green,
  ERROR: Constants.system.red,
  WARNING: Constants.system.yellow,
};

export class Input extends React.Component {
  _unit;
  _input;

  componentDidMount = () => {
    if (this.props.unit) {
      this._input.style.paddingRight = `${this._unit.offsetWidth + 48}px`;
    }

    if (this.props.autoFocus) {
      this._input.focus();
    }
  };

  _handleCopy = (e) => {
    this._input.select();
    document.execCommand("copy");
  };

  _handleKeyUp = (e) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which === 13 || e.keyCode === 13) && this.props.onSubmit) {
      this.props.onSubmit(e);
      return;
    }
  };

  _handleChange = (e) => {
    if (!Strings.isEmpty(this.props.pattern) && !Strings.isEmpty(e.target.value)) {
      const TestRegex = new RegExp(this.props.pattern);
      if (!TestRegex.test(e.target.value)) {
        e.preventDefault();
        return;
      }
    }

    if (e.target.value && e.target.value.length > this.props.max) {
      e.preventDefault();
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    return (
      <div
        css={this.props.full ? STYLES_INPUT_CONTAINER_FULL : STYLES_INPUT_CONTAINER}
        style={this.props.containerStyle}
      >
        <DescriptionGroup
          full={this.props.full}
          tooltip={this.props.tooltip}
          label={this.props.label}
          style={this.props.descriptionStyle}
          description={this.props.description}
        />
        <div style={{ position: "relative" }}>
          <input
            ref={(c) => {
              this._input = c;
            }}
            css={STYLES_INPUT}
            autoFocus={this.props.autoFocus}
            value={this.props.value}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            onChange={this._handleChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onKeyUp={this._handleKeyUp}
            autoComplete="off"
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            style={{
              boxShadow: this.props.validation
                ? `0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ${
                    INPUT_COLOR_MAP[this.props.validation]
                  }`
                : null,
              paddingRight: this.props.copyable || this.props.icon ? "32px" : "24px",
              ...this.props.style,
            }}
          />
          <div
            css={STYLES_UNIT}
            ref={(c) => {
              this._unit = c;
            }}
          >
            {this.props.unit}
          </div>
        </div>
        {this.props.unit ? null : this.props.icon ? (
          <this.props.icon height="16px" css={STYLES_ICON} onClick={this.props.onSubmit} />
        ) : this.props.copyable ? (
          <SVG.CopyAndPaste height="16px" css={STYLES_ICON} onClick={this._handleCopy} />
        ) : null}
      </div>
    );
  }
}
