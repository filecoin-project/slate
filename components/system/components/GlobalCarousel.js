import { css } from "@emotion/react";
import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

const STYLES_BACKGROUND = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  z-index: ${Constants.zindex.modal};
`;

const STYLES_CLOSE_ICON = css`
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const STYLES_PREVIOUS_ICON = css`
  height: 24px;
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const STYLES_NEXT_ICON = css`
  height: 24px;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export class GlobalCarousel extends React.Component {
  state = {
    slides: null,
    currentSlide: 0,
  };

  componentDidMount = () => {
    window.addEventListener("create-carousel", this._handleCreate);
    window.addEventListener("delete-carousel", this._handleDelete);

    // Handle Key downs
    window.addEventListener("keydown", this._handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-carousel", this._handleCreate);
    window.removeEventListener("delete-carousel", this._handleDelete);

    window.removeEventListener("keydown", this._handleKeyDown);
  };

  _handleCreate = (e) => {
    this.setState({
      slides: e.detail.slides,
      currentSlide: e.detail.currentSlide || 0,
    });
  };

  _handleDelete = (e) => {
    this.setState({ slides: null, currentSlide: 0 });
  };

  _handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        this._handleDelete();
        break;
      case "Right": // Support Internet Explorer, Edge (16 and earlier), and Firefox (36 and earlier)
      case "ArrowRight":
        if (this._areMoreSlidesOnRight) this._handleNextSlide();
        break;
      case "Left": // Support Internet Explorer, Edge (16 and earlier), and Firefox (36 and earlier)
      case "ArrowLeft":
        if (this._areMoreSlidesOnLeft) this._handlePreviousSlide();
        break;
    }
  };

  _handleNextSlide = () => {
    this.setState((prev) => ({ currentSlide: prev.currentSlide + 1 }));
  };
  _handlePreviousSlide = () => {
    this.setState((prev) => ({ currentSlide: prev.currentSlide - 1 }));
  };

  render() {
    this._slidesSize = this.state.slides?.length || 0;
    this._areMoreSlidesOnRight = this.state.currentSlide < this._slidesSize - 1;
    this._areMoreSlidesOnLeft = this.state.currentSlide > 0;

    if (!this.state.slides) return null;
    return (
      <div css={STYLES_BACKGROUND} style={this.props.style}>
        <SVG.Dismiss css={STYLES_CLOSE_ICON} onClick={this._handleDelete} />
        {this._areMoreSlidesOnLeft && (
          <SVG.ChevronLeft
            css={STYLES_PREVIOUS_ICON}
            onClick={this._handlePreviousSlide}
          />
        )}
        {this._areMoreSlidesOnRight && (
          <SVG.ChevronRight
            css={STYLES_NEXT_ICON}
            onClick={this._handleNextSlide}
          />
        )}
        {Array.isArray(this.state.slides)
          ? this.state.slides[this.state.currentSlide]
          : this.state.slides}
      </div>
    );
  }
}