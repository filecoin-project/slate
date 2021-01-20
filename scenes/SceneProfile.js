import * as React from "react";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import ScenePage from "~/components/core/ScenePage";
import Profile from "~/components/core/Profile";
import EmptyState from "~/components/core/EmptyState";

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
    if (this.props.data?.id && prevProps.data?.id && this.props.data.id !== prevProps.data.id) {
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

    return (
      <Profile
        {...this.props}
        creator={
          this.state.profile.id === this.props.viewer.id ? this.props.viewer : this.state.profile
        }
        isOwner={this.state.profile.id === this.props.viewer.id}
        key={this.state.profile.id}
      />
    );
  }
}
