import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVGLogo from "~/common/logo";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.code};
  text-transform: uppercase;
  font-size: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px 16px 24px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  transition: 200ms ease color;
  display: block;

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px 0 0 0;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 0 8px 0 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: left;
  padding: 0 8px 0 8px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    text-align: left;
  }
`;

const WebsitePrototypeHeader = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_LEFT}>
        <a css={STYLES_LINK} href="/" style={{ marginRight: 16 }}>
          <SVGLogo.Symbol
            height={`20px`}
            style={{ transform: "translateY(-2px)" }}
          />
        </a>
        <a
          css={STYLES_LINK}
          href="/"
          style={{ marginRight: 24, fontFamily: Constants.font.codeBold }}
        >
          {Constants.values.version}
        </a>
        <a css={STYLES_LINK} href="/_/system">
          Design System
        </a>
      </div>
      <div css={STYLES_RIGHT}>
        <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate">
          View Source
        </a>
      </div>
    </div>
  );
};

export default WebsitePrototypeHeader;
