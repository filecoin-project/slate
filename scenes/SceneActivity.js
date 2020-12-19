import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { PrimaryTabGroup } from "~/components/core/TabGroup";

import ScenePage from "~/components/core/ScenePage";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_VIDEO_BIG = css`
  display: block;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 48px auto 88px auto;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 32px auto 64px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto 48px auto;
  }
`;

const STYLES_IMAGE_BOX = css`
  cursor: pointer;
  position: relative;
  box-shadow: ${Constants.shadow.light};
  margin: 10px;

  :hover {
    box-shadow: ${Constants.shadow.medium};
  }
`;

const STYLES_TEXT_AREA = css`
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const STYLES_TITLE = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Constants.system.white};
  font-family: ${Constants.font.medium};
  margin-bottom: 4px;
  width: calc(100% - 32px);
  padding: 0px 16px;
  box-sizing: content-box;
`;

const STYLES_SECONDARY = css`
  ${STYLES_TITLE}
  font-size: ${Constants.typescale.lvlN1};
  margin-bottom: 16px;
  width: 100%;
`;

const STYLES_GRADIENT = css`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 26.56%,
    rgba(0, 0, 0, 0.3) 100%
  );
  backdrop-filter: blur(2px);
  width: 100%;
  height: 72px;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const STYLES_ACTIVITY_GRID = css`
  margin: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class ActivitySquare extends React.Component {
  state = {
    showText: false,
  };

  render() {
    const item = this.props.item;
    const size = this.props.size;
    const isImage = Validations.isPreviewableImage(item.file.type);
    return (
      <div
        css={STYLES_IMAGE_BOX}
        style={{ width: size, height: size }}
        onMouseEnter={isImage ? () => this.setState({ showText: true }) : () => {}}
        onMouseLeave={isImage ? () => this.setState({ showText: false }) : () => {}}
      >
        <SlateMediaObjectPreview
          centeredImage
          iconOnly
          blurhash={item.file.blurhash}
          url={item.file.url}
          title={item.file.title || item.file.name}
          type={item.file.type}
          style={{ border: "none" }}
          imageStyle={{ border: "none" }}
        />
        {isImage && this.state.showText ? <div css={STYLES_GRADIENT} /> : null}
        {this.state.showText || !isImage ? (
          <div css={STYLES_TEXT_AREA} style={{ width: this.props.size }}>
            {isImage ? null : (
              <div
                css={STYLES_TITLE}
                style={{
                  color: Constants.system.textGray,
                }}
              >
                {item.file.title || item.file.name}
              </div>
            )}
            <div
              css={STYLES_SECONDARY}
              style={{
                color: isImage ? Constants.system.white : Constants.system.textGrayLight,
              }}
            >
              {isImage ? (
                <SVG.ArrowDownLeft
                  height="10px"
                  style={{ transform: "scaleX(-1)", marginRight: 4 }}
                />
              ) : null}
              {item.slate.data.name || item.slate.slatename}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const ActivityRectangle = ({ item, size }) => {
  let file;
  for (let obj of item.slate?.data?.objects || []) {
    if (Validations.isPreviewableImage(obj.type) || obj.coverImage) {
      file = obj;
    }
  }
  let numObjects = item.slate?.data?.objects?.length || 0;
  return (
    <div css={STYLES_IMAGE_BOX} style={{ width: size * 2 + 20, height: size }}>
      {file ? (
        <SlateMediaObjectPreview
          centeredImage
          iconOnly
          blurhash={file.blurhash}
          url={file.url}
          title={file.title || file.name}
          type={file.type}
          style={{ border: "none" }}
          imageStyle={{ border: "none" }}
          coverImage={file.coverImage}
        />
      ) : null}
      <div css={STYLES_GRADIENT} />
      <div css={STYLES_TEXT_AREA}>
        <div
          css={STYLES_TITLE}
          style={{
            fontFamily: Constants.font.semiBold,
            width: size,
          }}
        >
          {item.slate.data.name || item.slate.slatename}
        </div>
        <div
          css={STYLES_SECONDARY}
          style={{
            color: Constants.system.textGrayLight,
            width: size,
          }}
        >
          {numObjects} File{numObjects == 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
};

export default class SceneActivity extends React.Component {
  state = {
    imageSize: 200,
    tab: 0,
  };

  async componentDidMount() {
    this.calculateWidth();
    this.debounceInstance = Window.debounce(this.calculateWidth, 200);
    window.addEventListener("resize", this.debounceInstance);
    //slates with no previewable images in them?
    //filter to remove ones you no longer follow
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounceInstance);
  }

  _handleCreateSlate = () => {
    this.props.onAction({
      type: "NAVIGATE",
      value: "NAV_SLATES",
      data: null,
    });
  };

  calculateWidth = () => {
    let windowWidth = window.innerWidth;
    let imageSize;
    if (windowWidth < Constants.sizes.mobile) {
      imageSize = (windowWidth - 2 * 24 - 20) / 2;
    } else {
      imageSize = (windowWidth - 2 * 56 - 5 * 20) / 6;
    }
    this.setState({ imageSize });
  };

  render() {
    let activity = this.props.viewer.activity;
    return (
      <ScenePage>
        <ScenePageHeader
          title={
            <PrimaryTabGroup
              tabs={[
                { title: "Files", value: "NAV_DATA" },
                { title: "Slates", value: "NAV_SLATES" },
                { title: "Activity", value: "NAV_ACTIVITY" },
              ]}
              value={2}
              onAction={this.props.onAction}
            />
          }
        />
        {activity.length ? (
          <div css={STYLES_ACTIVITY_GRID}>
            {activity.map((item) => {
              if (item.data.type === "SUBSCRIBED_CREATE_SLATE") {
                return (
                  <span
                    key={item.id}
                    onClick={() =>
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: "NAV_SLATE",
                        data: { decorator: "SLATE", ...item.data.context.slate },
                      })
                    }
                  >
                    <ActivityRectangle size={this.state.imageSize} item={item.data.context} />
                  </span>
                );
              } else if (item.data.type === "SUBSCRIBED_ADD_TO_SLATE") {
                return (
                  <span
                    key={item.id}
                    onClick={() => {
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: "NAV_SLATE",
                        data: {
                          decorator: "SLATE",
                          ...item.data.context.slate,
                          pageState: {
                            cid: item.data.context.file.cid,
                          },
                        },
                      });
                    }}
                  >
                    <ActivitySquare size={this.state.imageSize} item={item.data.context} />
                  </span>
                );
              } else {
                return null;
              }
            })}
          </div>
        ) : (
          <React.Fragment>
            <System.P>When you're ready, create a slate!</System.P>
            <br />
            <System.ButtonPrimary onClick={this._handleCreateSlate}>
              Create a slate
            </System.ButtonPrimary>
            <video
              css={STYLES_VIDEO_BIG}
              autoPlay
              loop
              muted
              src="https://slate.textile.io/ipfs/bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy"
              type="video/m4v"
              playsInline
              style={{
                backgroundImage: `url('https://slate.textile.io/ipfs/bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy')`,
                borderRadius: `4px`,
                width: `100%`,
                boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`,
                backgroundSize: `cover`,
              }}
            />
          </React.Fragment>
        )}
      </ScenePage>
    );
  }
}
