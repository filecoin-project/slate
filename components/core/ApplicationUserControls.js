import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import {
  TooltipWrapper,
  dispatchCustomEvent,
  PopoverNavigation,
} from "~/components/system";
import { css } from "@emotion/react";

import { Boundary } from "~/components/system/components/fragments/Boundary";
import CircleButtonLight from "~/components/core/CircleButtonLight";

const APPLICATION_CONTROL_MENU_ID = "application-control-menu";

const STYLES_HEADER = css`
  display: block;
  position: relative;
  width: 100%;
  padding: 84px 24px 40px 42px;
  padding-top: calc(84px + ${Constants.sizes.topOffset}px);

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    width: auto;
  }
`;

const STYLES_PROFILE = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 10%;
  width: 204px;

  color: ${Constants.system.pitchBlack};
  background-color: ${Constants.system.white};
  font-size: 12px;
  text-decoration: none;
  border-radius: 4px;
  min-height: 48px;
  cursor: pointer;
  border: 1px solid rgba(229, 229, 229, 0.5);
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.03);

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_PROFILE_MOBILE = css`
  display: flex;
  align-items: center;
  width: 100%;

  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;

  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 24px;
    width: 24px;
    margin-left: 0px;
  }
`;

const STYLES_PROFILE_USERNAME = css`
  min-width: 10%;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 12px;
  user-select: none;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
`;

const STYLES_ITEM_BOX_MOBILE = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: ${Constants.system.white};
  cursor: pointer;
  border-radius: 4px;
  border-left: 2px solid ${Constants.system.foreground};
`;

const STYLES_ITEM_BOX = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 8px;
  padding-right: 9px;
  transition: 200ms ease all;
  border-left: 2px solid ${Constants.system.foreground};


  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_MENU = css`
  position: absolute;
  top: 48px;
  left: 0px;
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

export default class ApplicationUserControls extends React.Component {
  state = { visible: false };

  _handleClick = (e) => {
    console.log("click");
    e.stopPropagation();
    if (this.state.visible) {
      this._handleHide();
      return;
    }
    this.setState({ visible: true });
    // dispatchCustomEvent({
    //   name: "show-tooltip",
    //   detail: {
    //     id: APPLICATION_CONTROL_MENU_ID,
    //   },
    // });
  };

  _handleHide = () => {
    this.setState({ visible: false });
    // return dispatchCustomEvent({
    //   name: "hide-tooltip",
    //   detail: {
    //     id: APPLICATION_CONTROL_MENU_ID,
    //   },
    // });
  };

  _handleAction = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    this._handleHide();
    return this.props.onAction(data);
  };

  _handleSignOut = (data) => {
    this._handleHide();
    return this.props.onSignOut(data);
  };

  render() {
    let tooltip = (
      <div css={STYLES_MENU}>
        <Boundary
          captureResize={true}
          captureScroll={false}
          enabled
          onOutsideRectEvent={this._handleHide}
          style={this.props.style}
        >
          <div css={STYLES_MOBILE_ONLY}>
            <PopoverNavigation
              navigation={[
                {
                  text: "My profile",
                  onClick: (e) =>
                    this._handleAction(e, {
                      type: "NAVIGATE",
                      value: "V1_NAVIGATION_PROFILE",
                      data: this.props.viewer,
                    }),
                },
                {
                  text: "Account settings",
                  onClick: (e) =>
                    this._handleAction(e, {
                      type: "NAVIGATE",
                      value: "V1_NAVIGATION_PROFILE_EDIT",
                    }),
                },
                {
                  text: "Help",
                  onClick: (e) =>
                    this._handleAction(e, {
                      type: "SIDEBAR",
                      value: "SIDEBAR_HELP",
                    }),
                },
                { text: "Sign out", onClick: this._handleSignOut },
              ]}
            />
          </div>
          <div css={STYLES_MOBILE_HIDDEN} style={{ marginBottom: "8px" }}>
            <PopoverNavigation
              navigation={[
                {
                  text: "Account settings",
                  onClick: (e) =>
                    this._handleAction(e, {
                      type: "NAVIGATE",
                      value: "V1_NAVIGATION_PROFILE_EDIT",
                    }),
                },
                { text: "Sign out", onClick: this._handleSignOut },
              ]}
            />
          </div>
        </Boundary>
      </div>
    );
    return (
      <div css={STYLES_HEADER}>
        <div
          css={STYLES_PROFILE}
          onClick={() =>
            this.props.onAction({
              type: "NAVIGATE",
              value: "V1_NAVIGATION_PROFILE",
              data: this.props.viewer,
            })
          }
        >
          <span
            css={STYLES_PROFILE_IMAGE}
            style={{
              backgroundImage: `url('${this.props.viewer.data.photo}')`,
            }}
          />
          <span css={STYLES_PROFILE_USERNAME}>
            {this.props.viewer.username}
          </span>
          <div onClick={this._handleClick} css={STYLES_ITEM_BOX}>
            <SVG.ChevronDown height="20px" />
          </div>
          {this.state.visible ? tooltip : null}
        </div>
        <div css={STYLES_PROFILE_MOBILE}>
          <span
            css={STYLES_PROFILE_IMAGE}
            onClick={this._handleClick}
            style={{
              backgroundImage: `url('${this.props.viewer.data.photo}')`,
              height: 28,
              width: 28,
            }}
          />
          {/* <div onClick={this._handleClick} css={STYLES_ITEM_BOX_MOBILE}>
            <SVG.ChevronDown height="20px" />
          </div> */}
          {this.state.visible ? tooltip : null}
        </div>
      </div>
    );
  }
}
