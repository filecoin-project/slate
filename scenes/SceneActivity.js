import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

import { GlobalCarousel } from "~/components/system/components/GlobalCarousel";
import { css } from "@emotion/react";
import { PrimaryTabGroup, SecondaryTabGroup } from "~/components/core/TabGroup";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import EmptyState from "~/components/core/EmptyState";
import ScenePage from "~/components/core/ScenePage";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 400px);
  width: 100%;
`;

const STYLES_IMAGE_BOX = css`
  cursor: pointer;
  position: relative;
  box-shadow: ${Constants.shadow.light};
  margin: 10px;

  :hover {
    box-shadow: ${Constants.shadow.medium};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    overflow: hidden;
    border-radius: 8px;
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

const STYLES_SECONDARY_HOVERABLE = css`
  ${STYLES_SECONDARY}
  padding: 8px 16px;
  margin-bottom: 8px;

  :hover {
    color: ${Constants.system.brand} !important;
  }
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

  @media (max-width: ${Constants.sizes.mobile}px) {
    overflow: hidden;
    border-radius: 0px 0px 8px 8px;
  }
`;

const STYLES_ACTIVITY_GRID = css`
  margin: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
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
        {isImage && (this.state.showText || this.props.mobile) ? (
          <div css={STYLES_GRADIENT} />
        ) : null}
        {this.state.showText || !isImage || this.props.mobile ? (
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
              style={{
                color: isImage ? Constants.system.white : Constants.system.textGrayLight,
              }}
              css={this.props.onClick ? STYLES_SECONDARY_HOVERABLE : STYLES_SECONDARY}
              onClick={(e) => {
                e.stopPropagation();
                this.props.onClick();
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

const ActivityRectangle = ({ item, width, height }) => {
  let file;
  for (let obj of item.slate?.data?.objects || []) {
    if (Validations.isPreviewableImage(obj.type) || obj.coverImage) {
      file = obj;
    }
  }
  let numObjects = item.slate?.data?.objects?.length || 0;
  return (
    <div css={STYLES_IMAGE_BOX} style={{ width, height }}>
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
            width,
          }}
        >
          {item.slate.data.name || item.slate.slatename}
        </div>
        <div
          css={STYLES_SECONDARY}
          style={{
            color: Constants.system.textGrayLight,
            width,
          }}
        >
          {numObjects} File{numObjects == 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
};

export default class SceneActivity extends React.Component {
  counter = 0;
  state = {
    imageSize: 200,
    tab: 0,
    loading: "loading",
  };

  async componentDidMount() {
    this.calculateWidth();
    this.debounceInstance = Window.debounce(this.calculateWidth, 200);
    this.scrollDebounceInstance = Window.debounce(this._handleScroll, 200);
    window.addEventListener("resize", this.debounceInstance);
    window.addEventListener("scroll", this.scrollDebounceInstance);
    this.fetchActivityItems(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      this.fetchActivityItems(true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounceInstance);
    window.removeEventListener("scroll", this.scrollDebounceInstance);
  }

  _handleScroll = (e) => {
    if (this.state.loading) {
      return;
    }
    const windowHeight =
      "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 600) {
      this.fetchActivityItems();
    }
  };

  fetchActivityItems = async (update = false) => {
    this.setState({ loading: "loading" });
    let activity =
      this.props.tab === 0 ? this.props.viewer.activity || [] : this.props.viewer.explore || [];
    let response;
    if (activity.length) {
      if (update) {
        //NOTE(martina): fetch any new updates since last fetched
        response = await Actions.getActivity({
          explore: this.props.tab === 1,
          latestTimestamp: activity[0].created_at,
        });
        if (Events.hasError(response)) {
          this.setState({ loading: "failed" });
          return;
        }
        if (!response.activity.length) {
          this.setState({ loading: false });
          return;
        }
        activity.unshift(...response.activity);
        this.count = 0;
        activity = this.formatActivity(activity);
      } else {
        //NOTE(martina): pagination -- fetch the next 100 events upon scrolling to the bottom
        response = await Actions.getActivity({
          explore: this.props.tab === 1,
          earliestTimestamp: activity[activity.length - 1].created_at,
        });
        if (Events.hasError(response)) {
          this.setState({ loading: "failed" });
          return;
        }
        if (!response.activity.length) {
          this.setState({ loading: false });
          return;
        }
        let newItems = this.formatActivity(response.activity) || [];
        activity.push(...newItems);
      }
    } else {
      //NOTE(martina): fetch the most recent 100 events
      response = await Actions.getActivity({ explore: this.props.tab === 1 });
      if (Events.hasError(response)) {
        this.setState({ loading: false });
        return;
      }
      if (!response.activity.length) {
        this.setState({ loading: false });
        return;
      }
      this.count = 0;
      activity = this.formatActivity(response.activity);
    }
    if (this.props.tab === 0) {
      this.props.onUpdateViewer({ activity: activity });
    } else {
      this.props.onUpdateViewer({ explore: activity });
    }
    this.setState({ loading: false });
  };

  formatActivity = (userActivity) => {
    //NOTE(martina): rearrange order to always get an even row of 6 squares
    let activity = userActivity || [];
    for (let i = 0; i < activity.length; i++) {
      let item = activity[i];
      if (item.data.type === "SUBSCRIBED_CREATE_SLATE") {
        this.counter += 2;
      } else if (item.data.type === "SUBSCRIBED_ADD_TO_SLATE") {
        this.counter += 1;
      }
      if (this.counter === 6) {
        this.counter = 0;
      } else if (this.counter > 6) {
        let j = i - 1;
        while (activity[j].data.type !== "SUBSCRIBED_ADD_TO_SLATE") {
          j -= 1;
        }
        let temp = activity[j];
        activity[j] = activity[i];
        activity[i] = temp;
        this.counter = 0;
        i -= 1;
      }
    }
    return activity;
  };

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
      imageSize = windowWidth - 2 * 24; //(windowWidth - 2 * 24 - 20) / 2;
    } else {
      imageSize = (windowWidth - 2 * 56 - 5 * 20) / 6;
    }
    this.setState({ imageSize });
  };

  render() {
    let activity =
      this.props.tab === 0 ? this.props.viewer.activity || [] : this.props.viewer.explore || [];
    let items = activity
      .filter((item) => item.data.type === "SUBSCRIBED_ADD_TO_SLATE")
      .map((item) => {
        return { ...item.data.context.file, slate: item.data.context.slate };
      });
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
          actions={
            <SecondaryTabGroup
              tabs={[
                { title: "My network", value: "NAV_ACTIVITY" },
                { title: "Explore", value: "NAV_EXPLORE" },
              ]}
              value={this.props.tab}
              onAction={this.props.onAction}
              style={{ margin: 0 }}
            />
          }
        />
        <GlobalCarousel
          carouselType="ACTIVITY"
          viewer={this.props.viewer}
          objects={items}
          onAction={this.props.onAction}
          mobile={this.props.mobile}
        />
        {activity.length ? (
          <div>
            <div css={STYLES_ACTIVITY_GRID}>
              {activity.map((item, index) => {
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
                      <ActivityRectangle
                        width={
                          this.props.mobile ? this.state.imageSize : this.state.imageSize * 2 + 20
                        }
                        height={this.state.imageSize}
                        item={item.data.context}
                      />
                    </span>
                  );
                } else if (item.data.type === "SUBSCRIBED_ADD_TO_SLATE") {
                  return (
                    <span
                      key={item.id}
                      onClick={
                        this.props.mobile
                          ? () => {
                              this.props.onAction({
                                type: "NAVIGATE",
                                value: "NAV_SLATE",
                                data: {
                                  decorator: "SLATE",
                                  ...item.data.context.slate,
                                },
                              });
                            }
                          : () =>
                              Events.dispatchCustomEvent({
                                name: "slate-global-open-carousel",
                                detail: { index },
                              })
                      }
                    >
                      <ActivitySquare
                        size={this.state.imageSize}
                        item={item.data.context}
                        mobile={this.props.mobile}
                        onClick={
                          this.props.mobile
                            ? () => {}
                            : () => {
                                this.props.onAction({
                                  type: "NAVIGATE",
                                  value: "NAV_SLATE",
                                  data: {
                                    decorator: "SLATE",
                                    ...item.data.context.slate,
                                    // pageState: {
                                    //   cid: item.data.context.file.cid,
                                    // },
                                  },
                                });
                              }
                        }
                      />
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div css={STYLES_LOADER} style={{ height: 100 }}>
              {this.state.loading === "loading" ? <LoaderSpinner /> : null}
            </div>
          </div>
        ) : this.state.loading === "loading" ? (
          <div css={STYLES_LOADER}>
            <LoaderSpinner />
          </div>
        ) : (
          <EmptyState>
            <SVG.Users height="24px" />
            <div style={{ marginTop: 24 }}>
              Start following people and slates to see their activity here
            </div>
          </EmptyState>
        )}
      </ScenePage>
    );
  }
}

{
  /* <React.Fragment>
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
          </React.Fragment> */
}
