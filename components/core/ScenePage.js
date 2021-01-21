import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_SCENE = css`
  flex-shrink: 0;
  width: 100%;
  padding: 104px 56px 104px 56px;
  display: block;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 36px 24px 128px 24px;
  }
`;

export const ScenePage = (props) => (
  <div css={STYLES_SCENE} {...props}>
    <div style={props.contentstyle}>{props.children}</div>
  </div>
);

export default ScenePage;
