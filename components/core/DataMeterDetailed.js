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
  background-color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
  }
`;

const STYLES_ROW = css`
  font-family: ${Constants.font.code};
  color: ${Constants.system.darkGray};
  background-color: ${Constants.system.foreground};
  display: inline-flex;
  height: 16px;
  width: 100%;
`;

const STYLES_STATS_ROW = css`
  background-color: ${Constants.system.foreground};
  width: 100%;
  border-radius: 3px;
  height: 16px;
`;

const STYLES_TITLE = css`
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
  display: block;
  margin-bottom: 12px;
  overflow-wrap: break-word;
`;

const STYLES_NOTE = css`
  margin-top: 12px;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
  display: block;
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

const DATA_METER_METER_SEGMENT = css`
  height: 16px;
`;

export const DataMeterBar = (props) => {
  const percentageUsed = props.bytes / props.maximumBytes;
  const percentageImage = props.stats.imageBytes / props.bytes;
  const percentageVideo = props.stats.videoBytes / props.bytes;
  const percentageEpub = props.stats.epubBytes / props.bytes;
  const percentagePdf = props.stats.pdfBytes / props.bytes;
  const percentageAudio = props.stats.audioBytes / props.bytes;
  const percentageFreeSpace = props.bytes - props.maximumBytes;

  return (
    <React.Fragment>
      <div css={STYLES_STATS_ROW}>
        <div
          css={STYLES_ROW}
          style={{
            width: `${percentageUsed * 100}%`,
          }}
        >
          <div
            css={DATA_METER_METER_SEGMENT}
            style={{
              width: `${percentageImage * 100}%`,
              backgroundColor: "#C0D8EE",
              borderRadius: "3px 0px 0px 3px",
            }}
          />
          <div
            css={DATA_METER_METER_SEGMENT}
            style={{ width: `${percentageVideo * 100}%`, backgroundColor: "#C0DACD" }}
          />
          <div
            css={DATA_METER_METER_SEGMENT}
            style={{ width: `${percentageEpub * 100}%`, backgroundColor: "#FEEDC4" }}
          />
          <div
            css={DATA_METER_METER_SEGMENT}
            style={{ width: `${percentagePdf * 100}%`, backgroundColor: "#FAB413" }}
          />
          <div
            css={DATA_METER_METER_SEGMENT}
            style={{ width: `${percentageAudio * 100}%`, backgroundColor: "#F1C4C4" }}
          />
          <div
            css={DATA_METER_METER_SEGMENT}
            style={{
              width: `${percentageFreeSpace * 100}%`,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const DataMeterDetailed = (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_TITLE}>
        {Strings.bytesToSize(props.stats.bytes)} of {Strings.bytesToSize(props.stats.maximumBytes)}{" "}
        used
      </div>
      <DataMeterBar
        stats={props.stats}
        bytes={props.stats.bytes}
        maximumBytes={props.stats.maximumBytes}
      />
      <div css={STYLES_NOTE} style={{ marginTop: 8 }}>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE} style={{ background: `#C0D8EE` }}>
            {" "}
          </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Images</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE} style={{ background: `#C0DACD` }}>
            {" "}
          </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Videos</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE} style={{ background: "#FEEDC4" }}>
            {" "}
          </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Books</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE} style={{ background: "#FAB413" }}>
            {" "}
          </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>PDF</div>
        </div>
        <div css={STYLES_DATA_METER_KEY_WRAPPER}>
          <div css={STYLES_DATA_METER_KEY_SQUARE} style={{ background: "#F1C4C4" }}>
            {" "}
          </div>
          <div css={STYLES_DATA_METER_KEY_LABEL}>Audio</div>
        </div>
      </div>

      <div css={STYLES_NOTE}>50GB coming soon when we add email verification</div>
      {props.buttons ? <div style={{ marginTop: 24 }}>{props.buttons}</div> : null}
    </div>
  );
};

export default DataMeterDetailed;
