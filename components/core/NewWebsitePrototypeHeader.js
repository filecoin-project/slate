import React, { useState } from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { Logo } from "~/common/logo.js";
import { NearestMipMapLinearFilter } from "three";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  font-size: 1rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 16px 88px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 3;
  height: 88px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.darkGray};
  text-decoration: none;
  transition: 200ms ease color;
  :visited {
    color: ${Constants.system.gray};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 12px 0;
  height: 24px;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  padding: 12px 0;
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
    position: absolute;
    top: 20px;
    right: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
    color: ${Constants.system.darkGray};
  }
`;

const STYLES_BURGER_BUN = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1px;
  transform: rotate(0);
  transistion-property: transform;
`;

const openBurgerBun = {
  transform: `rotate(45deg)`,
};

const STYLES_BURGER_MEAT = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1px;
  opacity: 1;
  transistion-property: transform;
`;

const openBurgerMeat = {
  opacity: `0`,
};

const STYLES_BURGER_BUN2 = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1px;
  transform: rotate(0);
  transistion-property: transform;
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
    background: ${Constants.system.pitchBlack};
    height: 100vh;
    width: 100vw;
    text-align: left;
    padding: 24px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
    transition: 1s ease-in-out;
    transition-property: transform, width;
  }
`;

const STYLES_NAVLINK = css`
  display: none;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px 0;
    color: ${Constants.system.white};
    text-decoration: none;
    transition: color 0.3s linear;
    transition-property: transform;

    font-size: 1.563rem;
    text-align: left;

    &:hover {
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

export const NewWebsitePrototypeHeader = (props) => {
  const [open, setOpen] = useState(false);
  const communityURL = "/community";
  const signInURL = "/_";
  const styleMenu = open ? openMenu : null;
  const styleBurgerBun = open ? openBurgerBun : null;
  const styleBurgerMeat = open ? openBurgerMeat : null;
  const styleBurgerBun2 = open ? openBurgerBun2 : null;
  const styleNavLink = open ? openNavLink : null;

  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_LEFT}>
        <a css={STYLES_LINK} href="/" style={{ marginRight: 24 }}>
          <Logo style={{ width: 64 }} />
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
          <div css={STYLES_BURGER_MEAT} style={styleBurgerMeat} />
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
  );
};

export default NewWebsitePrototypeHeader;
