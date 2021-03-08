import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";
import Group from "~/components/system/Group";

const images = [
  "https://image.flaticon.com/icons/svg/145/145843.svg",
  "https://image.flaticon.com/icons/svg/387/387561.svg",
  "https://image.flaticon.com/icons/svg/3227/3227891.svg",
  "https://image.flaticon.com/icons/svg/3227/3227891.svg",
  "https://image.flaticon.com/icons/svg/3227/3227891.svg",
  "https://image.flaticon.com/icons/svg/3227/3227891.svg",
];

export default class SystemAvatarGroup extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Avatar Group"
        description="..."
        url="https://slate.host/_/system/avatar-group"
      >
        <System.H1>
          Avatar Group <ViewSourceLink file="system/avatar-group.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The AvatarGroup component is a compact way to show a group users or contributors.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the AvatarGroup Component.</System.P>
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { AvatarGroup } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Create an array of images.</System.P>
        <br />
        <CodeBlock>
          {`const images = [
  "avatar-01.jpg",
  "avatar-02.jpg",
  "avatar-04.jpg",
  "avatar-05.jpg",
  "avatar-06.jpg",
];`}
        </CodeBlock>
        <br />
        <br />
        <System.P>Declare the AvatarGroup component.</System.P>
        <br />
        <CodeBlock>{`<AvatarGroup avatars={images} />`}</CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.AvatarGroup avatars={images} size="48" />
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="AvatarGroup">
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
                  a: "size",
                  b: "int",
                  c: "32",
                  d: "Size of the avatar images in pixels",
                },
                {
                  id: 2,
                  a: "limit",
                  b: "int",
                  c: "3",
                  d: "Limit the number of visable avatars",
                },
                {
                  id: 3,
                  a: "avatars",
                  b: "array",
                  c: "[]",
                  d: "An array of images",
                },
                {
                  id: 5,
                  a: "border",
                  b: "string",
                  c: "white",
                  d: "Avatar border color",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
