import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_BUTTON = css`
  background-color: ${Constants.system.white};
  color: ${Constants.system.pitchBlack};
  display: inline-flex;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-size: cover;
  background-position: 50% 50%;
  transition: 100ms ease all;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  ${"" /* box-shadow: 0 0 0 1px ${Constants.system.bgGray} inset; */}

  :hover {
    background-color: rgb(253, 253, 253);
  }
`;

export const CircleButtonGray = (props) => {
  return <span css={STYLES_BUTTON} {...props} />;
};

export default CircleButtonGray;
