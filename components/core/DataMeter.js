import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";

import { css } from "@emotion/react";

// NOTE(jim): Consolidate if used elsewhere on the client (Not node_common)
const MAX_IN_BYTES = 10737418240 * 4;

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
  border-radius: 3px;
  overflow: hidden;
`;

const STYLES_DATA_METER_BASE = css`
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
  position: absolute;
  height: 16px;
  background-color: rgba(8, 102, 187, 0.25);
  top: 0px;
  left: 0px;
  border-radius: 3px 0px 0px 3px;
`;
const STYLES_DATA_METER_POSITION = css``;

const STYLES_ROW = css`
  display: flex;
  align-items: flex-end;
  position: absolute;

  justify-content: space-between;
  font-family: ${Constants.font.code};
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
  border-radius: 15px 50px 30px 5px;
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

const STYLES_DATA_METER_KEY_WRAPPER = css`
  display: inline-block;
`;
const STYLES_DATA_METER_KEY_SQUARE = css`
  display: inline-block;
  border-radius: 3px;
  background: #73ad21;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  vertical-align: middle;
`;
const STYLES_DATA_METER_KEY_LABEL = css`
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
`;

export const DataMeterBar = (props) => {
  const percentage = props.bytes / props.maximumBytes;
  console.log(props.bytes);
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

      <div style={{ position: "relative" }}>
        <div css={STYLES_DATA_METER_BASE}></div>
        <DataMeterBar
          bytes={
            props.stats.imageBytes +
            props.stats.videoBytes +
            props.stats.pdfBytes +
            props.stats.audioBytes +
            props.stats.epubBytes
          }
          maximumBytes={props.stats.maximumBytes}
        />
        <DataMeterBar
          bytes={
            props.stats.imageBytes +
            props.stats.videoBytes +
            props.stats.pdfBytes +
            props.stats.audioBytes
          }
          maximumBytes={props.stats.maximumBytes}
        />
        <DataMeterBar
          bytes={props.stats.imageBytes + props.stats.videoBytes + props.stats.pdfBytes}
          maximumBytes={props.stats.maximumBytes}
        />
        <DataMeterBar
          bytes={props.stats.imageBytes + props.stats.videoBytes}
          maximumBytes={props.stats.maximumBytes}
        />
        <DataMeterBar bytes={props.stats.imageBytes} maximumBytes={props.stats.maximumBytes} />
      </div>
      <div css={STYLES_NOTE}>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE}> </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Images</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE}> </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Videos</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE}> </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Books</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE}> </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>PDF</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE}> </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Other</div>
        </div>
      </div>

      <div css={STYLES_NOTE}>50GB coming soon with email verification</div>
    </div>
  );
  console.log(props.stats.bytes);
};

export default DataMeter;
