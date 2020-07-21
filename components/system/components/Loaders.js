import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

//
//
//
//
//LOADER 1

const STYLES_LOADER_CIRCLE = `
  width: 24px;
  height: 24px;
  background-color: ${Constants.system.brand};
  border-radius: 100%;
  display: inline-block;
  animation: circle-bouncedelay 1.6s infinite ease-in-out both;

  @keyframes circle-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const STYLES_LOADER_CIRCLE_ONE = css`
  ${STYLES_LOADER_CIRCLE}
  animation-delay: -0.16s;
`;

const STYLES_LOADER_CIRCLE_TWO = css`
  ${STYLES_LOADER_CIRCLE}
  animation-delay: -0.32s;
`;

const STYLES_LOADER_CIRCLE_THREE = css`
  ${STYLES_LOADER_CIRCLE}
`;

//
//
//
//
//LOADER 2

const STYLES_LOADER_DIAMONDS = css`
  margin-left: 20px;
  width: 24px;
  height: 24px;
  transform: rotate(-45deg);
  position: relative;
`;

const STYLES_LOADER_DIAMOND = `
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1;
  animation: animate-diamond 0.92s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    infinite alternate;

  @keyframes animate-diamond {
    0% {
      transform: translate3d(-10px, -10px, 0);
    }
    100% {
      transform: translate3d(10px, 10px, 0);
    }
  }
`;

const STYLES_LOADER_DIAMOND_ONE = css`
  ${STYLES_LOADER_DIAMOND}
  background: ${Constants.system.brand};
  right: 0;
  bottom: 0;
  animation-direction: alternate-reverse
`;

const STYLES_LOADER_DIAMOND_TWO = css`
  ${STYLES_LOADER_DIAMOND}
  background: ${Constants.system.black};
  left: 0;
  top: 0;
`;

//
//
//
//
//LOADER 3

const STYLES_LOADER_MOON = css`
  position: relative;
  width: 56px;
  height: 56px;
  overflow: hidden;
`;

const STYLES_LOADER_MOON_CIRCLE = css`
  position: absolute;
  margin: 4px;
  width: 48px;
  height: 48px;
  background-color: ${Constants.system.foreground};
  box-sizing: border-box;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  border-bottom: 10px solid ${Constants.system.brand};
  border-radius: 50%;
  animation: animation-spin 1.15s ease infinite;

  @keyframes animation-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

//
//
//
//
//LOADER 4

const STYLES_LOADER_ROTATE = css`
  position: relative;
`;

const STYLES_LOADER_ROTATE_SQUARES = css`
  width: 32px;
  height: 32px;
  padding: 0px 0px 0px 16px;

  :after,
  :before {
    position: absolute;
    content: "";
    border: 2px solid ${Constants.system.brand};
    width: 24px;
    height: 24px;
  }
  :after {
    animation: animation-spinner-1 2.88s linear infinite;
  }
  :before {
    width: 40px;
    height: 40px;
    margin-left: -8px;
    margin-top: -8px;
    animation: animation-spinner-2 2.88s linear infinite;
  }

  @keyframes animation-spinner-1 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes animation-spinner-2 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
`;

//
//
//
//
//LOADER 5

const STYLES_LOADER_PROGRESS = css`
  width: 0;
  height: 16px;
  background-image: linear-gradient(
    to left,
    #2935ff,
    #342fc4,
    #33288b,
    #2b2157,
    #1d1927
  );
  border-radius: 4px;
  animation: progressbar 5s infinite;
  transition: width 0.8s ease;

  @keyframes progressbar {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

//
//
//
//
//LOADER 6

const STYLES_LOADER_SPINNER = css`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 2px solid ${Constants.system.brand};
  border-radius: 50%;
  border-top-color: ${Constants.system.foreground};
  animation: animation-spin 1s ease-in-out infinite;

  @keyframes animation-spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

//
//
//
//
//LOADER EXPORTS

export const LoaderProgress = (props) => (
  <div css={STYLES_LOADER_PROGRESS} {...props} />
);

export const LoaderSpinner = (props) => (
  <div css={STYLES_LOADER_SPINNER} {...props} />
);

export const LoaderCircles = () => (
  <div>
    <div css={STYLES_LOADER_CIRCLE_TWO} />
    <div css={STYLES_LOADER_CIRCLE_ONE} />
    <div css={STYLES_LOADER_CIRCLE_THREE} />
  </div>
);

export const LoaderDiamonds = () => (
  <div css={STYLES_LOADER_DIAMONDS}>
    <div css={STYLES_LOADER_DIAMOND_ONE} />
    <div css={STYLES_LOADER_DIAMOND_TWO} />
  </div>
);

export const LoaderMoon = () => (
  <div css={STYLES_LOADER_MOON}>
    <div css={STYLES_LOADER_MOON_CIRCLE} />
  </div>
);

export const LoaderRotate = () => (
  <div css={STYLES_LOADER_ROTATE}>
    <div css={STYLES_LOADER_ROTATE_SQUARES} />
  </div>
);
