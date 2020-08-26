import React, { useState } from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

// import Burger from "./Burger";
// import Menu from "./Menu";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 88px;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 3;
  height: 88px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
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
  padding: 12px 0;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  padding: 12px 0;
  justify-content: flex-end;
`;

export default (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      {/* <Burger open={open} setOpen={setOpen} />
      <Menu open={open} setOpen={setOpen} /> */}
      <div css={STYLES_LEFT}>
        <a
          css={STYLES_LINK}
          href="/"
          style={{ marginRight: 24, fontFamily: Constants.font.semiBold }}
        >
          Slate {Constants.values.version}
        </a>
      </div>
      <div css={STYLES_RIGHT}>
        <a css={STYLES_LINK} style={{ marginRight: 24 }} href="/_/system">
          View Source
        </a>
        <a css={STYLES_LINK} style={{ marginRight: 24 }} href="/_/system">
          Design System
        </a>
        <a
          css={STYLES_LINK}
          style={{ marginRight: 24 }}
          href="https://github.com/filecoin-project/slate"
        >
          Community
        </a>
        <a css={STYLES_LINK} style={{ marginRight: 24 }} href="/_/system">
          Sign Up
        </a>
        <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate">
          Download
        </a>
      </div>
    </div>
  );
};
