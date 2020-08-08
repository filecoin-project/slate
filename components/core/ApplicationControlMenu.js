import * as React from "react";
import * as Constants from "~/common/constants";
import * as OldSVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { Tooltip } from "react-tippy";

import Dismissible from "~/components/core/Dismissible";

const STYLES_ANCHOR = css`
  position: relative;
`;

const STYLES_BUTTON = css`
  background-color: ${Constants.system.white};
  color: ${Constants.system.pitchBlack};
  display: inline-flex;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  background-size: cover;
  background-position: 50% 50%;
  transition: 100ms ease all;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
    background-color: ${Constants.system.brand};
  }
`;

export default class ApplicationControlMenu extends React.Component {
  state = {};

  _handleClick = (e) => {
    if (this.props.popover) {
      this.setState({ visible: !this.state.visible });
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  _handleHide = () => {
    this.setState({ visible: false });
  };

  render() {
    const title = this.state.visible ? "Close menu" : "Open settings menu";

    return (
      <Dismissible
        css={STYLES_ANCHOR}
        captureResize={false}
        captureScroll={true}
        enabled={this.state.visible}
        onOutsideRectEvent={this._handleHide}
        style={this.props.style}
      >
        <Tooltip animation="fade" animateFill={false} title={title}>
          <span
            onClick={this._handleClick}
            css={STYLES_BUTTON}
            style={{
              backgroundColor: this.state.visible
                ? Constants.system.brand
                : null,
              color: this.state.visible ? Constants.system.white : null,
            }}
          >
            <OldSVG.ChevronDown height="20px" />
          </span>
        </Tooltip>

        {this.state.visible ? this.props.popover : null}
      </Dismissible>
    );
  }
}
