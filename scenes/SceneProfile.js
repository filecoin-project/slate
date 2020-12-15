import * as React from "react";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";

import ScenePage from "~/components/core/ScenePage";
import Profile from "~/components/core/Profile";

const STYLES_BUTTONS = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

export default class SceneProfile extends React.Component {
  state = {
    isFollowing: !!this.props.viewer.subscriptions.filter((entry) => {
      return entry.target_user_id === this.props.data.id;
    }).length,
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.data.id !== prevProps.data.id ||
      this.props.viewer.subscriptions !== prevProps.viewer.subscriptions
    ) {
      this.setState({
        isFollowing: !!this.props.viewer.subscriptions.filter((entry) => {
          return entry.target_user_id === this.props.data.id;
        }).length,
      });
    }
  };

  // _handleTrust = async (trustStatus, trustId) => {
  //   if (trustStatus === "untrusted" || trustStatus === "sent") {
  //     await Actions.createTrustRelationship({
  //       userId: this.props.data.id,
  //     });
  //   } else if (trustStatus === "received") {
  //     await Actions.updateTrustRelationship({
  //       userId: this.props.data.id,
  //     });
  //   } else {
  //     await Actions.deleteTrustRelationship({
  //       id: trustId,
  //     });
  //   }
  // };

  _handleFollow = async () => {
    this.setState({ isFollowing: !this.state.isFollowing });
    await Actions.createSubscription({
      userId: this.props.data.id,
    });
  };

  render() {
    let buttons = (
      <div css={STYLES_BUTTONS}>
        {this.state.isFollowing ? (
          <ButtonSecondary style={{ marginRight: 8 }} onClick={this._handleFollow}>
            Unfollow
          </ButtonSecondary>
        ) : (
          <ButtonPrimary style={{ marginRight: 8 }} onClick={this._handleFollow}>
            Follow
          </ButtonPrimary>
        )}
        {/* {trustStatus === "untrusted" || trustStatus === "received" ? (
          <ButtonPrimary
            style={{ marginRight: 8, minWidth: 152 }}
            onClick={() => this._handleTrust(trustStatus, trustId)}
          >
            {STATUS_BUTTON_MAP[trustStatus]}
          </ButtonPrimary>
        ) : (
          <ButtonSecondary
            style={{ marginRight: 8, minWidth: 152 }}
            onClick={() => this._handleTrust(trustStatus, trustId)}
          >
            {STATUS_BUTTON_MAP[trustStatus]}
          </ButtonSecondary>
        )} */}
      </div>
    );
    return (
      <ScenePage>
        <Profile
          {...this.props}
          onAction={this.props.onAction}
          creator={this.props.data}
          sceneId={this.props.sceneId}
          buttons={this.props.viewer.username === this.props.data.username ? null : buttons}
          isOwner={this.props.viewer.username === this.props.data.username}
        />
      </ScenePage>
    );
  }
}
