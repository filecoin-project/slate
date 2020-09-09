import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVGLogo from "~/common/logo";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.code};
  font-size: 12px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 24px 16px 24px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_LINK = css`
  font-family: ${Constants.font.medium};
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  transition: 200ms ease color;
  overflow-wrap: break-word;
  text-align: left;

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 16px 0 0 0;
    max-width: auto;
  }
`;

const STYLES_PARAGRAPH = css`
  font-family: ${Constants.font.text};
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  transition: 200ms ease color;
  overflow-wrap: break-word;
  width: 100%;
  min-width: 10%;
  text-align: left;

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 16px 0 0 0;
    max-width: auto;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 0 8px 0 8px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 588px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    max-width: auto;
  }
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 0 8px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    text-align: left;
  }
`;

const WebsitePrototypeHeaderGeneric = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_LEFT}>
        <a css={STYLES_LINK} href={props.href} style={{ marginRight: 16 }}>
          <SVGLogo.Symbol height={`20px`} />
        </a>
        <a
          css={STYLES_LINK}
          href={props.href}
          style={{ flexShrink: 0, maxWidth: 212, marginRight: 16 }}
        >
          {props.title}
        </a>
        <span css={STYLES_PARAGRAPH}>{props.children}</span>
      </div>
      <div css={STYLES_RIGHT}>
        <a
          css={STYLES_LINK}
          style={{
            fontFamily: Constants.font.code,
            textTransform: "uppercase",
          }}
          href="https://github.com/filecoin-project/slate"
        >
          View Source
        </a>
      </div>
    </div>
  );
};

export default WebsitePrototypeHeaderGeneric;
