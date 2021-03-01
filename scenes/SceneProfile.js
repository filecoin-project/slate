import * as React from "react";
import * as Actions from "~/common/actions";
import * as Utilities from "~/common/utilities";
import * as Strings from "~/common/strings";
import * as Events from "~/common/custom-events";
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
    this.fetchProfile();
  };

  fetchProfile = async () => {
    const username = this.props.page.user || this.props.page.data?.username;
    let query;
    let targetUser;
    if (username) {
      if (username === this.props.viewer.username) {
        targetUser = this.getFilteredViewer();
      } else {
        query = { username: username };
      }
    } else if (this.props.data && this.props.data.id) {
      if (this.props.data.id === this.props.viewer.id) {
        targetUser = this.getFilteredViewer();
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

    const {
      page: { cid },
    } = this.props;

    window.history.replaceState(
      { ...window.history.state, data: targetUser },
      "A slate user",
      `/${targetUser.username}`
    );

    this.props.onUpdateData({ data: targetUser });
    this.setState({ profile: targetUser }, () => {
      if (Strings.isEmpty(cid)) {
        return;
      }

      let library = targetUser.library[0].children || [];
      const index = library.findIndex((object) => object.cid === cid);
      if (index !== -1) {
        Events.dispatchCustomEvent({
          name: "slate-global-open-carousel",
          detail: { index },
        });
      } else {
        Events.dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: {
              message:
                "The requested file could not be found. It could have been deleted or may be private",
            },
          },
        });
      }
    });
  };

  getFilteredViewer = () => {
    let viewer = this.props.viewer;
    const res = Utilities.getPublicAndPrivateFiles({ viewer });
    viewer.library[0].children = res.publicFiles;
    return viewer;
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
        isAuthenticated={this.props.viewer !== null}
        key={this.state.profile.id}
      />
    );
  }
}
