import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";
import { FocusRing } from "~/components/core/FocusRing";

const INPUT_STYLES = (theme) => css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: ${theme.typescale.lvl1};
  border-radius: 12px;
  outline: 0;
  border: none;
  box-sizing: border-box;
  transition: 200ms ease all;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.grayLight2};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.grayLight2};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.grayLight2};
  }
`;

const STYLES_UNIT = css`
  font-family: ${Constants.font.text};
  font-size: 14px;
  color: ${Constants.system.grayLight2};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 24px;
`;

const STYLES_INPUT_CONTAINER = css`
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
  ${"" /* ${INPUT_STYLES} */}
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  border-radius: 12px;
  padding: 10px 12px;
  background: ${Constants.system.white};
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0 0 0 1px ${Constants.semantic.borderGrayLight} inset;
  color: ${Constants.system.black};

  :focus {
    outline: 0;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.grayLight2};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.grayLight2};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.grayLight2};
  }
`;

const STYLES_ICON = css`
  box-sizing: border-box;
  position: absolute;
  right: 12px;
  margin-top: 1px;
  bottom: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: 200ms ease all;
  color: ${Constants.system.grayDark2};

  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_PIN_INPUT = (theme) => css`
  text-align: center;
  height: 50px;
  padding: 0;
  font-family: ${theme.font.medium};
  font-size: ${theme.typescale.lvl2};
`;

const INPUT_COLOR_MAP = {
  SUCCESS: Constants.system.green,
  ERROR: Constants.system.red,
  WARNING: Constants.system.yellow,
};

class InputPrimitive extends React.Component {
  _unit;
  _input;
  _isPin = this.props.type === "pin";

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

  _formatPin = (pin) => {
    let formattedPin = pin.replace(/[\D\s\._\-]+/g, "");

    if (formattedPin.length > 3)
      formattedPin = formattedPin.slice(0, 3) + " " + formattedPin.slice(3);

    if (formattedPin.length > 7) formattedPin = formattedPin.slice(0, 7);

    return formattedPin;
  };

  _parsePin = (pin) => {
    let parsedPin = pin.replace(/[\D\s\._\-]+/g, "");
    if (parsedPin.length > 7) parsedPin = parsedPin.slice(0, 7);
    return parsedPin;
  };

  _handleSubmit = (e) => {
    if (this._isPin) {
      let code = this.props.value.replace(/[\D\s\._\-]+/g, "");
      code = code.slice(0, 7);
      this.props.onSubmit(code);
      return;
    }
    this.props.onSubmit(e);
  };

  _handleKeyUp = (e) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which === 13 || e.keyCode === 13) && this.props.onSubmit) {
      this._handleSubmit(e);
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

    if (this._isPin) {
      const pin = e.target.value;
      e.target.value = this._parsePin(pin);
      this.props.onChange(e);
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    return (
      <>
        <div
          css={this.props.full ? STYLES_INPUT_CONTAINER_FULL : STYLES_INPUT_CONTAINER}
          style={this.props.containerStyle}
        >
          <DescriptionGroup
            full={this.props.full}
            tooltip={this.props.tooltip}
            label={this.props.label}
            labelStyle={{ fontSize: Constants.typescale.lvl0 }}
            style={this.props.descriptionStyle}
            description={this.props.description}
          />
          <div
            css={[STYLES_INPUT, this.props.inputCss]}
            style={{
              position: "relative",
              boxShadow: this.props.validation
                ? `0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ${
                    INPUT_COLOR_MAP[this.props.validation]
                  }`
                : null,
              ...this.props.style,
            }}
          >
            <input
              ref={(c) => {
                this._input = c;
                if (this.props.innerRef) {
                  this.props.innerRef?.(c);
                }
              }}
              css={[INPUT_STYLES, this._isPin && STYLES_PIN_INPUT]}
              autoFocus={this.props.autoFocus}
              value={this._isPin ? this._formatPin(this.props.value) : this.props.value}
              name={this.props.name}
              type={this._isPin ? "text" : this.props.type}
              placeholder={this.props.placeholder}
              onChange={this._handleChange}
              onFocus={
                this.props.autoHighlight
                  ? () => {
                      this._input.select();
                    }
                  : this.props.onFocus
              }
              onBlur={this.props.onBlur}
              onKeyUp={this._handleKeyUp}
              autoComplete="off"
              disabled={this.props.disabled}
              readOnly={this.props.readOnly}
              required={this.props.required}
              maxLength={this.props.maxLength}
              onKeyDown={this.props.onKeyDown}
              tabIndex={this.props.tabIndex}
              style={{
                width: this.props.copyable || this.props.icon ? "calc(100% - 32px)" : "100%",
                ...this.props.textStyle,
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
            {this.props.unit ? null : this.props.icon ? (
              <this.props.icon
                height="16px"
                css={STYLES_ICON}
                style={{ cursor: (this.props.onClickIcon || this.props.onSubmit) && "pointer" }}
                onClick={this.props.onClickIcon || this.props.onSubmit || this._handleSubmit}
              />
            ) : this.props.copyable ? (
              <SVG.CopyAndPaste
                height="16px"
                css={STYLES_ICON}
                style={{ cursor: "pointer" }}
                onClick={this._handleCopy}
              />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export const Input = React.forwardRef((props, ref) => <InputPrimitive innerRef={ref} {...props} />);
