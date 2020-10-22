import * as React from "react";
import * as Constants from "~/common/constants";

import { Logo } from "~/common/logo.js";
import { css } from "@emotion/react";

const STYLES_ROOT = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 24px 88px 24px 64px;
  width: 100%;
  margin: 0 auto;
  z-index: ${Constants.zindex.header};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px 24px;
  }
`;

const STYLES_CONTAINER = css`
  max-width: 1440px;
  margin: 0 auto;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: 1rem;
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
  display: block;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  height: 24px;
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
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER} style={props.style}>
        <div css={STYLES_LEFT}>
          <a
            css={STYLES_LINK}
            href="/"
            style={{ marginRight: 16, position: "relative", top: "1px" }}
          >
            <Logo style={{ height: 20 }} />
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
    </div>
  );
};

export default WebsitePrototypeHeader;
