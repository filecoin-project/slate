import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { TooltipAnchor } from "~/components/system/components/fragments/TooltipAnchor";

const STYLES_DESCRIPTION_GROUP_LABEL = css`
  box-sizing: border-box;
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
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.5;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  a {
    font-family: ${Constants.font.text};
    font-weight: 400;
    color: ${Constants.system.moonstone};
    cursor: pointer;
    transition: 200ms ease color;

    :visited {
      color: ${Constants.system.moonstone};
    }

    :hover {
      color: ${Constants.system.slate};
    }
  }
`;

export const DescriptionGroup = (props) => {
  return (
    <div style={{ maxWidth: props.full ? "none" : "480px", ...props.style }}>
      {!Strings.isEmpty(props.label) ? (
        <div css={STYLES_DESCRIPTION_GROUP_LABEL}>
          {props.label} {props.tooltip ? null : null}
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
