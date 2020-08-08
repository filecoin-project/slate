import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const NAVIGATION_WIDTH = 288;
const HEADER_HEIGHT = 72;

const STYLES_LAYOUT = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
`;

const STYLES_CONTENT = css`
  background: ${Constants.system.white};
  width: 100%;
  min-width: 10%;
  height: 100vh;
  position: relative;
`;

const STYLES_BODY = css`
  -webkit-overflow-scrolling: touch;
  height: 100%;
  min-height: 10%;
  width: 100%;

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

const STYLES_NAVIGATION = css`
  flex-shrink: 0;
  height: 100vh;
  z-index: ${Constants.zindex.navigation};
  width: ${Constants.sizes.navigation}px;
  border-right: 1px solid ${Constants.system.border};

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

const STYLES_SIDEBAR = css`
  height: 100vh;
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
  box-shadow: inset 1px 0 0 0 ${Constants.system.border};

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
      <div css={STYLES_LAYOUT}>
        <div css={STYLES_NAVIGATION}>{this.props.navigation}</div>
        <div css={STYLES_CONTENT}>
          <div css={STYLES_HEADER}>{this.props.header}</div>
          <div css={STYLES_BODY}>{this.props.children}</div>
        </div>
        {this.props.sidebar ? (
          <div css={STYLES_SIDEBAR}>
            <div css={STYLES_SIDEBAR_HEADER}>
              <div css={STYLES_BLOCK} onClick={this.props.onDismissSidebar}>
                <SVG.Dismiss height="24px" />
              </div>
            </div>
            <div css={STYLES_SIDEBAR_CONTENT}>{this.props.sidebar}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
