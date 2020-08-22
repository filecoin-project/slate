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
  section {
    margin: auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_APP = css`
  background-color: #e2e2e2;
  display: flex;
  flex-direction: row;
`;

const STYLES_EXTENSTION = css`
  background-color: #c4c4c4;
  display: flex;
  flex-direction: row;
`;
const STYLES_WRAPPER_TEXT = css`
  width: 40%;
  align-items: left;
`;
const STYLES_BROWSER = css`
  width: 60%;
  border: 1px solid #000000;
  box-shadow: 0px 0px 0px #dcdcdc;
  align-items: right;
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
    const title = `Slate Download`;
    const description = "Donwload Slate app and web extenstion";
    const url = "https://slate.host/download";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section css={STYLES_APP}>
            <div css={STYLES_WRAPPER_TEXT}>
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
            </div>

            <img
              css={STYLES_BROWSER}
              src="https://source.unsplash.com/user/gndclouds/800x600"
              alt="example image"
            />
          </section>

          <section css={STYLES_EXTENSTION}>
            <div css={STYLES_WRAPPER_TEXT}>
              <System.H1>Slate Chrome Extensions</System.H1>
              <System.P>
                Take any image on the web and save it to Slate right from your
                browser tab
              </System.P>
              <a>
                <button>Get Chrome Extension</button>
              </a>
            </div>
            <img
              css={STYLES_BROWSER}
              src="https://source.unsplash.com/user/gndclouds/800x600"
              alt="example image"
            />
          </section>
          <section>
            <System.H1>Changelog</System.H1>
            <System.P>List of releases</System.P>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
