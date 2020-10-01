import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { TooltipAnchor } from "~/components/system/components/fragments/TooltipAnchor";
import { ProcessedText } from "~/components/system/components/Typography";

const STYLES_ROOT = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  padding-left: 24px;
  justify-self: end;
`;

const STYLES_HEADER = css`
  box-sizing: border-box;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl4};
  padding: 0;
  margin-bottom: 8px;
  display: block;
  width: 100%;
  max-width: 688px;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_DESCRIPTION = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 12px;
  line-height: 1.5;
  display: block;
  width: 100%;
  max-width: 688px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const ScenePageHeader = (props) => {
  return (
    <header css={STYLES_ROOT} style={props.style}>
      <div css={STYLES_LEFT}>
        <div css={STYLES_HEADER}>{props.title}</div>
        <div css={STYLES_DESCRIPTION}>
          <ProcessedText text={props.children} />
        </div>
      </div>
      {props.actions ? <div css={STYLES_RIGHT}>{props.actions}</div> : null}
    </header>
  );
};

export default ScenePageHeader;
