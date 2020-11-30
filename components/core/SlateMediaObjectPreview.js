import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
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
    img.src = url;
  });

export default class SlateMediaObjectPreview extends React.Component {
  count = 0;

  static defaultProps = {
    charCap: 30,
  };

  state = {
    showImage: false,
    error: false,
  };

  componentDidMount = () => {
    if (this.props.type && Validations.isPreviewableImage(this.props.type)) {
      this.loadImage(this.props.url);
    } else if (this.props.coverImage) {
      this.loadImage(this.props.coverImage.url);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.coverImage?.url !== this.props.coverImage?.url && this.props.coverImage.url) {
      this.loadImage(this.props.coverImage.url);
    }
  };

  loadImage = async (url) => {
    this.count += 1;
    try {
      let img = await preload(url);
      if (!img.height && !img.width) {
        if (this.count < 10) {
          window.setTimeout(() => this.loadImage(url), 1000);
          return;
        }
        this.setState({ showImage: false, error: true });
      } else {
        this.setState({ showImage: true, error: false });
      }
    } catch (error) {
      this.setState({ showImage: false, error: true });
    }
  };

  render() {
    let url;
    if (this.props.type && Validations.isPreviewableImage(this.props.type)) {
      url = this.props.url;
    } else if (this.props.coverImage) {
      url = this.props.coverImage.url;
    }

    if (url) {
      let blurhash =
        this.props.blurhash && isBlurhashValid(this.props.blurhash)
          ? this.props.blurhash
          : this.props.coverImage?.blurhash && isBlurhashValid(this.props.coverImage?.blurhash)
          ? this.props.coverImage?.blurhash
          : null;
      if (this.state.error) {
        return (
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
        );
      }
      if (this.props.centeredImage) {
        return (
          <React.Fragment>
            {this.state.showImage ? (
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
                  hash={blurhash}
                  height="100%"
                  width="100%"
                  style={this.props.imageStyle}
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
          {this.state.showImage ? (
            <img
              css={STYLES_IMAGE}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                ...this.props.imageStyle,
              }}
              src={url}
            />
          ) : blurhash ? (
            <Blurhash
              hash={blurhash}
              width="100%"
              height="100%"
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

    const title =
      this.props.title && this.props.title.length > this.props.charCap
        ? this.props.title.substring(0, this.props.charCap) + "..."
        : this.props.title;
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
