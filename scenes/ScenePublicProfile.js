import * as React from "react";
import * as Actions from "~/common/actions";

import { LoaderSpinner } from "~/components/system/components/Loaders";

import EmptyState from "~/components/core/EmptyState";
import SceneProfile from "~/scenes/SceneProfile";

export default class ScenePublicProfile extends React.Component {
  state = {
    profile: null,
  };

  componentDidMount = () => {
    this.renderProfile();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.data.id !== prevProps.data.id) {
      this.renderProfile();
    }
  };

  renderProfile = async () => {
    if (this.props.data.id === this.props.viewer.id) {
      this.setState({ profile: this.props.viewer });
      return;
    }
    let profile = await Actions.getSerializedProfile({
      id: this.props.data.id,
    });
    console.log(profile.data);
    this.setState({ profile: profile.data });
  };

  render() {
    if (!this.state.profile) {
      return (
        <EmptyState style={{ marginTop: "88px" }}>
          <LoaderSpinner />
        </EmptyState>
      );
    }
    return <SceneProfile {...this.props} data={this.state.profile} />;
  }
}
