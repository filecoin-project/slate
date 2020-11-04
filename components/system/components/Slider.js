import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";
import { Input } from "~/components/system/components/Input";

import Draggable from "react-draggable";

const STYLES_CONTAINER = css`
  height: 48px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  position: relative;
`;

const STYLES_BAR_CONTAINER = css`
  height: 24px;
  width: calc(100% - 12px);
  position: absolute;
  left: 12px;
`;

const STYLES_SLIDER_BAR = css`
  width: calc(100% - 24px);
  height: 4px;
  border-radius: 2px;
  background-color: ${Constants.system.gray};
  box-sizing: border-box;
`;

const STYLES_ACTIVE_SLIDER_BAR = css`
  height: 4px;
  border-radius: 2px 0px 0px 2px;
  background-color: ${Constants.system.brand};
  position: relative;
  bottom: 4px;
`;

const STYLES_BUBBLE = css`
  font-family: ${Constants.font.text};
  font-size: 0.9em;
  padding: 4px;
  border-radius: 4px;
  background-color: ${Constants.system.gray};
  display: inline-block;
  position: relative;
  bottom: calc(4em + 16px);
  transform: translateX(-50%);
  cursor: default;

  ::selection {
    color: none;
    background: none;
  }
`;

const STYLES_SLIDER_HANDLE = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${Constants.system.brand};
  cursor: pointer;
  position: relative;
  bottom: 16px;
  right: 12px;

  :hover {
    box-shadow: 0 0 0 4px rgba(0, 72, 255, 0.1);
  }

  :active {
    box-shadow: 0 0 0 8px rgba(0, 72, 255, 0.2);
  }
`;

export class Slider extends React.Component {
  _bar;

  static defaultProps = {
    step: 1,
    min: 0,
    max: 100,
  };

  state = {
    value: 0,
    width: 0,
    input: this.props.value,
  };

  componentDidMount = () => {
    this.setState(
      {
        decimals: this.getDecimals(),
        value:
          ((this.props.value - this.props.min) * this._bar.offsetWidth) /
          (this.props.max - this.props.min),
      },
      this.updateDimensions
    );
    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  updateDimensions = () => {
    let conversion = (this.props.max - this.props.min) / this._bar.offsetWidth;
    this.setState({
      width: this._bar.offsetWidth,
      conversion,
      step: this.props.step / conversion,
    });
  };

  // NOTE(martina): Gets how many decimal places the step has. To help deal with javascript rounding errors.
  getDecimals = () => {
    let step = this.props.step.toString();
    let place = step.indexOf(".");
    if (place === -1) {
      return 0;
    }
    return step.length - step.indexOf(".") - 1;
  };

  // NOTE(martina): Converts it to increments of this.props.step while accounting for javascript rounding errors.
  formatNum = (num) => {
    return (Math.round(num / this.props.step) * this.props.step).toFixed(this.state.decimals);
  };

  // NOTE(martina): Converts from px width to return value
  toValue = (px) => {
    return px * this.state.conversion + this.props.min;
  };

  // NOTE(martina): Converts from return value to px width
  toPx = (value) => {
    return (value - this.props.min) / this.state.conversion;
  };

  /* NOTE(martina): Make sure you only query this.state.value and ui.deltaX once and save the value. Querying 
  it twice in one function call will give two different values since it changes so rapidly */
  _handleDrag = (e, ui) => {
    let px = this.state.value + ui.deltaX;
    let value = this.formatNum(this.toValue(px));
    this.props.onChange({
      target: { name: this.props.name, value },
    });
    this.setState({ value: px, input: value });
  };

  _handleChange = (e) => {
    let val = e.target.value;
    if (isNaN(e.target.value)) {
      val = this.props.min;
    }
    let value = Math.min(Math.max(val, this.props.min), this.props.max);
    value = this.formatNum(value);
    this.props.onChange({
      target: { name: this.props.name, value },
    });
    let px = this.toPx(value);
    this.setState({ value: px, input: e.target.value });
  };

  _handleBlur = (e) => {
    this.setState({ input: this.props.value });
  };

  render() {
    return (
      <React.Fragment>
        <DescriptionGroup
          full={this.props.full}
          tooltip={this.props.tooltip}
          label={this.props.label}
          description={this.props.description}
        />
        <div
          css={STYLES_CONTAINER}
          style={{
            marginTop: this.props.bubble ? "32px" : "0px",
            ...this.props.containerStyle,
          }}
        >
          <div style={{ position: "relative" }}>
            <div css={STYLES_BAR_CONTAINER}>
              <div
                css={STYLES_SLIDER_BAR}
                ref={(c) => {
                  this._bar = c;
                }}
              />
              <div
                css={STYLES_ACTIVE_SLIDER_BAR}
                style={{
                  width: `${this.state.value}px`,
                }}
              />
              <Draggable
                axis="x"
                position={{ x: this.state.value, y: 0 }}
                bounds={{ left: 0, right: this.state.width }}
                grid={this.props.discrete ? [this.state.step, this.state.step] : null}
                onDrag={this._handleDrag}
                handle="strong"
              >
                <div
                  style={{
                    position: "relative",
                    width: "24px",
                    height: "24px",
                  }}
                >
                  <strong>
                    <div css={STYLES_SLIDER_HANDLE} />
                  </strong>
                  {this.props.bubble ? <div css={STYLES_BUBBLE}>{this.props.value}</div> : null}
                </div>
              </Draggable>
            </div>
          </div>
          {this.props.inputBox ? (
            <Input
              value={this.state.input}
              onChange={this._handleChange}
              onBlur={this._handleBlur}
              pattern="^[\.\d-]*$"
              style={{
                width: "80px",
                paddingLeft: "8px",
                paddingRight: "8px",
                textOverflow: "clip",
                marginLeft: "16px",
                ...this.props.inputStyle,
              }}
              containerStyle={{ minWidth: "80px" }}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
