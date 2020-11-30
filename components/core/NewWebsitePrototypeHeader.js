import React, { useState, useEffect } from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { Logo } from "~/common/logo.js";

const STYLES_ROOT = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 24px 88px 24px 64px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  mix-blend-mode: difference;
  z-index: ${Constants.zindex.header};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px 24px;
    mix-blend-mode: normal;
  }
`;
const STYLES_CONTAINER = css`
  max-width: 1440px;
  margin: 0 auto;
  font-family: ${Constants.font.text};
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
  color: ${Constants.system.darkGray};
  text-decoration: none;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.system.newBlue};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    color: ${Constants.system.slate};
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

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILENAV = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
  }
`;

const STYLES_BURGER = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    z-index: ${Constants.zindex.modal};
    position: absolute;
    top: 12px;
    right: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;

const STYLES_BURGER_BUN = css`
  width: 20px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1.5px;
  transform: rotate(0);
  transistion-property: transform;

  @media (max-width: ${Constants.sizes.mobile}px) {
    background: ${Constants.system.slate};
  }
`;

const openBurgerBun = {
  transform: `rotate(45deg)`,
};

const STYLES_BURGER_BUN2 = css`
  width: 20px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1.5px;
  transform: rotate(0);
  transistion-property: transform;

  @media (max-width: ${Constants.sizes.mobile}px) {
    background: ${Constants.system.slate};
  }
`;

const openBurgerBun2 = {
  transform: `rotate(-45deg)`,
};

const STYLES_MENU = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
    flex-direction: column;
    justify-content: center;
    background: ${Constants.system.wall};
    height: 100vh;
    width: 100vw;
    text-align: left;
    padding: 24px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
    transition: 200ms ease-in-out;
    transition-property: transform, width;
  }
`;

const STYLES_NAVLINK = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 8px 0;
    color: ${Constants.system.slate};
    text-decoration: none;
    transition: color 0.3s linear;
    transition-property: transform;
    font-family: ${Constants.font.medium};
    font-weight: 400;
    font-size: ${Constants.typescale.lvl2};
    letter-spacing: -0.017rem;
    line-height: 1.3;
    text-align: left;

    :hover {
      color: ${Constants.system.darkGray};
    }
  }
`;

const openMenu = {
  display: `flex`,
  transform: `translateX(0)`,
};

const openNavLink = {
  display: `flex`,
};

const NewWebsitePrototypeHeader = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleOpen);
    return () => window.removeEventListener("resize", handleOpen);
  });

  const handleOpen = () => {
    setOpen(false);
  };

  const communityURL = "https://github.com/filecoin-project/slate";
  const signInURL = "/_";
  const styleMenu = open ? openMenu : null;
  const styleBurgerBun = open ? openBurgerBun : null;
  const styleBurgerBun2 = open ? openBurgerBun2 : null;
  const styleNavLink = open ? openNavLink : null;

  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER} style={props.style}>
        <div css={STYLES_LEFT}>
          <a css={STYLES_LINK} href="/" style={{ marginRight: 24 }}>
            <Logo style={{ height: 20 }} />
          </a>
        </div>
        <div css={STYLES_RIGHT}>
          <a css={STYLES_LINK} style={{ marginRight: 24 }} href={communityURL}>
            Get involved
          </a>
          <a css={STYLES_LINK} href={signInURL}>
            Sign in
          </a>
        </div>
        <div css={STYLES_MOBILENAV}>
          <div onClick={() => setOpen(!open)} css={STYLES_BURGER}>
            <div css={STYLES_BURGER_BUN} style={styleBurgerBun} />
            <div css={STYLES_BURGER_BUN2} style={styleBurgerBun2} />
          </div>
          <div css={STYLES_MENU} style={styleMenu}>
            <a css={STYLES_NAVLINK} style={styleNavLink} href={communityURL}>
              Get involved
            </a>
            <a css={STYLES_NAVLINK} style={styleNavLink} href={signInURL}>
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWebsitePrototypeHeader;
