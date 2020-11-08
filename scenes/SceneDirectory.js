import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/core";
import { TabGroup } from "~/components/core/TabGroup";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const STYLES_USER_ENTRY = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
  border: 1px solid ${Constants.system.lightBorder};
  border-radius: 4px;
  margin-bottom: 8px;
`;

const STYLES_USER = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: 24px;
  color: ${Constants.system.brand};
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 12px 16px;
  }
`;

const STYLES_BUTTONS = css`
  justify-self: end;
  display: flex;
  flex-direction: row;
  margin-right: 48px;
  justify-content: flex-end;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 8px;
  }
`;

const STYLES_ITEM_BOX = css`
  position: relative;
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 48px;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 8px;
  }
`;

const STYLES_ACTION_BUTTON = css`
  cursor: pointer;
  padding: 8px;
  color: ${Constants.system.brand};
  font-family: ${Constants.font.medium};
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  height: 24px;
  width: 24px;
  margin-right: 16px;
  border-radius: 4px;
`;

const STYLES_MESSAGE = css`
  color: ${Constants.system.black};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const STYLES_NAME = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function UserEntry({ user, button, onClick, message }) {
  return (
    <div key={user.username} css={STYLES_USER_ENTRY}>
      <div css={STYLES_USER} onClick={onClick}>
        <div css={STYLES_PROFILE_IMAGE} style={{ backgroundImage: `url(${user.data.photo})` }} />
        <span css={STYLES_NAME}>
          {user.data.name || `@${user.username}`}
          {message ? <span css={STYLES_MESSAGE}>{message}</span> : null}
        </span>
      </div>
      {button}
    </div>
  );
}

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
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

export default class SceneDirectory extends React.Component {
  _ref;

  state = {
    copyValue: "",
    tab: 0,
    contextMenu: null,
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
      this._handleHide();
    });
  };

  _handleHide = (e) => {
    this.setState({ contextMenu: null });
  };

  _handleClick = (e, value) => {
    e.stopPropagation();
    if (this.state.contextMenu === value) {
      this._handleHide();
    } else {
      this.setState({ contextMenu: value });
    }
  };

  _handleDelete = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    await Actions.deleteTrustRelationship({
      id: id,
    });
  };

  _handleAccept = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    await Actions.updateTrustRelationship({
      userId: id,
    });
  };

  _handleFollow = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    await Actions.createSubscription({
      userId: id,
    });
  };

  render() {
    let requests = this.props.viewer.pendingTrusted
      .filter((relation) => {
        return !relation.data.verified;
      })
      .map((relation) => {
        let button = (
          <React.Fragment>
            <span css={STYLES_MOBILE_ONLY}>
              <div css={STYLES_BUTTONS}>
                <div
                  css={STYLES_ITEM_BOX}
                  onClick={(e) => this._handleAccept(e, relation.owner.id)}
                >
                  <SVG.CheckBox height="24px" style={{ color: Constants.system.brand }} />
                </div>
                <div
                  css={STYLES_ITEM_BOX}
                  style={{ marginRight: 0 }}
                  onClick={(e) => {
                    this._handleDelete(e, relation.id);
                  }}
                >
                  <SVG.Dismiss height="24px" style={{ color: Constants.system.gray }} />
                </div>
              </div>
            </span>
            <span css={STYLES_MOBILE_HIDDEN}>
              <div css={STYLES_BUTTONS}>
                <ButtonPrimary
                  transparent
                  style={{ fontSize: 16 }}
                  onClick={(e) => this._handleAccept(e, relation.owner.id)}
                >
                  Accept
                </ButtonPrimary>
                <ButtonSecondary
                  transparent
                  style={{ fontSize: 16 }}
                  onClick={(e) => {
                    this._handleDelete(e, relation.id);
                  }}
                >
                  Decline
                </ButtonSecondary>
              </div>
            </span>
          </React.Fragment>
        );
        return (
          <UserEntry
            key={relation.id}
            user={relation.owner}
            button={button}
            onClick={() => {
              this.props.onAction({
                type: "NAVIGATE",
                value: this.props.sceneId,
                scene: "PUBLIC_PROFILE",
                data: relation.owner,
              });
            }}
            message=" requested to trust you"
          />
        );
      });

    let trusted = this.props.viewer.pendingTrusted
      .filter((relation) => {
        return relation.data.verified;
      })
      .map((relation) => {
        let button = (
          <div css={STYLES_ITEM_BOX} onClick={(e) => this._handleClick(e, relation.id)}>
            <SVG.MoreHorizontal height="24px" />
            {this.state.contextMenu === relation.id ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={(e) => this._handleClick(e, relation.id)}
              >
                <PopoverNavigation
                  style={{
                    top: "40px",
                    right: "0px",
                  }}
                  navigation={[
                    {
                      text: "Copy profile URL",
                      onClick: (e) =>
                        this._handleCopy(e, `https://slate.host/${relation.owner.username}`),
                    },
                    {
                      text: "Remove peer",
                      onClick: (e) => this._handleDelete(e, relation.id),
                    },
                  ]}
                />
              </Boundary>
            ) : null}
          </div>
        );
        return (
          <UserEntry
            key={relation.id}
            user={relation.owner}
            button={button}
            onClick={() => {
              this.props.onAction({
                type: "NAVIGATE",
                value: this.props.sceneId,
                scene: "PUBLIC_PROFILE",
                data: relation.owner,
              });
            }}
          />
        );
      });
    if (!trusted) {
      trusted = [];
    }
    trusted.push(
      ...this.props.viewer.trusted
        .filter((relation) => {
          return relation.data.verified;
        })
        .map((relation) => {
          let button = (
            <div css={STYLES_ITEM_BOX} onClick={(e) => this._handleClick(e, relation.id)}>
              <SVG.MoreHorizontal height="24px" />
              {this.state.contextMenu === relation.id ? (
                <Boundary
                  captureResize={true}
                  captureScroll={false}
                  enabled
                  onOutsideRectEvent={(e) => this._handleClick(e, relation.id)}
                >
                  <PopoverNavigation
                    style={{
                      top: "40px",
                      right: "0px",
                    }}
                    navigation={[
                      {
                        text: "Copy profile URL",
                        onClick: (e) =>
                          this._handleCopy(e, `https://slate.host/${relation.user.username}`),
                      },
                      {
                        text: "Remove peer",
                        onClick: (e) => this._handleDelete(e, relation.id),
                      },
                    ]}
                  />
                </Boundary>
              ) : null}
            </div>
          );
          return (
            <UserEntry
              key={relation.id}
              user={relation.user}
              button={button}
              onClick={() => {
                this.props.onAction({
                  type: "NAVIGATE",
                  value: this.props.sceneId,
                  scene: "PUBLIC_PROFILE",
                  data: relation.user,
                });
              }}
            />
          );
        })
    );

    let following = this.props.viewer.subscriptions
      .filter((relation) => {
        return !!relation.target_user_id;
      })
      .map((relation) => {
        let button = (
          <div css={STYLES_ITEM_BOX} onClick={(e) => this._handleClick(e, relation.id)}>
            <SVG.MoreHorizontal height="24px" />
            {this.state.contextMenu === relation.id ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={(e) => this._handleClick(e, relation.id)}
              >
                <PopoverNavigation
                  style={{
                    top: "40px",
                    right: "0px",
                  }}
                  navigation={[
                    {
                      text: "Copy profile URL",
                      onClick: (e) =>
                        this._handleCopy(e, `https://slate.host/${relation.user.username}`),
                    },
                    {
                      text: "Unfollow",
                      onClick: (e) => this._handleFollow(e, relation.user.id),
                    },
                  ]}
                />
              </Boundary>
            ) : null}
          </div>
        );
        return (
          <UserEntry
            key={relation.id}
            user={relation.user}
            button={button}
            onClick={() => {
              this.props.onAction({
                type: "NAVIGATE",
                value: this.props.sceneId,
                scene: "PUBLIC_PROFILE",
                data: relation.user,
              });
            }}
          />
        );
      });

    let followers = this.props.viewer.subscribers.map((relation) => {
      let button = (
        <div css={STYLES_ITEM_BOX} onClick={(e) => this._handleClick(e, relation.id)}>
          <SVG.MoreHorizontal height="24px" />
          {this.state.contextMenu === relation.id ? (
            <Boundary
              captureResize={true}
              captureScroll={false}
              enabled
              onOutsideRectEvent={(e) => this._handleClick(e, relation.id)}
            >
              <PopoverNavigation
                style={{
                  top: "40px",
                  right: "0px",
                }}
                navigation={[
                  {
                    text: "Copy profile URL",
                    onClick: (e) =>
                      this._handleCopy(e, `https://slate.host/${relation.owner.username}`),
                  },
                  {
                    text: this.props.viewer.subscriptions.filter((subscription) => {
                      return subscription.target_user_id === relation.owner.id;
                    }).length
                      ? "Unfollow"
                      : "Follow",
                    onClick: (e) => this._handleFollow(e, relation.owner.id),
                  },
                ]}
              />
            </Boundary>
          ) : null}
        </div>
      );
      return (
        <UserEntry
          key={relation.id}
          user={relation.owner}
          button={button}
          onClick={() => {
            this.props.onAction({
              type: "NAVIGATE",
              value: this.props.sceneId,
              scene: "PUBLIC_PROFILE",
              data: relation.owner,
            });
          }}
        />
      );
    });

    return (
      <ScenePage>
        <ScenePageHeader title="Directory" />
        <TabGroup
          tabs={["Requests", "Trusted", "Following", "Followers"]}
          value={this.state.tab}
          onChange={(value) => this.setState({ tab: value })}
        />
        {this.state.tab === 0 ? (
          requests && requests.length ? (
            requests
          ) : (
            <EmptyState>
              <SVG.Users height="24px" style={{ marginBottom: 24 }} />
              Trust requests that you receive will appear here.
            </EmptyState>
          )
        ) : null}
        {this.state.tab === 1 ? (
          trusted && trusted.length ? (
            trusted
          ) : (
            <EmptyState>
              <SVG.Users height="24px" style={{ marginBottom: 24 }} />
              Trusted is for your close friends.
            </EmptyState>
          )
        ) : null}
        {this.state.tab === 2 ? (
          following && following.length ? (
            following
          ) : (
            <EmptyState>
              <SVG.Users height="24px" style={{ marginBottom: 24 }} />
              You can follow any user on the network to be updated on their new uploads and slates.
            </EmptyState>
          )
        ) : null}
        {this.state.tab === 3 ? (
          followers && followers.length ? (
            followers
          ) : (
            <EmptyState>
              <SVG.Users height="24px" style={{ marginBottom: 24 }} />
              You don't have any followers yet.
            </EmptyState>
          )
        ) : null}
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          tabIndex="-1"
          css={STYLES_COPY_INPUT}
        />
      </ScenePage>
    );
  }
}
