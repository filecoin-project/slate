import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageInputs extends React.Component {
  state = {
    exampleOne: "Example text",
    exampleTwo: "",
    exampleThree: "",
    exampleFour: "aaaaa-bbbbb-ccccc-ddddd-eeee",
    exampleFive: "Click the 'x'",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Inputs"
        description="..."
        url="https://slate.host/_/system/inputs"
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
        <CodeBlock>
          {`import * as React from "react";
import { Input, Textarea } from "slate-react-system";`}
        </CodeBlock>
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
        <CodeBlock>
          {`class ExampleTextarea extends React.Component {
  state = { exampleOne: "Example text" };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Textarea
        name="exampleOne"
        value={this.state.exampleOne}
        onChange={this._handleChange}
      />
    );
  }
}`}
        </CodeBlock>
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
        <CodeBlock>
          {`class ExampleLabel extends React.Component {
  state = { exampleTwo: null };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Input
        label="Location of your pastries"
        description="We need to know the location of your pastries."
        tooltip="Hey friends."
        name="exampleTwo"
        value={this.state.exampleTwo}
        placeholder="Pastry Location"
        onChange={this._handleChange}
      />
    );
  }
}`}
        </CodeBlock>
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
        <CodeBlock>
          {`class ExampleMax extends React.Component {
  state = { exampleThree: null };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Input
        label="Max length is 14"
        max={14}
        name="exampleThree"
        value={this.state.exampleThree}
        onChange={this._handleChange}
      />
    );
  }
}`}
        </CodeBlock>
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
        <CodeBlock>
          {`class ExampleCopyPaste extends React.Component {
  state = { exampleFour: "aaaaa-bbbbb-ccccc-ddddd-eeee" };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Input
        label="Copy and paste (read only)"
        readOnly
        name="exampleFour"
        copyable
        value={this.state.exampleFour}
        onChange={this._handleChange}
      />
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Input with icon and onSubmit</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the Input component with an icon and an onSubmit function.
          onSubmit will be triggered upon click of the icon and upon key down of
          the enter key.
        </System.P>
        <br />
        <System.Input
          label="Icon and submit function"
          name="exampleFive"
          icon={SVG.Dismiss}
          onSubmit={() => {
            this.setState({ exampleFive: "" });
          }}
          value={this.state.exampleFive}
          onChange={this._handleChange}
        />
        <br />
        <CodeBlock>
          {`class ExampleCopyPaste extends React.Component {
  state = { exampleFive: "Click the 'x'" };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Input
        label="Icon with submit function"
        name="exampleFive"
        icon={SVG.Dismiss}
        onSubmit={() => {
          this.setState({ exampleFive: "" });
        }}
        value={this.state.exampleFive}
        onChange={this._handleChange}
      />
    );
  }
}`}
        </CodeBlock>
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
        <CodeBlock>
          {`class ExampleSuccess extends React.Component {
  render() {
    return (
      <Input
        label="Success"
        placeholder="This is an uncontrolled input for success."
        validation="SUCCESS"
      />
    );
  }
}

class ExampleWarning extends React.Component {
  render() {
    return (
      <Input
        label="Warning"
        placeholder="This is an uncontrolled input for warning."
        validation="WARNING"
      />
    );
  }
}

class ExampleError extends React.Component {
  render() {
    return (
      <Input
        label="Error"
        placeholder="This is an uncontrolled input for error."
        validation="ERROR"
      />
    );
  }
}`}
        </CodeBlock>
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
                  d: "Function called upon an onChange event.",
                },
                {
                  id: 2,
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
                  id: 3,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Input name.",
                },
                {
                  id: 4,
                  a: "label",
                  b: "string",
                  c: "null",
                  d: "Label text.",
                },
                {
                  id: 5,
                  a: "description",
                  b: "string",
                  c: "null",
                  d: "Description text.",
                },
                {
                  id: 6,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "Tooltip text.",
                },
                {
                  id: 7,
                  a: "full",
                  b: "boolean",
                  c: "false",
                  d: "Sets width to 100% if true",
                },
                {
                  id: 8,
                  a: "max",
                  b: "int",
                  c: "null",
                  d: "Max number of input characters.",
                },
                {
                  id: 9,
                  a: "validation",
                  b: "string",
                  c: "null",
                  d: "Validation style. Use: SUCCESS, WARNING or ERROR.",
                },
                {
                  id: 10,
                  a: "copyable",
                  b: "boolean",
                  c: "false",
                  d:
                    "Adds a copy icon to the input and upon click, copies the input value to the clipboard.",
                },
                {
                  id: 11,
                  a: "icon",
                  b: "SVG",
                  c: "null",
                  d:
                    "Icon on the right side of the input box. If an onSubmit is specified, it will trigger on click. Specifying an icon overrides copyable.",
                },
                {
                  id: 12,
                  a: "unit",
                  b: "string",
                  c: "null",
                  d:
                    "Adds a string to the right side of the input box to indicate a unit of measurement.",
                },
                {
                  id: 13,
                  a: "onSubmit",
                  b: "function",
                  c: "null",
                  d:
                    "Function called when the enter key is pressed and when the icon (if present) is clicked.",
                },
                {
                  id: 14,
                  a: "containerStyle",
                  b: "object",
                  c: "null",
                  d:
                    "Style object applied to the container that holds the label, description, and input box.",
                },
                {
                  id: 15,
                  a: "style",
                  b: "object",
                  c: "null",
                  d: "Style object applied to the input box.",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
