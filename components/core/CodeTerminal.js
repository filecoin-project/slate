import * as React from "react";
import * as Constants from "~/common/constants";

import { css, keyframes } from "@emotion/react";

const typewriter = keyframes`
  0%, 100% {width: 0;}
  20%, 80% {width: 10.2em;}
`;

const STYLES_ROOT = css`
  height: 300px;
  width: 500px;

  @media (max-width: 600px) {
    height: 230px;
    width: 345px;
  }

  @media (max-width: 320px) {
    height: 200px;
    width: 300px;
  }
`;

const STYLES_WINDOW = css`
  box-sizing: border-box;
  font-family: ${Constants.font.mono};
  display: block;
  border-radius: 4px;
  width: 100%;
  background: ${Constants.system.pitchBlack};
  min-height: 288px;
  padding: 24px;
  color: ${Constants.system.white};
  resize: none;
  font-size: 14px;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  scrollbar-width: none;
  white-space: pre-wrap;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_WINDOW_NAV = css`
  border-bottom: 5px solid red;
`;

const STYLES_WINDOW_BODY = css`
  overflow: hidden;
  white-space: nowrap;
  animation: ${typewriter};
  display: inline-block;
  position: relative;
  animation-duration: 10s;
  animation-timing-function: steps(45, end);
  animation-iteration-count: infinite;
`;

const CodeTerminal = () => {
  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_WINDOW}>
        <div css={STYLES_WINDOW_NAV}>Cat</div>
        <div css={STYLES_WINDOW_BODY}>npm install --save slate-react-system</div>
      </div>
    </div>
  );
};

export default CodeTerminal;
