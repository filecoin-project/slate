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
  padding: 64px 24px 48px 42px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 0 48px 16px;
  }
`;

const STYLES_FLEX_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 204px;
`;

const STYLES_PROFILE = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 10%;
  width: 100%;

  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.pitchBlack};
  background-color: ${Constants.system.white};
  font-size: 12px;
  line-height: 12px;
  text-decoration: none;
  border-radius: 4px;
  min-height: 48px;
  cursor: pointer;
  border: 1px solid rgba(229, 229, 229, 0.25);
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.03);

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
  border-radius: 4px;
  margin-left: 8px;
`;

const STYLES_PROFILE_USERNAME = css`
  min-width: 10%;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 12px;
  user-select: none;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
`;

const STYLES_ITEM_BOX = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 8px;
  padding-right: 12px;
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export default class ApplicationUserControls extends React.Component {
  state = { visible: false };

  _handleClick = (e) => {
    e.stopPropagation();
    if (this.state.visible) {
      this._handleHide();
      return;
    }
    this.setState({ visible: true });

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
            <Boundary
              captureResize={true}
              captureScroll={false}
              enabled
              onOutsideRectEvent={this._handleHide}
              style={this.props.style}
            >
              <PopoverNavigation
                style={{ position: "relative", top: "8px" }}
                itemStyle={{ color: Constants.system.darkGray }}
                navigation={[
                  {
                    text: "Account settings",
                    onClick: () =>
                      this._handleAction({
                        type: "NAVIGATE",
                        value: "V1_NAVIGATION_PROFILE_EDIT",
                      }),
                  },
                  { text: "Sign out", onClick: this._handleSignOut },
                ]}
              />
            </Boundary>
          }
        >
          <div css={STYLES_FLEX_ROW}>
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
                <OldSVG.ChevronDown height="20px" />
              </div>
            </div>
          </div>
        </TooltipWrapper>
      </div>
    );
  }
}
