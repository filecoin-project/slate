import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

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
    const cid = this.props.data.ipfs.replace("/ipfs/", "");
    const url = Strings.getCIDGatewayURL(cid);
    const type = this.props.data.type ? this.props.data.type : "LEGACY_NO_TYPE";

    let element = <div css={STYLES_FAILURE}>No Preview</div>;

    if (type.startsWith("application/pdf")) {
      element = <object css={STYLES_OBJECT} data={url} type={type} />;
    }

    if (type.startsWith("application/epub")) {
      element = <div css={STYLES_FAILURE}>No Preview</div>;
    }

    if (type.startsWith("video/")) {
      element = (
        <video autoPlay controls name="media" css={STYLES_OBJECT}>
          <source src={url} type={type} />
        </video>
      );
    }

    if (type.startsWith("audio/")) {
      element = (
        <div css={STYLES_ASSET}>
          <audio autoPlay controls name="media">
            <source src={url} type={type} />
          </audio>
        </div>
      );
    }

    if (type.startsWith("image/")) {
      element = (
        <div css={STYLES_ASSET}>
          <img css={STYLES_IMAGE} src={url} />
        </div>
      );
    }

    return element;
  }
}
