import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import DataView from "~/components/core/DataView";
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

const STYLES_PROFILE_IMAGE_BOX = css`
  background-size: cover;
  background-position: 50% 50%;
  position: relative;
  border-radius: 4px;
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
`;

const STYLES_TEXT_AREA = css`
  position: absolute;
  bottom: 16px;
  left: 16px;
`;

const STYLES_TITLE = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Constants.system.white};
  font-family: ${Constants.font.medium};
  margin-bottom: 4px;
`;

const STYLES_SECONDARY = css`
  ${STYLES_TITLE}
  font-size: ${Constants.typescale.lvlN1};
  margin-bottom: 0px;
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
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ActivitySquare = ({ item, size }) => {
  let isImage = Validations.isPreviewableImage(item.file.type);
  return (
    <div css={STYLES_IMAGE_BOX} style={{ width: size, height: size }}>
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
      {isImage ? <div css={STYLES_GRADIENT} /> : null}
      <div css={STYLES_TEXT_AREA}>
        {isImage ? null : (
          <div
            css={STYLES_TITLE}
            style={{
              color: Constants.system.textGray,
              width: size,
            }}
          >
            {item.file.title || item.file.name}
          </div>
        )}
        <div
          css={STYLES_SECONDARY}
          style={{
            width: size,
            color: isImage ? Constants.system.white : Constants.system.textGrayLight,
          }}
        >
          {item.slate.data.name || item.slate.slatename}
        </div>
      </div>
    </div>
  );
};

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

export default class SceneHome extends React.Component {
  state = {
    imageSize: 200,
    activity: [],
  };

  async componentDidMount() {
    //only fetch the last x days worth of updates maybe? or last x entries of updates?
    //maybe do this when get viewer, not here. So that dont' redo every time you go back to this scene. Or maybe save it to viewer so you don't have to redo it?
    //if add multiple to a slate, maybe only send out the event for one of them? not sure
    this.calculateWidth();
    this.debounceInstance = Window.debounce(this.calculateWidth, 200);
    window.addEventListener("resize", this.debounceInstance);
    let activity = this.props.viewer.activity;
    let slateIds = [];
    if (activity && activity.length) {
      activity = activity.filter((item) => {
        if (item.data.type === "OTHER_USER_CREATE_SLATE") {
          slateIds.push(item.data.context.slate.id);
        }
        return (
          item.data.type === "OTHER_USER_CREATE_SLATE" ||
          item.data.type === "OTHER_USER_CREATE_SLATE_OBJECT"
        );
      });
    }
    let slates = [];
    if (slateIds && slateIds.length) {
      let response = await Actions.getSlatesByIds({ id: slateIds });
      if (response && response.slate) {
        slates = response.slate;
      }
    }
    let slateTable = {};
    for (let slate of slates) {
      slateTable[slate.id] = slate;
    }

    for (let item of activity) {
      if (item.data.type === "OTHER_USER_CREATE_SLATE") {
        let slate = slateTable[item.data.context.slate.id];
        if (slate?.data?.objects?.length) {
          item.data.context.slate = slate;
        }
      }
    }
    //NOTE(martina): remove empty slates
    activity = activity.filter((item) => {
      if (item.data.type === "OTHER_USER_CREATE_SLATE_OBJECT") return true;
      let slate = item.data.context.slate;
      return slate?.data?.objects?.length;
    });
    //NOTE(martina): rearrange order to always get an even row of 6 squares
    let counter = 0;
    for (let i = 0; i < activity.length; i++) {
      let item = activity[i];
      if (item.data.type === "OTHER_USER_CREATE_SLATE") {
        counter += 2;
      } else if (item.data.type === "OTHER_USER_CREATE_SLATE_OBJECT") {
        counter += 1;
      }
      if (counter === 6) {
        counter = 0;
      } else if (counter > 6) {
        let j = i - 1;
        while (activity[j].data.type !== "OTHER_USER_CREATE_SLATE_OBJECT") {
          j -= 1;
        }
        let temp = activity[j];
        activity[j] = activity[i];
        activity[i] = temp;
        counter = 0;
        i -= 1;
      }
    }
    this.setState({ activity });
    //slates with no previewable images in them?
    //filter to remove ones you no longer follow
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounceInstance);
  }

  _handleCreateSlate = () => {
    this.props.onAction({
      type: "NAVIGATE",
      value: "V1_NAVIGATION_SLATES",
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
    return (
      <ScenePage>
        {this.state.activity.length ? (
          <div css={STYLES_ACTIVITY_GRID}>
            {this.state.activity.map((item) => {
              if (item.data.type === "OTHER_USER_CREATE_SLATE") {
                return (
                  <span
                    key={item.id}
                    onClick={() =>
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: "V1_NAVIGATION_SLATE",
                        data: { decorator: "SLATE", ...item.data.context.slate },
                      })
                    }
                  >
                    <ActivityRectangle size={this.state.imageSize} item={item.data.context} />
                  </span>
                );
              } else if (item.data.type === "OTHER_USER_CREATE_SLATE_OBJECT") {
                return (
                  <span
                    key={item.id}
                    onClick={() => {
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: "V1_NAVIGATION_SLATE",
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
                return <div>hello</div>;
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
