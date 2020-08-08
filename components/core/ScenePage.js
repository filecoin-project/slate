import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_SCENE = css`
  max-width: 1296px;
  width: 100%;
  padding: 88px 48px 128px 48px;
`;

export default (props) => {
  return <div css={STYLES_SCENE} {...props} />;
};
