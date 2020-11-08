import * as React from "react";
import * as Actions from "~/common/actions";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { css } from "@emotion/core";

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
    await this.renderProfile();
  };

  componentDidUpdate = async (prevProps) => {
    if (!this.props.data) {
      return null;
    }

    if (!prevProps.data) {
      return null;
    }

    if (this.props.data.id === prevProps.data.id) {
      return null;
    }

    await this.renderProfile();
  };

  renderProfile = async () => {
    let id;

    if (this.props.data && this.props.data.id) {
      id = this.props.data.id;
    }

    if (!id && this.props.viewer.id) {
      id = this.props.viewer.id;
    }

    if (id === this.props.viewer.id) {
      this.setState({ profile: this.props.viewer });
      return;
    }

    let profile = await Actions.getSerializedProfile({
      id: id,
    });

    this.setState({ profile: profile.data });
  };

  render() {
    if (!this.state.profile) {
      return (
        <div css={STYLES_LOADER}>
          <LoaderSpinner />
        </div>
      );
    }

    return <SceneProfile {...this.props} data={this.state.profile} />;
  }
}
