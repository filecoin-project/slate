import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_PAGE_CONTENT = css`
  width: 100%;
  ${"" /* max-width: 1074px;
  padding: 0px 24px; */}
  max-width: 1024px;
  padding: 0px;
  margin: 0 auto;
`;

export const SceneContent = (props) => (
  <div css={STYLES_PAGE_CONTENT} {...props} />
);

export default SceneContent;
