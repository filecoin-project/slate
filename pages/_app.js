import * as React from "react";

import { Global } from "@emotion/react";

import App from "next/app";
import { injectGlobalStyles, injectCodeBlockStyles } from "~/common/styles/global";
import ThemeProvider from "~/components/system/ThemeProvider";

// NOTE(wwwjim):
// https://nextjs.org/docs/advanced-features/custom-app
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <React.Fragment>
        <Global styles={injectGlobalStyles()} />
        <Global styles={injectCodeBlockStyles()} />
        <Component {...pageProps} />
      </React.Fragment>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
