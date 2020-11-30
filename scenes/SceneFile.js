import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import SlateMediaObject from "~/components/core/SlateMediaObject";

const STYLES_FLEX = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  background-color: ${Constants.system.pitchBlack};
`;

const STYLES_TOP = css`
  background: ${Constants.system.pitchBlack};
  border-bottom: 1px solid ${Constants.system.black};
  color: ${Constants.system.white};
  width: 100%;
  padding: 12px 16px 12px 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;
  padding-right: 16px;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  cursor: pointer;
  height: 100%;
  padding-top: 4px;
  transition: 200ms ease color;
  user-select: none;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_BOTTOM = css`
  background: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  padding: 12px 16px 12px 48px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_PATH = css`
  font-family: "mono";
  color: ${Constants.system.white};
  font-size: 12px;
  text-transform: uppercase;
  overflow-wrap: break-word;
  user-select: none;
`;

export default class SceneFile extends React.Component {
  render() {
    const cid = this.props.data.cid;
    const fileURL = Strings.getCIDGatewayURL(cid);

    return (
      <div css={STYLES_FLEX}>
        <div css={STYLES_TOP}>
          <div css={STYLES_LEFT}>
            <a css={STYLES_PATH} href={fileURL} target="_blank">
              {fileURL}
            </a>
          </div>
          <div css={STYLES_RIGHT} onClick={() => this.props.onBack()}>
            <SVG.Dismiss height="24px" />
          </div>
        </div>
        <SlateMediaObject data={this.props.data} />
      </div>
    );
  }
}
