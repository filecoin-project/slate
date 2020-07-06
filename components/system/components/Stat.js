import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const STYLES_BANDWIDTH = css`
  padding: 8px 8px 8px 8px;
  display: inline-flex;
  font-family: ${Constants.font.mono};
  font-size: 12px;
  letter-spacing: 0.2px;
  align-items: center;
  text-transform: uppercase;
`;

export const StatUpload = (props) => {
  return (
    <div css={STYLES_BANDWIDTH} style={props.style}>
      <SVG.BandwidthUp height="16px" style={{ marginRight: 8 }} />{" "}
      {props.children}
    </div>
  );
};

export const StatDownload = (props) => {
  return (
    <div css={STYLES_BANDWIDTH} style={props.style}>
      <SVG.BandwidthDown height="16px" style={{ marginRight: 8 }} />{" "}
      {props.children}
    </div>
  );
};
