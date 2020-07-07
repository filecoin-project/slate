import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageInputs extends React.Component {
  state = {
    exampleOne: "Example text",
    exampleTwo: "",
    exampleThree: "",
    exampleFour: "aaaaa-bbbbb-ccccc-ddddd-eeee",
    exampleFive: "",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Inputs"
        description="..."
        url="https://fps.onrender.com/system/inputs"
      >
        <System.H1>
          Inputs <ViewSourceLink file="system/inputs.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Input component is used to get a users input in a text field or a
          textbox.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the Input and/or the Textarea Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { Input, Textarea } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Textarea</System.H2>
        <hr />
        <br />
        <System.P>Declare the Textarea component.</System.P>
        <br />
        <System.Textarea
          name="exampleOne"
          value={this.state.exampleOne}
          onChange={this._handleChange}
        />
        <br />
        <System.CodeBlock>
          {`class ExampleTextarea extends React.Component {
   state = { exampleOne: 'Example text' }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
       return(
         <Textarea
           name="exampleOne"
           value={this.state.exampleOne}
           onChange={this._handleChange}
         />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Input with label and description</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the Input component with a label and description value.
        </System.P>
        <br />
        <System.Input
          label="Location of your pastries"
          description="We need to know the location of your pastries."
          tooltip="Hey friends."
          name="exampleTwo"
          value={this.state.exampleTwo}
          placeholder="Pastry Location"
          onChange={this._handleChange}
        />
        <br />
        <System.CodeBlock>
          {`class ExampleLabel extends React.Component {
  state = { exampleTwo: null }

  _handleChange = e => this.setState(
    { [e.target.name]: e.target.value }
  );

  render() {
    return(
      <Input
        label="Location of your pastries"
        description="We need to know the location of your pastries."
        tooltip="Hey friends."
        name="exampleTwo"
        value={this.state.exampleTwo}
        placeholder="Pastry Location"
        onChange={this._handleChange}
      />
    )
  }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Input with max length</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the Input component with the maximum number of characters
          allowed.
        </System.P>
        <br />
        <System.Input
          label="Max length is 14"
          max={14}
          name="exampleThree"
          value={this.state.exampleThree}
          onChange={this._handleChange}
        />
        <br />
        <System.CodeBlock>
          {`class ExampleMax extends React.Component {
   state = { exampleThree: null }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
     return(
       <Input
         label="Max length is 14"
         max={14}
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
        <System.H2>Input with copy and paste</System.H2>
        <hr />
        <br />
        <System.P>Declare the Input component with copyable.</System.P>
        <br />
        <System.Input
          label="Copy and paste (read only)"
          readOnly
          name="exampleFour"
          copyable
          value={this.state.exampleFour}
          onChange={this._handleChange}
        />
        <br />
        <System.CodeBlock>
          {`class ExampleCopyPaste extends React.Component {
   state = { exampleFour: 'aaaaa-bbbbb-ccccc-ddddd-eeee' }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
     return(
       <Input
         label="Copy and paste (read only)"
         readOnly
         name="exampleFour"
         copyable
         value={this.state.exampleFour}
         onChange={this._handleChange}
       />
     )
   }
}`}
        </System.CodeBlock>

        <br />
        <br />
        <br />
        <System.H2>Input with validation</System.H2>
        <hr />
        <br />
        <System.P>Declare the Input component with validation.</System.P>
        <br />
        <System.Input
          label="Success"
          placeholder="This is an uncontrolled input for success."
          validation="SUCCESS"
        />
        <br />
        <br />
        <System.Input
          label="Warning"
          placeholder="This is an uncontrolled input for warning."
          validation="WARNING"
        />
        <br />
        <br />
        <System.Input
          label="Error"
          placeholder="This is an uncontrolled input for error."
          validation="ERROR"
        />
        <br />
        <System.CodeBlock>
          {`class ExampleSuccess extends React.Component {
   render() {
     return(
       <Input
         label="Success"
         placeholder="This is an uncontrolled input for success."
         validation="SUCCESS"
       />
     )
   }
}

class ExampleWarning extends React.Component {
   render() {
     return(
       <Input
         label="Warning"
         placeholder="This is an uncontrolled input for warning."
         validation="WARNING"
       />
     )
   }
}

class ExampleError extends React.Component {
   render() {
     return(
         <Input
           label="Error"
           placeholder="This is an uncontrolled input for error."
           validation="ERROR"
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
        <Group title="Inputs">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px" },
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
                  b: <System.CodeText nowrap>function</System.CodeText>,
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
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d:
                    "The value that the dropdown takes. Can be used to assign default values as well.",
                },
                {
                  id: 3,
                  a: "name",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Input name",
                },
                {
                  id: 4,
                  a: "label",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Label text",
                },
                {
                  id: 5,
                  a: "description",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Description text",
                },
                {
                  id: 6,
                  a: "tooltip",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Tooltip text",
                },
                {
                  id: 7,
                  a: "max",
                  b: <System.CodeText nowrap>int</System.CodeText>,
                  c: "null",
                  d: "Max number of input characters",
                },
                {
                  id: 8,
                  a: "validation",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Validation style. Use: SUCCESS, WARNING or ERROR",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
