import * as React from "react";

import { CacheProvider, Global } from "@emotion/react";
import { cache } from "@emotion/css";

import App from "next/app";
import {
  injectGlobalStyles,
  injectGlobalGridStyles,
  injectCodeBlockStyles,
} from "~/common/styles/global";

// NOTE(wwwjim):
// https://nextjs.org/docs/advanced-features/custom-app
function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Global styles={injectGlobalStyles()} />
      <Global styles={injectCodeBlockStyles()} />
      <Global styles={injectGlobalGridStyles()} />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
