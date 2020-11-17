import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";

import UnityFrame from "~/components/core/UnityFrame";

import { css } from "@emotion/core";

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

const typeMap = {
  "video/quicktime": "video/mp4",
};

export default class SlateMediaObject extends React.Component {
  render() {
    // NOTE(jim):
    // This is a hack to catch this undefined case I don't want to track down yet.
    const url = this.props.data.url.replace("https://undefined", "https://");
    const type = this.props.data.type ? this.props.data.type : "LEGACY_NO_TYPE";
    const playType = typeMap[type] ? typeMap[type] : type;
    console.log(this.props);
    let element = <div css={STYLES_FAILURE}>No Preview</div>;
    console.log(url);
    if (type.startsWith("application/pdf")) {
      return <object css={STYLES_OBJECT} data={url} type={type} />;
    }

    if (type.startsWith("video/")) {
      return (
        <video autoPlay playsInline controls name="media" type={playType} css={STYLES_OBJECT}>
          <source src={url} type={playType} />
        </video>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <div css={STYLES_ASSET}>
          <audio autoPlay controls name="media">
            <source src={url} type={playType} />
          </audio>
        </div>
      );
    }

    if (Validations.isPreviewableImage(type)) {
      return (
        <div css={STYLES_ASSET}>
          <img css={STYLES_IMAGE} src={url} />
        </div>
      );
    }

    if (type.startsWith("application/")) {
      return <UnityFrame url={url} />;
    }

    return element;
  }
}
