import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { GlobalTooltip } from "~/components/system/components/fragments/GlobalTooltip";
import { Boundary } from "~/components/system/components/fragments/Boundary";

const STYLES_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
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

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_HEADER = css`
  z-index: ${Constants.zindex.header};
  height: ${Constants.sizes.header}px;
  pointer-events: none;
  width: 100%;
  position: fixed;
  left: ${Constants.sizes.navigation}px;
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
  min-height: 100vh;
  position: relative;
  padding-left: ${Constants.sizes.navigation}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding-left: 60px;
  }
`;

const STYLES_BODY_WEB = css`
  display: block;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_BODY_MOBILE = css`
  display: none;
  width: 100%;
  padding: 0px 0px 88px 0px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_NAVIGATION = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  flex-shrink: 0;
  height: 100vh;
  z-index: ${Constants.zindex.navigation};
  width: ${Constants.sizes.navigation}px;
  border-right: 1px solid ${Constants.system.border};
  background-color: ${Constants.system.foreground};
  ${STYLES_NO_VISIBLE_SCROLL}
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: auto;
  }
`;

const STYLES_SIDEBAR_WEB = css`
  z-index: ${Constants.zindex.sidebar};
  height: 100vh;
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
  position: absolute;
  background-color: rgba(247, 247, 247, 1);
  top: 0;
  right: 0;
  ${STYLES_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }

  @supports (
    (-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))
  ) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(25px);
    background-color: rgba(247, 247, 247, 0.75);
  }
`;

const STYLES_SIDEBAR_HEADER = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const STYLES_SIDEBAR_CONTENT = css`
  padding: 8px 24px 24px 24px;
`;

const STYLES_BLOCK = css`
  margin-top: 8px;
  height: 56px;
  width: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease all;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
`;

export default class ApplicationLayout extends React.Component {
  _sidebar;
  _navigation;
  _body;

  render() {
    let sidebarElements = null;
    if (this.props.sidebar) {
      sidebarElements = (
        <React.Fragment>
          <GlobalTooltip
            elementRef={this._sidebar}
            allowedTypes={["sidebar"]}
          />
          <div css={STYLES_SIDEBAR_HEADER}>
            <div
              css={STYLES_BLOCK}
              onMouseUp={this.props.onDismissSidebar}
              onTouchEnd={this.props.onDismissSidebar}
            >
              <SVG.Dismiss height="24px" />
            </div>
          </div>
          <div css={STYLES_SIDEBAR_CONTENT}>{this.props.sidebar}</div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <GlobalTooltip
          elementRef={this._navigation}
          allowedTypes={["navigation"]}
        />

        <div
          css={STYLES_NAVIGATION}
          ref={(c) => {
            this._navigation = c;
          }}
        >
          {this.props.navigation}
        </div>

        <div css={STYLES_CONTENT}>
          <GlobalTooltip elementRef={this._body} allowedTypes={["body"]} />
          <div css={STYLES_HEADER}>{this.props.header}</div>
          <div
            css={STYLES_BODY_WEB}
            ref={(c) => {
              this._body = c;
            }}
            id="slate-client-body"
          >
            {this.props.children}
          </div>
          <div css={STYLES_BODY_MOBILE}>
            {this.props.sidebar ? sidebarElements : this.props.children}
          </div>
        </div>

        {this.props.sidebar ? (
          <div
            css={STYLES_SIDEBAR_WEB}
            ref={(c) => {
              this._sidebar = c;
            }}
          >
            {sidebarElements}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
