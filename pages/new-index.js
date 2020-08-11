import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_HERO= css`

`;



export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description = "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />
          <section css={STYLES_HERO}>
          <System.H1>Store your files, turn them into collections, and share them with the world — with Slate.</System.H1>
          <br/>
        </section>

        <section>
          <System.H3>Simple, intuitive</System.H3>
          <System.P>Words about things</System.P>
        </section>

        <section>
          <System.H3>Private & Secure</System.H3>
          <System.P>Words about things</System.P>
        </section>
        
        <section>
          <System.H3>Store files</System.H3>
          <System.P>Words about things</System.P>
        </section>

        <section>
          <System.H3>Creating Slates</System.H3>
          <System.P>Words about things</System.P>
        </section>

        <section>
          <System.H3>Share with</System.H3>
          <System.P>Words about things</System.P>
        </section>

        <section>
          <System.H3>Open Source</System.H3>
          <System.P>Words about things</System.P>
        </section>

        <section>
          <System.H3>Free, unlimited storage, for now</System.H3>
          <System.P>Words about things</System.P>
        </section>
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
