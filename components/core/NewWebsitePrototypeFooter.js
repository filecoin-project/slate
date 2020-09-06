import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_P = css`
  font-size: 1rem;
  line-height: 1.618;
  padding: 0px 0px 8px 0px;
  color: ${Constants.system.gray};
`;
const STYLES_CONTAINER = css`
  width: 100%;
  display: flex;
  background-color: ${Constants.system.pitchBlack};
  align-items: top;
  justify-content: top;
  padding: 96px 88px 96px 88px;
  z-index: ${Constants.zindex.navigation};
  @media (max-width: ${Constants.sizes.mobile}px) {
    position: absolute;
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
  font-size: 1rem;
  line-height: 1.618;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_SLATE = css`
  flex-shrink: 0;
  padding: 0px 0px 16px 0px;
  font-size: 1rem;
  line-height: 1.618;
  color: ${Constants.system.gray};
`;

const STYLES_TRADEMARK = css`
  margin: 2px 12px 0 0;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 50%;
  display: flex;
  align-items: top;
  justify-content: flex-end;
  position: absolute;
  right: 88px;

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
      <div>
        <img
          css={STYLES_TRADEMARK}
          width="20px"
          src="https://bafkreigojwgoqkcpi4oyjoncmiuacg3zen7mlg75fkz27k5n32golvbkb4.ipfs.slate.textile.io/"
        />
      </div>
      <div>
        <div>
          <p css={STYLES_SLATE}>
            Slate is the gateway to Filecoin –
            <br />A new network design we trust.
          </p>
          <p css={STYLES_P}>
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
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
      <div css={STYLES_RIGHT}>
        <div style={{ marginRight: 88 }}>
          <p css={STYLES_P}>Reach out</p>
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
        <div>
          <p css={STYLES_P}>Resources</p>
          <a css={STYLES_LINK} href="/_/system" target="_blank">
            Design system
          </a>
          <br />
          <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate" target="_blank">
            View source
          </a>
          <br />
          <a css={STYLES_LINK} href="/community" target="_blank">
            Community
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
