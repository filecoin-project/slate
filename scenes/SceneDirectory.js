import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const STYLES_USER_ENTRY = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
  border: 1px solid rgba(229, 229, 229, 0.75);
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
`;

const STYLES_BUTTONS = css`
  justify-self: end;
  display: flex;
  flex-direction: row;
  margin-right: 48px;
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
`;

const STYLES_ACTION_BUTTON = css`
  cursor: pointer;
  padding: 8px;
  color: ${Constants.system.brand};
  font-family: ${Constants.font.medium};
`;

const STYLES_PROFILE_IMAGE = css`
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
        <div
          css={STYLES_PROFILE_IMAGE}
          style={{ backgroundImage: `url(${user.data.photo})` }}
        />
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
  tabindex: -1;
  opacity: 0;
`;

export default class SceneDirectory extends React.Component {
  _ref;

  state = {
    copyValue: "",
    loading: false,
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
    const response = await Actions.deleteTrustRelationship({
      id: id,
    });
    await this.props.onRehydrate();
  };

  _handleAccept = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    const response = await Actions.updateTrustRelationship({
      userId: id,
    });
    await this.props.onRehydrate();
  };

  _handleFollow = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    const response = await Actions.createSubscription({
      userId: id,
    });
    await this.props.onRehydrate();
  };

  render() {
    let requests = this.props.viewer.pendingTrusted
      .filter((relation) => {
        return !relation.data.verified;
      })
      .map((relation) => {
        let button = (
          <div css={STYLES_BUTTONS}>
            <div
              css={STYLES_ACTION_BUTTON}
              onClick={(e) => this._handleAccept(e, relation.owner.id)}
            >
              Accept
            </div>
            <div
              css={STYLES_ACTION_BUTTON}
              style={{ color: Constants.system.darkGray, marginLeft: "16px" }}
              onClick={(e) => {
                this._handleDelete(e, relation.id);
              }}
            >
              Decline
            </div>
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
          <div
            css={STYLES_ITEM_BOX}
            onClick={(e) => this._handleClick(e, relation.id)}
          >
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
                      text: "Copy Profile URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          `https://slate.host/${relation.owner.username}`
                        ),
                    },
                    {
                      text: "Remove Peer",
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
            <div
              css={STYLES_ITEM_BOX}
              onClick={(e) => this._handleClick(e, relation.id)}
            >
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
                        text: "Copy Profile URL",
                        onClick: (e) =>
                          this._handleCopy(
                            e,
                            `https://slate.host/${relation.user.username}`
                          ),
                      },
                      {
                        text: "Remove Peer",
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
          <div
            css={STYLES_ITEM_BOX}
            onClick={(e) => this._handleClick(e, relation.id)}
          >
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
                      text: "Copy Profile URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          `https://slate.host/${relation.user.username}`
                        ),
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
        <div
          css={STYLES_ITEM_BOX}
          onClick={(e) => this._handleClick(e, relation.id)}
        >
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
                    text: "Copy Profile URL",
                    onClick: (e) =>
                      this._handleCopy(
                        e,
                        `https://slate.host/${relation.owner.username}`
                      ),
                  },
                  {
                    text: this.props.viewer.subscriptions.filter(
                      (subscription) => {
                        return (
                          subscription.target_user_id === relation.owner.id
                        );
                      }
                    ).length
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
          requests.length ? (
            requests
          ) : (
            <EmptyState style={{ marginTop: 88 }}>
              No requests at the moment! Once someone sends you a trust request
              it will appear here.
            </EmptyState>
          )
        ) : null}
        {this.state.tab === 1 ? (
          trusted.length ? (
            trusted
          ) : (
            <EmptyState style={{ marginTop: 88 }}>
              You have no peers yet. Get started by searching for your friends
              and sending them a peer request!
            </EmptyState>
          )
        ) : null}
        {this.state.tab === 2 ? (
          following.length ? (
            following
          ) : (
            <EmptyState style={{ marginTop: 88 }}>
              You are not following anybody. Get started by searching for your
              friends and clicking follow!
            </EmptyState>
          )
        ) : null}
        {this.state.tab === 3 ? (
          followers.length ? (
            followers
          ) : (
            <EmptyState style={{ marginTop: 88 }}>
              You don't have any followers yet
            </EmptyState>
          )
        ) : null}
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </ScenePage>
    );
  }
}
