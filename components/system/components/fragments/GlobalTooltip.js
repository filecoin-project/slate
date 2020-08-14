import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css, keyframes } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";

const STYLES_TOOLTIP = css`
  z-index: ${Constants.zindex.tooltip};
`;

export class GlobalTooltip extends React.Component {
  _root;

  state = {
    tooltips: {},
  };

  componentDidMount = () => {
    window.addEventListener("add-tooltip", this._handleAdd);
    window.addEventListener("remove-tooltip", this._handleRemove);
    window.addEventListener("show-tooltip", this._handleShow);
    window.addEventListener("hide-tooltip", this._handleHide);
    window.addEventListener("resize", this._handleResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("add-tooltip", this._handleAdd);
    window.removeEventListener("remove-tooltip", this._handleRemove);
    window.removeEventListener("show-tooltip", this._handleShow);
    window.removeEventListener("hide-tooltip", this._handleHide);
    window.removeEventListener("resize", this._handleResize);
  };

  getStyle = (rect, bubbleRect, vertical, horizontal) => {
    let yOffset = this.props.elementRef ? this.props.elementRef.scrollTop : window.pageYOffset;
    let xOffset = this.props.elementRef ? this.props.elementRef.scrollLeft : window.pageXOffset;
    let style = { position: "absolute" };
    switch (vertical) {
      case "above":
        style.top = `${rect.top - bubbleRect.height + yOffset}px`;
        break;
      case "up":
        style.top = `${rect.bottom - bubbleRect.height + yOffset}px`;
        break;
      case "center":
        style.top = `${rect.top + 0.5 * rect.height - 0.5 * bubbleRect.height + yOffset}px`;
        break;
      case "down":
        style.top = `${rect.top + yOffset}px`;
        break;
      case "below":
        style.top = `${rect.bottom + yOffset}px`;
        break;
    }
    switch (horizontal) {
      case "far-left":
        style.left = `${rect.left - bubbleRect.width + xOffset}px`;
        break;
      case "left":
        style.left = `${rect.right - bubbleRect.width + xOffset}px`;
        break;
      case "center":
        style.left = `${rect.left + 0.5 * rect.width - 0.5 * bubbleRect.width + xOffset}px`;
        break;
      case "right":
        style.left = `${rect.left + xOffset}px`;
        break;
      case "far-right":
        style.left = `${rect.right + xOffset}px`;
        break;
    }
    return style;
  };

  getOrientation = (rect, bubbleRect, vertical, horizontal) => {
    let yOffset = this.props.elementRef ? this.props.elementRef.scrollTop : window.pageYOffset;
    let xOffset = this.props.elementRef ? this.props.elementRef.scrollLeft : window.pageXOffset;
    if (!vertical) {
      if (bubbleRect.height > rect.top + yOffset) {
        vertical = "below";
      } else {
        vertical = "above";
      }
    }
    if (!horizontal) {
      if (bubbleRect.width / 2 > rect.left + rect.width / 2 + xOffset) {
        horizontal = "right";
      } else if (bubbleRect.width / 2 > rect.right + rect.width / 2 + xOffset) {
        horizontal = "left";
      } else {
        horizontal = "center";
      }
    }
    return this.getStyle(rect, bubbleRect, vertical, horizontal);
  };

  _handleResize = (e) => {
    let tooltips = this.state.tooltips;
    for (let each of Object.keys(tooltips)) {
      delete tooltips[each].style;
    }
    this.setState({ tooltips });
  };

  _handleAdd = (e) => {
    if (this.props.allowedTypes && !this.props.allowedTypes.includes(e.detail.type)) {
      return;
    }

    let tooltips = this.state.tooltips;

    tooltips[e.detail.id] = {
      id: e.detail.id,
      show: false,
      content: e.detail.content,
      root: e.detail.root,
      bubbleRect: e.detail.bubbleRect,
      vertical: e.detail.vertical,
      horizontal: e.detail.horizontal,
    };
    this.setState({ tooltips });
  };

  _handleRemove = (e) => {
    if (this.props.allowedTypes && !this.props.allowedTypes.includes(e.detail.type)) {
      return;
    }

    if (this.state.tooltips[e.detail.id]) {
      let tooltips = this.state.tooltips;
      delete tooltips[e.detail.id];
      this.setState({ tooltips });
    }
  };

  _handleShow = (e) => {
    if (this.state.tooltips[e.detail.id]) {
      let tooltips = this.state.tooltips;
      if (!tooltips[e.detail.id].style) {
        let rect = tooltips[e.detail.id].root.getBoundingClientRect();
        let style = this.getOrientation(
          rect,
          tooltips[e.detail.id].bubbleRect,
          tooltips[e.detail.id].vertical,
          tooltips[e.detail.id].horizontal
        );
        tooltips[e.detail.id].style = style;
      }
      tooltips[e.detail.id].show = true;
      this.setState({ tooltips });
    }
  };

  _handleHide = (e) => {
    if (this.state.tooltips[e.detail.id]) {
      let tooltips = this.state.tooltips;
      tooltips[e.detail.id].show = false;
      this.setState({ tooltips });
    }
  };

  render() {
    return (
      <div>
        {Object.values(this.state.tooltips)
          .filter((t) => {
            return t.show;
          })
          .map((t) => (
            <div key={t.id} style={t.style} css={STYLES_TOOLTIP}>
              {t.content}
            </div>
          ))}
      </div>
    );
  }
}

const STYLES_INVISIBLE = css`
  opacity: 0%;
  pointer-events: none;
  position: absolute;
`;

export class TooltipWrapper extends React.Component {
  _root;
  _bubble;

  state = {
    sample: true,
  };

  componentDidMount = async () => {
    let bubbleRect = this._bubble.getBoundingClientRect();

    dispatchCustomEvent({
      name: "add-tooltip",
      detail: {
        type: this.props.type,
        id: this.props.id,
        content: this.props.content,
        vertical: this.props.vertical,
        horizontal: this.props.horizontal,
        root: this._root,
        bubbleRect,
      },
    });
    this.setState({ sample: false });
  };

  componentWillUnmount = () => {
    dispatchCustomEvent({
      name: "remove-tooltip",
      detail: { id: this.props.id, type: this.props.type },
    });
  };

  render() {
    return (
      <div style={{ display: "inline-flex" }}>
        {this.state.sample ? (
          <div
            ref={(c) => {
              this._bubble = c;
            }}
            style={{ display: "inline-flex" }}
            css={STYLES_INVISIBLE}>
            {this.props.content}
          </div>
        ) : null}
        <div
          ref={(c) => {
            this._root = c;
          }}
          style={{ display: "inline-flex" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const fadein = keyframes`
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
`;

const STYLES_TOOLTIP_BUBBLE = css`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.8em;
  word-wrap: break-word;
  max-width: 440px;
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};
  animation: ${fadein} 200ms ease-out 1;
`;

const STYLES_TOOLTIP_ANCHOR = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

export class TooltipAnchor extends React.Component {
  _handleMouseEnter = (e) => {
    dispatchCustomEvent({
      name: "show-tooltip",
      detail: {
        id: this.props.id,
        type: this.props.type,
      },
    });
  };

  _handleMouseLeave = (e) => {
    dispatchCustomEvent({
      name: "hide-tooltip",
      detail: {
        id: this.props.id,
        type: this.props.type,
      },
    });
  };

  render() {
    let content = (
      <div css={STYLES_TOOLTIP_BUBBLE} style={this.props.style}>
        {this.props.tooltip}
      </div>
    );
    return (
      <TooltipWrapper
        id={this.props.id}
        content={content}
        horizontal={this.props.horizontal}
        vertical={this.props.vertical}
        type={this.props.type}>
        <span
          css={STYLES_TOOLTIP_ANCHOR}
          style={this.props.anchorStyle}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}>
          {this.props.children ? (
            this.props.children
          ) : (
            <SVG.Information height={this.props.height ? this.props.height : "24px"} />
          )}
        </span>
      </TooltipWrapper>
    );
  }
}
