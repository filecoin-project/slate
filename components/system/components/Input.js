import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const INPUT_STYLES = `
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

const STYLES_INPUT_CONTAINER = css`
  position: relative;
  max-width: 480px;
  min-width: 188px;
`;

const STYLES_INPUT = css`
  ${INPUT_STYLES}
  padding: 0 24px 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px ${Constants.system.darkGray};

  :focus {
    outline: 0;
    border: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07),
      inset 0 0 0 2px ${Constants.system.brand};
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

const STYLES_COPY_AND_PASTE = css`
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
  _input;

  _handleCopy = (e) => {
    this._input.select();
    document.execCommand("copy");
  };

  _handleKeyUp = (e) => {
    if (e.which === 13 && this.props.onSubmit) {
      this.props.onSubmit(e);
      return;
    }

    this.props.onKeyUp(e);
  };

  _handleChange = (e) => {
    if (
      !Strings.isEmpty(this.props.pattern) &&
      !Strings.isEmpty(e.target.value)
    ) {
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
      <div css={STYLES_INPUT_CONTAINER} style={this.props.containerStyle}>
        <DescriptionGroup
          tooltip={this.props.tooltip}
          label={this.props.label}
          description={this.props.description}
        />
        <input
          ref={(c) => {
            this._input = c;
          }}
          css={STYLES_INPUT}
          value={this.props.value}
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this._handleChange}
          autoComplete="off"
          readOnly={this.props.readOnly}
          style={{
            ...this.props.style,
            boxShadow: this.props.validation
              ? `0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ${
                  INPUT_COLOR_MAP[this.props.validation]
                }`
              : null,
          }}
        />
        {this.props.copyable ? (
          <SVG.CopyAndPaste
            height="16px"
            css={STYLES_COPY_AND_PASTE}
            onClick={this._handleCopy}
          />
        ) : null}
      </div>
    );
  }
}
