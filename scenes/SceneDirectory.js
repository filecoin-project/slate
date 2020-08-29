import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_TAB = css`
  padding: 8px 8px 8px 0px;
  margin-right: 24px;
  cursor: pointer;
  display: inline-block;
  font-size: ${Constants.typescale.lvl2};

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
    margin-right: 12px;
  }
`;

const STYLES_TAB_GROUP = css`
  border-bottom: 1px solid ${Constants.system.gray};
  margin: 24px 0px 24px 0px;
`;

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
    tab: "requests",
    viewer: this.props.viewer,
  };

  _handleUpdate = async (e) => {
    const response = await Actions.hydrateAuthenticatedUser();

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
    return (
      <ScenePage>
        <ScenePageHeader title="Directory" />
        <div css={STYLES_TAB_GROUP}>
          <div
            css={STYLES_TAB}
            style={{
              color:
                this.state.tab === "requests"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "requests" })}
          >
            Requests
          </div>
          <div
            css={STYLES_TAB}
            style={{
              color:
                this.state.tab === "peers"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "peers" })}
          >
            Trusted
          </div>
          <div
            css={STYLES_TAB}
            style={{
              marginRight: "0px",
              color:
                this.state.tab === "following"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "following" })}
          >
            Following
          </div>
        </div>
        {this.state.tab === "requests"
          ? this.state.viewer.pendingTrusted
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
                        scene: "PROFILE",
                        data: relation.owner,
                      });
                    }}
                  />
                );
              })
          : null}
        {this.state.tab === "peers" ? (
          <div>
            {this.state.viewer.pendingTrusted
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
                        scene: "PROFILE",
                        data: relation.owner,
                      });
                    }}
                  />
                );
              })}
            {this.state.viewer.trusted
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
                        scene: "PROFILE",
                        data: relation.user,
                      });
                    }}
                  />
                );
              })}
          </div>
        ) : null}
        {this.state.tab === "following"
          ? this.state.viewer.subscriptions
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
              })
          : null}
      </ScenePage>
    );
  }
}
