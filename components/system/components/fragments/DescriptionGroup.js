import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { TooltipAnchor } from "~/components/system/components/fragments/TooltipAnchor";

const STYLES_DESCRIPTION_GROUP_LABEL = css`
  font-family: ${Constants.font.semiBold};
  font-size: 14px;
  padding: 0;
  margin-bottom: 8px;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const STYLES_DESCRIPTION_GROUP_DESCRIPTION = css`
  font-family: ${Constants.font.text};
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.3;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const DescriptionGroup = (props) => {
  return (
    <div style={props.style}>
      {!Strings.isEmpty(props.label) ? (
        <div css={STYLES_DESCRIPTION_GROUP_LABEL}>
          {props.label}{" "}
          {props.tooltip ? (
            <TooltipAnchor
              tooltip={props.tooltip}
              height="14px"
              style={{ paddingTop: 16 }}
            />
          ) : null}
        </div>
      ) : null}
      {!Strings.isEmpty(props.description) ? (
        <div css={STYLES_DESCRIPTION_GROUP_DESCRIPTION}>
          {props.description}
        </div>
      ) : null}
    </div>
  );
};
