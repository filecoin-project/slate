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
  padding: 24px;
  max-width: 768px;
  width: 100%;
`;

const STYLES_DATA = css`
  width: 100%;
  display: flex;
  align-items: center;
  height: 8px;
  border-radius: 3px;
  background-color: ${Constants.system.border};
  overflow: hidden;
`;

const STYLES_DATA_METER = css`
  flex-shrink: 0;
  height: 100%;
  background-color: ${Constants.system.brand};
  background-image: linear-gradient(315deg, ${Constants.system.brand} 0%, #009ffd 74%);
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

const STYLES_STATS_ROW = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-family: ${Constants.font.code};
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
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
`;

export const DataMeterBar = (props) => {
  const percentage = props.bytes / props.maximumBytes;

  return (
    <React.Fragment>
      <div css={STYLES_STATS_ROW}>
        <div css={STYLES_LEFT}>{Strings.bytesToSize(props.bytes)}</div>
        <div css={STYLES_RIGHT}>{Strings.bytesToSize(props.maximumBytes)}</div>
      </div>

      <div css={STYLES_ROW}>
        <div css={STYLES_LEFT}>Used</div>
        <div css={STYLES_RIGHT}>Total</div>
      </div>

      <div css={STYLES_DATA} style={{ marginTop: 4 }}>
        <div css={STYLES_DATA_METER} style={{ width: `${percentage * 100}%` }} />
      </div>
    </React.Fragment>
  );
};

export default (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <System.P style={{ fontSize: 12 }}>
        <strong css={STYLES_TITLE}>Usage</strong>
        Slate users get 1GB of IPFS storage from Textile. In the future you can extend this with your own plugins using
        our SDK.
        <br />
        <br />
      </System.P>

      <DataMeterBar bytes={props.stats.bytes} maximumBytes={props.stats.maximumBytes} />
    </div>
  );
};
