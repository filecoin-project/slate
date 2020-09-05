import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const STYLES_H1 = css`
  font-size: 1.953rem;
  line-height: 1.25;
  padding: 0px 0px 32px 0px;
  width: 100%;
  color: ${Constants.system.pitchBlack};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.953rem;
    padding: 0px 0px 16px 0px;
    line-height: 1.25;
  }
`;

const STYLES_H2 = css`
  font-size: 1.25rem;
  line-height: 1.25;
  padding: 0px 0px 32px 0px;
  width: 100%;
  color: ${Constants.system.darkGray};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1.25rem;
    padding: 0px 0px 8px 0px;
    line-height: 1.5;
  }
`;

const STYLES_H3 = css`
  font-size: 1.563em;
  line-height: 1.5;
  padding: 0px 0px 16px 0px;
  color: ${Constants.system.darkGray};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
    padding: 0px 0px 8px 0px;
    line-height: 1.5;
    color: ${Constants.system.moonstone};
  }
`;

const STYLES_P = css`
  font-size: 1rem;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_A = css`
  :link {
    color: ${Constants.system.darkGray};
    background-color: transparent;
    text-decoration: none;
  }
  :hover {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
    text-decoration: none;
  }
  :active {
    color: yellow;
    background-color: transparent;
    text-decoration: none;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_IMG = css`
  width: 100%;
  :hover {
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

const STYLES_ANNOTATION = css`
  padding-top: 7px;
  font-size: 12px;
  color: #646464;
`;

const STYLES_BUTTON_PRIMARY = css`
  box-sizing: border-box;
  border-radius: 2px;
  outline: 0;
  border: 0;
  min-height: 40px;
  padding: 6px 24px 6px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  user-select: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.wall};
  color: ${Constants.system.slate};
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  :hover {
    background-color: ${Constants.system.pitchBlack};
    box-shadow: 0px 10px 90px 20px rgba(207, 206, 211, 0.3);
    color: ${Constants.system.wall};
  }
  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.pitchBlack};
    color: ${Constants.system.wall};
    outline: 0;
    border: 0;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 55vh;
  margin: 10px auto;
  :nth-child(even) {
    margin: 150px auto;
    flex-direction: row-reverse;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    :nth-child(even) {
      flex-direction: column;
    }
  }
`;

const STYLES_SECTION_CHILD = css`
  width: 50%;
  padding: 0 50px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 20px;
  }
`;

export const getServerSideProps = async context => {
  return {
    props: { ...context.query }
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }
  getOs = () => {
    const os = ["Windows", "Linux", "Mac"]; // add your OS values
    return os.find(v => navigator.appVersion.indexOf(v) >= 0);
  };
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
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD}>
              <h1 css={STYLES_H1}>Slate Chrome Extensions</h1>
              <h2 css={STYLES_H2}>
                Take any image on the web and save it to Slate right from your
                browser tab.
              </h2>
              <a src="/">
                <button css={STYLES_BUTTON_PRIMARY}>
                  Get Chrome Extension
                </button>
              </a>
              <h2 css={STYLES_ANNOTATION}>
                Currently avaible for <a href="/">Chrome</a>.
              </h2>
            </div>
            <div css={STYLES_SECTION_CHILD}>
              <img
                css={STYLES_IMG}
                src="https://d2w9rnfcy7mm78.cloudfront.net/8547413/original_613b9b0a650a3f274c68e1407f552ff3.png?1599111034?bc=0"
                alt="Slate browser extension"
              />
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD}>
              <h1 css={STYLES_H1}>Slate client for Mac, Windows and Linux</h1>
              <h2 css={STYLES_H2}>
                Local folder and offline client for seamless filesharing between
                your machine and the network.
              </h2>
              <a>
                <button css={STYLES_BUTTON_PRIMARY}>Coming soon</button>
              </a>
            </div>
            <div css={STYLES_SECTION_CHILD}>
              <img
                css={STYLES_IMG}
                src="https://d2w9rnfcy7mm78.cloudfront.net/8547413/original_613b9b0a650a3f274c68e1407f552ff3.png?1599111034?bc=0"
                alt="Slate browser extension"
              />
            </div>
          </div>{" "}
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SECTION_CHILD}>
              <h1 css={STYLES_H1}>Releases</h1>
              <h2 css={STYLES_H2}>
                Slate is built in public and all past releases are always
                avaible for download.
              </h2>
            </div>
            <div css={STYLES_SECTION_CHILD}>
              <System.Table
                data={{
                  columns: [
                    { key: "a", name: "Version", width: "70px" },

                    { key: "b", name: "Product", width: "200px" },

                    { key: "c", name: "Date" },

                    {
                      key: "d",
                      name: "Download link",
                      copyable: true
                    }
                  ],

                  rows: [
                    {
                      id: 1,

                      a: "v1.0",

                      b: "Chrome Extension",

                      c: "2020-09-07",

                      d: "Download"
                    },

                    {
                      id: 2,

                      a: "v1.0",

                      b: "Design System",

                      c: "2020-09-07",

                      d: "Download"
                    }
                  ]
                }}
              />
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
