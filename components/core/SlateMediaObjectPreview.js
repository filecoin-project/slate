import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as SVG from "~/common/svg";

import { css } from "@emotion/core";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";
import { Blurhash } from "react-blurhash";
import { isBlurhashValid } from "blurhash";

const STYLES_IMAGE_CONTAINER = css`
  background-color: ${Constants.system.foreground};
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
`;

const STYLES_IMAGE = css`
  background-color: ${Constants.system.foreground};
  display: block;
  pointer-events: none;
  transition: 200ms ease all;
`;

const STYLES_ENTITY = css`
  height: 100%;
  width: 100%;
  border: 1px solid ${Constants.system.gray};
  background-color: ${Constants.system.white};
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

const STYLES_BLUR_CONTAINER = css`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

let preload = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve(img);
    img.onerror = reject;
    img.src = url.replace("https://undefined", "https://");
  });

export default class SlateMediaObjectPreview extends React.Component {
  static defaultProps = {
    charCap: 30,
  };

  state = {
    showImage: false,
    error: false,
  };

  componentDidMount = async () => {
    if (this.props.type && Validations.isPreviewableImage(this.props.type)) {
      try {
        let img = await preload(this.props.url);
        if (!img.height && !img.width) {
          this.setState({ showImage: false, error: true });
        }
        this.setState({ showImage: true, error: false });
      } catch (error) {
        this.setState({ showImage: false, error: true });
      }
    }
  };

  render() {
    // NOTE(jim):
    // This is a hack to catch this undefined case I don't want to track down yet.
    const url = this.props.url.replace("https://undefined", "https://");

    const title =
      this.props.title && this.props.title.length > this.props.charCap
        ? this.props.title.substring(0, this.props.charCap) + "..."
        : this.props.title;

    if (this.props.type && Validations.isPreviewableImage(this.props.type)) {
      let blurhash = this.props.blurhash && isBlurhashValid(this.props.blurhash);
      if (this.props.centeredImage) {
        return (
          <React.Fragment>
            {this.state.error ? (
              <div
                css={STYLES_ENTITY}
                style={{
                  ...this.props.imageStyle,
                  backgroundColor: Constants.system.foreground,
                }}
              >
                <SVG.FileNotFound height="24px" />
                {this.props.iconOnly ? null : <div css={STYLES_TITLE}>File not found</div>}
              </div>
            ) : this.state.showImage ? (
              <div
                css={STYLES_IMAGE_CONTAINER}
                style={{
                  backgroundImage: `url(${url})`,
                  ...this.props.imageStyle,
                }}
              />
            ) : blurhash ? (
              <div css={STYLES_BLUR_CONTAINER}>
                <Blurhash
                  hash={this.props.blurhash}
                  style={{
                    height: "100%",
                    width: "100%",
                    ...this.props.imageStyle,
                  }}
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                />
              </div>
            ) : (
              <div css={STYLES_IMAGE_CONTAINER} style={this.props.imageStyle} />
            )}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          {this.state.error ? (
            <div
              css={STYLES_ENTITY}
              style={{ ...this.props.imageStyle, backgroundColor: "#F2F2F2" }}
            >
              <SVG.FileNotFound height="24px" />
              {this.props.iconOnly ? null : <div css={STYLES_TITLE}>File not found</div>}
            </div>
          ) : this.state.showImage ? (
            <img
              css={STYLES_IMAGE}
              style={{ maxHeight: "100%", maxWidth: "100%", ...this.props.imageStyle }}
              src={url}
            />
          ) : blurhash ? (
            <Blurhash
              hash={this.props.blurhash}
              style={{
                height: "100%",
                width: "100%",
                ...this.props.imageStyle,
              }}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <div
              css={STYLES_IMAGE}
              style={{ maxHeight: "100%", maxWidth: "100%", ...this.props.imageStyle }}
            />
          )}
        </React.Fragment>
      );
    }

    let element = (
      <FileTypeIcon
        type={this.props.type}
        height={this.props.previewPanel ? "80px" : "24px"}
        style={this.props.previewPanel ? { color: "#bfbfbf" } : null}
      />
    );

    return (
      <article
        css={STYLES_ENTITY}
        style={{
          ...this.props.style,
          border: this.props.previewPanel ? `1px solid ${Constants.system.bgGray}` : "auto",
        }}
      >
        <div>{element}</div>
        {this.props.title && !this.props.iconOnly && !this.props.previewPanel ? (
          <div css={STYLES_TITLE}>{title}</div>
        ) : null}
      </article>
    );
  }
}
