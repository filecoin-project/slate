import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const STYLES_USER_ENTRY = css`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
`;

const STYLES_USER = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

const STYLES_ACTION_BUTTON = css`
  padding: 8px;
  cursor: pointer;
  justify-self: end;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_PROFILE_IMAGE = css`
  background-size: cover;
  background-position: 50% 50%;
  height: 24px;
  width: 24px;
  margin: 8px 24px 8px 8px;
  border-radius: 50%;
`;

function UserEntry({ user, button, onClick }) {
  return (
    <div key={user.username} css={STYLES_USER_ENTRY}>
      <div css={STYLES_USER} onClick={onClick}>
        <div
          css={STYLES_PROFILE_IMAGE}
          style={{ backgroundImage: `url(${user.data.photo})` }}
        />
        <div>@{user.username}</div>
      </div>
      {button}
    </div>
  );
}

export default class SceneDirectory extends React.Component {
  state = {
    loading: false,
    tab: 0,
    viewer: this.props.viewer,
  };

  _handleUpdate = async (e) => {
    let response = await this.props.onRehydrate();
    // const response = await Actions.hydrateAuthenticatedUser();

    if (!response || response.error) {
      alert("TODO: error fetching authenticated viewer");
      return null;
    }

    let viewer = response.data;

    this.setState({ viewer });
  };

  _handleDelete = async (id) => {
    const response = await Actions.deleteTrustRelationship({
      id: id,
    });
    await this._handleUpdate();
  };

  _handleAccept = async (id) => {
    const response = await Actions.updateTrustRelationship({
      userId: id,
    });
    await this._handleUpdate();
  };

  _handleFollow = async (id) => {
    const response = await Actions.createSubscription({
      userId: id,
    });
    await this._handleUpdate();
  };

  render() {
    let requests = this.state.viewer.pendingTrusted
      .filter((relation) => {
        return !relation.data.verified;
      })
      .map((relation) => {
        let button = (
          <div
            css={STYLES_ACTION_BUTTON}
            onClick={() => this._handleAccept(relation.owner.id)}
          >
            Accept
          </div>
        );
        return (
          <UserEntry
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

    let trusted = this.state.viewer.pendingTrusted
      .filter((relation) => {
        return relation.data.verified;
      })
      .map((relation) => {
        let button = (
          <div
            css={STYLES_ACTION_BUTTON}
            onClick={() => this._handleDelete(relation.id)}
          >
            Remove
          </div>
        );
        return (
          <UserEntry
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
      ...this.state.viewer.trusted
        .filter((relation) => {
          return relation.data.verified;
        })
        .map((relation) => {
          let button = (
            <div
              css={STYLES_ACTION_BUTTON}
              onClick={() => this._handleDelete(relation.id)}
            >
              Remove
            </div>
          );
          return (
            <UserEntry
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

    let following = this.state.viewer.subscriptions
      .filter((relation) => {
        return !!relation.target_user_id;
      })
      .map((relation) => {
        let button = (
          <div
            css={STYLES_ACTION_BUTTON}
            onClick={() => this._handleFollow(relation.user.id)}
          >
            Unfollow
          </div>
        );
        return (
          <UserEntry
            user={relation.user}
            button={button}
            onClick={() => {
              this.props.onAction({
                type: "NAVIGATE",
                value: this.props.sceneId,
                scene: "PROFILE",
                data: relation.user,
              });
            }}
          />
        );
      });
    return (
      <ScenePage>
        <ScenePageHeader title="Directory" />
        <TabGroup
          tabs={["Requests", "Trusted", "Following"]}
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
      </ScenePage>
    );
  }
}
