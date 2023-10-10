import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsiteHeader from "~/components/core/WebsiteHeader";
import WebsiteFooter from "~/components/core/WebsiteFooter";
import Link from "next/link";

import { css } from "@emotion/react";
import { useGuideKeyCommands } from "./guide/guide";

const STYLES_ROOT = css`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 61px);
  background-color: ${Constants.semantic.bgGrayLight};
  color: ${Constants.semantic.textBlack};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: ${Constants.sizes.mobile}px) {
    min-height: calc(100vh - 112px);
  }
`;

const STYLES_CONTAINER = css`
  max-width: 700px;
  margin: 0 auto;
  padding: min(0.2vw, 120px) 0 40px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 16px 16px 32px 16px;
  }
`;

const STYLES_IMG = css`
  width: 92%;
  height: auto;
  margin-bottom: 24px;

  @keyframes hero-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(5%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: hero-fade-in 300ms ease-in-out;
`;

const STYLES_HEADING = css`
  font-family: ${Constants.font.bold};
  flex-shrink: 0;
  flex-shrink: 0;
  min-width: 50%;
  max-width: 100%;
  line-height: min(100px, 6vw);
  font-size: min(120px, 6vw);
  letter-spacing: -0.05em;
  margin-bottom: 21px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 60px;
    line-height: 60px;
    letter-spacing: -0.04em;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 48px;
    line-height: 48px;
    letter-spacing: -0.04em;
  }

  @keyframes heading-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(25%);
    }
    50% {
      opacity: 0%;
      transform: translateY(25%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: heading-fade-in 400ms ease-in-out;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.medium};
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.015em;
  margin-bottom: 24px;

  @keyframes body-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(50%);
    }
    50% {
      opacity: 0%;
      transform: translateY(50%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: body-fade-in 600ms ease-in-out;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.01em;
  }
`;

const STYLES_CURSOR_BLINK = css`
  display: inline-block;
  background-color: ${Constants.semantic.textGray};
  width: min(50px, 2.6vw);
  height: min(88px, 4.5vw);
  margin-left: 6px;
  overflow: visible;

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 25px;
    height: 44px;
    margin-left: 4px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 20px;
    height: 35px;
    margin-left: 2px;
  }
`;

const STYLES_BUTTON = css`
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  padding: 18px 32px;
  border-radius: 20px;
  font-family: ${Constants.font.medium};
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.015em;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid ${Constants.semantic.borderGray};
  color: ${Constants.semantic.textBlack};

  :hover {
    background-color: ${Constants.semantic.textGray};
    color: ${Constants.semantic.textWhite};
  }

  @keyframes button-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(50%);
    }
    50% {
      opacity: 0%;
      transform: translateY(50%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: button-fade-in 700ms ease-in-out;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.01em;
    padding: 14px 20px;
  }
`;

export default function IndexPage() {
  const title = `Slate`;
  const description = "Your personal search engine";
  const url = "https://slate.host/";
  const image = `${Constants.gateways.ipfs}/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4`;
  const next = "../guide/browser-control";

  useGuideKeyCommands(next);

  return (
    <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
      <div css={STYLES_ROOT}>
        <WebsiteHeader />
        <div css={STYLES_CONTAINER}>
          <div style={{ width: "100%" }}>
            <img
              css={STYLES_IMG}
              width="644"
              height="290.72"
              src="../public/static/browser-tabs.png"
              alt="a list of windows"
            />
          </div>
          <h1 css={STYLES_HEADING}>
            Save, organize, <br />
            search
            <span css={STYLES_CURSOR_BLINK} />
          </h1>
          <p css={STYLES_BODY}>
            Slate is a personal storage space that helps you keep track and come back to things you
            care about on the web.
          </p>
          <Link href={next}>
            <a css={STYLES_BUTTON}>
              Get started <SVG.RightArrow height={20} width={20} style={{ marginLeft: 8 }} />
            </a>
          </Link>
        </div>
      </div>
      <WebsiteFooter />
    </WebsitePrototypeWrapper>
  );
}
