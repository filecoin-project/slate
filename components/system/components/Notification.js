import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const STYLES_NOTIFICATION = css`
  font-family: ${Constants.font.text};
  background-color: ${Constants.system.white};
  border-radius: 5px;
  padding: 15px 15px 3px 15px;
  display: grid;
  grid-template-columns: 35px 1fr;
  position: relative;
  width: 500px;
`;

const STYLES_ICON = css`
  position: relative;
  bottom: 2px;
  margin-bottom: 8px;
`;

const STYLES_CLOSE = css`
  height: 18px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const NOTIF_COLOR_MAP = {
  SUCCESS: Constants.system.green,
  ERROR: Constants.system.red,
  WARNING: Constants.system.yellow,
  INFO: Constants.system.brand,
};

const ICON_MAP = {
  SUCCESS: (
    <SVG.CheckCircle
      css={STYLES_ICON}
      height="24px"
      style={{
        color: `${NOTIF_COLOR_MAP["SUCCESS"]}`,
      }}
    />
  ),
  ERROR: (
    <SVG.XCircle
      css={STYLES_ICON}
      height="24px"
      style={{
        color: `${NOTIF_COLOR_MAP["ERROR"]}`,
      }}
    />
  ),
  WARNING: (
    <SVG.AlertCircle
      css={STYLES_ICON}
      height="24px"
      style={{
        color: `${NOTIF_COLOR_MAP["WARNING"]}`,
      }}
    />
  ),
  INFO: (
    <SVG.InfoCircle
      css={STYLES_ICON}
      height="24px"
      style={{
        color: `${NOTIF_COLOR_MAP["INFO"]}`,
      }}
    />
  ),
};

export class Notification extends React.Component {
  render() {
    return (
      <div
        css={STYLES_NOTIFICATION}
        style={{
          boxShadow: `0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ${
            NOTIF_COLOR_MAP[this.props.status || "INFO"]
          }`,
        }}
      >
        {ICON_MAP[this.props.status || "INFO"]}
        <DescriptionGroup
          tooltip={this.props.tooltip}
          label={this.props.label}
          description={this.props.description}
          style={{ marginBottom: "0" }}
        />
        {this.props.onClose ? (
          <SVG.X css={STYLES_CLOSE} onClick={this.props.onClose} />
        ) : null}
      </div>
    );
  }
}
