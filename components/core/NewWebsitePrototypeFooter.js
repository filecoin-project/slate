import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  font-size: 12px;
  line-height: 1.25;
  width: 100%;
  display: flex;
  align-items: top;
  justify-content: top;
  padding: 96px 88px 240px 88px;
  background-color: ${Constants.system.pitchBlack};
  @media (max-width: ${Constants.sizes.mobile}px) {
    position: absolute;
    z-index: 2;
    flex-shrink: 0;
    display: block;
    justify-content: left;
    height: 640px;
    padding: 64px 24px;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.darkGray};
  text-decoration: none;
  transition: 200ms ease color;
  line-height: 1.5;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  font-size: 1.563rem;
  color: ${Constants.system.c};
`;

const STYLES_SLATE = css`
  flex-shrink: 0;
  padding: 0px 0px 8px 0px;
  font-size: 1.563rem;
  color: ${Constants.system.gray};
`;

const STYLES_TRADEMARK = css`
  margin: 0px 16px 16px 0px;
`;

const STYLES_CREDIT = css`
  flex-shrink: 0;
  padding: 8px 0px 8px 0px;
  font-size: 1rem;
  color: ${Constants.system.gray};
  line-height: 1.5;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 50%;
  display: flex;
  align-items: top;
  justify-content: flex-end;
  position: absolute;
  right: 88px;
  font-size: 1rem;

  color: ${Constants.system.gray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    position: absolute;
    left: 24px;
    display: block;
  }
`;

export const NewWebsitePrototypeFooter = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_TRADEMARK}>
        <img
          width="32px"
          src="https://bafkreigojwgoqkcpi4oyjoncmiuacg3zen7mlg75fkz27k5n32golvbkb4.ipfs.slate.textile.io/"
        />
      </div>
      <div css={STYLES_LEFT}>
        <div css={STYLES_SLATE}>
          Slate is the gateway to Filecoin –
          <br />A new network design we trust.
        </div>
        <div css={STYLES_CREDIT}>
          Powered by{" "}
          <a css={STYLES_LINK} href="https://textile.io" target="_blank">
            Textile
          </a>{" "}
          and{" "}
          <a css={STYLES_LINK} href="https://filecoin.io" target="_blank">
            Filecoin
          </a>
          <br />
          MIT License
        </div>
      </div>
      <br />
      <br />
      <div css={STYLES_RIGHT}>
        <div style={{ marginRight: 88 }}>
          <p>Reach out</p>
          <br />
          <a
            css={STYLES_LINK}
            href="https://twitter.com/_slate"
            target="_blank"
          >
            Twitter
          </a>
          <br />
          <a css={STYLES_LINK} href="https://filecoin.io/slack" target="_blank">
            Slack
          </a>
        </div>
        <br />
        <br />
        <div>
          <p>Resources</p>
          <br />
          <a css={STYLES_LINK} href="/_/system" target="_blank">
            Design system
          </a>
          <br />
          <a
            css={STYLES_LINK}
            href="https://github.com/filecoin-project/slate"
            target="_blank"
          >
            View source
          </a>
          <br />
          <a css={STYLES_LINK} href="/community" target="_blank">
            Community Guidelines
          </a>
          <br />
          <a css={STYLES_LINK} href="/privacy" target="_blank">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewWebsitePrototypeFooter;
