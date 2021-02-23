import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageCard3D extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: 3D Card" description="..." url="https://slate.host/_/system/card-3d">
        <System.H1>
          3D Card <ViewSourceLink file="system/card-3d.js" />
        </System.H1>
        <br />
        <br />
        <System.P>All of the colors the Filecoin Client uses.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import Constants.</System.P>
        <br />
        <br />
        <CodeBlock>{`import { Constants } from 'slate-react-system';`}</CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare Constants.</System.P>
        <br />
        <CodeBlock>
          {`{Constants.system.white};

{Constants.system.foreground};

{Constants.system.gray};

{Constants.system.border};

{Constants.system.darkGray};

{Constants.system.black};

{Constants.system.pitchBlack};

{Constants.system.brand};

{Constants.system.link};

{Constants.system.green};

{Constants.system.yellow};

{Constants.system.red};`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.Card3D />
      </SystemPage>
    );
  }
}
