import * as React from "react";
import { Document, Page } from "react-pdf";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";

import UnityFrame from "~/components/core/UnityFrame";

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

const typeMap = {
  "video/quicktime": "video/mp4",
};

export default class SlateMediaObject extends React.Component {
  state = {
    numPages: 0,
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({
      numPages
    })
  }

  render() {
    const { numPages } = this.state;
    const url = this.props.data.url;
    const type = this.props.data.type ? this.props.data.type : "LEGACY_NO_TYPE";
    const playType = typeMap[type] ? typeMap[type] : type;

    let element = <div css={STYLES_FAILURE}>No Preview</div>;

    if (type.startsWith("application/pdf")) {
      return (
        <div css={STYLES_ASSET} style={{ width: "calc(100% - 64px)" }>
          <Document
            file={url}
            key={url}
            onLoadSuccess={this.onDocumentLoadSuccess}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document>
        </div>
      );
    }

    if (type.startsWith("video/")) {
      const autoPlay = this.props?.data?.settings?.autoPlay || false;
      return (
        <video
          playsInline
          controls
          autoPlay={autoPlay}
          name="media"
          type={playType}
          css={STYLES_OBJECT}
          key={url}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <source src={url} type={playType} />
        </video>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <div css={STYLES_ASSET}>
          <audio
            controls
            name="media"
            key={url}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <source src={url} type={playType} />
          </audio>
        </div>
      );
    }

    if (Validations.isPreviewableImage(type)) {
      return (
        <div css={STYLES_ASSET}>
          <img
            css={STYLES_IMAGE}
            src={url}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      );
    }

    // TODO(jim): We will need to revisit this later.
    if (type.startsWith("application/unity")) {
      const unityGameConfig = this.props.data.unityGameConfig;
      const unityGameLoader = this.props.data.unityGameLoader;

      return (
        <UnityFrame
          url={url}
          unityGameConfig={unityGameConfig}
          unityGameLoader={unityGameLoader}
          key={url}
        />
      );
    }

    return element;
  }
}
