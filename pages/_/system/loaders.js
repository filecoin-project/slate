import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemLoaders extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Loaders" description="..." url="https://slate.host/_/system/loaders">
        <System.H1>
          Loaders <ViewSourceLink file="system/loaders.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The Loader Component is used to output an animated page loader.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import the Loader Components.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import {
  LoaderCircles,
  LoaderDiamonds,
  LoaderMoon,
  LoaderRotate,
  LoaderProgress,
  LoaderSpinner,
} from "slate-react-system";
            `}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Circles</System.P>
        <br />
        <System.LoaderCircles />
        <br />
        <CodeBlock>{`<LoaderCircles />`}</CodeBlock>
        <br />
        <br />
        <br />
        <System.P>Progress Bar</System.P>
        <br />
        <System.LoaderProgress />
        <br />
        <CodeBlock>{`<LoaderProgress />`}</CodeBlock>
        <br />
        <br />
        <br />
        <System.P>Spinner</System.P>
        <br />
        <System.LoaderSpinner />
        <br />
        <br />
        <CodeBlock>{`<LoaderSpinner />`}</CodeBlock>
        <br />
        <br />
        <br />
        <System.P>Diamonds</System.P>
        <br />
        <System.LoaderDiamonds />
        <br />
        <CodeBlock>{`<LoaderDiamonds />`}</CodeBlock>
        <br />
        <br />
        <br />
        <System.P>Rotate</System.P>
        <br />
        <System.LoaderRotate />
        <br />
        <CodeBlock>{`<LoaderRotate />`}</CodeBlock>
        <br />
        <br />
        <br />
        <System.P>Moon</System.P>
        <br />
        <System.LoaderMoon />
        <br />
        <CodeBlock>{`<LoaderMoon />`}</CodeBlock>
      </SystemPage>
    );
  }
}
