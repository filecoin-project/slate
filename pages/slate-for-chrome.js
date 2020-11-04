import * as React from "react";
import * as Constants from "~/common/constants";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import { css } from "@emotion/core";

const STYLES_ROOT = css`
  width: 100%;
  margin: -88px auto 0 auto;
  padding: 0 88px 128px 88px;
  background-color: ${Constants.system.wallLight};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 24px;
  }
`;

const STYLES_CONTAINER = css`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl4};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;
  width: 95%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_H2 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl2};
  letter-spacing: -0.017rem;
  line-height: 1.3;
  color: ${Constants.system.newBlue};
  margin-bottom: 1rem;
  width: 95%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};
  width: 80%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  width: 100%;
  height: 100%;
  padding: 120px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 120px 0 48px 0;
  }
`;

const STYLES_SECTION_FLEXWRAPPER = css`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_TEXT_BLOCK = css`
  width: 33.33%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_BUTTON_PRIMARY = css`
  margin: 32px 0 0 0;
  min-height: 48px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: ${Constants.system.newBlue};
  color: ${Constants.system.white};
  text-decoration: none;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const STYLES_BUTTON_SECONDARY = css`
  margin: 32px 0 16px 0;
  min-height: 48px;
  box-sizing: border-box;
  border: 1px solid ${Constants.system.darkGray};
  border-radius: 4px;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: ${Constants.system.wallLight};
  color: ${Constants.system.newBlue};
  text-decoration: none;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const STYLES_BLUE = css`
  color: ${Constants.system.newBlue};
`;

const STYLES_HALFBLOCK = css`
  width: 50%;
  margin-bottom: 64px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const styleCenterBlock = {
  textAlign: `center`,
  margin: `0 auto`,
};

const STYLES_IMG = css`
  width: 70%;
  margin: 0 auto;
  display: block;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_VR = css`
  width: 1px;
  height: 48px;
  background-color: ${Constants.system.darkGray};
  margin: 0 auto;
`;

const STYLES_IMG_OVERLAY = css`
  width: 24%;
  margin: -30% 0 0 70%;
  display: block;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: -30% 0 0 60%;
    width: 30%;
  }
`;

export default class SlateForChromePage extends React.Component {
  render() {
    const title = `Slate for Chrome`;
    const description = "Upload images to Slate from anywhere on the web";
    const url = "https://slate.host/slate-for-chrome";
    const image =
      "https://slate.textile.io/ipfs/bafybeidi6z774yoge5uowzwkdrrnrzi5bzqgzrwfizw4dg4xdjxfjoa5ei";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_CONTAINER}>
            <div css={STYLES_SECTION_WRAPPER}>
              <div css={STYLES_TEXT_BLOCK} style={styleCenterBlock}>
                <h1 css={STYLES_H1}>
                  <span css={STYLES_BLUE}>Upload images to Slate</span> <br />
                  from anywhere on the web
                </h1>
                <a
                  css={STYLES_BUTTON_PRIMARY}
                  href="https://chrome.google.com/webstore/detail/slate/gloembacbehhbfbkcfjmloikeeaebnoc"
                  target="_blank"
                >
                  Add Slate to Chrome
                </a>
                <div css={STYLES_VR} />
              </div>
              <img
                css={STYLES_IMG}
                src="https://slate.textile.io/ipfs/bafybeiarvezzcqx3f7vjmx25kzog3metgz35n4p5gtiexwl7hcgwzev64a"
              />
              <img
                css={STYLES_IMG_OVERLAY}
                src="https://slate.textile.io/ipfs/bafkreig2ynqlvfynv3zvft73fh2igyyks5bgmthugtq7azeed6rehd3s5u"
              />
            </div>
            <div css={STYLES_SECTION_FLEXWRAPPER}>
              <div css={STYLES_HALFBLOCK}>
                <h2 css={STYLES_H2}>Contribute</h2>
                <p css={STYLES_P}>
                  We would love for you to join us. You are welcome to file an issue or submit a
                  pull request on Github.
                </p>
                <a
                  css={STYLES_BUTTON_PRIMARY}
                  href="https://github.com/jasonleyser/slate-for-chrome"
                  target="_blank"
                >
                  View Github
                </a>
              </div>
              <div css={STYLES_HALFBLOCK}>
                <h2 css={STYLES_H2}>Release</h2>
                <p css={STYLES_P}>
                  Slate for Chrome is open source and past versions are also available for download.
                </p>
                <a
                  css={STYLES_BUTTON_SECONDARY}
                  href="/public/static/slate-for-chrome-V0.4.zip"
                  download="Slate Chrome extension.zip"
                >
                  Download Slate for Chrome
                </a>
              </div>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
