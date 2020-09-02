import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

import ScenePage from "~/components/core/ScenePage";
import Profile from "~/components/core/Profile";

const BUTTON_STYLES = {
  border: `1px solid ${Constants.system.border}`,
  boxShadow: "none",
  fontFamily: Constants.font.text,
  margin: "8px",
  padding: "8px 16px",
  minHeight: "30px",
};

const BUTTON_SECONDARY_STYLE = {
  ...BUTTON_STYLES,
  backgroundColor: Constants.system.white,
  color: Constants.system.brand,
};

const BUTTON_PRIMARY_STYLE = {
  ...BUTTON_STYLES,
  backgroundColor: Constants.system.brand,
  color: Constants.system.white,
};

const STATUS_BUTTON_MAP = {
  trusted: "Remove peer",
  untrusted: "Add peer",
  sent: "Cancel request",
  received: "Accept request",
};

export default class SceneProfile extends React.Component {
  state = {
    loading: false,
    trustStatus: "untrusted",
    followStatus: false,
  };

  componentDidMount = () => {
    this.setStatus(this.props.viewer);
  };

  componentDidUpdate(prevProps) {
    const isNewScene = prevProps.data.username !== this.props.data.username;

    let isUpdated = false;
    // if (
    //   this.props.data.data.objects.length !== prevProps.data.data.objects.length
    // ) {
    //   isUpdated = true;
    // }

    // if (this.props.data.data.body !== prevProps.data.data.body) {
    //   isUpdated = true;
    // }

    if (isNewScene || isUpdated) {
      this.setStatus(this.props.viewer);
    }
  }

  setStatus = (viewer) => {
    let newState = { trustStatus: "untrusted", followStatus: false };
    let trust = viewer.trusted.filter((entry) => {
      return entry.target_user_id === this.props.data.id;
    });
    if (trust.length) {
      let relation = trust[0];
      newState.trustId = relation.id;
      if (relation.data.verified) {
        newState.trustStatus = "trusted";
      } else {
        newState.trustStatus = "sent";
      }
    }
    let pendingTrust = viewer.pendingTrusted.filter((entry) => {
      return entry.owner_user_id === this.props.data.id;
    });
    if (pendingTrust.length) {
      let relation = pendingTrust[0];
      newState.trustId = relation.id;
      if (pendingTrust[0].data.verified) {
        newState.trustStatus = "trusted";
      } else {
        newState.trustStatus = "received";
      }
    }
    if (
      viewer.subscriptions.filter((entry) => {
        return entry.target_user_id === this.props.data.id;
      }).length
    ) {
      newState.followStatus = true;
    }
    this.setState(newState);
  };

  _handleUpdate = async (e) => {
    let response = await this.props.onRehydrate();
    if (!response || response.error) {
      alert("TODO: error fetching authenticated viewer");
      return null;
    }

    let viewer = response.data;

    this.setStatus(viewer);
  };

  _handleTrust = async () => {
    let response;
    if (
      this.state.trustStatus === "untrusted" ||
      this.state.trustStatus === "sent"
    ) {
      response = await Actions.createTrustRelationship({
        userId: this.props.data.id,
      });
      console.log(response);
    } else if (this.state.trustStatus === "received") {
      response = await Actions.updateTrustRelationship({
        userId: this.props.data.id,
      });
      console.log(response);
    } else {
      response = await Actions.deleteTrustRelationship({
        id: this.state.trustId,
      });
      console.log(response);
    }
    await this._handleUpdate();
  };

  _handleFollow = async () => {
    let response = await Actions.createSubscription({
      userId: this.props.data.id,
    });
    console.log(response);
    await this._handleUpdate();
  };

  render() {
    let buttons = (
      <div>
        <ButtonPrimary
          style={
            this.state.followStatus
              ? BUTTON_SECONDARY_STYLE
              : BUTTON_PRIMARY_STYLE
          }
          onClick={this._handleFollow}
        >
          {this.state.followStatus ? "Unfollow" : "Follow"}
        </ButtonPrimary>
        <ButtonPrimary
          style={
            this.state.trustStatus === "untrusted" ||
            this.state.trustStatus === "received"
              ? BUTTON_PRIMARY_STYLE
              : BUTTON_SECONDARY_STYLE
          }
          onClick={this._handleTrust}
        >
          {STATUS_BUTTON_MAP[this.state.trustStatus]}
        </ButtonPrimary>
        {this.state.isTrusted ? (
          <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleSendMoney}>
            Send Money
          </ButtonPrimary>
        ) : null}
      </div>
    );
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
          editing={this.props.viewer.username === this.props.data.username}
        />
      </ScenePage>
    );
  }
}
