import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_IMAGE = css`
  display: block;
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
`;

const STYLES_ENTITY = css`
  height: 100%;
  width: 100%;
  border: 1px solid ${Constants.system.border};
  background-color: ${Constants.system.foreground};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: none;
`;

export default class SlateMediaObjectPreview extends React.Component {
  render() {
    let element = <div css={STYLES_ENTITY}>No Preview</div>;

    if (this.props.type && this.props.type.startsWith("video/")) {
      element = <div css={STYLES_ENTITY}>Video</div>;
    }

    if (this.props.type && this.props.type.startsWith("audio/")) {
      element = <div css={STYLES_ENTITY}>Audio</div>;
    }

    if (this.props.type && this.props.type.startsWith("application/epub")) {
      element = <div css={STYLES_ENTITY}>EPub</div>;
    }

    if (this.props.type && this.props.type.startsWith("application/pdf")) {
      element = <div css={STYLES_ENTITY}>PDF</div>;
    }

    if (this.props.type && this.props.type.startsWith("image/")) {
      element = <img css={STYLES_IMAGE} src={this.props.url} />;
    }

    return element;
  }
}
