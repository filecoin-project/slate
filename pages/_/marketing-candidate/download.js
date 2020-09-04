import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  padding: 16px 88px;
  section {
    width: 1140px;
    margin: auto;
    padding: 15vh 0;
  }
  h1 {
    font-size: 46px;
    line-height: 100%;
  }
  button {
    background: #36383d;
    color: white;
    width: 300px;
    height: 60px;
    border-radius: 5px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    align-items: center;
    text-align: center;
    margin: auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    h1 {
      font-size: 1.953rem;
      padding: 0px 0px 16px 0px;
      line-height: 1.25;
    }
    h2 {
      font-size: 1.25rem;
      padding: 0px 0px 8px 0px;
      line-height: 1.5;
    }
    h3 {
      font-size: 1rem;
      padding: 0px 0px 8px 0px;
      line-height: 1.5;
      color: ${Constants.system.moonstone};
    }
    p {
      font-size: 0.78rem;
    }
    img {
      width: 80%;
      hight: auto;
    }
  }
`;

const STYLES_APP = css`
  display: flex;
  flex-direction: row;
  align-self: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
  }
`;

const STYLES_EXTENSTION = css`
  display: flex;
  flex-direction: row;
  align-self: center;
  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
  }
`;

const STYLES_WRAPPER_TEXT = css`
  width: 40%;
  align-self: center;
  padding: 0 50px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
  }
`;

const STYLES_BROWSER_WINDOW = css`
  background: #ffffff;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  align-self: center;
`;

const STYLES_ANNOTATION = css`
  font-size: 12px;
  color: #646464;
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
          <section css={STYLES_EXTENSTION}>
            <div css={STYLES_BROWSER_WINDOW}>
              <img
                src="https://d2w9rnfcy7mm78.cloudfront.net/8547413/original_613b9b0a650a3f274c68e1407f552ff3.png?1599111034?bc=0"
                alt="Slate browser extension"
              />
            </div>
            <div css={STYLES_WRAPPER_TEXT}>
              <System.H1>Slate Chrome Extensions</System.H1>
              <br />

              <System.P>
                Take any image on the web and save it to Slate right from your
                browser tab
              </System.P>
              <br />
              <br />
              <a>
                <button>Get Chrome Extension</button>
              </a>
              <System.P css={STYLES_ANNOTATION}>
                Currently avaible for <a href="/">Chrome</a>.
              </System.P>
            </div>
          </section>
          <section css={STYLES_APP}>
            <div css={STYLES_WRAPPER_TEXT}>
              <System.H1>Slate client for Mac, Windows and Linux</System.H1>
              <br />
              <System.P>
                Local folder and offline client for seamless filesharing between
                your machine and the network
              </System.P>
              <br />
              <br />
              <a>
                <button>Coming Soon</button>
              </a>
              <System.P css={STYLES_ANNOTATION}>
                Also avaible for <a>Windows</a> and <a>Linux</a>
              </System.P>
            </div>
            <div css={STYLES_BROWSER_WINDOW}>
              <img
                src="https://d2w9rnfcy7mm78.cloudfront.net/8547413/original_613b9b0a650a3f274c68e1407f552ff3.png?1599111034?bc=0"
                alt="Slate Web App Screenshot"
              />
            </div>
          </section>

          <section css={STYLES_APP}>
            <div css={STYLES_WRAPPER_TEXT}>
              <System.H1>Releases</System.H1>
              <br />
              <System.P>
                Slate is built in public and all past releases are always
                avaible for download.
              </System.P>
            </div>
            <div>
              <System.Table
                data={{
                  columns: [
                    { key: "a", name: "Version / Product", width: "50%" },
                    { key: "b", name: "Date", width: "50%" },
                    { key: "c", name: "Link", width: "50%" }
                  ],
                  rows: [
                    {
                      id: 1,
                      a: "v1.0.0 Design System",
                      b: "2020 09 14",
                      c: "Download"
                    },
                    {
                      id: 1,
                      a: "v1.0.0 Chome Extenstion",
                      b: "2020 09 14",
                      c: "Download"
                    }
                  ]
                }}
                name="exampleOne"
              />
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
