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
  top: 0px;
  left: 0px;
  border-radius: 3px 0px 0px 3px;
`;

const STYLES_ROW = css`
  font-family: ${Constants.font.code};
  color: ${Constants.system.darkGray};
  display: inline-flex;
  height: 16px;
  border-radius: 3px 0px 0px 3px;
  width: 100%;
`;

const STYLES_STATS_ROW = css`
  font-family: ${Constants.font.text};
  color: ${Constants.system.black};
  text-transform: uppercase;
  display: inline-flex;
  background-color: ${Constants.system.foreground};
  margin: 48px;
  width: 100%;
  height: 48px;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;
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

const DATA_METER_METER_SEGMENT = css`
  height: 16px;
  border-radius: 3px 0px 0px 3px;
`;

export const DataMeterBar = (props) => {
  const totalSize = props.maximumBytes;
  const percentage = props.bytes / props.maximumBytes;
  const percentageImage = props.stats.imageBytes / props.maximumBytes;
  const percentageVideo = props.stats.videoBytes;
  const percentageEpub = props.stats.epubBytes;
  const percentagePdf = props.stats.pdfBytes;
  const percentageAudio = props.stats.audioBytes;
  const percentageFreeSpace =
    props.maximumBytes -
    (props.stats.imageBytes +
      props.stats.videoBytes +
      props.stats.epubBytes +
      props.stats.epubBytes +
      props.stats.pdfBytes +
      props.stats.audioBytes);
  console.log(percentageImage);
  return (
    <React.Fragment>
      <div
        css={STYLES_ROW}
        style={{
          width: `${percentage}%`,
        }}
      >
        <div
          css={DATA_METER_METER_SEGMENT}
          style={{ width: `${percentageImage * 100}%`, backgroundColor: "#C0D8EE" }}
        ></div>
        <div
          css={DATA_METER_METER_SEGMENT}
          style={{ width: `${percentageVideo}%`, backgroundColor: "#C0DACD" }}
        ></div>
        <div
          css={DATA_METER_METER_SEGMENT}
          style={{ width: `${percentageEpub}%`, backgroundColor: "#FEEDC4" }}
        ></div>
        <div
          css={DATA_METER_METER_SEGMENT}
          style={{ width: `${percentagePdf}%`, backgroundColor: "#FAB413" }}
        ></div>
        <div
          css={DATA_METER_METER_SEGMENT}
          style={{ width: `${percentageAudio}%`, backgroundColor: "#F1C4C4" }}
        ></div>
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
      <DataMeterBar
        stats={props.stats}
        bytes={props.stats.bytes}
        maximumBytes={props.stats.maximumBytes}
      />
      <div style={{ position: "relative" }}></div>
      <div css={STYLES_NOTE}>
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

      <div css={STYLES_NOTE}>50GB coming soon with email verification</div>
    </div>
  );
};

export default DataMeter;
