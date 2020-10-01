import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Validations from "~/common/validations";

import { css } from "@emotion/react";
import { GlobalTooltip } from "~/components/system/components/fragments/GlobalTooltip";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { Alert } from "~/components/core/Alert";

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
  transition: top 0.25s;
  @media (max-width: ${Constants.sizes.mobile}px) {
    left: 0;
  }
`;

const STYLES_CONTENT = css`
  background: ${Constants.system.white};
  width: 100%;
  min-width: 10%;
  min-height: 100vh;
  position: relative;
  padding-left: ${Constants.sizes.navigation}px;
  margin-top: ${Constants.sizes.topOffset}px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding-left: 0px;
    margin-top: calc(${Constants.sizes.topOffset}px + 36px);
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
  background-color: ${Constants.system.foreground};
  ${"" /* ${STYLES_NO_VISIBLE_SCROLL} NOTE(martina): removed for now b/c unnecessary (now that there's no slates dropdown) and b/c caused user menu to be cut off on mobile*/}
  @media (max-width: ${Constants.sizes.mobile}px) {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
  }
`;

const STYLES_SIDEBAR = css`
  z-index: ${Constants.zindex.sidebar};
  height: 100vh;
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
  position: fixed;
  background-color: rgba(247, 247, 247, 1);
  top: 0;
  right: 0;
  ${STYLES_NO_VISIBLE_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }

  @supports (
    (-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))
  ) {
    -webkit-backdrop-filter: blur(25px);
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
  padding: 56px 24px 24px 24px;
  padding-top: calc(56px + ${Constants.sizes.topOffset}px);

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding-top: 8px;
    margin-bottom: 48px;
  }
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

export default class ApplicationLayout extends React.Component {
  _sidebar;
  _navigation;
  _body;

  state = {
    headerTop: 0,
  };

  componentDidMount = () => {
    this.prevScrollPos = window.pageYOffset;
    if (Validations.onMobile()) {
      window.addEventListener("scroll", this._handleScroll);
    }
  };

  componentWillUnmount = () => {
    if (Validations.onMobile()) {
      window.removeEventListener("scroll", this._handleScroll);
    }
  };

  _handleScroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (this.prevScrollPos > currentScrollPos) {
      this.setState({ headerTop: 0 });
    } else {
      if (currentScrollPos > 56) {
        this.setState({ headerTop: -56 });
      }
    }
    this.prevScrollPos = currentScrollPos;
  };

  _handleDismiss = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onDismissSidebar();
  };

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
            <div css={STYLES_BLOCK} onClick={this._handleDismiss}>
              <SVG.Dismiss height="24px" />
            </div>
          </div>
          <div css={STYLES_SIDEBAR_CONTENT}>{this.props.sidebar}</div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div
          css={STYLES_NAVIGATION}
          ref={(c) => {
            this._navigation = c;
          }}
        >
          <GlobalTooltip
            elementRef={this._navigation}
            allowedTypes={["navigation"]}
          />
          {this.props.navigation}
        </div>

        <div css={STYLES_CONTENT}>
          {/* <GlobalTooltip elementRef={this._body} allowedTypes={["body"]} /> */}
          <GlobalTooltip allowedTypes={["body"]} />
          <span css={STYLES_MOBILE_HIDDEN}>
            <div css={STYLES_HEADER}>{this.props.header}</div>
          </span>
          <span css={STYLES_MOBILE_ONLY}>
            <div css={STYLES_HEADER} style={{ top: this.state.headerTop }}>
              {this.props.header}
            </div>
          </span>
          <div
            css={STYLES_BODY_WEB}
            ref={(c) => {
              this._body = c;
            }}
            id="slate-client-body"
          >
            <Alert
              fileLoading={this.props.fileLoading}
              onAction={this.props.onAction}
              filecoin={this.props.filecoin}
              style={{
                paddingRight: this.props.sidebar
                  ? `calc(${Constants.sizes.sidebar}px + 48px`
                  : "auto",
              }}
            />
            {this.props.children}
          </div>
          <div css={STYLES_BODY_MOBILE}>
            <Alert
              id="slate-mobile-alert"
              fileLoading={this.props.fileLoading}
              onAction={this.props.onAction}
              style={{ top: this.state.headerTop + 56 }}
            />
            {this.props.children}
          </div>
        </div>

        {this.props.sidebar ? (
          <Boundary
            captureResize={false}
            captureScroll={false}
            enabled
            onOutsideRectEvent={this._handleDismiss}
          >
            <div
              css={STYLES_SIDEBAR}
              ref={(c) => {
                this._sidebar = c;
              }}
            >
              {sidebarElements}
            </div>
          </Boundary>
        ) : null}
      </React.Fragment>
    );
  }
}
