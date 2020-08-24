import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Profile from "~/components/core/Profile";
import CircleButtonLight from "~/components/core/CircleButtonLight";

export default class SceneProfile extends React.Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <ScenePage style={{ padding: `88px 24px 128px 24px` }}>
        <Profile
          onAction={this.props.onAction}
          creator={this.props.data}
          editing={this.props.viewer.username === this.props.data.username}
          sceneId={this.props.sceneId}
        />
      </ScenePage>
    );
  }
}
