import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_TOOLTIP = `
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  border-radius: 4px;
  padding: 8px 12px;
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  line-height: 1.2;
  transition: 100ms ease all;
`;

const STYLES_TOOLTIP_LIGHT = css`
  ${STYLES_TOOLTIP}
  background-color: rgba(248, 248, 248, 0.6);
  color: #4b4a4d;
`;

const STYLES_TOOLTIP_DARK = css`
  ${STYLES_TOOLTIP}
  background-color: rgba(0, 0, 0, 0.75);
  color: ${Constants.system.white};
`;

export const Tooltip = (props) => {
  return (
    <div style={{ maxWidth: 400 }}>
      <span css={props.light ? STYLES_TOOLTIP_LIGHT : STYLES_TOOLTIP_DARK} style={props.style}>
        {props.children}
      </span>
    </div>
  );
};
