import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CODE_BLOCK = css`
  font-family: "mono";
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};
  border-radius: 4px;
  padding: 24px;
  font-size: 12px;
  word-wrap: break-word;
  white-space: pre-wrap;
  width: 100%;
`;

export const CodeBlock = (props) => {
  return (
    <div css={STYLES_CODE_BLOCK}>
      <code {...props} />
    </div>
  );
};
