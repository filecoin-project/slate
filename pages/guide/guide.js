import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsiteHeader from "~/components/core/WebsiteHeader";
import { useRouter } from "next/router";
import Link from "next/link";

import { css } from "@emotion/react";
import { useEventListener } from "~/common/hooks";

const STYLES_ROOT = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${Constants.semantic.bgGrayLight};
  color: ${Constants.semantic.textBlack};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 80px;
`;

const STYLES_CONTAINER = css`
  max-width: 700px;
  margin: 0 auto;
  padding-top: min(2.6vw, 200px);

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 32px 16px;
  }
`;

const STYLES_HEADING = css`
  font-family: ${Constants.font.semiBold};
  flex-shrink: 0;
  flex-shrink: 0;
  min-width: 50%;
  max-width: 100%;
  line-height: min(30px, 3vw);
  font-size: min(36px, 3.6vw);
  letter-spacing: -0.035em;
  margin-bottom: 20px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 12px;
  }

  @keyframes heading-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(50%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: heading-fade-in 200ms ease-in-out;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.medium};
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.015em;
  min-height: 84px;
  margin-bottom: min(0.3vw, 80px);

  @keyframes body-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(10%);
    }
    50% {
      opacity: 0%;
      transform: translateY(10%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: body-fade-in 350ms ease-in-out;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 17px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
`;

const STYLES_JUMPER = css`
  @keyframes jumper-fade-in {
    0% {
      opacity: 95%;
    }
    100% {
      opacity: 100%;
    }
  }
  animation: jumper-fade-in 200ms ease-in-out;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_FLEX = css`
  margin-top: min(1.5vw, 80px);
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Constants.sizes.tablet}px) {
    max-width: 100%;
  }
`;

const STYLES_BUTTON = css`
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  border: 1.25px solid ${Constants.semantic.borderGray};
  color: ${Constants.semantic.textBlack};

  :hover {
    background-color: ${Constants.semantic.textGray};
    color: ${Constants.semantic.textWhite};
  }

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const STYLES_IMGGUIDE = css`
  display: block;
  height: 498px;
  border-radius: 8px;
  margin-left: -190px;

  @keyframes guide-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(5%);
    }
    50% {
      opacity: 0%;
      transform: translateY(5%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: guide-fade-in 500ms ease-in-out;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: auto;
    margin-left: 0;
    border-radius: 4px;
  }
`;

const STYLES_MOBILEGUIDE = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    width: 100%;
    height: auto;
    margin: 20px 0 64px 0;

    @keyframes mobile-fade-in {
      0% {
        opacity: 0%;
        transform: translateY(5%);
      }
      50% {
        opacity: 0%;
        transform: translateY(5%);
      }
      100% {
        opacity: 100%;
        transform: translateY(0%);
      }
    }
    animation: mobile-fade-in 700ms ease-in-out;
  }
`;

export const useGuideKeyCommands = (next, prev) => {
  const router = useRouter();
  const handleKeyUp = (e) => {
    const input = document.querySelectorAll("input");
    for (let elem of input) {
      if (document.activeElement === elem) {
        return;
      }
    }
    const textarea = document.querySelectorAll("textarea");
    for (let elem of textarea) {
      if (document.activeElement === elem) {
        return;
      }
    }

    switch (e.key) {
      case "ArrowRight":
        if (next) router.push(next, undefined, { scroll: false });
        break;
      case "ArrowLeft":
        if (prev) router.push(prev, undefined, { scroll: false });
        break;
    }
  };
  useEventListener({ type: "keyup", handler: handleKeyUp });
};

export default function Guide({
  title,
  description,
  url,
  image,
  heading,
  body,
  jumper,
  imageguide,
  mobileguide,
  prev,
  next,
}) {
  useGuideKeyCommands(next, prev);
  return (
    <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
      <div css={STYLES_ROOT}>
        <WebsiteHeader />
        <div css={STYLES_CONTAINER}>
          <h1 css={STYLES_HEADING}>{heading}</h1>
          <p css={STYLES_BODY}>{body}</p>
          {jumper && <div css={STYLES_JUMPER}>{jumper}</div>}
          {imageguide && <img css={STYLES_IMGGUIDE} src={imageguide} alt="extension jumper" />}

          {mobileguide && (
            <img
              css={STYLES_MOBILEGUIDE}
              src={mobileguide}
              width="343"
              height="241"
              alt="extension jumper"
            />
          )}
          <div css={STYLES_FLEX}>
            <Link href={prev} scroll={false}>
              <a css={STYLES_BUTTON} style={{ marginRight: `16px` }}>
                <SVG.LeftArrow height={16} width={16} />
              </a>
            </Link>
            <Link href={next} scroll={false}>
              <a css={STYLES_BUTTON}>
                <SVG.RightArrow height={16} width={16} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </WebsitePrototypeWrapper>
  );
}
