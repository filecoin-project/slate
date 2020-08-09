import * as React from "react";
import * as Constants from "~/common/constants";
import * as OldSVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { Tooltip } from "react-tippy";

import Dismissible from "~/components/core/Dismissible";
import CircleButtonLight from "~/components/core/CircleButtonLight";

const STYLES_ANCHOR = css`
  position: relative;
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
        style={this.props.style}>
        <CircleButtonLight
          onClick={this._handleClick}
          style={{
            backgroundColor: this.state.visible ? Constants.system.brand : null,
            color: this.state.visible ? Constants.system.white : null,
          }}>
          <OldSVG.ChevronDown height="20px" />
        </CircleButtonLight>

        {this.state.visible ? this.props.popover : null}
      </Dismissible>
    );
  }
}
