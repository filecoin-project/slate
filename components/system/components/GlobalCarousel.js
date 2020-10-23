import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

import CarouselSidebarSlate from "~/components/core/CarouselSidebarSlate";
import CarouselSidebarData from "~/components/core/CarouselSidebarData";

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

  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(0, 0, 0, 0.8);
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
  right: 16px;
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
    color: ${Constants.system.black};
  }

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
    slides: null,
    visible: false,
    loading: false,
    saving: false,
    showSidebar: true,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("slate-global-create-carousel", this._handleCreate);
    window.addEventListener("slate-global-delete-carousel", this._handleDelete);
    window.addEventListener("slate-global-open-carousel", this._handleOpen);
    window.addEventListener("slate-global-close-carousel", this._handleClose);
    window.addEventListener("state-global-carousel-loading", this._handleSetLoading);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("slate-global-create-carousel", this._handleCreate);
    window.removeEventListener("slate-global-delete-carousel", this._handleDelete);
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
    this.setState({
      visible: true,
      index: e.detail.index || 0,
      loading: false,
      saving: false,
      baseURL: e.detail.baseURL,
    });

    if (this.state.slides && e.detail.baseURL) {
      const current = this.state.slides[e.detail.index];
      window.history.replaceState(
        { index: e.detail.index },
        "",
        `/${e.detail.baseURL}/cid:${current.cid}`
      );
    }
  };

  _handleClose = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ visible: false, index: 0, loading: false, saving: false });

    if (this.state.baseURL) {
      window.history.replaceState({}, "", `/${this.state.baseURL}`);
    }
  };

  _handleCreate = (e) => {
    const shouldPersist = this.state.visible && this.state.index < e.detail.slides.length;

    this.setState({
      slides: [...e.detail.slides],
      visible: shouldPersist ? true : false,
      index: shouldPersist ? this.state.index : 0,
      carouselType: e.detail.carouselType,
    });
  };

  _handleDelete = (e) => {
    this.setState({ slides: null, visible: false, index: 0 });

    if (this.state.baseURL) {
      window.history.replaceState({}, "", `/${this.state.baseURL}`);
    }
  };

  _handleNext = () => {
    if (!this.state.slides) return;
    const index = (this.state.index + 1) % this.state.slides.length;
    this.setState({ index, loading: false, saving: false });

    if (this.state.baseURL) {
      const current = this.state.slides[index];
      window.history.replaceState({ index }, "", `/${this.state.baseURL}/cid:${current.cid}`);
    }
  };

  _handlePrevious = () => {
    if (!this.state.slides) return;
    const index = (this.state.index + this.state.slides.length - 1) % this.state.slides.length;
    this.setState({ index, loading: false, saving: false });

    if (this.state.baseURL) {
      const current = this.state.slides[index];
      window.history.replaceState({ index }, "", `/${this.state.baseURL}/cid:${current.cid}`);
    }
  };

  render() {
    const isVisible = this.state.visible && this.state.slides;
    if (!isVisible) {
      return null;
    }

    const current = this.state.slides[this.state.index];
    if (!current) {
      return null;
    }

    return (
      <div css={STYLES_ROOT}>
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
          {current.component}
          <span css={STYLES_MOBILE_HIDDEN}>
            <div
              css={STYLES_EXPANDER}
              onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
            >
              {this.state.showSidebar ? (
                <SVG.Maximize height="24px" />
              ) : (
                <SVG.Minimize height="24px" />
              )}
            </div>
          </span>
          <div css={STYLES_DISMISS_BOX} onClick={this._handleClose}>
            <SVG.Dismiss height="24px" />
          </div>
        </div>
        <span css={STYLES_MOBILE_HIDDEN}>
          {this.state.carouselType === "data" ? (
            <CarouselSidebarData
              display={this.state.showSidebar ? "block" : "none"}
              onClose={this._handleClose}
              key={current.id}
              saving={this.state.saving}
              loading={this.state.loading}
              onRehydrate={this.props.onRehydrate}
              onAction={this.props.onAction}
              {...current}
            />
          ) : (
            <CarouselSidebarSlate
              display={this.state.showSidebar ? "block" : "none"}
              key={current.id}
              saving={this.state.saving}
              loading={this.state.loading}
              slates={this.props.slates}
              onClose={this._handleClose}
              onRehydrate={this.props.onRehydrate}
              onAction={this.props.onAction}
              {...current}
            />
          )}
        </span>
      </div>
    );
  }
}
