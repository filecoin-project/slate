import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

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
    const title = `Slate`;
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host/download";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />

          <section>
            <System.H1>Slate client for Mac, Windows and Linux</System.H1>
            <System.P>
              Local folder and offline client for seamless filesharing between
              your machine and the network
            </System.P>
            <a>
              <button>
                Download Slate for <span>Mac</span>
              </button>
            </a>
            <System.P>
              Also avaible for <a>Windows</a> and <a>Linux</a>
            </System.P>

            <img src="" alt="" />
          </section>

          <section>
            <System.H1>Slate Chrome Extensions</System.H1>
            <System.P>
              Take any image on the web and save it to Slate right from your
              browser tab
            </System.P>
            <a>
              <button>Get Chrome Extension</button>
            </a>

            <img src="" alt="" />
          </section>
          <section>
            <System.H1>Changelog</System.H1>
            <System.P>List of releases</System.P>

            <img src="" alt="" />
          </section>
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
