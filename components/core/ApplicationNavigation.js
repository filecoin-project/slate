import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

import ApplicationUserControls from "~/components/core/ApplicationUserControls";

const IconMap = {
  HOME: <SVG.Home height="20px" />,
  ENCRYPTED: <SVG.SecurityLock height="20px" />,
  NETWORK: <SVG.Activity height="20px" />,
  DIRECTORY: <SVG.Directory height="20px" />,
  FOLDER: <SVG.Folder height="20px" />,
  WALLET: <SVG.OldWallet height="20px" />,
  DEALS: <SVG.Deals height="20px" />,
  MAKE_DEAL: <SVG.HardDrive height="20px" />,
  SLATES: <SVG.Layers height="20px" />,
  SLATE: <SVG.Slate height="20px" />,
  LOCAL_DATA: <SVG.HardDrive height="20px" />,
  PROFILE_PAGE: <SVG.ProfileUser height="20px" />,
  SETTINGS_DEVELOPER: <SVG.Tool height="20px" />,
  SETTINGS: <SVG.Settings height="20px" />,
  DIRECTORY: <SVG.Directory height="20px" />,
  FILECOIN: <SVG.Wallet height="20px" />,
  MINERS: <SVG.Miners height="20px" />,
};

const STYLES_NAVIGATION = css`
  margin-top: ${Constants.sizes.topOffset}px;
  width: 100%;
  display: block;
  padding: 24px 0 0 0;
`;

const STYLES_NAVIGATION_ITEM = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  color: ${Constants.system.black};
  user-select: none;
  padding-right: 24px;
  font-family: ${Constants.font.medium};

  :hover {
    padding-right: 0px;
    color: ${Constants.system.brand};
  }
`;

const STYLES_EXPANDER = css`
  flex-shrink: 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_ICON = css`
  flex-shrink: 0;
  position: relative;
`;

// NOTE(jim): Adjusts on mobile.
const STYLES_CHILDREN = css`
  min-width: 10%;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
  padding: 11px 0px 14px 8px;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  svg {
    transform: rotate(0deg);
    transition: 200ms ease transform;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 8px 0 12px;
  }
`;

const Item = (props) => {
  return (
    <span
      css={STYLES_NAVIGATION_ITEM}
      style={{ padding: `0 0 0 ${props.level * 16}px` }}
    >
      <span
        css={STYLES_EXPANDER}
        onMouseUp={props.onToggleShow ? props.onToggleShow : null}
        onTouchEnd={props.onToggleShow ? props.onToggleShow : null}
      >
        <span
          css={STYLES_ICON_ELEMENT}
          style={{
            color: props.activeIds[props.id] ? Constants.system.brand : null,
          }}
        >
          {props.treeChildren && props.treeChildren.length ? (
            <SVG.ExpandArrow
              height="8px"
              style={props.expanded ? { transform: `rotate(90deg)` } : null}
            />
          ) : null}
        </span>
      </span>
      <span
        css={STYLES_ICON}
        onMouseUp={() => props.onNavigateTo({ id: props.id }, props.data)}
        onTouchEnd={() => props.onNavigateTo({ id: props.id }, props.data)}
      >
        <span
          css={STYLES_ICON_ELEMENT}
          children={IconMap[props.decorator]}
          style={{
            color: props.activeIds[props.id] ? Constants.system.brand : null,
          }}
        />
      </span>
      <span
        css={STYLES_CHILDREN}
        children={props.children}
        onMouseUp={() => props.onNavigateTo({ id: props.id }, props.data)}
        onTouchEnd={() => props.onNavigateTo({ id: props.id }, props.data)}
        style={{
          color: props.activeIds[props.id] ? Constants.system.brand : null,
        }}
      />
    </span>
  );
};

class NodeReference extends React.Component {
  static defaultProps = {
    treeChildren: [],
  };

  state = {
    showTreeChildren: false,
  };

  _handleToggleShow = () => {
    this.setState({ showTreeChildren: !this.state.showTreeChildren });
  };

  render() {
    return (
      <React.Fragment>
        <Item
          id={this.props.id}
          data={this.props.data}
          activeId={this.props.activeId}
          activeIds={this.props.activeIds}
          level={this.props.level}
          treeChildren={this.props.treeChildren}
          onNavigateTo={this.props.onNavigateTo}
          decorator={this.props.decorator}
          onToggleShow={this._handleToggleShow}
          expanded={this.state.showTreeChildren}
          children={this.props.children}
        />

        {this.state.showTreeChildren && this.props.treeChildren
          ? this.props.treeChildren.map((child) => {
              if (!child || child.ignore) {
                return null;
              }

              return (
                <NodeReference
                  key={child.id}
                  data={child}
                  id={child.id}
                  activeId={this.props.activeId}
                  activeIds={this.props.activeIds}
                  onNavigateTo={this.props.onNavigateTo}
                  level={this.props.level + 1}
                  treeChildren={child.children}
                  decorator={child.decorator}
                  children={child.name}
                />
              );
            })
          : null}
      </React.Fragment>
    );
  }
}

export default class ApplicationNavigation extends React.Component {
  render() {
    return (
      <nav css={STYLES_NAVIGATION}>
        <ApplicationUserControls
          viewer={this.props.viewer}
          onNavigateTo={this.props.onNavigateTo}
          onAction={this.props.onAction}
          onSignOut={this.props.onSignOut}
        />

        {this.props.navigation.map((each) => {
          if (!each || each.ignore) {
            return null;
          }

          return (
            <NodeReference
              data={each}
              id={each.id}
              acitveId={this.props.activeId}
              activeIds={this.props.activeIds}
              key={each.id}
              level={0}
              treeChildren={each.children}
              decorator={each.decorator}
              children={each.name}
              onNavigateTo={this.props.onNavigateTo}
            />
          );
        })}
      </nav>
    );
  }
}
