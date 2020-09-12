import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

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
  font-size: ${Constants.typescale.lvl5};
  font-weight: 700;
  line-height: 1.3;
  padding: 0px 0px 24px 0px;
  letter-spacing: -0.021rem;
  width: 100%;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl5};
    padding: 0px 0px 16px 0px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_H3 = css`
  font-size: ${Constants.typescale.lvl2};
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.014rem;
  padding: 0 0 8px 0;
  color: ${Constants.system.slate};

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl2};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
  }
`;

const STYLES_BLOCK = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 56vw;
  width: 100%;
  align-self: center;
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    max-width: 100vw;
  }
`;

const STYLES_IMG = css`
  margin-top: 48px;
  width: 100%;
`;

const STYLES_ANNOTATION = css`
  font-size: ${Constants.typescale.lvl0};
  color: #646464;
`;

const STYLES_BUTTON_PRIMARY = css`
  box-sizing: border-box;
  border-radius: 2px;
  outline: 0;
  border: 0;
  min-height: 48px;
  padding: 0px 24px 0px 24px;
  margin: 24px 0 16px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  user-select: none;
  cursor: pointer;
  background-color: ${Constants.system.slate};
  color: ${Constants.system.white};
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  :hover {
    background-color: ${Constants.system.white};
    box-shadow: 0px 10px 90px 20px rgba(207, 206, 211, 0.3);
    color: ${Constants.system.slate};
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.pitchBlack};
    color: ${Constants.system.wall};
    outline: 0;
    border: 0;
  }
`;

const STYLES_LINK_WHITE = css`
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  transition: 200ms ease color;
  padding: 24px 0 0 0;

  :hover {
    color: ${Constants.system.moonstone};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_SECTION_HERO = css`
  width: 100vw;
  padding: 16vh 88px 88px 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -88px 0px px 0px;
  background: ${Constants.system.foreground};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16vh 24px 48px 24px;
    display: block;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  width: 100vw;
  padding: 88px 88px 160px 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -88px 0px px 0px;
  background: ${Constants.system.foreground};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 24px;
    display: block;
  }
`;

const STYLES_TABLE = css`
  width: 100%;
  font-size: ${Constants.typescale.lvl0};
  border-collapse: collapse;
  text-align: left;
`;

const STYLES_TABLE_ROW = css`
  font-family: ${Constants.font.text};
`;

const STYLES_TABLE_TOP_ROW = css`
  font-family: ${Constants.font.semiBold};
`;

const STYLES_TABLE_ITEM = css`
  border: 1px solid rgba(229, 229, 229, 0.75);
  padding: 12px;
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
  getOs = () => {
    const os = ["Windows", "Linux", "Mac"]; // add your OS values
    return os.find((v) => navigator.appVersion.indexOf(v) >= 0);
  };
  render() {
    const title = `Slate Download`;
    const description = "Donwload Slate app and web extenstion";
    const url = "https://slate.host/download";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader color="dark" />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_BLOCK}>
              <h1 css={STYLES_H1}>Slate Chrome Extensions</h1>
              <h3 css={STYLES_H3}>Take any image on the web and save it to Slate right from your browser tab.</h3>
              <a src="/">
                <button css={STYLES_BUTTON_PRIMARY}>Get Chrome extension</button>
              </a>
              <p css={STYLES_ANNOTATION}>
                Currently avaible for{" "}
                <a css={STYLES_LINK_WHITE} href="/">
                  Chrome
                </a>
                .
              </p>
            </div>
            <div css={STYLES_BLOCK}>
              <img
                css={STYLES_IMG}
                src="https://slate.textile.io/ipfs/bafybeibwppu23j5wgshqvm5qyqv3c6pmhp3y5irdwn3ivvnnrpexiguzbi"
                alt="Slate browser extension"
              />
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_BLOCK}>
              <h1 css={STYLES_H1}>Releases</h1>
              <h3 css={STYLES_H3}>Slate is built in public and all past releases are always avaible for download.</h3>
            </div>
            <div css={STYLES_BLOCK}>
              <table css={STYLES_TABLE}>
                <tr css={STYLES_TABLE_TOP_ROW}>
                  <th css={STYLES_TABLE_ITEM}>Version</th>
                  <th css={STYLES_TABLE_ITEM}>Product</th>
                  <th css={STYLES_TABLE_ITEM}>Date</th>
                  <th css={STYLES_TABLE_ITEM}>Download</th>
                </tr>
                <tr css={STYLES_TABLE_ROW}>
                  <td css={STYLES_TABLE_ITEM}>0.1.0</td>
                  <td css={STYLES_TABLE_ITEM}>Chrome Extension</td>
                  <td css={STYLES_TABLE_ITEM}>2020-09-07</td>
                  <td css={STYLES_TABLE_ITEM}>
                    <a href="../public/static/favicon-96x96.png" download>
                      Download
                    </a>
                  </td>
                </tr>
                <tr css={STYLES_TABLE_ROW}>
                  <td css={STYLES_TABLE_ITEM}>0.1.0</td>
                  <td css={STYLES_TABLE_ITEM}>Design system</td>
                  <td css={STYLES_TABLE_ITEM}>2020-09-07</td>
                  <td css={STYLES_TABLE_ITEM}>Download</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
