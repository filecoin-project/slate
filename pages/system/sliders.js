import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageSliders extends React.Component {
  state = {
    one: 0,
    two: 0,
    three: 9500,
    four: 0,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Sliders"
        description="..."
        url="https://slate.host/system/sliders"
      >
        <System.H1>
          Sliders <ViewSourceLink file="system/sliders.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Slider component is used to select from a range of numeric values.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the Slider Component.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { Slider } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Slider</System.H2>
        <hr />
        <br />
        <System.Slider
          discrete
          label="Discrete Slider"
          value={this.state.one}
          name="one"
          min={0}
          max={100}
          step={20}
          onChange={this._handleChange}
        />
        <br />
        <System.Slider
          label="Continuous Slider"
          value={this.state.two}
          name="two"
          min={0}
          max={100}
          step={20}
          onChange={this._handleChange}
        />
        <br />
        <System.P>
          Declare the Slider component, specifying a{" "}
          <System.CodeText>min</System.CodeText>,{" "}
          <System.CodeText>max</System.CodeText>, and{" "}
          <System.CodeText>step</System.CodeText>. Declaring{" "}
          <System.CodeText>discrete</System.CodeText> true will yield a slider
          that snaps to each step.
        </System.P>
        <br />
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  state = {
    one: 0,
    two: 0,
  };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <System.Slider
          discrete
          label="Discrete Slider"
          value={this.state.one}
          name="one"
          min={0}
          max={100}
          step={20}
          onChange={this._handleChange}
        />
        <System.Slider
          label="Continuous Slider"
          value={this.state.two}
          name="two"
          min={0}
          max={100}
          step={20}
          onChange={this._handleChange}
        />
      </div>
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Slider with display</System.H2>
        <hr />
        <br />
        <System.Slider
          inputBox
          label="Slider with Input Box"
          min={9000}
          max={10000}
          step={100}
          value={this.state.three}
          name="three"
          onChange={this._handleChange}
          inputStyle={{ width: "80px" }}
        />
        <br />
        <System.Slider
          bubble
          label="Slider with Display Bubble"
          min={-10}
          max={10}
          step={0.5}
          value={this.state.four}
          name="four"
          onChange={this._handleChange}
        />
        <br />
        <System.P>
          You can declare the Slider component with{" "}
          <System.CodeText>inputBox</System.CodeText> or{" "}
          <System.CodeText>bubble</System.CodeText> to include a display of the
          value. Values can be entered in the input box and the input box can be
          styled with <System.CodeText>inputStyle</System.CodeText>.
        </System.P>
        <br />
        <br />
        <CodeBlock>
          {`class ExampleTwo extends React.Component {
  state = {
    three: 9500,
    four: 0,
  };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <System.Slider
          inputBox
          label="Slider with Input Box"
          min={9000}
          max={10000}
          step={100}
          value={this.state.one}
          name="three"
          onChange={this._handleChange}
          inputStyle={{ width: "60px" }}
        />
        <System.Slider
          bubble
          label="Slider with Display Bubble"
          min={-10}
          max={10}
          step={0.5}
          value={this.state.four}
          name="four"
          onChange={this._handleChange}
        />
      </div>
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
        <Group title="Toggles">
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
                  b: "number",
                  c: "null",
                  d:
                    "The value that the slider takes. Can be used to assign default values as well.",
                },
                {
                  id: 3,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Slider name.",
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
                  a: "min",
                  b: "number",
                  c: "0",
                  d: "Lower end of range",
                },
                {
                  id: 8,
                  a: "max",
                  b: "number",
                  c: "100",
                  d: "Higher end of range",
                },
                {
                  id: 9,
                  a: "step",
                  b: "number",
                  c: "1",
                  d: "Increments in which values can be selected.",
                },
                {
                  id: 10,
                  a: "discrete",
                  b: "boolean",
                  c: "false",
                  d:
                    "If true, slider will snap to steps specified. Otherwise, slider is continuous",
                },
                {
                  id: 11,
                  a: "bubble",
                  b: "boolean",
                  c: "false",
                  d:
                    "If true, a bubble floating above the handle will be displayed with the selected value.",
                },
                {
                  id: 12,
                  a: "inputBox",
                  b: "boolean",
                  c: "false",
                  d:
                    "If true, an input box will be displayed with the selected value. The value can be edited using the input box.",
                },
                {
                  id: 13,
                  a: "inputStyle",
                  b: "Object",
                  c: "null",
                  d:
                    "Style applied to the input box (useful for specifying width, etc).",
                },
                {
                  id: 14,
                  a: "containerStyle",
                  b: "Object",
                  c: "null",
                  d:
                    "Style applied to the container holding the slider and input box (useful for specifying margin or height, etc).",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
