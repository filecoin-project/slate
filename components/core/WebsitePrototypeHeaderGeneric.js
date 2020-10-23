import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVGLogo from "~/common/logo";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
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
  font-size: ${Constants.typescale.lvl1};
  width: 100%;
`;

const STYLES_NAV_CONTAINER = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const STYLES_LINK = css`
  color: ${Constants.system.grayBlack};
  text-decoration: none;
  transition: 200ms ease color;
  text-align: left;
  display: block;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_PARAGRAPH = css`
  font-family: ${Constants.font.text};
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  transition: 200ms ease color;
  overflow-wrap: break-word;
  max-width: 50%;
  min-width: 10%;
  text-align: left;
  margin-left: 30px;
  display: block;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 100%;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  display: flex;
  max-width: 70%;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: left;
`;

const WebsitePrototypeHeaderGeneric = (props) => {
  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER}>
        <div css={STYLES_NAV_CONTAINER} style={props.style}>
          <div css={STYLES_LEFT}>
            <a css={STYLES_LINK} href={props.href} style={{ marginRight: 12 }}>
              <SVGLogo.Symbol height={`20px`} style={{ transform: "translateY(-1px)" }} />
            </a>
            <a css={STYLES_LINK} href={props.href}>
              {props.title}
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
        <div css={STYLES_PARAGRAPH}>{props.children}</div>
      </div>
    </div>
  );
};

export default WebsitePrototypeHeaderGeneric;
