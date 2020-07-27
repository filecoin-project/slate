import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_GROUP_CONTAINER = css`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid ${Constants.system.border};
  border-radius: 4px;
`;

const STYLES_TITLE = css`
  font-size: ${Constants.typescale.lvl2};
  width: 100%;
  margin-top: 8px;
  font-family: ${Constants.font.semiBold};
`;

const STYLES_HEADER = css`
  background: ${Constants.system.gray};
  padding: 24px 20px 24px 18px;
  border-radius: 4px 4px 0 0;
`;

const STYLES_GROUP = css`
  background: ${Constants.system.white};
  width: 100%;
  padding: 0;
  border-radius: 0 0 4px 4px;
`;

export default (props) => {
  return (
    <div css={STYLES_GROUP_CONTAINER} style={props.style} id={props.id}>
      <header css={STYLES_HEADER}>
        <div css={STYLES_TITLE}>{props.title}</div>
      </header>
      <div css={STYLES_GROUP} style={props.groupStyle}>
        {props.children}
      </div>
    </div>
  );
};
