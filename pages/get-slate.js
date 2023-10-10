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
  background-color: ${Constants.semantic.bgLight};
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
  padding: min(2.5vw, 120px) 0 24px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 16px 16px 24px 16px;
  }
`;

const STYLES_IMG = css`
  width: 88%;
  height: auto;
  margin-bottom: 8px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }

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
  font-size: min(100px, 6vw);
  letter-spacing: -0.05em;
  margin-bottom: 21px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 64px;
    line-height: 68px;
    letter-spacing: -0.04em;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 48px;
    line-height: 52px;
    letter-spacing: -0.04em;
    margin-bottom: 13px;
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
  margin-bottom: 20px;

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
    margin-bottom: 16px;
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
  margin-right: 16px;
  margin-bottom: 16px;
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

const STYLES_PRIMARY_BUTTON = css`
  ${STYLES_BUTTON}
  background-color: ${Constants.system.highlighter};
  color: ${Constants.semantic.textBlack};
`;

const STYLES_SECONDARY_BUTTON = css`
  ${STYLES_BUTTON}
  background-color: none;
  border: 2px solid ${Constants.semantic.borderGray};
  color: ${Constants.semantic.textBlack};
`;

export default function InstallPage() {
  const title = `Install Slate for Chrome - Slate`;
  const description = "Install Slate from Chrome web store";
  const url = "https://slate.host/get-slate";
  const image = `${Constants.gateways.ipfs}/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4`;
  const next = "/_/data";
  const prev = "../guide/new-tab";

  useGuideKeyCommands(next, prev);

  return (
    <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
      <div css={STYLES_ROOT}>
        <WebsiteHeader />
        <div css={STYLES_CONTAINER}>
          <div style={{ width: "100%" }}>
            <img
              css={STYLES_IMG}
              src="../public/static/slate-jumper.png"
              alt="extension jumper"
              width="616"
              height="278"
            />
          </div>
          <h1 css={STYLES_HEADING}>
            Get started — <br />
            it’s free.
          </h1>
          <p css={STYLES_BODY}>
            Slate is currently free to use, we’ll add premium features later on for you to use.
          </p>
          <a href="/_/data" css={STYLES_PRIMARY_BUTTON}>
            Get started <SVG.RightArrow height={20} width={20} style={{ marginLeft: 8 }} />
          </a>
          <a
            css={STYLES_SECONDARY_BUTTON}
            target="_blank"
            rel="noreferrer"
            href={Constants.extensionLink.chrome}
          >
            Get Slate from Chrome store
          </a>
        </div>
      </div>
      <WebsiteFooter />
    </WebsitePrototypeWrapper>
  );
}
