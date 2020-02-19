import Head from 'next/head';

import * as React from 'react';
import * as Constants from '~/common/constants';

import { css, styled } from 'react-emotion';

import PageState from '~/components/PageState';

const STYLES_LAYOUT_ONE = css`
  font-size: 64px;
  width: 320px;
  height: calc(100vh - 76px);
  background: ${Constants.colors.gray3};
  overflow-y: scroll;
  padding: 24px;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const STYLES_LAYOUT_TWO = css`
  font-size: 64px;
  width: 320px;
  height: calc(100vh - 76px);
  background: ${Constants.colors.gray2};
  overflow-y: scroll;
  padding: 24px;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const STYLES_LAYOUT_THREE = css`
  min-width: 20%;
  width: 100%;
  background: ${Constants.colors.gray};
  height: calc(100vh - 76px);
  overflow-y: scroll;
  padding: 24px;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const STYLES_NAVIGATION = css`
  height: 48px;
  padding: 8px 24px 8px 24px;
  background: ${Constants.colors.gray4};
`;

const STYLES_LAYOUT = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export default class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>fps: prototype: home</title>
        </Head>
        <PageState>FPS Prototype 0.0.1 — /home</PageState>
        <nav className={STYLES_NAVIGATION}>&nbsp;</nav>
        <div className={STYLES_LAYOUT}>
          <span className={STYLES_LAYOUT_ONE}>&nbsp;</span>
          <span className={STYLES_LAYOUT_TWO}>&nbsp;</span>
          <span className={STYLES_LAYOUT_THREE}>&nbsp;</span>
        </div>
      </React.Fragment>
    );
  }
}
