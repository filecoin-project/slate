import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "~/components/system/components/Buttons";

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
    if (prevProps.data.username !== this.props.data.username) {
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
    console.log(this.props.data);
    let buttons = (
      <div>
        {this.state.followStatus ? (
          <ButtonSecondary
            style={{ margin: "0px 8px" }}
            onClick={this._handleFollow}
          >
            Unfollow
          </ButtonSecondary>
        ) : (
          <ButtonPrimary
            style={{ margin: "0px 8px" }}
            onClick={this._handleFollow}
          >
            Follow
          </ButtonPrimary>
        )}
        {this.state.trustStatus === "untrusted" ||
        this.state.trustStatus === "received" ? (
          <ButtonPrimary
            style={{ margin: "0px 8px" }}
            onClick={this._handleTrust}
          >
            {STATUS_BUTTON_MAP[this.state.trustStatus]}
          </ButtonPrimary>
        ) : (
          <ButtonSecondary
            style={{ margin: "0px 8px" }}
            onClick={this._handleTrust}
          >
            {STATUS_BUTTON_MAP[this.state.trustStatus]}
          </ButtonSecondary>
        )}
      </div>
    );
    return (
      <ScenePage>
        <Profile
          {...this.props}
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
