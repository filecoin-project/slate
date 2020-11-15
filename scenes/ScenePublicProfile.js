import * as React from "react";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { css } from "@emotion/core";
import { dispatchCustomEvent } from "~/common/custom-events";

import SceneProfile from "~/scenes/SceneProfile";

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;
`;

export default class ScenePublicProfile extends React.Component {
  state = {
    profile: null,
  };

  componentDidMount = async () => {
    await this.fetchProfile();
  };

  componentDidUpdate = async (prevProps) => {
    if (!this.props.data) {
      return null;
    }

    if (!prevProps.data) {
      return null;
    }

    if (!prevProps.data.id || this.props.data.id === prevProps.data.id) {
      return null;
    }

    await this.fetchProfile();
  };

  fetchProfile = async () => {
    const username = Window.getQueryParameterByName("user");
    let query;
    if (username) {
      query = { username: username };
    } else if (this.props.data && this.props.data.id) {
      if (this.props.data.id === this.props.viewer.id) {
        this.setState({ profile: this.props.viewer });
        return;
      }
      query = { id: this.props.data.id };
    } else {
      query = { id: this.props.viewer.id };
    }
    let profile;
    if (query) {
      profile = await Actions.getSerializedProfile(query);
    }

    if (!profile || profile.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "We're having trouble fetching that user right now." } },
      });
      this.props.onBack();
      return;
    }

    this.setState({ profile: profile.data });
  };

  render() {
    if (!this.state.profile) {
      return (
        //TODO(martina): replace with ghost UI while loading
        <div css={STYLES_LOADER}>
          <LoaderSpinner />
        </div>
      );
    }

    return <SceneProfile {...this.props} data={this.state.profile} />;
  }
}
