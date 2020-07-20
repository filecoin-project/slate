import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import moment from "moment";
import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const weekdaysOnly = (date) => {
  if (moment(date).day() === 0 || moment(date).day() === 6) return true;
  return false;
};

export default class SystemPageDatepicker extends React.Component {
  state = {
    exampleOne: "",
    exampleTwo: "",
    exampleThree: "2020-07-13",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Datepicker"
        description="..."
        url="https://slate.host/system/datepicker"
      >
        <System.H1>
          Datepicker <ViewSourceLink file="system/datepicker.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The DatePicker component is used to allow the user to select a date.
          It returns a string in the yyyy-mm-dd form.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the DatePicker Component.</System.P>
        <br />
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { DatePicker } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Datepicker with disabled dates</System.H2>
        <hr />
        <br />
        <System.DatePicker
          label="Pick a date with weekends disabled"
          name="exampleOne"
          value={this.state.exampleOne}
          isDisabled={weekdaysOnly}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.P>
          Define a function to specify disabled dates. This function accepts a
          Date object and returns true for dates that are disabled (cannot be
          selected), false otherwise.
        </System.P>
        <br />
        <System.CodeBlock>
          {`import moment from 'moment';

const weekdaysOnly = (date) => {
  if (moment(date).day() === 0 || moment(date).day() === 6) return true;
  return false;
};`}
        </System.CodeBlock>
        <br />
        <System.P>
          Define the DatePicker component with the isDisabled function.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
     state = { exampleOne: '' }
  
     _handleChange = e => this.setState(
       { [e.target.name]: e.target.value }
     );
  
     render() {
       return(
         <DatePicker
          label="Pick a date with weekends disabled"
          name="exampleOne"
          value={this.state.exampleOne}
          isDisabled={weekdaysOnly}
          onChange={this._handleChange}
        />
       )
     }
  }`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Datepicker with minimum value</System.H2>
        <hr />
        <br />
        <System.DatePicker
          label="Pick a date with a minimum value"
          tooltip="Date must be today or after"
          name="exampleTwo"
          value={this.state.exampleTwo}
          min={new Date()}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.P>
          Declare the DatePicker component with a minimum value in the form of a
          Date or an ISO 8601 String.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleTwo extends React.Component {
    state = { exampleTwo: '' }
  
    _handleChange = e => this.setState(
      { [e.target.name]: e.target.value }
    );
  
    render() {
      return(
        <DatePicker
          label="Pick a date with a minimum value"
          tooltip="Date must be today or after"
          name="exampleTwo"
          value={this.state.exampleTwo}
          min={new Date()}
          onChange={this._handleChange}
        />
      )
    }
  }`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Datepicker with default value</System.H2>
        <hr />
        <br />
        <System.DatePicker
          label="Pick a date with a default value"
          name="exampleThree"
          value={this.state.exampleThree}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.P>
          Declare the DatePicker component with a default value in the form of a
          Date or an ISO 8601 String.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleThree extends React.Component {
    state = { exampleThree: "2020-07-13" }
  
    _handleChange = e => this.setState(
      { [e.target.name]: e.target.value }
    );
  
    render() {
      return(
        <DatePicker
          label="Pick a date with a default value"
          name="exampleThree"
          value={this.state.exampleThree}
          onChange={this._handleChange}
        />
      )
    }
  }`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="DatePicker">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      onChange
                    </span>
                  ),
                  b: "function",
                  c: "null",
                  d: "Function called upon an onChange event",
                },
                {
                  id: 2,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      value
                    </span>
                  ),
                  b: ["string", "Date"],
                  c: "null",
                  d:
                    "The value of the datepicker. Can be used to assign default values as well",
                },
                {
                  id: 3,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Input name",
                },
                {
                  id: 4,
                  a: "label",
                  b: "string",
                  c: "null",
                  d: "Label text",
                },
                {
                  id: 5,
                  a: "description",
                  b: "string",
                  c: "null",
                  d: "Description text",
                },
                {
                  id: 6,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "Tooltip text",
                },
                {
                  id: 7,
                  a: "min",
                  b: ["string", "Date"],
                  c: "null",
                  d: "Earliest date allowed. String must be in yyyy-mm-dd form",
                },
                {
                  id: 8,
                  a: "max",
                  b: ["string", "Date"],
                  c: "null",
                  d: "Latest date allowed. String must be in yyyy-mm-dd form",
                },
                {
                  id: 9,
                  a: "isDisabled",
                  b: "function",
                  c: "null",
                  d:
                    "Function that accepts a Date object and returns true if the date should be disabled (cannot be selected), false otherwise",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
