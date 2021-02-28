import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${Constants.system.lightBorder} inset, 0 0 40px 0 ${Constants.system.shadow};
  padding: 32px;
  max-width: 100%;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
  }
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
  font-family: ${Constants.font.code};
  color: ${Constants.system.darkGray};
  font-size: 10px;
  margin-top: 2px;
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

const STYLES_NOTE = css`
  margin-top: 8px;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
  display: block;
  margin-bottom: 4px;
`;

export const DataMeterBar = (props) => {
  const percentage = props.bytes / props.maximumBytes;

  return (
    <React.Fragment>
      <div css={STYLES_ROW}>
        <div css={STYLES_LEFT} style={{ color: props.failed ? Constants.system.red : null }}>
          {props.leftLabel}
        </div>
        <div css={STYLES_RIGHT}>{props.rightLabel}</div>
      </div>

      <div
        css={STYLES_DATA}
        style={{
          marginTop: 8,
          backgroundColor: props.failed ? Constants.system.red : null,
        }}
      >
        <div css={STYLES_DATA_METER} style={{ width: `${percentage * 100}%` }} />
      </div>
    </React.Fragment>
  );
};

export const DataMeter = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_TITLE}>
        {Strings.bytesToSize(props.stats.bytes)} of {Strings.bytesToSize(props.stats.maximumBytes)}{" "}
        used
      </div>
      <DataMeterBar bytes={props.stats.bytes} maximumBytes={props.stats.maximumBytes} />
      <div css={STYLES_NOTE}>50GB coming soon when we add email verification</div>
    </div>
  );
};

export default DataMeter;
