import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { TooltipAnchor } from "~/components/system/components/fragments/TooltipAnchor";

const STYLES_ROOT = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 578px;
  width: 100%;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
`;

const STYLES_HEADER = css`
  box-sizing: border-box;
  font-family: ${Constants.font.semiBold};
  font-size: 20px;
  padding: 0;
  margin-bottom: 8px;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const STYLES_DESCRIPTION = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.5;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export default (props) => {
  return (
    <header css={STYLES_ROOT} style={props.style}>
      <div css={STYLES_LEFT}>
        <div css={STYLES_HEADER}>{props.title}</div>
        <div css={STYLES_DESCRIPTION}>{props.children}</div>
      </div>
      <div css={STYLES_RIGHT}>{props.actions}</div>
    </header>
  );
};
