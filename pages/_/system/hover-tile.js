import * as React from "react";
import * as System from "~/components/system";

import Group from "~/components/system/Group";
import SystemPage from "../../../components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from '~/components/system/CodeBlock';

export default class SystemHoverTile extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Hover Tile"
        description="..."
        url="https://slate.host/_/system/hover-tile"
      >
        <System.H1>
          Hover Tile <ViewSourceLink file="system/hover-tile.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The Hover Tile component is an animated, moving container.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the Hover Tile Component.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { HoverTile } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the Hover Tile component.</System.P>
        <CodeBlock>
          {`class Example extends React.Component {
  render() {
    return (
      <HoverTile style={{ padding: 24 }}>
        Example Content
      </HoverTile>
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.HoverTile style={{ padding: 24 }}>
          Example Content
        </System.HoverTile>
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Hover Tiles">
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
                  a: "width",
                  b: "number",
                  c: "300",
                  d: "Hover Tile width",
                },
                {
                  id: 2,
                  a: "height",
                  b: "number",
                  c: "300",
                  d: "Hover Tile height",
                },
                {
                  id: 3,
                  a: "style",
                  b: "Object",
                  c: "{}",
                  d: "Style object used to style the Hover Tile (background-color, etc.)",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}