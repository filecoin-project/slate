import * as React from "react";

import { css, Global } from "@emotion/core";

import App from "next/app";
import { injectGlobalStyles, injectCodeBlockStyles } from "~/common/styles/global";

// NOTE(wwwjim):
// https://nextjs.org/docs/advanced-features/custom-app
function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Global styles={injectGlobalStyles()} />
      <Global styles={injectCodeBlockStyles()} />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
