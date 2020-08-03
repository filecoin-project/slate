import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const NAVIGATION_WIDTH = 288;
const HEADER_HEIGHT = 72;

// TODO(jim):
// When you're building Slate 1.0.0 you can take out this mobile restriction.
const STYLES_BODY = css`
  padding: ${HEADER_HEIGHT}px 0 0 ${Constants.sizes.navigation}px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 880px) {
    :after {
      content: "We're sorry! This application is only supported on desktop or desktop web.";
      z-index: 999999;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px;
      color: ${Constants.system.white};
      background-color: ${Constants.system.pitchBlack};
    }
  }
`;

const STYLES_HEADER = css`
  z-index: ${Constants.zindex.header};
  height: ${Constants.sizes.header}px;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
`;

const STYLES_NAVIGATION = css`
  z-index: ${Constants.zindex.navigation};
  width: ${Constants.sizes.navigation}px;
  top: ${Constants.sizes.header}px;
  position: fixed;
  left: 0;
  bottom: 0;
`;

const STYLES_SIDEBAR = css`
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
`;

const STYLES_TRUE_SIDEBAR = css`
  width: ${Constants.sizes.sidebar}px;
  background: ${Constants.system.foreground};
  z-index: ${Constants.zindex.sidebar};
  border-left: 1px solid ${Constants.system.border};
  padding: 0 0 128px 0;
  position: fixed;
  right: 0;
  top: ${Constants.sizes.header}px;
  bottom: 0;
  flex-shrink: 0;
  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_SIDEBAR_HEADER = css`
  display: flex;
  justify-content: flex-end;
`;

const STYLES_BLOCK = css`
  height: 56px;
  width: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_SIDEBAR_CONTENT = css`
  padding: 24px;
`;

export default class ApplicationLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div css={STYLES_NAVIGATION}>{this.props.navigation}</div>
        <div css={STYLES_HEADER}>{this.props.header}</div>
        <div css={STYLES_BODY}>
          {this.props.children}
          {this.props.sidebar ? (
            <div css={STYLES_SIDEBAR}>
              <div css={STYLES_TRUE_SIDEBAR}>
                <div css={STYLES_SIDEBAR_HEADER}>
                  <div css={STYLES_BLOCK} onClick={this.props.onDismissSidebar}>
                    <SVG.Dismiss height="24px" />
                  </div>
                </div>
                <div css={STYLES_SIDEBAR_CONTENT}>{this.props.sidebar}</div>
              </div>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
