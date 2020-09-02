import React, { useState } from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  font-size: 1rem;
  width: 100%;
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
  color: ${Constants.system.moonstone};
  text-decoration: none;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.moonstone};
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

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

// Tara: [WIP] mobile burger menu
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
    color: ${Constants.system.white};
  }
`;

const STYLES_BURGER_BUN = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.white};
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
  transform: rotate(0);
`;

const STYLES_BURGER_MEAT = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.white};
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
  opacity: 1;
`;

const STYLES_BURGER_BUN2 = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.white};
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
  transform: rotate(0);
`;

const STYLES_BURGER_OPEN = css`
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
  }
`;

const STYLES_BURGER_BUN_OPEN = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.white};
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
  transform: rotate(45deg);
`;

const STYLES_BURGER_MEAT_OPEN = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.white};
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
  opacity: 0;
`;

const STYLES_BURGER_BUN2_OPEN = css`
  width: 24px;
  height: 2px;
  background: ${Constants.system.white};
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
  transform: rotate(-45deg);
`;

const STYLES_MENU = css`
  display: none;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
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
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);

    a {
      padding: 16px 0;
      color: ${Constants.system.white};
      text-decoration: none;
      transition: color 0.3s linear;

      font-size: 2.441em;
      text-align: left;

      &:hover {
        color: ${Constants.system.darkGray};
      }
    }
  }
`;

const STYLES_MENU_OPEN = css`
  display: none;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
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
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);

    a {
      padding: 16px 0;
      color: ${Constants.system.white};
      text-decoration: none;
      transition: color 0.3s linear;

      font-size: 2.441em;
      text-align: left;

      &:hover {
        color: ${Constants.system.darkGray};
      }
    }
  }
`;

export default (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_LEFT}>
        <a css={STYLES_LINK} href="/" style={{ marginRight: 24, fontFamily: Constants.font.semiBold }}>
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
        <a css={STYLES_LINK} style={{ marginRight: 24 }} href="https://github.com/filecoin-project/slate">
          Community
        </a>
        <a css={STYLES_LINK} style={{ marginRight: 24 }} href="/_/system">
          Sign Up
        </a>
        <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate">
          Download
        </a>
      </div>
      <div>
        <div open={open} onClick={() => setOpen(!open)} css={open ? STYLES_BURGER_OPEN : STYLES_BURGER}>
          <div css={open ? STYLES_BURGER_BUN_OPEN : STYLES_BURGER_BUN} />
          <div css={open ? STYLES_BURGER_MEAT_OPEN : STYLES_BURGER_MEAT} />
          <div css={open ? STYLES_BURGER_BUN2_OPEN : STYLES_BURGER_BUN2} />
        </div>
        <div open={open} css={open ? STYLES_MENU_OPEN : STYLES_MENU}>
          <a href="/">View source</a>
          <a href="/">Design system</a>
          <a href="/">Community</a>
          <a href="/">Sign up</a>
          <a href="/">Download</a>
        </div>
      </div>
    </div>
  );
};
