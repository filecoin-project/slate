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

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

export class GlobalCarousel extends React.Component {
  state = {
    index: 0,
    visible: false,
    loading: false,
    saving: false,
    showSidebar: true,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("slate-global-open-carousel", this._handleOpen);
    window.addEventListener("slate-global-close-carousel", this._handleClose);
    window.addEventListener("state-global-carousel-loading", this._handleSetLoading);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("slate-global-open-carousel", this._handleOpen);
    window.removeEventListener("slate-global-close-carousel", this._handleClose);
    window.removeEventListener("state-global-carousel-loading", this._handleSetLoading);
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

  _handleSetLoading = (e) => this.setState({ ...e.detail });

  _handleOpen = (e) => {
    let carouselType =
      !this.props.current ||
      (this.props.current &&
        (this.props.current.decorator === "FOLDER" || this.props.current.decorator === "ACTIVITY"))
        ? "data"
        : "slate";
    this.setState({
      carouselType: carouselType,
      visible: true,
      index: e.detail.index || 0,
      loading: false,
      saving: false,
      baseURL: window.location.pathname,
    });
    // if (carouselType === "slate" && this.props.current.data && this.props.current.data.objects) {
    //   const data = this.props.current.data.objects[e.detail.index];
    //   console.log("WINDOW STATE");
    //   console.log(window.history.state);
    //   window.history.pushState(
    //     { ...window.history.state, cid: data.cid },
    //     null,
    //     `${window.location.pathname}/cid:${data.cid}`
    //   );
    // }
  };

  _handleClose = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ visible: false, index: 0, loading: false, saving: false });

    // if (this.state.baseURL) {
    //   console.log("WINDOW STATE");
    //   console.log(window.history.state);
    //   window.history.pushState({ ...window.history.state, cid: null }, "", this.state.baseURL);
    // }
  };

  _handleNext = () => {
    let index = this.state.index + 1;
    if (
      this.state.carouselType === "slate" &&
      this.props.current.data &&
      this.props.current.data.objects
    ) {
      if (index >= this.props.current.data.objects.length) {
        index = 0;
      }
    } else if (
      this.state.carouselType === "data" &&
      this.props.viewer &&
      this.props.viewer.library
    ) {
      if (index >= this.props.viewer.library[0].children.length) {
        index = 0;
      }
    }
    this.setState({ index, loading: false, saving: false });

    // if (
    //   this.state.carouselType === "slate" &&
    //   this.state.baseURL &&
    //   this.props.current.data &&
    //   this.props.current.data.objects
    // ) {
    //   const data = this.props.current.data.objects[index];
    //   console.log("WINDOW STATE");
    //   console.log(window.history.state);
    //   window.history.pushState(
    //     { ...window.history.state, cid: data.cid },
    //     "",
    //     `${this.state.baseURL}/cid:${data.cid}`
    //   );
    // }
  };

  _handlePrevious = () => {
    let index = this.state.index - 1;
    if (index < 0) {
      if (
        this.state.carouselType === "slate" &&
        this.props.current.data &&
        this.props.current.data.objects
      ) {
        index = this.props.current.data.objects.length - 1;
      } else if (
        this.state.carouselType === "data" &&
        this.props.viewer &&
        this.props.viewer.library
      ) {
        index = this.props.viewer.library[0].children.length - 1;
      }
    }
    this.setState({ index, loading: false, saving: false });

    // if (
    //   this.state.carouselType === "slate" &&
    //   this.state.baseURL &&
    //   this.props.current.data &&
    //   this.props.current.data.objects
    // ) {
    //   const data = this.props.current.data.objects[index];
    //   console.log("WINDOW STATE");
    //   console.log(window.history.state);
    //   window.history.pushState(
    //     { ...window.history.state, cid: data.cid },
    //     "",
    //     `${this.state.baseURL}/cid:${data.cid}`
    //   );
    // }
  };

  _handleSave = async (details, index) => {
    this.setState({ loading: true });
    if (this.props.viewer.id !== this.props.current.data.ownerId || this.props.external) return;
    let objects = this.props.current.data.objects;
    objects[index] = { ...objects[index], ...details };
    const response = await Actions.updateSlate({
      id: this.props.current.id,
      data: { objects },
    });

    Events.hasError(response);
    this.setState({ loading: false, saving: false });
  };

  render() {
    if (!this.state.visible || !this.state.carouselType || this.state.index < 0) {
      return null;
    }
    let data;
    let isOwner;
    let isRepost;
    let link;
    if (
      this.state.carouselType === "slate" &&
      this.props.current?.data?.objects?.length &&
      this.state.index < this.props.current.data.objects.length
    ) {
      data = this.props.current.data.objects[this.state.index];
      data.cid = Strings.urlToCid(data.url);
      isRepost = this.props.external ? false : this.props.current.data.ownerId !== data.ownerId;
      isOwner = this.props.external
        ? false
        : this.props.viewer.id === this.props.current.data.ownerId;
      link = this.props.external
        ? null
        : isOwner
        ? Strings.getURLFromPath(`/${this.props.viewer.username}/${this.props.current.slatename}`)
        : this.props.current.owner && this.props.current.owner.username
        ? Strings.getURLFromPath(
            `/${this.props.current.owner.username}/${this.props.current.slatename}`
          )
        : null;
    } else if (
      this.state.carouselType === "data" &&
      this.props.viewer?.library[0]?.children?.length &&
      this.state.index < this.props.viewer.library[0].children.length
    ) {
      data = this.props.viewer.library[0].children[this.state.index];
      data.url = Strings.getCIDGatewayURL(data.cid);
    }
    if (!data) {
      this._handleClose();
      return null;
    }
    let slide = <SlateMediaObject data={data} />;
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
        <div css={STYLES_ROOT_CONTENT} style={this.props.style}>
          <span
            css={STYLES_BOX}
            onClick={this._handlePrevious}
            style={{ top: 0, left: 16, bottom: 0 }}
          >
            <SVG.ChevronLeft height="20px" />
          </span>
          <span
            css={STYLES_BOX}
            onClick={this._handleNext}
            style={{ top: 0, right: 16, bottom: 0 }}
          >
            <SVG.ChevronRight height="20px" />
          </span>
          {slide}
          <span css={STYLES_MOBILE_HIDDEN}>
            {this.state.showSidebar ? (
              <div
                css={STYLES_EXPANDER}
                onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
              >
                <SVG.Maximize height="24px" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  css={STYLES_EXPANDER}
                  onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
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
          {this.state.carouselType === "data" ? (
            <CarouselSidebarData
              viewer={this.props.viewer}
              display={this.state.showSidebar ? "block" : "none"}
              onUpdateViewer={this.props.onUpdateViewer}
              onClose={this._handleClose}
              key={data.id}
              saving={this.state.saving}
              loading={this.state.loading}
              slates={this.props.slates}
              onAction={this.props.onAction}
              resources={this.props.resources}
              data={data}
              cid={data.cid}
            />
          ) : (
            <CarouselSidebarSlate
              display={this.state.showSidebar ? "block" : "none"}
              viewer={this.props.viewer}
              onUpdateViewer={this.props.onUpdateViewer}
              current={this.props.current}
              key={data.id}
              saving={this.state.saving}
              loading={this.state.loading}
              slates={this.props.slates}
              onClose={this._handleClose}
              onAction={this.props.onAction}
              data={data}
              external={this.props.external}
              onSave={this._handleSave}
              isOwner={isOwner}
              isRepost={isRepost}
              link={link}
              index={this.state.index}
              external={this.props.external}
            />
          )}
        </span>
      </div>
    );
  }
}
