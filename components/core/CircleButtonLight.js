import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_BUTTON = css`
  background-color: ${Constants.system.white};
  color: ${Constants.system.pitchBlack};
  display: inline-flex;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  background-size: cover;
  background-position: 50% 50%;
  transition: 100ms ease all;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;

  :hover {
    color: ${Constants.system.white};
    background-color: ${Constants.system.brand};
  }
`;

export const CircleButtonLight = (props) => {
  return <span css={STYLES_BUTTON} {...props} />;
};

export default CircleButtonLight;
