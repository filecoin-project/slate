import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

const STYLES_BUTTON = css`
  background-color: ${Constants.system.gray};
  color: ${Constants.system.pitchBlack};
  display: inline-flex;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-size: cover;
  background-position: 50% 50%;
  transition: 100ms ease all;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.007);

  :hover {
    background-color: #d4d4d4;
  }
`;

export const CircleButtonGray = (props) => {
  return <span css={STYLES_BUTTON} {...props} />;
};

export default CircleButtonGray;
