import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageListEditor extends React.Component {
  state = {
    flavors: [
      "Chocolate",
      "Vanilla",
      "Mint Chip",
      "Pistachio",
      "Neapolitan",
      "Toffee",
      "Rocky Road",
    ],
  };

  _handleListChange = ({ name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: List Editor"
        description="..."
        url="https://slate.host/_/system/list-editor"
      >
        <System.H1>
          List Editor <ViewSourceLink file="system/listeditor.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The List Editor component allows the user to add to, delete from, and
          reorder a list of strings.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the ListEditor Component.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { ListEditor } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>List Editor</System.H2>
        <hr />
        <br />
        <System.ListEditor
          placeholder="Add a flavor"
          name="flavors"
          options={this.state.flavors}
          onChange={this._handleListChange}
        />
        <br />
        <System.P>Define the List Editor component.</System.P>
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  state = {
    flavors: [
      "Chocolate",
      "Vanilla",
      "Mint Chip",
      "Pistachio",
      "Neapolitan",
      "Toffee",
      "Rocky Road",
    ],
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ListEditor
        placeholder="Add a flavor"
        name="flavors"
        options={this.state.flavors}
        onChange={this._handleChange}
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
        <Group title="List Editor">
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
                      options
                    </span>
                  ),
                  b: "Array",
                  c: "null",
                  d:
                    "Values to choose from and reorder. Can be used to specify the default value. An array of strings.",
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
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
