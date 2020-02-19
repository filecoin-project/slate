import Head from 'next/head';
import Cookies from 'universal-cookie';

import * as React from 'react';
import * as Actions from '~/common/actions';
import * as Constants from '~/common/constants';

import { H1, H2, P } from '~/components/Text';
import { Input, Button } from '~/components/Form';
import { css } from 'react-emotion';

import PageState from '~/components/PageState';

const STYLES_FORM = css`
  padding: 24px;
  width: 100%;
  margin: 48px auto 0 auto;
  max-width: 768px;
`;

const STYLES_TOP = css`
  margin-top: 48px;
`;

const STYLES_LAYOUT = css`
  padding: 24px 24px 88px 24px;
`;

function Page(props) {
  const [auth, setAuth] = React.useState({ email: '', password: '' });

  return (
    <React.Fragment>
      <Head>
        <title>FPS: Prototype</title>
      </Head>
      <PageState data={props} />
      <div className={STYLES_LAYOUT}>
        <H1 style={{ marginTop: 24 }}>Sign in</H1>
        <H2 style={{ marginTop: 24 }}>
          <a href={props.googleURL}>Create an account through Google.</a>
        </H2>
        <H2 style={{ marginTop: 24 }}>
          <a href="/sign-in-success">View an authenticated only page.</a>
        </H2>
        <H2 style={{ marginTop: 24 }}>
          <a href="/sign-out">Sign out.</a>
        </H2>
        <div className={STYLES_FORM}>
          <P style={{ marginTop: 24, padding: 0 }}>E-mail</P>
          <Input
            autoComplete="off"
            name="email"
            value={auth.email}
            onChange={e =>
              setAuth({ ...auth, [e.target.name]: e.target.value })
            }
          />
          <P style={{ marginTop: 24, padding: 0 }}>Password</P>
          <Input
            autoComplete="off"
            name="password"
            type="password"
            value={auth.password}
            onChange={e =>
              setAuth({ ...auth, [e.target.name]: e.target.value })
            }
          />
          <div className={STYLES_TOP}>
            <Button onClick={e => Actions.onLocalSignIn(e, props, auth)}>
              Sign in or create account
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Page.getInitialProps = async ctx => {
  return {
    googleURL: ctx.query.googleURL,
    viewer: ctx.query.viewer,
    error: ctx.err,
  };
};

export default Page;
