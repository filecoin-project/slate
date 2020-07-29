import * as React from "react";
import * as System from "~/components/system";
import * as SVG from "~/components/system/svg";
import * as OldSVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const DEFAULT_SYSTEM_ICON_SIZE = "88px";

const ICONS = [
  <OldSVG.Home height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Folder height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Wallet height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Channels height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Deals height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Peers height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Status height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Stats height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.DataTransfer height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Logs height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Miners height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.StorageMarket height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.HardDrive height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.BandwidthUp height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.BandwidthDown height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Information height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.CopyAndPaste height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.FileImage height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Plus height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.CheckBox height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Slates height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.ProfileUser height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.SettingsDeveloper height={DEFAULT_SYSTEM_ICON_SIZE} />,
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
      <SystemPage
        title="SDS: Icons"
        description="..."
        url="https://slate.host/system/icons"
      >
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
        <CodeBlock>
          {`import { SVG } from "slate-react-system";
import { OldSVG } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the SVG icons.</System.P>
        <br />
        <CodeBlock>
          {`<OldSVG.Home height='88px' />
<OldSVG.Folder height='88px' />
<OldSVG.Wallet height='88px' />
<OldSVG.Channels height='88px' />
<OldSVG.Deals height='88px' />
<OldSVG.Peers height='88px' />
<OldSVG.Deals height='88px' />
<OldSVG.Status height='88px' />
<OldSVG.Stats height='88px' />
<OldSVG.DataTransfer height='88px' />
<OldSVG.Logs height='88px' />
<OldSVG.Miners height='88px' />
<OldSVG.StorageMarket height='88px' />
<OldSVG.Slates height='88px' />
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
