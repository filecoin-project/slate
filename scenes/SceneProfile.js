import * as React from "react";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import ScenePage from "~/components/core/ScenePage";
import Profile from "~/components/core/Profile";
import EmptyState from "~/components/core/EmptyState";

const STYLES_BUTTONS = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;
`;

export default class SceneProfile extends React.Component {
  state = {
    profile: null,
    notFound: false,
  };

  componentDidMount = async () => {
    await this.fetchProfile();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.data !== prevProps.data) {
      await this.fetchProfile();
    }
  };

  fetchProfile = async () => {
    const { user: username } = window.history.state;
    let query;
    let targetUser;
    if (username) {
      if (username === this.props.viewer.username) {
        targetUser = this.props.viewer;
      } else {
        query = { username: username };
      }
    } else if (this.props.data && this.props.data.id) {
      if (this.props.data.id === this.props.viewer.id) {
        targetUser = this.props.viewer;
      } else {
        query = { id: this.props.data.id };
      }
    }

    if (!targetUser) {
      let response;
      if (query) {
        response = await Actions.getSerializedProfile(query);
      }

      if (!response || response.error) {
        this.setState({ notFound: true });
        return;
      }

      targetUser = response.data;
    }
    console.log(targetUser);

    window.history.replaceState(window.history.state, "A slate user", `/${targetUser.username}`);

    this.props.onUpdateData({ data: targetUser });
    this.setState({ profile: targetUser });
  };

  render() {
    if (this.state.notFound) {
      return (
        <ScenePage>
          <EmptyState>
            <SVG.Users height="24px" style={{ marginBottom: 24 }} />
            <div>We were unable to locate that user profile</div>
          </EmptyState>
        </ScenePage>
      );
    }

    if (!this.state.profile) {
      return (
        <div css={STYLES_LOADER}>
          <LoaderSpinner />
        </div>
      );
    }

    return <ProfilePage {...this.props} data={this.state.profile} />;
  }
}

class ProfilePage extends React.Component {
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
