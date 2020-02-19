import Head from 'next/head';

import * as React from 'react';
import * as Constants from '~/common/constants';

import { H1, H2, P } from '~/components/Text';
import { css } from 'react-emotion';

import PageState from '~/components/PageState';

const STYLES_LAYOUT = css`
  padding: 24px 24px 88px 24px;
`;

function Page(props) {
  return (
    <React.Fragment>
      <Head>
        <title>FPS: Prototype</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <H1 style={{ marginTop: 24 }}>You can only see this authenticated.</H1>
        <H2 style={{ marginTop: 24 }}>
          <a href="/sign-in">Return to sign in page.</a>
        </H2>
        <H2 style={{ marginTop: 24 }}>
          <a href="/sign-out">Sign out.</a>
        </H2>
      </div>
    </React.Fragment>
  );
}

Page.getInitialProps = async ctx => {
  return {
    error: ctx.err,
    viewer: ctx.query.viewer,
    data: ctx.query.data,
  };
};

export default Page;
