import * as React from "react";
import * as Constants from "~/common/constants";

import { Logo } from "~/common/logo.js";
import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 16px 32px;
  width: 100%;
  margin: 0 auto;
  z-index: ${Constants.zindex.header};
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(248, 248, 248, 0.7);
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 12px 24px;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.grayBlack};
  text-decoration: none;
  transition: 200ms ease color;
  display: block;
  display: flex;
  align-items: center;
  height: 100%;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  height: 24px;
  height: 100%;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: left;
`;

const WebsitePrototypeHeader = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_LEFT}>
        <a css={STYLES_LINK} href="/" style={{ marginRight: 16, position: "relative", top: "1px" }}>
          <Logo style={{ height: 16 }} />
        </a>
      </div>
      <div css={STYLES_RIGHT}>
        <a css={STYLES_LINK} href="/_" style={{ marginRight: 24 }}>
          Sign up
        </a>
        <a css={STYLES_LINK} href="/_">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default WebsitePrototypeHeader;
