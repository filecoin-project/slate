import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as OldSVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { Tooltip } from "react-tippy";

import ApplicationControlMenu from "~/components/core/ApplicationControlMenu";

const STYLES_CIRCLE = css`
  height: 32px;
  width: 32px;
  border-radius: 32px;
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: 200ms ease all;
  cursor: pointer;
  user-select: none;

  :hover {
    color: ${Constants.system.white};
    background-color: ${Constants.system.brand};
  }
`;

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #565151;
  user-select: none;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }

  svg {
    transform: rotate(0deg);
    transition: 200ms ease transform;
  }
`;

const STYLES_HOME = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin-right: 24px;
  margin-left: 24px;
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${Constants.font.codeBold};
`;

const STYLES_APPLICATION_HEADER = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: ${Constants.system.foreground};
  box-shadow: inset 0 -1px 0 0 ${Constants.system.border};
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  width: 352px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const STYLES_MIDDLE = css`
  min-width: 10%;
  width: 100%;
  padding: 0 24px 0 48px;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
`;

const STYLES_PROFILE = css`
  font-family: ${Constants.font.semiBold};
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  font-size: 12px;
  line-height: 12px;
  text-decoration: none;
  height: 36px;
  padding-right: 24px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: 200ms ease all;

  :hover {
    background-color: ${Constants.system.brand};
  }
`;

const STYLES_IMAGE = css`
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  margin-right: 16px;
  margin-left: 2px;
`;

export default class ApplicationHeader extends React.Component {
  render() {
    const isBackDisabled =
      this.props.currentIndex === 0 || this.props.history.length < 2;

    const isForwardDisabled =
      this.props.currentIndex === this.props.history.length - 1 ||
      this.props.history.length < 2;

    return (
      <header css={STYLES_APPLICATION_HEADER}>
        <div css={STYLES_LEFT}>
          <span css={STYLES_HOME}>Slate</span>
          <span
            css={STYLES_ICON_ELEMENT}
            style={
              isBackDisabled
                ? { cursor: "not-allowed", color: Constants.system.border }
                : null
            }
            onClick={isBackDisabled ? () => {} : this.props.onBack}
          >
            <SVG.NavigationArrow
              height="16px"
              style={{ transform: `rotate(180deg)` }}
            />
          </span>
          <span
            css={STYLES_ICON_ELEMENT}
            style={
              isForwardDisabled
                ? { cursor: "not-allowed", color: Constants.system.border }
                : null
            }
            onClick={isForwardDisabled ? () => {} : this.props.onForward}
          >
            <SVG.NavigationArrow height="16px" />
          </span>
        </div>
        <div css={STYLES_MIDDLE} />
        <div css={STYLES_RIGHT}>
          <Tooltip
            animation="fade"
            animateFill={false}
            title="View your profile"
          >
            <a
              css={STYLES_PROFILE}
              href={`/@${this.props.viewer.username}`}
              target="_blank"
            >
              <span
                css={STYLES_IMAGE}
                style={{
                  backgroundImage: `url('${this.props.viewer.data.photo}')`,
                }}
              />
              {this.props.viewer.username}
            </a>
          </Tooltip>

          <Tooltip animation="fade" animateFill={false} title="Settings Menu">
            <ApplicationControlMenu
              style={{ marginLeft: 12 }}
              onClick={() => {}}
              size={36}
              icon={<OldSVG.ChevronDown height="20px" />}
              popover={
                <System.PopoverNavigation
                  style={{ right: 0, top: "48px", cursor: "pointer" }}
                  onNavigateTo={this.props.onNavigateTo}
                  onAction={this.props.onAction}
                  onSignOut={this.props.onSignOut}
                  navigation={[
                    { text: "Profile & account settings", value: 13 },
                    { text: "Filecoin settings", value: 14 },
                    { text: "Sign out", value: 0, action: "SIGN_OUT" },
                  ]}
                />
              }
            />
          </Tooltip>
        </div>
      </header>
    );
  }
}
