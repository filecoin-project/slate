import * as React from "react";
import * as Constants from "~/common/constants";
import * as OldSVG from "~/components/system/svg";

import {
  TooltipWrapper,
  dispatchCustomEvent,
  PopoverNavigation,
} from "~/components/system";
import { css } from "@emotion/react";

import Dismissible from "~/components/core/Dismissible";
import CircleButtonLight from "~/components/core/CircleButtonLight";

const APPLICATION_CONTROL_MENU_ID = "application-control-menu";

const STYLES_HEADER = css`
  display: block;
  position: relative;
  width: 100%;
  padding: 64px 24px 48px 42px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 0 48px 16px;
  }
`;

const STYLES_FLEX_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 228px;
`;

const STYLES_PROFILE = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 10%;
  width: 100%;

  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.pitchBlack};
  background-color: ${Constants.system.white};
  font-size: 12px;
  line-height: 12px;
  text-decoration: none;
  padding-right: 24px;
  border-radius: 32px;
  min-height: 38px;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
    background-color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_PROFILE_IMAGE = css`
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  margin-left: 3px;
  margin-top: 3px;
`;

const STYLES_PROFILE_USERNAME = css`
  min-width: 10%;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 12px 0 12px 16px;
  user-select: none;
`;

export default class ApplicationUserControls extends React.Component {
  state = { visible: false };

  _handleClick = (e) => {
    this.setState({ visible: !this.state.visible });

    dispatchCustomEvent({
      name: "show-tooltip",
      detail: {
        id: APPLICATION_CONTROL_MENU_ID,
      },
    });
  };

  _handleHide = () => {
    this.setState({ visible: false });
    return dispatchCustomEvent({
      name: "hide-tooltip",
      detail: {
        id: APPLICATION_CONTROL_MENU_ID,
      },
    });
  };

  _handleNavigateTo = (data) => {
    this._handleHide();
    return this.props.onNavigateTo(data);
  };

  _handleAction = (data) => {
    this._handleHide();
    return this.props.onAction(data);
  };

  _handleSignOut = (data) => {
    this._handleHide();
    return this.props.onSignOut(data);
  };

  render() {
    return (
      <div css={STYLES_HEADER}>
        <TooltipWrapper
          id={APPLICATION_CONTROL_MENU_ID}
          type="navigation"
          horizontal="right"
          vertical="below"
          content={
            <Dismissible
              captureResize={true}
              captureScroll={false}
              enabled
              onOutsideRectEvent={this._handleHide}
              style={this.props.style}
            >
              <PopoverNavigation
                style={{
                  left: "0px",
                  top: "16px",
                  cursor: "pointer",
                }}
                onNavigateTo={this._handleNavigateTo}
                onAction={this._handleAction}
                onSignOut={this._handleSignOut}
                navigation={[
                  {
                    text: "Profile & account settings",
                    value: "V1_NAVIGATION_PROFILE_EDIT",
                  },
                  { text: "Sign Out", value: null, action: "SIGN_OUT" },
                ]}
              />
            </Dismissible>
          }
        >
          <div css={STYLES_FLEX_ROW}>
            <div
              css={STYLES_PROFILE}
              style={{ marginRight: 16 }}
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
            </div>
            <CircleButtonLight
              onClick={this._handleClick}
              style={{
                backgroundColor: this.state.visible
                  ? Constants.system.brand
                  : null,
                color: this.state.visible ? Constants.system.white : null,
              }}
            >
              <OldSVG.ChevronDown height="20px" />
            </CircleButtonLight>
          </div>
        </TooltipWrapper>
      </div>
    );
  }
}
