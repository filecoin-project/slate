/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";

import UnityFrame from "~/components/core/UnityFrame";
import MarkdownFrame from "~/components/core/MarkdownFrame";
import JSONFrame from "~/components/core/JSONFrame";

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

const StopPropagation = ({ children, ...rest }) => (
  // it might be worth removing this propagation layer later
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    onClick={(e) => {
      e.stopPropagation();
    }}
    onKeyPress={(e) => {
      e.stopPropagation();
    }}
    {...rest}
  >
    {children}
  </div>
);

const Frame = ({ children, css, ...rest }) => (
  <StopPropagation css={css || STYLES_ASSET} {...rest}>
    {children}
  </StopPropagation>
);

export default class SlateMediaObject extends React.Component {
  openLink(url) {
    let { isMobile, data } = this.props;
    const isPDF = data.type && data.type.startsWith("application/pdf");

    if (isPDF && isMobile) {
      window.open(url, "_blank");
      Events.dispatchCustomEvent({ name: "slate-global-close-carousel", detail: {} });

      return;
    }
  }

  componentDidMount() {
    const { url } = this.props.data;
    this.openLink(url);
  }

  render() {
    const { url, name, id } = this.props.data;
    const type = this.props.data.type ? this.props.data.type : "LEGACY_NO_TYPE";
    const playType = typeMap[type] ? typeMap[type] : type;

    let { isMobile } = this.props;

    let element = <div css={STYLES_FAILURE}>No Preview</div>;

    if (type.startsWith("application/pdf")) {
      return (
        <>
          {!isMobile && (
            <Frame>
              <object
                css={STYLES_OBJECT}
                style={{ width: "calc(100% - 64px)" }}
                data={url}
                type={type}
                key={id}
                aria-label={name}
              />
            </Frame>
          )}
        </>
      );
    }

    if (type.startsWith("video/")) {
      const autoPlay = this.props?.data?.settings?.autoPlay || false;
      return (
        <Frame>
          <video
            playsInline
            controls
            autoPlay={autoPlay}
            name="media"
            type={playType}
            css={STYLES_OBJECT}
            key={url}
          >
            <source src={url} type={playType} />
            {/** Note(Amine): fallback if video type isn't supported (example .mov) */}
            <source src={url} type="video/mp4" />
          </video>
        </Frame>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <Frame>
          <audio controls name="media" key={id}>
            <source src={url} type={playType} />
          </audio>
        </Frame>
      );
    }

    if (this.props.data.name.endsWith(".md")) {
      return (
        <Frame>
          <MarkdownFrame date={this.props.data.date} url={this.props.data.url} />
        </Frame>
      );
    }

    if (type.startsWith("application/json")) {
      // do something with json data item
      return <Frame>{<JSONFrame item={this.props.data} />}</Frame>;
    }

    if (Validations.isPreviewableImage(type)) {
      return (
        <Frame>
          <img alt={name} css={STYLES_IMAGE} src={url} />
        </Frame>
      );
    }

    // TODO(jim): We will need to revisit this later.
    if (type.startsWith("application/unity")) {
      const { unityGameConfig } = this.props.data;
      const { unityGameLoader } = this.props.data;

      return (
        <Frame>
          <UnityFrame
            url={url}
            unityGameConfig={unityGameConfig}
            unityGameLoader={unityGameLoader}
            key={id}
          />
        </Frame>
      );
    }

    return element;
  }
}
