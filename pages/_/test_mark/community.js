import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import CodeBlock from "~/components/system/CodeBlock";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 4.768rem;
    padding: 0px 0px 32px 0px;
    width: 100%;
  }
  h2 {
    font-size: 1.953rem;
    width: 48%;
  }
  p {
    font-size: 1rem;
    color: ${Constants.system.black};
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    h1 {
      font-size: 2.441rem;
    }
    h2 {
      font-size: 1.25rem;
    }
    p {
      font-size: 0.78rem;
    }
  }
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
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section>
            <System.H1>Open source</System.H1>
            <System.P>
              Slate is designed and built by a growing community of hackers,
              artists, and creatives on the web.{" "}
            </System.P>
          </section>
          <section>
            <System.H1>Contribute</System.H1>
            <System.P>Get involved with the project and contribute.</System.P>
            <a>
              <button>Contribute on Github</button>
            </a>
            <img src="" alt="" />
            <System.P>
              “Maybe put here an interesting quote about collaboration?
              <span>–Albert Einstein</span>
            </System.P>
          </section>
          <section>
            <System.H1>Contact</System.H1>
            <System.P>
              Reach out to any of the core contributors, reach us on Twitter, or
              join our Slack.
            </System.P>
            <a>
              <button>Join Slack Discussions</button>
            </a>
            <a>
              <button>Twitter @_slate</button>
            </a>
          </section>
          <section>
            <System.H1>Integrate</System.H1>
            <System.P>
              Explore our API and SDK and build on top of Slate
            </System.P>
            <CodeBlock>npm install --save slate-react-system</CodeBlock>
            <img src="" alt="" />
          </section>
          <section>
            <System.H1>Design System</System.H1>
            <System.P>
              Check out our open source design system. You can use these
              components, experiences, and constants in your own React projects.
              First, install the npm module:{" "}
            </System.P>
            <CodeBlock>npm install --save slate-react-system</CodeBlock>
            <img src="" alt="" />
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
