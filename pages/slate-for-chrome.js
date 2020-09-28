import * as React from "react";
import * as Constants from "~/common/constants";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
  max-width: 1440px;
  margin: -88px auto 0 auto;
  background-color: ${Constants.system.wallLight};
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
  padding: 120px 88px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 120px 24px 48px 24px;
  }
`;

const STYLES_SECTION_FLEXWRAPPER = css`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 88px 88px 88px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 0 24px 80px 24px;
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

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_VR = css`
  width: 1px;
  height: 48px;
  opacity: 0.5;
  background-color: ${Constants.system.darkGray};
  margin: 0 auto;
`;

export default class IndexPage extends React.Component {
  render() {
    const title = `Slate for Chrome`;
    const description = "Upload images to Slate right from your browser window";
    const url = "https://slate.host/slate-for-chrome";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_TEXT_BLOCK} style={styleCenterBlock}>
              <h1 css={STYLES_H1}>
                <span css={STYLES_BLUE}>Upload images to Slate</span> from anywhere on the web
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
              src="https://slate.textile.io/ipfs/bafybeiesv6mdrrwb3hfnmcys46laht6klvhgijodxx6vwitmo5zv4ybvvu"
            />
          </div>
          <div css={STYLES_SECTION_FLEXWRAPPER}>
            <div css={STYLES_HALFBLOCK}>
              <h2 css={STYLES_H2}>Contribute</h2>
              <p css={STYLES_P}>
                We would love for you to join us. You're welcomed to file an issue or submit a pull request (PR) on
                Github.
              </p>
              <a css={STYLES_BUTTON_PRIMARY} href="https://github.com/jasonleyser/slate-for-chrome" target="_blank">
                View Github
              </a>
            </div>
            <div css={STYLES_HALFBLOCK}>
              <h2 css={STYLES_H2}>Release</h2>
              <p css={STYLES_P}>Slate is built in public and all past releases are always avaible for download.</p>
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
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
