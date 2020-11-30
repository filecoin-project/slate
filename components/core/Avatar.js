import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import Dismissible from "~/components/core/Dismissible";

const STYLES_AVATAR = css`
  display: inline-flex;
  background-size: cover;
  background-position: 50% 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 4px;
  background-color: ${Constants.system.black};
`;

const STYLES_AVATAR_ONLINE = css`
  height: 16px;
  width: 16px;
  background-color: ${Constants.system.green};
  border: 2px solid ${Constants.system.white};
  position: absolute;
  bottom: -4px;
  right: -4px;
  border-radius: 16px;
`;

export default class AvatarEntity extends React.Component {
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
    return (
      <Dismissible
        css={STYLES_AVATAR}
        captureResize={false}
        captureScroll={true}
        enabled={this.state.visible}
        onOutsideRectEvent={this._handleHide}
        onClick={this._handleClick}
        style={{
          ...this.props.style,
          width: `${this.props.size}px`,
          height: `${this.props.size}px`,
          backgroundImage: `url('${this.props.url}')`,
          cursor: this.props.onClick ? "pointer" : this.props.style,
        }}
      >
        {this.state.visible ? this.props.popover : null}
        {this.props.online ? <span css={STYLES_AVATAR_ONLINE} /> : null}
      </Dismissible>
    );
  }
}
