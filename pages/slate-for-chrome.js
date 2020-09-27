import * as React from "react";
import * as Constants from "~/common/constants";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import { css } from "@emotion/react";

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  render() {
    const title = `Slate for Chrome`;
    const description = "Upload images to Slate right from your browser window";
    const url = "https://slate.host/slate-for-chrome";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
