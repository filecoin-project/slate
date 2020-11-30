import * as React from "react";
import * as Constants from "~/common/constants";

import { css, keyframes } from "@emotion/react";

const typewriter = keyframes`
  0% {
    width: 0;
  }
  50% {
    width: 10.2em;
  }
  100% {
    width: 0;
  }
`;

const STYLES_ROOT = css`
  height: 300px;
  width: 500px;
  background-color: ${Constants.system.black};
  border-radius: 5px;

  @media (${Constants.sizes.tablet}px) {
    height: 230px;
    width: 345px;
  }

  @media (${Constants.sizes.mobile}px) {
    height: 200px;
    width: 300px;
  }
`;

const STYLES_WINDOW_HEADER = css`
  height: 34px;
  display: flex;
  align-items: center;
  text-align: center;

  @media (${Constants.sizes.mobile}px) {
    height: 28px;
  }
`;

const STYLES_ICON = css`
  border-radius: 50%;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 8px;

  :nth-of-type(1) {
    background: rgb(255, 95, 86);
    margin-left: 12px;
  }
  :nth-of-type(2) {
    background: rgb(255, 189, 46);
  }
  :nth-of-type(3) {
    background: rgb(39, 201, 63);
  }
`;

const STYLES_WINDOW_BODY = css`
  padding: 24px;
  overflow: hidden;
  white-space: nowrap;
  color: ${Constants.system.white};
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
      <div css={STYLES_WINDOW_HEADER}>
        <span css={STYLES_ICON} />
        <span css={STYLES_ICON} />
        <span css={STYLES_ICON} />
      </div>
      <div css={STYLES_WINDOW_BODY}>npm install --save slate-react-system</div>
    </div>
  );
};

export default CodeTerminal;
