import Head from 'next/head';

import * as React from 'react';
import * as Strings from '~/common/strings';

import { H1 } from '~/components/Text';
import { Button } from '~/components/Form';
import { css } from 'react-emotion';

const STYLES_BODY = css`
  padding: 24px;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_TITLE = css`
  font-size: 4.22rem;
  font-weight: 600;
`;

export default class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>FPS: Prototype</title>
        </Head>
        <div className={STYLES_BODY}>
          <div className={STYLES_TITLE}>FPS: Prototype</div>
        </div>
      </React.Fragment>
    );
  }
}
