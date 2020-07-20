import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const RADIO_GROUP_OPTIONS = [
  {
    value: "1",
    label: (
      <React.Fragment>
        <strong>Option one</strong>
        <br />I want to have cake and soda for breakfast.
      </React.Fragment>
    ),
  },
  {
    value: "2",
    label: (
      <React.Fragment>
        <strong>Option two</strong>
        <br />I want to have cake and soda for lunch.
      </React.Fragment>
    ),
  },
  {
    value: "3",
    label: (
      <React.Fragment>
        <strong>Option three</strong>
        <br />I want to have cake and soda for dinner.
      </React.Fragment>
    ),
  },
];

export default class SystemPageRadios extends React.Component {
  state = {
    exampleOne: "2",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Radios"
        description="..."
        url="https://slate.host/system/radios"
      >
        <System.H1>
          Radios <ViewSourceLink file="system/radios.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Radio component is used when you require a user to select only one
          value in a series of options.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the RadioGroup Component.</System.P>
        <br />
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { RadioGroup } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the radio group values and labels.</System.P>
        <br />
        <System.CodeBlock>
          {`const RADIO_GROUP_OPTIONS = [
  {
    value: '1',
    label: (
      <React.Fragment>
        <strong>Option one</strong>
        <br />I want to have cake and soda for breakfast.
      </React.Fragment>
    ),
  },
  {
    value: '2',
    label: (
      <React.Fragment>
        <strong>Option two</strong>
        <br />I want to have cake and soda for lunch.
      </React.Fragment>
    ),
  },
  {
    value: '3',
    label: (
      <React.Fragment>
        <strong>Option three</strong>
        <br />I want to have cake and soda for dinner.
      </React.Fragment>
    ),
  }
];`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the RadioGroup component.</System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
   state = { ExampleOne: '2' }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
       return(
         <RadioGroup
           name="ExampleOne"
           options={RADIO_GROUP_OPTIONS}
           selected={this.state.ExampleOne}
           onChange={this._handleChange}
         />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.RadioGroup
          name="exampleOne"
          options={RADIO_GROUP_OPTIONS}
          selected={this.state.exampleOne}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="RadioGroup">
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
                      selected
                    </span>
                  ),
                  b: "boolean",
                  c: "false",
                  d:
                    "The value that is currently selected. Can be used to assign default values as well",
                },
                {
                  id: 3,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      options
                    </span>
                  ),
                  b: "Array",
                  c: "[]",
                  d:
                    "An array of options, each of which has a value and a label",
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
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
