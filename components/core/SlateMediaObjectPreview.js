import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_IMAGE = css`
  display: block;
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
  transition: 200ms ease all;
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
    // NOTE(jim):
    // This is a hack to catch this undefined case I don't want to track down yet.
    const url = this.props.url.replace("https://undefined", "https://");

    let element = (
      <article css={STYLES_ENTITY} style={this.props.style}>
        No Preview
      </article>
    );

    if (this.props.type && this.props.type.startsWith("video/")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          Video
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("audio/")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          Audio
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/epub")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          EPub
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/pdf")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          PDF
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("image/")) {
      element = (
        <img css={STYLES_IMAGE} style={this.props.imageStyle} src={url} />
      );
    }

    return element;
  }
}
