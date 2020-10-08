import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
  padding: 96px 88px 96px 88px;
  width: 100%;
  margin: 0 auto;
  background-color: ${Constants.system.wall};

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    justify-content: left;
    padding: 64px 24px;
  }
`;
const STYLES_CONTAINER = css`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  align-items: top;
  z-index: ${Constants.zindex.navigation};
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};
`;

const STYLES_LINK = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};
  opacity: 0.7;
  text-decoration: none;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.system.newBlue};
    opacity: 1;
  }
`;

const STYLES_FLEX = css`
  display: flex;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_CONTENT_BLOCK = css`
  width: 16.67%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 50%;
  }
`;

const STYLES_HR = css`
  background-color: ${Constants.system.darkGray};
  width: 100%;
  height: 1px;
  margin-bottom: 16px;
`;

const styleFlexFull = {
  justifyContent: `space-between`,
};

export const NewWebsitePrototypeFooter = (props) => {
  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER} style={props.style}>
        <div>
          <p css={STYLES_P}>
            <span style={{ fontFamily: `${Constants.font.semiBold}`, marginRight: `16px` }}>
              Slate{" "}
            </span>{" "}
            Decentralized file sharing network. Powered by{" "}
            <a css={STYLES_LINK} href="https://textile.io" target="_blank">
              Textile
            </a>{" "}
            and{" "}
            <a css={STYLES_LINK} href="https://filecoin.io" target="_blank">
              Filecoin
            </a>
            .
            <br />
          </p>
        </div>
        <br />
        <br />
        <div css={STYLES_FLEX}>
          <div css={STYLES_CONTENT_BLOCK}>
            <p
              css={STYLES_P}
              style={{ fontFamily: `${Constants.font.semiBold}`, marginBottom: `4px` }}
            >
              Contact & Support
            </p>
            <a css={STYLES_LINK} href="https://twitter.com/_slate" target="_blank">
              Twitter
            </a>
            <br />
            <a css={STYLES_LINK} href="https://filecoin.io/slack" target="_blank">
              Slack
            </a>
            <br />
            <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate" target="_blank">
              Github
            </a>
          </div>
          <br />
          <br />
          <div css={STYLES_CONTENT_BLOCK}>
            <p
              css={STYLES_P}
              style={{ fontFamily: `${Constants.font.semiBold}`, marginBottom: `4px` }}
            >
              Resources
            </p>
            <a css={STYLES_LINK} href="/slate-for-chrome">
              Slate for Chrome
            </a>
            <br />
            <a
              css={STYLES_LINK}
              href="https://github.com/filecoin-project/slate/issues/126"
              target="_blank"
            >
              Community
            </a>
            <br />
            <a css={STYLES_LINK} href="/_/system">
              Design system
            </a>
          </div>
        </div>
        <br />
        <br />
        <div css={STYLES_HR} />
        <div css={STYLES_FLEX} style={styleFlexFull}>
          <p css={STYLES_P}>MIT License</p>
          <div>
            <a css={STYLES_LINK} style={{ marginRight: `32px` }} href="/terms">
              Terms of service
            </a>
            <a css={STYLES_LINK} href="/guidelines">
              Community guidelines
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWebsitePrototypeFooter;
