import Head from 'next/head';
import Cookies from 'universal-cookie';

import * as React from 'react';
import * as Constants from '~/common/constants';

import { H1, H2, P } from '~/components/Text';
import { css } from 'react-emotion';

import PageState from '~/components/PageState';

const cookies = new Cookies();

const STYLES_LAYOUT = css`
  padding: 24px 24px 88px 24px;
`;

function Page(props) {
  React.useEffect(() => {
    const jwt = cookies.get(Constants.session.key);
    if (jwt) {
      cookies.remove(Constants.session.key);
      return;
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>FPS: Prototype</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <H1 style={{ marginTop: 24 }}>Signed out</H1>
        <H2 style={{ marginTop: 24 }}>
          <a href="/sign-in">Sign in.</a>
        </H2>
      </div>
    </React.Fragment>
  );
}

Page.getInitialProps = async ctx => {
  return {
    error: ctx.err,
    viewer: ctx.query.viewer,
    jwt: ctx.query.jwt,
  };
};

export default Page;
