import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css, keyframes } from "@emotion/react";
import moment from "moment";

import { Input } from "~/components/system/components/Input";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";
import { Boundary } from "~/components/system/components/fragments/Boundary";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
  (day, i) => <div key={i}>{day}</div>
);

const expand = keyframes`
  0% {
    max-height: 0px;
    overflow: hidden;
  }
  100% {
    max-height: 400px;
    overflow: hidden;
  }
`;

const STYLES_DATE_INPUT = css`
  box-sizing: border-box;
  position: relative;
`;

const STYLES_HIDDEN_INPUT = css`
  box-sizing: border-box;
  opacity: 0;
  position: absolute;
  top: 2px;
  left: 2px;
`;

const STYLES_CALENDAR = css`
  box-sizing: border-box;
  position: absolute;
  font-family: ${Constants.font.text};
  max-width: 480px;
  min-width: 320px;
  width: 100%;
  background-color: ${Constants.system.white};
  border: 1px solid ${Constants.system.darkGray};
  border-radius: 4px;
  padding: 5px;
  animation: ${expand} 200ms ease-out 1;
  z-index: ${Constants.zindex.modal};
`;

const STYLES_MONTH_CONTAINER = css`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
`;

const STYLES_MONTH = css`
  box-sizing: border-box;
  text-align: center;
  font-size: ${Constants.typescale.lvl1};
  margin: 10px 0;
`;

const STYLES_WEEKDAYS = css`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  width: 100%;
  color: ${Constants.system.darkGray};
  margin: 10px 0;
  font-size: 0.9em;
  border-bottom: 1px solid ${Constants.system.gray};
  padding-bottom: 10px;
`;

const STYLES_DAY = css`
  box-sizing: border-box;
  font-size: 0.9em;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand} !important;
  }
`;

const STYLES_CHOSEN_DAY = css`
  box-sizing: border-box;
  font-size: 0.9em;
  position: relative;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand} !important;
  }

  :after {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${Constants.system.brand};
  }
`;

const STYLES_DISABLED_DAY = css`
  box-sizing: border-box;
  font-size: 0.9em;
  cursor: not-allowed;
  color: ${Constants.system.gray} !important;
`;

const STYLES_DATES = css`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 40px);
  align-items: center;
  text-align: center;
  width: 100%;
  color: ${Constants.system.darkGray};
  margin: 5px 0;
`;

const STYLES_ICON = css`
  box-sizing: border-box;
  cursor: pointer;
  margin: 0 10px;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.state = {
      value: "",
      validation: null,
      cal: null,
    };
  }

  componentDidMount = () => {
    if (moment(this.props.value).isValid()) {
      this.processChange(moment(this.props.value).format("MM/DD/YYYY"));
    }
  };

  _handleChange = (e) => {
    this.processChange(e.target.value);
  };

  selectDay = (day) => {
    if (!this.isDisabled(day)) {
      this.setState({
        value: day.format("MM/DD/YYYY"),
        cal: null,
      });
      this.registerChange(day.format("YYYY-MM-DD"));
    }
  };

  processChange = (value) => {
    let validation = null;
    let date = "";
    let cal = this.state.cal;
    if (value.length === 10) {
      let result = this.checkInput(value);
      if (moment.isMoment(result)) {
        validation = "SUCCESS";
        date =
          value.substring(6, 10) +
          "-" +
          value.substring(0, 2) +
          "-" +
          value.substring(3, 5);
        if (cal) {
          cal = moment(date).date(1);
        }
      } else {
        validation = result;
      }
    }
    this.setState({ value, validation, cal }, () => {
      if (cal) this.setCalendar();
    });
    this.registerChange(date);
  };

  checkInput = (value) => {
    if (value.length !== 10 || !/\d{2}\/\d{2}\/\d{4}/.test(value)) return;
    let date = moment(
      value.substring(6, 10) +
        "-" +
        value.substring(0, 2) +
        "-" +
        value.substring(3, 5)
    );
    if (
      !moment.isMoment(date) ||
      !date.isValid() ||
      date.date() !== Number(value.substring(3, 5))
    )
      return "ERROR";
    if (this.isDisabled(date)) {
      return "WARNING";
    }
    return date;
  };

  _handleBlur = (e) => {
    if (!this.state.validation) {
      let validation = this.checkInput(e);
      this.setState({ validation });
    }
  };

  _handleCalendar = () => {
    if (this.state.cal) {
      this.setState({ cal: null });
    } else {
      this.setState(
        {
          cal: this.props.value
            ? moment(this.props.value).date(1)
            : moment().date(1),
        },
        this.setCalendar
      );
    }
  };

  setCalendar = () => {
    let month = [];
    let offset = this.state.cal.day();
    for (let i = -offset; i < -offset + 6 * 7; i++) {
      month.push(moment(this.state.cal).add(i, "days"));
    }
    this.setState({ month });
  };

  isDisabled = (day) => {
    if (
      (this.props.min && day.isBefore(moment(this.props.min))) ||
      (this.props.max && day.isAfter(moment(this.props.max)))
    )
      return true;
    if (this.props.isDisabled) {
      return this.props.isDisabled(day.toDate());
    }
    return false;
  };

  registerChange = (date) => {
    var myInput = this.myInput.current;
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(myInput, date);
    var inputEvent = new Event("input", { bubbles: true });
    myInput.dispatchEvent(inputEvent);
    this.props.onChange(inputEvent);
  };

  getStyle = (day) => {
    if (this.isDisabled(day)) return STYLES_DISABLED_DAY;
    if (this.props.value && day.isSame(moment(this.props.value), "day"))
      return STYLES_CHOSEN_DAY;
    return STYLES_DAY;
  };

  _incrementCal = (count) => {
    let cal = this.state.cal;
    cal.add(count, "months");
    this.setState({ cal }, this.setCalendar);
  };

  render() {
    let month;
    if (this.state.month) {
      month = this.state.month.map((day) => (
        <div
          key={day.toString()}
          style={{
            color: day.isSame(this.state.cal, "month")
              ? Constants.system.black
              : Constants.system.darkGray,
          }}
          css={
            this.isDisabled(day)
              ? STYLES_DISABLED_DAY
              : this.props.value && day.isSame(moment(this.props.value), "day")
              ? STYLES_CHOSEN_DAY
              : STYLES_DAY
          }
          onClick={() => this.selectDay(day)}
        >
          {day.date()}
        </div>
      ));
    }
    return (
      <div>
        <DescriptionGroup
          full={this.props.full}
          tooltip={this.props.tooltip}
          label={this.props.label}
          description={this.props.description}
        />
        <Boundary
          enabled={this.state.cal}
          onOutsideRectEvent={this._handleCalendar}
          style={{ maxWidth: this.props.full ? "none" : "480px" }}
        >
          <div css={STYLES_DATE_INPUT}>
            <input
              ref={this.myInput}
              disabled
              css={STYLES_HIDDEN_INPUT}
              type="date"
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <div>
              <Input
                full={this.props.full}
                icon={SVG.Calendar}
                max={10}
                value={this.state.value}
                placeholder="MM/DD/YYYY"
                pattern="^[0-9\/]*$"
                validation={this.state.validation}
                onChange={this._handleChange}
                onBlur={this._handleBlur}
                onSubmit={this._handleCalendar}
              />
              {this.state.cal ? (
                <div css={STYLES_CALENDAR}>
                  <div css={STYLES_MONTH_CONTAINER}>
                    <SVG.ChevronLeft
                      height="20px"
                      css={STYLES_ICON}
                      onClick={() => this._incrementCal(-1)}
                    />
                    <div css={STYLES_MONTH}>
                      {this.state.cal.isSame(moment(), "year")
                        ? this.state.cal.format("MMMM")
                        : this.state.cal.format("MMMM YYYY")}
                    </div>
                    <SVG.ChevronRight
                      height="20px"
                      css={STYLES_ICON}
                      onClick={() => this._incrementCal(1)}
                      style={{ justifySelf: "end" }}
                    />
                  </div>
                  <div css={STYLES_WEEKDAYS}>{weekdays}</div>
                  <div css={STYLES_DATES}>{month}</div>
                </div>
              ) : null}
            </div>
          </div>
        </Boundary>
      </div>
    );
  }
}
