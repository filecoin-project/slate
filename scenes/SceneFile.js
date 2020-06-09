import * as React from 'react';
import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';
import * as Fixtures from '~/common/fixtures';
import * as System from '~/components/system';
import * as SVG from '~/components/system/svg';

import { css } from '@emotion/react';

import Section from '~/components/core/Section';
import ScenePage from '~/components/core/ScenePage';

const STYLES_FLEX = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100vh - ${Constants.sizes.header}px);
`;

const STYLES_TOP = css`
  background: ${Constants.system.pitchBlack};
  border-bottom: 1px solid ${Constants.system.black};
  color: ${Constants.system.white};
  width: 100%;
  padding: 12px 16px 12px 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  cursor: pointer;
  height: 100%;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_ASSET = css`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 10%;
  height: 100%;
  background-color: ${Constants.system.pitchBlack};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const STYLES_BOTTOM = css`
  background: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  padding: 12px 16px 12px 48px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_PATH = css`
  font-family: 'mono';
  color: ${Constants.system.white};
  font-size: 12px;
  text-transform: uppercase;
  overflow-wrap: break-word;
`;

const STYLES_ITEM = css`
  border-radius: 4px;
  outline: 0;
  border: 0;
  min-height: 32px;
  padding: 6px 16px 6px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  font-family: 'inter-semi-bold';
  transition: 200ms ease all;
  cursor: pointer;
  background-color: ${Constants.system.brand};
  color: ${Constants.system.white};
  margin-left: 16px;

  :hover {
    background-color: ${Constants.system.green};
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    outline: 0;
    border: 0;
  }
`;

export default class SceneFile extends React.Component {
  state = {};

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const fileURL = `/static/files/${this.props.file.file}`;

    return (
      <div css={STYLES_FLEX}>
        <div css={STYLES_TOP}>
          <div css={STYLES_LEFT}>
            <span css={STYLES_PATH}>{fileURL}</span>
          </div>
          <div css={STYLES_RIGHT} onClick={() => this.props.onBack()}>
            <SVG.Dismiss height="24px" />
          </div>
        </div>
        <div css={STYLES_ASSET} style={{ backgroundImage: `url('${fileURL}')` }} />
      </div>
    );
  }
}
