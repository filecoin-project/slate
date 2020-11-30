import * as React from "react";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const DEFAULT_SYSTEM_ICON_SIZE = "88px";

const ICONS = [
  <SVG.BandwidthUp height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.BandwidthDown height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Information height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.CopyAndPaste height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Plus height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.CheckBox height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Layers height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Slates height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Home height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Activity height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Directory height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Folder height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Wallet height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Deals height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.HardDrive height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.ProfileUser height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.SettingsDeveloper height={DEFAULT_SYSTEM_ICON_SIZE} />,
];

const STYLES_ICON = css`
  padding: 24px;
  color: ${Constants.system.pitchBlack};
  display: inline-flex;
  transition: 200ms ease color;
  text-align: center;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export default class SystemPageIcons extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Icons" description="..." url="https://slate.host/_/system/icons">
        <System.H1>
          Icons <ViewSourceLink file="system/icons.js" />
        </System.H1>
        <br />
        <br />
        <System.P>Every icon used in the Filecoin Client.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import the SVG Components.</System.P>
        <br />
        <br />
        <CodeBlock>{`import { SVG } from "slate-react-system";`}</CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the SVG icons.</System.P>
        <br />
        <CodeBlock>
          {`<SVG.Home height='88px' />
<SVG.Folder height='88px' />
<SVG.Wallet height='88px' />
<SVG.Channels height='88px' />
<SVG.Deals height='88px' />
<SVG.Peers height='88px' />
<SVG.Deals height='88px' />
<SVG.Status height='88px' />
<SVG.Stats height='88px' />
<SVG.DataTransfer height='88px' />
<SVG.Logs height='88px' />
<SVG.Miners height='88px' />
<SVG.StorageMarket height='88px' />
<SVG.Slates height='88px' />
<SVG.BandwidthUp height='88px' />
<SVG.BandwidthDown height='88px' />
<SVG.Information height='88px' />
<SVG.CopyAndPaste height='88px' />
<SVG.FileImage height='88px' />
<SVG.Plus height='88px' />
<SVG.CheckBox height='88px' />`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        {ICONS.map((icon, i) => {
          return (
            <div css={STYLES_ICON} key={i}>
              {icon}
            </div>
          );
        })}
      </SystemPage>
    );
  }
}
