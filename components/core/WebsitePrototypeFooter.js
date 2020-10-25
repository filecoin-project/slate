import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  padding: 8px 64px;
  width: 100%;
  margin: 0 auto;
  z-index: ${Constants.zindex.header};
  background-color: ${Constants.system.foreground};
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  line-height: 150%;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 8px 24px;
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
  text-align: left;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: flex-start;
  }
`;

export const WebsitePrototypeFooter = (props) => {
  return (
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
  );
};

export default WebsitePrototypeFooter;
