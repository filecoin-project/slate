import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";

import { css } from "@emotion/react";

// NOTE(jim): 10 GB
const MAX_IN_BYTES = 10737418240;

const STYLES_CONTAINER = css`
  border-radius: 4px;
  border: 1px solid ${Constants.system.border};
  padding: 32px;
  max-width: 100%;
  width: 100%;
`;

const STYLES_DATA = css`
  width: 100%;
  display: flex;
  align-items: center;
  height: 16px;
  border-radius: 3px;
  background-color: ${Constants.system.foreground};
  overflow: hidden;
`;

const STYLES_DATA_METER = css`
  flex-shrink: 0;
  height: 16px;
  background-color: ${Constants.system.brand};
`;

const STYLES_ROW = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-family: ${Constants.font.text};
  color: ${Constants.system.darkGray};
  font-size: 10px;
  margin-top: 2px;
  text-transform: uppercase;
`;

const STYLES_STATS_ROW = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-family: ${Constants.font.text};
  color: ${Constants.system.black};
  font-size: 12px;
  text-transform: uppercase;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100% "";
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
`;

const STYLES_TITLE = css`
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
  display: block;
  margin-bottom: 4px;
  overflow-wrap: break-word;
`;

export const DataMeterBar = (props) => {
  const percentage = props.bytes / props.maximumBytes;

  return (
    <React.Fragment>
      <div css={STYLES_TITLE}>
        {Strings.bytesToSize(props.bytes)} of Available{" "}
        {Strings.bytesToSize(props.maximumBytes)} Used
      </div>

      <div css={STYLES_ROW}>
        <div
          css={STYLES_LEFT}
          style={{ color: props.failed ? Constants.system.red : null }}
        >
          {props.leftLabel}
        </div>
        <div css={STYLES_RIGHT}>{props.rightLabel}</div>
      </div>

      <div
        css={STYLES_DATA}
        style={{
          marginTop: 16,
          backgroundColor: props.failed ? Constants.system.red : null,
        }}
      >
        <div
          css={STYLES_DATA_METER}
          style={{ width: `${percentage * 100}%` }}
        />
      </div>
    </React.Fragment>
  );
};

export const DataMeter = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <DataMeterBar
        bytes={props.stats.bytes}
        maximumBytes={props.stats.maximumBytes}
      />
    </div>
  );
};

export default DataMeter;
