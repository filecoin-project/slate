import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const STYLES_SCROLL = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_LAYOUT = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const STYLES_HEADER = css`
  z-index: ${Constants.zindex.header};
  height: ${Constants.sizes.header}px;
  pointer-events: none;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_CONTENT = css`
  background: ${Constants.system.white};
  width: 100%;
  min-width: 10%;
  height: 100vh;
  position: relative;
`;

const STYLES_BODY_WEB = css`
  display: block;
  height: 100%;
  min-height: 10%;
  width: 100%;

  ${STYLES_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_BODY_MOBILE = css`
  display: none;
  height: 100%;
  min-height: 10%;
  width: 100%;
  padding: 80px 0px 88px 0px;

  ${STYLES_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_NAVIGATION = css`
  flex-shrink: 0;
  height: 100vh;
  z-index: ${Constants.zindex.navigation};
  width: ${Constants.sizes.navigation}px;
  border-right: 1px solid ${Constants.system.border};

  ${STYLES_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: auto;
  }
`;

const STYLES_SIDEBAR_WEB = css`
  height: 100vh;
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
  box-shadow: inset 1px 0 0 0 ${Constants.system.border};

  ${STYLES_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_SIDEBAR_HEADER = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const STYLES_SIDEBAR_CONTENT = css`
  padding: 24px;
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

export default class ApplicationLayout extends React.Component {
  render() {
    let sidebarElements = null;
    if (this.props.sidebar) {
      sidebarElements = (
        <React.Fragment>
          <div css={STYLES_SIDEBAR_HEADER}>
            <div css={STYLES_BLOCK} onClick={this.props.onDismissSidebar}>
              <SVG.Dismiss height="24px" />
            </div>
          </div>
          <div css={STYLES_SIDEBAR_CONTENT}>{this.props.sidebar}</div>
        </React.Fragment>
      );
    }

    return (
      <div css={STYLES_LAYOUT}>
        <div css={STYLES_NAVIGATION}>{this.props.navigation}</div>
        <div css={STYLES_CONTENT}>
          <div css={STYLES_HEADER}>{this.props.header}</div>
          <div css={STYLES_BODY_WEB}>{this.props.children}</div>
          <div css={STYLES_BODY_MOBILE}>{this.props.sidebar ? sidebarElements : this.props.children}</div>
        </div>
        {this.props.sidebar ? <div css={STYLES_SIDEBAR_WEB}>{sidebarElements}</div> : null}
      </div>
    );
  }
}
