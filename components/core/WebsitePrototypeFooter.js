import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  padding: 8px 88px 8px 64px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: ${Constants.zindex.header};
  background-color: ${Constants.system.foreground};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px 24px;
  }
`;

const STYLES_CONTAINER = css`
  max-width: 1440px;
  margin: 0 auto;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
    justify-content: space-between;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.grayBlack};
  text-decoration: none;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
  }
`;

export const WebsitePrototypeFooter = (props) => {
  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER} style={props.style}>
        <p css={STYLES_LEFT}>
          Powered by{" "}
          <a css={STYLES_LINK} href="https://textile.io">
            Textile
          </a>{" "}
          and{" "}
          <a css={STYLES_LINK} href="https://filecoin.io">
            Filecoin
          </a>
        </p>
        <div css={STYLES_RIGHT}>
          <a css={STYLES_LINK} href="https://twitter.com/_slate" style={{ marginRight: 24 }}>
            Twitter
          </a>
          <a css={STYLES_LINK} href="https://filecoin.io/slack" style={{ marginRight: 24 }}>
            Slack
          </a>
          <a
            css={STYLES_LINK}
            href="https://github.com/filecoin-project/slate/issues"
            style={{ marginRight: 24 }}
          >
            Contribute
          </a>
          <a css={STYLES_LINK} href="/_/system">
            Design System
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebsitePrototypeFooter;
