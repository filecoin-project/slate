import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageStats extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Stats"
        description="..."
        url="https://fps.onrender.com/system/stats"
      >
        <System.H1>
          Stats <ViewSourceLink file="system/stats.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The System Stats component is used to show a system stat with an
          upload or a download icon.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the StatUpload and/or the StatDownload Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { StatUpload, StatDownload } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>
          Delcare the StatUpload and/or the StatDownload components. Decimal
          prop is optional as it defaults to 2
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
   render() {
       return(
          <StatUpload size="40000000" decimal="5" />
       )
   }
}

class ExampleTwo extends React.Component {
   render() {
       return(
          <StatDownload size="40000000" />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.StatUpload size="40000000" decimal="5" />{" "}
        <System.StatDownload size="40000000" />
      </SystemPage>
    );
  }
}
