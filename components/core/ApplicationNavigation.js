import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

import Pill from "~/components/core/Pill";

const IconMap = {
  HOME: <SVG.Home height="20px" />,
  FILE: <SVG.Image height="20px" />,
  FOLDER: <SVG.Folder height="20px" />,
  WALLET: <SVG.Wallet height="20px" />,
  CHANNELS: <SVG.Channels height="20px" />,
  DEALS: <SVG.Deals height="20px" />,
  PEERS: <SVG.Peers height="20px" />,
  DEALS: <SVG.Deals height="20px" />,
  STATUS: <SVG.Status height="20px" />,
  STATS: <SVG.Stats height="20px" />,
  DATA_TRANSFER: <SVG.DataTransfer height="20px" />,
  LOGS: <SVG.Logs height="20px" />,
  MINERS: <SVG.Miners height="20px" />,
  STORAGE_MARKET: <SVG.StorageMarket height="20px" />,
  SLATES: <SVG.Slates height="20px" />,
  SLATE: <SVG.Slates height="20px" />,
  LOCAL_DATA: <SVG.HardDrive height="20px" />,
  PROFILE_PAGE: <SVG.ProfileUser height="20px" />,
};

const STYLES_NAVIGATION = css`
  width: 100%;
  display; block;
  padding: 24px 0 0 0;
  font-size: 18px;
`;

const STYLES_NAVIGATION_ITEM = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  color: ${Constants.system.black};

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_EXPANDER = css`
  flex-shrink: 0;
`;

const STYLES_ICON = css`
  flex-shrink: 0;
  position: relative;
`;

const STYLES_CHILDREN = css`
  min-width: 10%;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
  padding: 11px 0px 14px 8px;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: 14px;
  line-height: 1.225;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
`;

const Item = ({
  data,
  id,
  activeId,
  activeIds,
  level,
  children,
  showActive,
  treeChildren,
  decorator,
  onToggleShow,
  onNavigateTo,
}) => {
  return (
    <span
      css={STYLES_NAVIGATION_ITEM}
      style={{ padding: `0 0 0 ${level * 16}px` }}
    >
      <span css={STYLES_EXPANDER} onClick={onToggleShow ? onToggleShow : null}>
        <span
          css={STYLES_ICON_ELEMENT}
          style={{
            color: activeIds[id] ? Constants.system.brand : null,
          }}
        >
          {onToggleShow ? (
            <SVG.ExpandArrow
              height="8px"
              style={showActive ? { transform: `rotate(90deg)` } : null}
            />
          ) : null}
        </span>
      </span>
      <span css={STYLES_ICON} onClick={() => onNavigateTo({ id }, data)}>
        <span
          css={STYLES_ICON_ELEMENT}
          style={{
            color: activeIds[id] ? Constants.system.brand : null,
          }}
        >
          {IconMap[decorator]}
          {decorator === "LOGS" ? (
            <Pill
              style={{
                left: 18,
                top: `2px`,
                background: Constants.system.black,
              }}
            >
              56
            </Pill>
          ) : null}
        </span>
      </span>
      <span
        css={STYLES_CHILDREN}
        onClick={() => onNavigateTo({ id }, data)}
        style={{
          fontFamily: decorator === "FILE" ? Constants.font.text : null,
          color: activeIds[id] ? Constants.system.brand : null,
        }}
      >
        {children}
      </span>
    </span>
  );
};

class NodeReference extends React.Component {
  state = {
    showTreeChildren: false,
  };

  _handleToggleShow = () => {
    this.setState({ showTreeChildren: !this.state.showTreeChildren });
  };

  render() {
    const {
      id,
      activeId,
      activeIds,
      level,
      children,
      treeChildren,
      activePage,
      decorator,
      onNavigateTo,
      data,
    } = this.props;
    const { showTreeChildren } = this.state;

    let showActive = showTreeChildren || activeIds[id];
    let showChildren = showActive && treeChildren && treeChildren.length;

    return (
      <React.Fragment>
        <Item
          id={id}
          data={data}
          activeId={activeId}
          activeIds={activeIds}
          level={level}
          showActive={showActive}
          treeChildren={treeChildren}
          onNavigateTo={onNavigateTo}
          decorator={decorator}
          onToggleShow={
            treeChildren && treeChildren.length ? this._handleToggleShow : null
          }
        >
          {children}
        </Item>

        {showChildren
          ? treeChildren.map((child) => {
              if (!child) {
                return null;
              }

              if (child.ignore) {
                return null;
              }

              return (
                <NodeReference
                  data={child}
                  id={child.id}
                  activeId={activeId}
                  activeIds={activeIds}
                  key={child.id}
                  onNavigateTo={onNavigateTo}
                  level={level + 1}
                  treeChildren={child.children}
                  decorator={child.decorator}
                >
                  {child.name}
                </NodeReference>
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
        {this.props.navigation.map((each) => {
          if (!each) {
            return null;
          }

          if (each.ignore) {
            return null;
          }

          return (
            <NodeReference
              data={each}
              id={each.id}
              acitveId={this.props.activeId}
              activeIds={this.props.activeIds}
              key={each.id}
              onNavigateTo={this.props.onNavigateTo}
              level={0}
              treeChildren={each.children}
              decorator={each.decorator}
            >
              {each.name}
            </NodeReference>
          );
        })}
      </nav>
    );
  }
}
