import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { Alert } from "~/components/core/Alert";

import CarouselSidebarSlate from "~/components/core/CarouselSidebarSlate";
import CarouselSidebarData from "~/components/core/CarouselSidebarData";
import SlateMediaObject from "~/components/core/SlateMediaObject";

const STYLES_ROOT = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Constants.system.white};
  z-index: ${Constants.zindex.modal};
  background-color: rgba(0, 0, 0, 0.8);

  // Note(Amine): we're using the blur filter to fix a weird backdrop-filter's bug in chrome
  filter: blur(0px);
  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }

  @keyframes global-carousel-fade-in {
    from {
      transform: translate(8px);
      opacity: 0;
    }
    to {
      transform: trannslateX(0px);
      opacity: 1;
    }
  }
  animation: global-carousel-fade-in 400ms ease;
`;

const STYLES_ROOT_CONTENT = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_BOX = css`
  user-select: none;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: ${Constants.zindex.modal};
  background: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  cursor: pointer;
  margin: auto;

  :hover {
    background-color: ${Constants.system.black};
  }
`;

const STYLES_EXPANDER = css`
  color: ${Constants.system.darkGray};
  position: absolute;
  padding: 4px;
  top: 16px;
  left: 16px;
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
  }
`;

const STYLES_DISMISS_BOX = css`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${Constants.system.darkGray};
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

export class GlobalCarousel extends React.Component {
  state = {
    index: 0,
    visible: false,
    showSidebar: true,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("slate-global-open-carousel", this._handleOpen);
    window.addEventListener("slate-global-close-carousel", this._handleClose);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("slate-global-open-carousel", this._handleOpen);
    window.removeEventListener("slate-global-close-carousel", this._handleClose);
  };

  componentDidUpdate = (prevProps) => {
    if (
      !this.props.objects?.length ||
      this.state.index < 0 ||
      this.state.index >= this.props.objects.length
    ) {
      this._handleClose();
    }
  };

  _handleKeyDown = (e) => {
    const inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (document.activeElement === inputs[i]) {
        return;
      }
    }

    const textareas = document.querySelectorAll("textarea");
    for (let i = 0; i < textareas.length; i++) {
      if (document.activeElement === textareas[i]) {
        return;
      }
    }

    switch (e.key) {
      case "Escape":
        this._handleClose();
        break;
      case "Right":
      case "ArrowRight":
        this._handleNext();
        break;
      case "Left":
      case "ArrowLeft":
        this._handlePrevious();
        break;
    }
  };

  setWindowState = (data) => {
    if (this.props.carouselType === "ACTIVITY") {
      window.history.replaceState(
        { ...window.history.state, cid: data && data.cid },
        null,
        data && data.cid
          ? `/${data.owner}/${data.slate.slatename}/cid:${data.cid}`
          : `/_?scene=NAV_ACTIVITY`
      );

      return;
    }

    let baseURL = window.location.pathname.split("/");

    if (this.props.carouselType === "SLATE") {
      baseURL.length = 3;
      baseURL = baseURL.join("/");
      window.history.replaceState(
        { ...window.history.state, cid: data && data.cid },
        null,
        data && data.cid ? `${baseURL}/cid:${data.cid}` : baseURL
      );
      return;
    }

    if (this.props.carouselType === "PROFILE") {
      baseURL.length = 2;
      baseURL = baseURL.join("/");
      window.history.replaceState(
        { ...window.history.state, cid: data && data.cid },
        null,
        data && data.cid ? `${baseURL}/cid:${data.cid}` : baseURL
      );
      return;
    }

    if (this.props.carouselType === "DATA") {
      baseURL.length = 2;
      if (data && data.cid) {
        baseURL[1] = this.props.viewer.username;
      } else {
        baseURL[1] = "_";
      }
      baseURL = baseURL.join("/");
      window.history.replaceState(
        { ...window.history.state, cid: data && data.cid },
        null,
        data && data.cid ? `${baseURL}/cid:${data.cid}` : baseURL
      );
      return;
    }
  };

  _handleOpen = (e) => {
    if (e.detail.index < 0 || e.detail.index >= this.props.objects.length) {
      return;
    }
    this.setState({
      visible: true,
      index: e.detail.index || 0,
    });
    const data = this.props.objects[e.detail.index];
    this.setWindowState(data);
  };

  _handleClose = (e) => {
    if (this.state.visible) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.setState({ visible: false, index: 0 });

      this.setWindowState();
    }
  };

  _handleNext = () => {
    let index = this.state.index + 1;
    if (index >= this.props.objects.length) {
      index = 0;
    }
    this.setState({ index });

    const data = this.props.objects[index];
    this.setWindowState(data);
  };

  _handlePrevious = () => {
    let index = this.state.index - 1;
    if (index < 0) {
      index = this.props.objects.length - 1;
    }
    this.setState({ index });

    const data = this.props.objects[index];
    this.setWindowState(data);
  };

  _handleSave = async (details, index) => {
    let objects = this.props.objects;
    if (!this.props.isOwner || this.props.external) return;
    if (this.props.carouselType === "SLATE") {
      objects[index] = { ...objects[index], ...details };
      const response = await Actions.updateSlate({
        id: this.props.current.id,
        data: { objects },
      });
      Events.hasError(response);
    }
    if (this.props.carouselType === "DATA") {
      objects[index] = { ...objects[index], ...details };
      const response = await Actions.updateData({
        id: this.props.viewer.id,
        data: objects[index],
      });
      Events.hasError(response);
    }
  };

  render() {
    if (!this.state.visible || !this.props.carouselType || this.state.index < 0) {
      return null;
    }
    let data = this.props.objects[this.state.index];
    let isOwner = this.props.isOwner;
    let isRepost;
    if (this.props.carouselType === "SLATE") {
      isRepost = this.props.external ? false : this.props.current.data.ownerId !== data.ownerId;
    } else if (this.props.carouselType === "DATA" || this.props.carouselType === "PROFILE") {
      data.url = Strings.getCIDGatewayURL(data.cid);
    }

    let { mobile } = this.props;
    let slide = <SlateMediaObject data={data} isMobile={mobile} />;

    return (
      <div css={STYLES_ROOT}>
        <Alert
          noWarning
          id={this.props.mobile ? "slate-mobile-alert" : null}
          style={
            this.props.mobile
              ? {}
              : {
                  bottom: 0,
                  top: "auto",
                  paddingRight: this.props.sidebar
                    ? `calc(${Constants.sizes.sidebar}px + 48px)`
                    : "auto",
                }
          }
        />
        <div css={STYLES_ROOT_CONTENT} style={this.props.style} onClick={this._handleClose}>
          <span
            css={STYLES_BOX}
            onClick={(e) => {
              e.stopPropagation();
              this._handlePrevious(e);
            }}
            style={{ top: 0, left: 16, bottom: 0 }}
          >
            <SVG.ChevronLeft height="20px" />
          </span>
          <span
            css={STYLES_BOX}
            onClick={(e) => {
              e.stopPropagation();
              this._handleNext(e);
            }}
            style={{ top: 0, right: 16, bottom: 0 }}
          >
            <SVG.ChevronRight height="20px" />
          </span>
          {slide}
          <span css={STYLES_MOBILE_ONLY}>
            <div css={STYLES_DISMISS_BOX} onClick={this._handleClose}>
              <SVG.Dismiss height="24px" />
            </div>
          </span>
          <span css={STYLES_MOBILE_HIDDEN}>
            {this.state.showSidebar ? (
              <div
                css={STYLES_EXPANDER}
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ showSidebar: !this.state.showSidebar });
                }}
              >
                <SVG.Maximize height="24px" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  css={STYLES_EXPANDER}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ showSidebar: !this.state.showSidebar });
                  }}
                >
                  <SVG.Minimize height="24px" />
                </div>
                <div css={STYLES_DISMISS_BOX} onClick={this._handleClose}>
                  <SVG.Dismiss height="24px" />
                </div>
              </div>
            )}
          </span>
        </div>
        <span css={STYLES_MOBILE_HIDDEN}>
          {this.props.carouselType === "DATA" || this.props.carouselType === "PROFILE" ? (
            <CarouselSidebarData
              viewer={this.props.viewer}
              display={this.state.showSidebar ? "block" : "none"}
              onUpdateViewer={this.props.onUpdateViewer}
              onClose={this._handleClose}
              key={data.id}
              slates={this.props.viewer?.slates || []}
              onAction={this.props.onAction}
              resources={this.props.resources}
              data={data}
              cid={data.cid}
              onSave={this._handleSave}
              external={this.props.external}
              isOwner={isOwner}
              index={this.state.index}
            />
          ) : (
            <CarouselSidebarSlate
              activityView={this.props.carouselType === "ACTIVITY"}
              display={this.state.showSidebar ? "block" : "none"}
              viewer={this.props.viewer}
              onUpdateViewer={this.props.onUpdateViewer}
              current={this.props.current}
              key={data.id}
              slates={this.props.viewer?.slates || []}
              onClose={this._handleClose}
              onAction={this.props.onAction}
              data={data}
              external={this.props.external}
              onSave={this._handleSave}
              isOwner={isOwner}
              isRepost={isRepost}
              index={this.state.index}
            />
          )}
        </span>
      </div>
    );
  }
}
