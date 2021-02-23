import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const STYLES_WRAPPER = css`
  height: 200px;
  width: 320px;
`;

const STYLES_LAYER = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: cover;
  transition: all 0.1s ease-out;
  overflow: hidden;
  border-radius: 8px;
`;

export default class SystemPageCard3D extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: 3D Card" description="..." url="https://slate.host/_/system/card-3d">
        <System.H1>
          3D Card <ViewSourceLink file="system/card-3d.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The 3D Card Component is a fluid card component used to display present any object in 3d.
          It is a port of the vanilla JS <a href="https://codepen.io/robin-dela/pen/jVddbq">pen</a>{" "}
          of <a href="https://codepen.io/robin-dela">Robin Delaporte</a> to React. The code is used
          under the <a href="https://blog.codepen.io/documentation/licensing/">MIT license</a>.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import 3D Card Component.</System.P>
        <br />
        <br />
        <CodeBlock>{`import { Card3D } from 'slate-react-system';`}</CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the 3D Card Component.</System.P>
        <br />
        <CodeBlock>
          {`/* Custom styles for the container to set width and height */
<div css={STYLES_WRAPPER}>
  <Card3D>
    /* Any object with custom styles goes in here */
    <div
      css={STYLES_LAYER}
      style={{ 
        backgroundImage: 
          "url('http://robindelaporte.fr/codepen/visa-bg.jpg')" 
      }}
    />
    <div
      css={STYLES_LAYER}
      style={{ 
        backgroundImage: 
          "url('http://robindelaporte.fr/codepen/visa.png')" 
      }}
    />
  </Card3D>
</div>`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <div css={STYLES_WRAPPER}>
          <System.Card3D>
            <div
              css={STYLES_LAYER}
              style={{
                backgroundImage: "url('http://robindelaporte.fr/codepen/visa-bg.jpg')",
              }}
            />
            <div
              css={STYLES_LAYER}
              style={{
                backgroundImage: "url('http://robindelaporte.fr/codepen/visa.png')",
              }}
            />
          </System.Card3D>
        </div>
      </SystemPage>
    );
  }
}
