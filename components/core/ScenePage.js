import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_SCENE = css`
  flex-shrink: 0;
  width: 100%;
  padding: 128px 48px 128px 48px;
  display: block;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 88px 24px 128px 24px;
  }
`;

const STYLES_CONTENT = css`
  max-width: ${Constants.sizes.desktop}px;
  margin: 0 auto;
`;

export const ScenePage = (props) => (
  <div css={STYLES_SCENE} {...props}>
    <div css={STYLES_CONTENT} style={props.contentstyle}>
      {props.children}
    </div>
  </div>
);

export default ScenePage;
