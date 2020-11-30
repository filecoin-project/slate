import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

const STYLES_BANDWIDTH = css`
  box-sizing: border-box;
  padding: 8px 8px 8px 8px;
  display: inline-flex;
  font-family: ${Constants.font.mono};
  font-size: 12px;
  letter-spacing: 0.2px;
  align-items: center;
  text-transform: uppercase;
`;

export const StatUpload = (props) => {
  const size = Strings.bytesToSize(props.size, props.decimal || 2);
  return (
    <div css={STYLES_BANDWIDTH} style={props.style}>
      <SVG.BandwidthUp height="16px" style={{ marginRight: 8 }} /> {size}
    </div>
  );
};

export const StatDownload = (props) => {
  const size = Strings.bytesToSize(props.size, props.decimal || 2);
  return (
    <div css={STYLES_BANDWIDTH} style={props.style}>
      <SVG.BandwidthDown height="16px" style={{ marginRight: 8 }} /> {size}
    </div>
  );
};
