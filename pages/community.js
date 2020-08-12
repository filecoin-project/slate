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
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  text-align: center;
  font-size: 1rem;

  h1{
    color: #fff;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_MIDDLE = css`
  position: relative;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
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
    const title = `Slate Community`;
    const description = "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "/community";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />
          <div>
          <System.H1>Get involved</System.H1>


          <System.P>We’d love for you to join us! Getting involved is simple:</System.P>
          <System.UL>
            <System.LI>Creating an open source design system</System.LI>
            <System.LI>Building a dynamic component library for open source projects</System.LI>
            <System.LI>Learning how to write front-end code</System.LI>
          </System.UL>
          <System.P>Slate is built by a growing community of collaborators and contributors. If you’re interested in…</System.P>
          <System.UL>
            <System.LI>Find something cool you to work on and file an issue</System.LI>
            <System.LI>If you see something you want to fix or change, <a>submit a PR</a></System.LI>
            <System.LI>Reach out to us any time. We're always available on Twitter to answer your questions: <a>@_slate</a></System.LI>
          </System.UL>

          </div>

          <div css={STYLES_MIDDLE}>
          <System.H1>Code of Conduct</System.H1>
            <System.P>All participants of Slate are expected to abide by our Code of Conduct, both online and during in-person events that are hosted and/or associated with Slate.</System.P>
            
            <System.H1>Code of Conduct</System.H1>
            <System.P>All participants of Slate are expected to abide by our Code of Conduct, both online and during in-person events that are hosted and/or associated with Slate.</System.P>
            
            </div>
          </div>
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
