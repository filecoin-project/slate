import * as React from 'react';
import * as System from '~/components/system';
import * as SVG from '~/components/system/svg';
import * as OldSVG from '~/common/svg';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

const DEFAULT_SYSTEM_ICON_SIZE = '88px';

const ICONS = [
  <OldSVG.Home height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Folder height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Wallet height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Channels height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Deals height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Peers height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Deals height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Status height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Stats height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.DataTransfer height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Logs height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.Miners height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <OldSVG.StorageMarket height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.BandwidthUp height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.BandwidthDown height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Information height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.CopyAndPaste height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.FileImage height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.Plus height={DEFAULT_SYSTEM_ICON_SIZE} />,
  <SVG.CheckBox height={DEFAULT_SYSTEM_ICON_SIZE} />,
];

const STYLES_ICON = css`
  padding: 24px;
  color: ${Constants.system.pitchBlack};
  display: inline-flex;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export default class SystemPageIcons extends React.Component {
  render() {
    return (
      <SystemPage title="FCDS: Icons" description="Lorem Ipsum." url="https://fps.onrender.com/system/icons">
        <System.H1>
          Icons <ViewSourceLink file="icons.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of every icon used in the Filecoin Client.</System.P>
        <br />
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
