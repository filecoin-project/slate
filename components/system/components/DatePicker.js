import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css, keyframes } from "@emotion/react";
import moment from "moment";

import { Input } from "~/components/system/components/Input";

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
  position: relative;
`;

const STYLES_HIDDEN_INPUT = css`
  opacity: 0;
  position: absolute;
  top: 2px;
  left: 2px;
`;

const STYLES_CALENDAR = css`
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
`;

const STYLES_MONTH_CONTAINER = css`
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
`;

const STYLES_MONTH = css`
  text-align: center;
  font-size: ${Constants.typescale.lvl1};
  margin: 10px 0;
`;

const STYLES_WEEKDAYS = css`
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
  font-size: 0.9em;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand} !important;
  }
`;

const STYLES_CHOSEN_DAY = css`
  font-size: 0.9em;
  position: relative;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand} !important;
  }

  &:after {
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
  font-size: 0.9em;
  cursor: not-allowed;
  color: ${Constants.system.gray} !important;
`;

const STYLES_DATES = css`
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
  cursor: pointer;
  margin: 0 10px;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export class DatePicker extends React.Component {
  state = {
    value: this.props.defaultValue
      ? this.props.defaultValue.substring(5, 7) +
        "/" +
        this.props.defaultValue.substring(8, 10) +
        "/" +
        this.props.defaultValue.substring(0, 4)
      : "",
    validation: null,
    date: this.props.defaultValue || null,
    cal: null,
  };

  _handleKeyUp = (e) => {
    if ((e.which === 13 || e.keyCode === 13) && this.props.onSubmit) {
      this.props.onSubmit(e);
      return;
    }
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }
  };

  _handleChange = (e) => {
    let validation = null;
    let date = "";
    let cal = this.state.cal;
    if (e.target.value.length === 10) {
      let result = this.checkInput(e);
      if (moment.isMoment(result)) {
        validation = "SUCCESS";
        date =
          e.target.value.substring(6, 10) +
          "-" +
          e.target.value.substring(0, 2) +
          "-" +
          e.target.value.substring(3, 5);
        if (cal) {
          cal = moment(date).date(1);
        }
      } else {
        validation = "ERROR";
      }
    }
    this.setState({ value: e.target.value, validation, date, cal }, () => {
      if (cal) {
        this.setCalendar();
      }
    });
  };

  _handleBlur = (e) => {
    if (!this.state.validation) {
      let validation = this.checkInput(e);
      this.setState({ validation });
    }
  };

  checkInput = (e) => {
    if (
      e.target.value.length !== 10 ||
      !/\d{2}\/\d{2}\/\d{4}/.test(e.target.value)
    )
      return;
    let date = moment(
      e.target.value.substring(6, 10) +
        "-" +
        e.target.value.substring(0, 2) +
        "-" +
        e.target.value.substring(3, 5)
    );
    if (
      !moment.isMoment(date) ||
      !date.isValid() ||
      date.date() !== Number(e.target.value.substring(3, 5))
    )
      return;
    if (this.isDisabled(date)) return;
    return date;
  };

  _handleCalendar = () => {
    if (this.state.cal) {
      this.setState({ cal: null });
    } else {
      this.setState(
        {
          cal: this.state.date
            ? moment(this.state.date).date(1)
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
      (this.props.min && day.isBefore(this.props.min)) ||
      (this.props.max && day.isAfter(this.props.max))
    )
      return true;
    if (this.props.isDisabled) {
      return this.props.isDisabled(day);
    }
    return false;
  };

  selectDay = (day) => {
    if (!this.isDisabled(day)) {
      this.setState({
        value: day.format("MM/DD/YYYY"),
        date: day.format("YYYY-MM-DD"),
        cal: null,
      });
    }
  };

  getStyle = (day) => {
    if (this.isDisabled(day)) return STYLES_DISABLED_DAY;
    if (this.state.date && day.isSame(this.state.date, "day"))
      return STYLES_CHOSEN_DAY;
    return STYLES_DAY;
  };

  _incrementCal = (count) => {
    let cal = this.state.cal;
    cal.add(count, "months");
    this.setState({ cal }, this.setCalendar);
  };

  render() {
    let weekdays = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ].map((day) => <div>{day}</div>);
    let month;
    if (this.state.month) {
      month = this.state.month.map((day) => (
        <div
          style={{
            color: day.isSame(this.state.cal, "month")
              ? Constants.system.black
              : Constants.system.darkGray,
          }}
          css={
            this.isDisabled(day)
              ? STYLES_DISABLED_DAY
              : this.state.date && day.isSame(this.state.date, "day")
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
      <div css={STYLES_DATE_INPUT}>
        <input
          disabled
          css={STYLES_HIDDEN_INPUT}
          type="date"
          name={this.props.name}
          value={this.state.date}
        />
        <div>
          <Input
            label={this.props.label}
            description={this.props.description}
            tooltip={this.props.tooltip}
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
    );
  }
}
