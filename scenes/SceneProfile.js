import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

import ScenePage from "~/components/core/ScenePage";
import Profile from "~/components/core/Profile";
import CircleButtonLight from "~/components/core/CircleButtonLight";

const BUTTON_STYLE = {
  backgroundColor: "transparent",
  color: Constants.system.brand,
  border: `1px solid ${Constants.system.border}`,
  boxShadow: "none",
  fontFamily: Constants.font.text,
  margin: "8px",
  padding: "8px 16px",
  minHeight: "30px",
};

export default class SceneProfile extends React.Component {
  state = {
    loading: false,
    isTrusted: this.props.viewer.trusted
      .map((trusted) => trusted.target_user_id)
      .includes(this.props.data.data.ownerId),
    isFollowing: this.props.viewer.subscriptions
      .map((subscription) => subscription.target_user_id)
      .includes(this.props.data.data.ownerId),
  };

  _handleUpdate = async (e) => {
    const response = await Actions.hydrateAuthenticatedUser();

    if (!response || response.error) {
      alert("TODO: error fetching authenticated viewer");
      return null;
    }

    let viewer = response.data;

    this.setState({
      isTrusted: viewer.trusted
        .map((trusted) => trusted.target_user_id)
        .includes(this.props.data.data.ownerId),
      isFollowing: viewer.subscriptions
        .map((subscription) => subscription.target_user_id)
        .includes(this.props.data.data.ownerId),
    });
  };

  _handleTrust = async () => {
    console.log(this.props.data.id);
    let response;
    if (this.state.isTrusted) {
      response = await Actions.deleteTrustRelationship({
        id: this.props.data.id,
      });
    } else {
      response = await Actions.createTrustRelationship({
        userId: this.props.data.id, //check if it's this.props.data.id or what
      });
    }
    await this._handleUpdate();
  };

  _handleFollow = async () => {
    console.log(this.props.data.id);
    let response = await Actions.createSubscription({
      userId: this.props.data.id,
    });
    await this._handleUpdate();
  };

  render() {
    let buttons = (
      <div>
        <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleFollow}>
          {this.state.isFollowing ? "Unfollow" : "Follow"}
        </ButtonPrimary>
        <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleTrust}>
          {this.state.isTrusted ? "Remove Peer" : "Add Peer"}
        </ButtonPrimary>
        {this.state.isTrusted ? (
          <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleSendMoney}>
            Send Money
          </ButtonPrimary>
        ) : null}
      </div>
    );
    //add additional state for pending request and to accept a pending request
    console.log(this.props);
    return (
      <ScenePage style={{ padding: `88px 24px 128px 24px` }}>
        <Profile
          onAction={this.props.onAction}
          creator={this.props.data}
          sceneId={this.props.sceneId}
          buttons={
            this.props.viewer.username === this.props.data.username
              ? null
              : buttons
          }
        />
      </ScenePage>
    );
  }
}
