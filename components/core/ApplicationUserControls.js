import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as UserBehaviors from "~/common/user-behaviors";

import { PopoverNavigation } from "~/components/system";
import { css } from "@emotion/react";

import { Boundary } from "~/components/system/components/fragments/Boundary";

const STYLES_HEADER = css`
  position: relative;
  margin-left: 16px;

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
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  border-radius: 2px;
  cursor: pointer;

  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 24px;
    width: 24px;
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
  right: 0px;

  ${"" /* @media (max-width: ${Constants.sizes.mobile}px) {
    top: 48px;
    left: 0px;
  } */}
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
  _handleAction = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onTogglePopup();
    return this.props.onAction(data);
  };

  _handleSignOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onTogglePopup();
    UserBehaviors.signOut();
  };

  render() {
    let tooltip = (
      <Boundary
        captureResize={true}
        captureScroll={false}
        enabled
        onOutsideRectEvent={() => this.props.onTogglePopup()}
        style={this.props.style}
      >
        <div>
          <PopoverNavigation
            style={{ top: 36, right: 0, padding: "0px 24px", width: 220 }}
            itemStyle={{ margin: "24px 0", fontSize: 18, justifyContent: "flex-end" }}
            navigation={[
              {
                text: "View profile",
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
                text: "Contact us",
                onClick: (e) =>
                  this._handleAction(e, {
                    type: "SIDEBAR",
                    value: "SIDEBAR_HELP",
                  }),
              },
              {
                text: "Sign out",
                onClick: (e) => {
                  this._handleSignOut(e);
                },
              },
            ]}
          />
        </div>
      </Boundary>
    );
    return (
      <div css={STYLES_HEADER}>
        <div css={STYLES_PROFILE_MOBILE} style={{ position: "relative" }}>
          <span
            css={STYLES_PROFILE_IMAGE}
            onClick={() => this.props.onTogglePopup("profile")}
            style={{
              backgroundImage: `url('${this.props.viewer.data.photo}')`,
            }}
          />
          {this.props.popup === "profile" ? tooltip : null}
        </div>
      </div>
    );
  }
}
