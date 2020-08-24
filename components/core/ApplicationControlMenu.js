import * as React from "react";
import * as Constants from "~/common/constants";
import * as OldSVG from "~/components/system/svg";

import { TooltipWrapper, dispatchCustomEvent, PopoverNavigation } from "~/components/system";
import { css } from "@emotion/react";

import Dismissible from "~/components/core/Dismissible";
import CircleButtonLight from "~/components/core/CircleButtonLight";

const STYLES_ANCHOR = css`
  position: relative;
`;

const APPLICATION_CONTROL_MENU_ID = "application-control-menu";

export default class ApplicationControlMenu extends React.Component {
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
      <TooltipWrapper
        id={APPLICATION_CONTROL_MENU_ID}
        type="navigation"
        horizontal="right"
        vertical="below"
        content={
          <Dismissible
            css={STYLES_ANCHOR}
            captureResize={true}
            captureScroll={false}
            enabled
            onOutsideRectEvent={this._handleHide}
            style={this.props.style}>
            <PopoverNavigation
              style={{
                left: 0,
                top: "24px",
                cursor: "pointer",
              }}
              onNavigateTo={this._handleNavigateTo}
              onAction={this._handleAction}
              onSignOut={this._handleSignOut}
              navigation={[
                {
                  text: "Profile & account settings",
                  value: "V1_NAVIGATION_PROFILE",
                },
                /*
                {
                  text: "Filecoin settings",
                  value: "V1_NAVIGATION_FILECOIN_SETTINGS",
                },
                */
                { text: "Sign out", value: null, action: "SIGN_OUT" },
              ]}
            />
          </Dismissible>
        }>
        <CircleButtonLight
          onClick={this._handleClick}
          style={{
            backgroundColor: this.state.visible ? Constants.system.brand : null,
            color: this.state.visible ? Constants.system.white : null,
          }}>
          <OldSVG.ChevronDown height="20px" />
        </CircleButtonLight>
      </TooltipWrapper>
    );
  }
}
