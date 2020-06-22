import * as React from 'react';
import * as Strings from '~/common/strings';
import * as System from '~/components/system';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

import SystemPage from '~/components/system/SystemPage';

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
      <SystemPage title="FCDS: Colors" description="Lorem Ipsum" url="https://fps.onrender.com/system/colors">
        <System.H1>Colors</System.H1>
        <br />
        <br />
        <System.P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </System.P>
        <br />
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
              }}>
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
