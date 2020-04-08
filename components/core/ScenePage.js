import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_SCENE_BACKDROP = css`
  background: ${Constants.system.white};
  box-shadow: inset 1px 0 0 ${Constants.system.border};
  width: 100%;
`;

const STYLES_SCENE = css`
  max-width: 1296px;
  width: 100%;
  min-width: 10%;
  min-height: 100vh;
  padding: 48px 48px 128px 48px;
`;

export default (props) => {
  return (
    <div css={STYLES_SCENE_BACKDROP}>
      <div css={STYLES_SCENE} {...props} />
    </div>
  );
};
