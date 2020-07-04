import * as React from "react";
import * as System from "~/components/system";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageInputs extends React.Component {
  state = {
<<<<<<< HEAD
    exampleOne: 'Example text',
    exampleTwo: '',
    exampleThree: '',
    exampleFour: 'aaaaa-bbbbb-ccccc-ddddd-eeee',
    exampleFive: '',
=======
    twelve: "Replace me friend.",
    thirteen: ["t0001", "t0002", "t0003", "t0004"],
    fourteen: "",
    fifteen: "aaaaa-bbbbb-ccccc-ddddd",
    sixteen: "",
    seventeen: `Example text`,
>>>>>>> added country dropdown and refactored dropdown options
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
<<<<<<< HEAD
      <SystemPage title="SDS: Inputs" description="..." url="https://fps.onrender.com/system/inputs">
=======
      <SystemPage
        title="FCDS: Inputs"
        description="Lorem Ipsum."
        url="https://fps.onrender.com/system/inputs"
      >
>>>>>>> added country dropdown and refactored dropdown options
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
<<<<<<< HEAD
          Import React and the Input and/or the Textarea Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import { Input, Textarea } from 'slate-react-system';`}
=======
          Define the Input value states and handle the state change the when a
          change is made.
        </System.P>
        <br />
        <System.CodeBlock>
          {`state = {
  twelve: 'Replace me friend.',
  thirteen: '',
  fourteen: '',
  fifteen: 'aaaaa-bbbbb-ccccc-ddddd-eeee',
  sixteen: '',
  seventeen: 'Example text',
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};`}
>>>>>>> added country dropdown and refactored dropdown options
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Textarea</System.H2>
        <hr />
        <br />
        <System.P>Declare the Textarea component.</System.P>
        <br />
<<<<<<< HEAD
        <System.Textarea name="exampleOne" value={this.state.exampleOne} onChange={this._handleChange} />
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
=======
        <System.Textarea
          name="seventeen"
          value={this.state.seventeen}
          onChange={this._handleChange}
        />
        <br />
        <System.CodeBlock>
          {`<System.Textarea name="seventeen" value={this.state.seventeen} onChange={this._handleChange} />`}
>>>>>>> added country dropdown and refactored dropdown options
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
<<<<<<< HEAD
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
=======
          {`<System.Input
  label="Location of your pastries"
  description="We need to know the location of your pastries to sell them to other people."
  tooltip="Hey friends."
  name="fourteen"
  value={this.state.fourteen}
  placeholder="Pastry Location"
  onChange={this._handleChange}
/>`}
>>>>>>> added country dropdown and refactored dropdown options
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
<<<<<<< HEAD
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
=======
          {`<System.Input
  label="Max length is 14"
  max={14}
  name="sixteen"
  value={this.state.sixteen}
  onChange={this._handleChange}
/>`}
>>>>>>> added country dropdown and refactored dropdown options
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
<<<<<<< HEAD
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
=======
          {`<System.Input
  label="Copy and paste (read only)"
  readOnly
  name="fifteen"
  copyable
  value={this.state.fifteen}
  onChange={this._handleChange}
/>`}
>>>>>>> added country dropdown and refactored dropdown options
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
<<<<<<< HEAD
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
=======
          {`<System.Input label="Success" placeholder="This is an uncontrolled input for success." validation="SUCCESS" />
>>>>>>> added country dropdown and refactored dropdown options

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
<<<<<<< HEAD
                { key: 'a', name: 'Name', width: '128px' },
                { key: 'b', name: 'Type', width: '88px' },
                { key: 'c', name: 'Default', width: '88px' },
                { key: 'd', name: 'Description', width: '100%' },
              ],
              rows: [
                { id: 1, a: 'name', b: 'string', c: 'null', d: 'Radio Group name' },
                { id: 2, a: 'label', b: 'string', c: 'null', d: 'Label text' },
                { id: 3, a: 'max', b: 'number', c: 'null', d: 'Max number of input characters' },
                { id: 4, a: 'tooltip', b: 'string', c: 'null', d: 'Tooltip text' },
                {
                  id: 5,
                  a: 'validation',
                  b: 'string',
                  c: 'null',
                  d: 'Validation style. Use: SUCCESS, WARNING or ERROR',
=======
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Radio Group name",
                },
                { id: 2, a: "label", b: "string", c: "null", d: "Label text" },
                {
                  id: 3,
                  a: "max",
                  b: "number",
                  c: "null",
                  d: "Max number of input characters",
                },
                {
                  id: 4,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "Tooltip text",
                },
                {
                  id: 5,
                  a: "validation",
                  b: "string",
                  c: "null",
                  d: "Validation style. Use: SUCCESS, WARNING or ERROR",
>>>>>>> added country dropdown and refactored dropdown options
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
