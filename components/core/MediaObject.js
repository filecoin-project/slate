import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_FAILURE = css`
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 88px;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
`;

const STYLES_OBJECT = css`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
`;

const STYLES_ASSET = css`
  background-color: ${Constants.system.pitchBlack};
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const STYLES_IMAGE = css`
  display: block;
  max-width: 100%;
  max-height: 100%;
`;

export default class MediaObject extends React.Component {
  render() {
    const name = `${this.props.data.name}`;
    const url = this.props.data.url ? this.props.data.url : `https://hub.textile.io${this.props.data.ipfs}`;

    let mediaElement = <div css={STYLES_FAILURE}>No Preview</div>;

    if (this.props.data.type.startsWith("application/pdf")) {
      mediaElement = <object css={STYLES_OBJECT} data={url} type={this.props.data.type} />;
    }

    if (this.props.data.type.startsWith("image/")) {
      mediaElement = (
        <div css={STYLES_ASSET}>
          <img css={STYLES_IMAGE} src={url} />
        </div>
      );
    }

    return mediaElement;
  }
}
