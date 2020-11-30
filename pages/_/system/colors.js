import * as React from "react";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const STYLES_COLOR_BAR = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 72px 24px 0 0px;
`;

const STYLES_COLOR_TEXT = css`
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  font-size: 12px;
  padding: 8px;
  color: ${Constants.system.white};
  background-color: rgba(0, 0, 0, 0.4);
  margin-top: 8px;
`;

export default class SystemPageColors extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Colors" description="..." url="https://slate.host/_/system/colors">
        <System.H1>
          Colors <ViewSourceLink file="system/colors.js" />
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
        {Object.keys(Constants.system).map((each) => {
          const hex = Constants.system[each];
          const rgba = Strings.hexToRGBA(hex);
          return (
            <div
              key={each}
              css={STYLES_COLOR_BAR}
              style={{
                backgroundColor: hex,
                color: Constants.system.black,
              }}
            >
              <span css={STYLES_COLOR_TEXT}>{each.toUpperCase()}</span>
              <br />
              <span css={STYLES_COLOR_TEXT}>{hex}</span>
              <br />
              <span css={STYLES_COLOR_TEXT}>{rgba}</span>
            </div>
          );
        })}
      </SystemPage>
    );
  }
}
