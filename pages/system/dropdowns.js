import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "Capricorn" },
  { value: "2", name: "Aquarius" },
  { value: "3", name: "Pisces" },
  { value: "4", name: "Aries" },
  { value: "5", name: "Taurus" },
  { value: "6", name: "Gemini" },
  { value: "7", name: "Cancer" },
  { value: "8", name: "Leo" },
  { value: "9", name: "Virgo" },
  { value: "10", name: "Libra" },
  { value: "11", name: "Scorpio" },
  { value: "12", name: "Sagittarus" },
];

export default class SystemPageDropdowns extends React.Component {
  state = {
    exampleOne: "1",
    exampleTwo: "3",
    exampleThree: "United States of America",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Dropdowns"
        description="..."
        url="https://slate.host/system/dropdowns"
      >
        <System.H1>
          Dropdowns <ViewSourceLink file="system/dropdowns.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Dropdown component is used to present the user a list of values
          where they can select a single option.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the <System.CodeText>SelectMenu</System.CodeText>{" "}
          and/or the <System.CodeText>SelectCountryMenu</System.CodeText>{" "}
          Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { SelectMenu, SelectCountryMenu } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Dropdown</System.H2>
        <hr />
        <br />
        <System.SelectMenu
          label="Pick a horoscope"
          name="exampleOne"
          value={this.state.exampleOne}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}
        />
        <br />
        <br />
        <System.SelectMenu
          label="Pick a horoscope (full length)"
          name="exampleTwo"
          full
          value={this.state.exampleTwo}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}
        />
        <br />
        <br />
        <br />
        <System.P>
          Define the dropdown menu options. Each entry must have a name and a
          value.
        </System.P>
        <br />
        <System.CodeBlock>
          {`const SELECT_MENU_OPTIONS = [
  { value: '1', name: 'Capricorn' },
  { value: '2', name: 'Aquarius' },
  { value: '3', name: 'Pisces' },
  { value: '4', name: 'Aries' },
  { value: '5', name: 'Taurus' },
  { value: '6', name: 'Gemini' },
  { value: '7', name: 'Cancer' },
  { value: '8', name: 'Leo' },
  { value: '9', name: 'Virgo' },
  { value: '10', name: 'Libra' },
  { value: '11', name: 'Scorpio' },
  { value: '12', name: 'Sagittarus' },
];`}
        </System.CodeBlock>
        <br />
        <br />
        <System.P>
          Declare the Dropdown component. Default values can be assigned using{" "}
          <System.CodeText>value</System.CodeText>.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
   state = { exampleOne: '1' }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
     return(
       <SelectMenu
         label="Pick a horoscope"
         name="exampleOne"
         value={this.state.exampleOne}
         category="horoscope"
         onChange={this._handleChange}
         options={SELECT_MENU_OPTIONS}
       />
     )
   }
}


class ExampleTwo extends React.Component {
  state = { exampleTwo: '3' }

  _handleChange = e => this.setState(
    { [e.target.name]: e.target.value }
  );

  render() {
    return(
      <SelectMenu
        label="Pick a horoscope (full length)"
        name="exampleTwo"
        full
        value={this.state.exampleTwo}
        category="horoscope"
        onChange={this._handleChange}
        options={SELECT_MENU_OPTIONS}
      />
    )
  }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Country Picker Dropdown</System.H2>
        <hr />
        <br />
        <System.SelectCountryMenu
          label="Pick your country"
          name="exampleThree"
          full
          value={this.state.exampleThree}
          category="country"
          onChange={this._handleChange}
        />
        <br />
        <br />
        <br />
        <System.P>
          Declare a dropdown to select from a list of countries.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleThree extends React.Component {
  state = { exampleThree: "United States of America" }

  _handleChange = e => this.setState(
    { [e.target.name]: e.target.value }
  );

  render() {
    return(
      <SelectCountryMenu
        label="Pick your country"
        name="countryMenu"
        full
        value={this.state.countryMenu}
        category="country"
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
        <Group title="Dropdowns">
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
                      options
                    </span>
                  ),
                  b: "Array",
                  c: "[]",
                  d:
                    "Array of options to select from. Each object in the array should have a name and value",
                },
                {
                  id: 2,
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
                  id: 3,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      value
                    </span>
                  ),
                  b: "string",
                  c: "null",
                  d:
                    "The value that the dropdown takes. Can be used to assign default values as well.",
                },
                {
                  id: 4,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Input name",
                },
                {
                  id: 5,
                  a: "label",
                  b: "string",
                  c: "null",
                  d: "Label text",
                },
                {
                  id: 6,
                  a: "description",
                  b: "string",
                  c: "null",
                  d: "Description text",
                },
                {
                  id: 7,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "Tooltip text",
                },
                {
                  id: 8,
                  a: "full",
                  b: "boolean",
                  c: "false",
                  d: "Sets width to 100% if true",
                },
                {
                  id: 9,
                  a: "category",
                  b: "string",
                  c: "null",
                  d: "Category text",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
