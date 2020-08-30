import * as React from "react";
import * as Constants from "~/common/constants";

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

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 0 8px 0 8px;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 12px 0 12px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
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
        <a
          css={STYLES_LINK}
          href="https://twitter.com/_slate"
          style={{ marginRight: 24 }}>
          Twitter
        </a>
        <a
          css={STYLES_LINK}
          href="https://filecoin.io/slack"
          style={{ marginRight: 24 }}>
          Slack
        </a>
        <a
          css={STYLES_LINK}
          href="https://github.com/filecoin-project/slate/issues">
          Contribute
        </a>
      </div>
    </div>
  );
};

export default WebsitePrototypeFooter;
