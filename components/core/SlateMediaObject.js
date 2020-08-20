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
  user-select: none;
`;

const STYLES_ASSET = css`
  user-select: none;
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
  user-select: none;
  display: block;
  max-width: 100%;
  max-height: 100%;
`;

export default class SlateMediaObject extends React.Component {
  render() {
    const name = `${this.props.data.name}`;
    const url = this.props.data.url ? this.props.data.url : `https://hub.textile.io${this.props.data.ipfs}`;
    const type = this.props.data.type ? this.props.data.type : "LEGACY_NO_TYPE";

    if (type.startsWith("application/pdf")) {
      return <object css={STYLES_OBJECT} data={url} type={type} />;
    }

    if (type.startsWith("application/epub")) {
      return <div css={STYLES_FAILURE}>No Preview</div>;
    }

    if (type.startsWith("video/")) {
      return (
        <video autoPlay controls name="media" css={STYLES_OBJECT}>
          <source src={url} type={type} />
        </video>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <div css={STYLES_ASSET}>
          <audio autoPlay controls name="media">
            <source src={url} type={type} />
          </audio>
        </div>
      );
    }

    if (type.startsWith("image/")) {
      return (
        <div css={STYLES_ASSET}>
          <img css={STYLES_IMAGE} src={url} />
        </div>
      );
    }

    return <div css={STYLES_FAILURE}>No Preview</div>;
  }
}
