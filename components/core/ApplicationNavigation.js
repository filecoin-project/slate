import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

import ApplicationControlMenu from "~/components/core/ApplicationControlMenu";

const IconMap = {
  HOME: <SVG.Home height="20px" />,
  NETWORK: <SVG.Activity height="20px" />,
  DIRECTORY: <SVG.Directory height="20px" />,
  FOLDER: <SVG.Folder height="20px" />,
  WALLET: <SVG.Wallet height="20px" />,
  DEALS: <SVG.Deals height="20px" />,
  SLATES: <SVG.Layers height="20px" />,
  SLATE: <SVG.Slates height="20px" />,
  LOCAL_DATA: <SVG.HardDrive height="20px" />,
  PROFILE_PAGE: <SVG.ProfileUser height="20px" />,
  SETTINGS_DEVELOPER: <SVG.SettingsDeveloper height="20px" />,
};

const STYLES_NAVIGATION = css`
  width: 100%;
  display: block;
  padding: 24px 0 0 0;
  font-size: 18px;
`;

const STYLES_NAVIGATION_HEADER = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 64px 24px 48px 48px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 64px 0 48px 16px;
  }
`;

const STYLES_NAVIGATION_ITEM = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  color: ${Constants.system.black};
  user-select: none;
  padding-right: 24px;

  :hover {
    padding-right: 0px;
    color: ${Constants.system.brand};
  }
`;

const STYLES_PROFILE = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.pitchBlack};
  background-color: ${Constants.system.gray};
  font-size: 12px;
  line-height: 12px;
  text-decoration: none;
  flex-shrink: 0;
  padding-right: 24px;
  height: 36px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.white};
    background-color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_PROFILE_IMAGE = css`
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  margin-right: 16px;
  margin-left: 2px;
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
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: 14px;
  line-height: 1.225;
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
    margin: 0 8px 0 16px;
  }
`;

const Item = ({
  data,
  id,
  activeIds,
  level,
  children,
  showActive,
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
        </span>
      </span>
      <span
        css={STYLES_CHILDREN}
        onClick={() => onNavigateTo({ id }, data)}
        style={{
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
        <div css={STYLES_NAVIGATION_HEADER}>
          <ApplicationControlMenu
            onNavigateTo={this.props.onNavigateTo}
            onAction={this.props.onAction}
            onSignOut={this.props.onSignOut}
          />

          <a
            css={STYLES_PROFILE}
            style={{ marginLeft: 16 }}
            href={`/${this.props.viewer.username}`}
            target="_blank"
          >
            <span
              css={STYLES_PROFILE_IMAGE}
              style={{
                backgroundImage: `url('${this.props.viewer.data.photo}')`,
              }}
            />
            {this.props.viewer.username}
          </a>
        </div>
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
