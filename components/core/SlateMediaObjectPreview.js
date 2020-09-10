import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_IMAGE = css`
  background-color: ${Constants.system.foreground};
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
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: none;
  padding: 8px;
  font-size: 0.9rem;
`;

const STYLES_TITLE = css`
  width: 100%;
  text-align: center;
  margin-top: 8px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: break-word;
`;

export default class SlateMediaObjectPreview extends React.Component {
  static defaultProps = {
    charCap: 30,
  };

  render() {
    // NOTE(jim):
    // This is a hack to catch this undefined case I don't want to track down yet.
    const url = this.props.url.replace("https://undefined", "https://");
    const title =
      this.props.title && this.props.title.length > this.props.charCap
        ? this.props.title.substring(0, this.props.charCap) + "..."
        : this.props.title;

    let element = (
      <article css={STYLES_ENTITY} style={this.props.style}>
        <div>
          <SVG.Document height="24px" />
        </div>
        {this.props.title && !this.props.small ? (
          <div css={STYLES_TITLE}>{title}</div>
        ) : null}
      </article>
    );

    if (this.props.type && this.props.type.startsWith("video/")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          <div>
            <SVG.Video height="24px" />
          </div>
          {this.props.title && !this.props.small ? (
            <div css={STYLES_TITLE}>{title}</div>
          ) : null}
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("audio/")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          <div>
            <SVG.Sound height="24px" />
          </div>
          {this.props.title && !this.props.small ? (
            <div css={STYLES_TITLE}>{title}</div>
          ) : null}
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/epub")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          <div>
            <SVG.Book height="24px" />
          </div>
          {this.props.title && !this.props.small ? (
            <div css={STYLES_TITLE}>{title}</div>
          ) : null}
        </article>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/pdf")) {
      element = (
        <article css={STYLES_ENTITY} style={this.props.style}>
          <div>
            <SVG.Document height="24px" />
          </div>
          {this.props.title && !this.props.small ? (
            <div css={STYLES_TITLE}>{title}</div>
          ) : null}
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
