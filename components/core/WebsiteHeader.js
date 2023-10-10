import * as React from "react";
import * as Constants from "~/common/constants";

import Link from "next/link";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const STYLES_CONTAINER = css`
  max-width: 1080px;
  margin: 0 auto;
  font-family: ${Constants.font.medium};
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Constants.semantic.textBlack};
  font-size: 14px;
  text-decoration: none;
  line-height: 20px;
  letter-spacing: -0.01px;
  padding: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 16px;
  }
`;

const STYLES_LOGO = css`
  height: 32px;
  width: 32px;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: center;
`;

const STYLES_BUTTON = css`
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  box-shadow: ${Constants.shadow.lightSmall};
  text-decoration: none;
  font-family: ${Constants.font.medium};
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.006px;
  cursor: pointer;
`;

const STYLES_BUTTON_PRIMARY_SMALL = css`
  ${STYLES_BUTTON};
  padding: 5px 16px 7px;
  border-radius: 12px;
  background-color: ${Constants.system.highlighter};
  color: ${Constants.semantic.textBlack};
`;

const STYLES_IMG = css`
  height: 20px;
`;

const WebsiteHeader = (props) => {
  const slate = "../public/static/Slate_volumetric.png";

  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER} style={props.style}>
        <Link href="../">
          <a css={STYLES_LOGO}>
            <img css={STYLES_IMG} src={slate} alt="Slate volumetric logo" />
          </a>
        </Link>
        <a href="/_/data" css={STYLES_BUTTON_PRIMARY_SMALL}>
          Get started
        </a>
      </div>
    </div>
  );
};

export default WebsiteHeader;
