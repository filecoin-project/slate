import * as React from "react";
import * as Actions from "~/common/actions";

import { LoaderSpinner } from "~/components/system/components/Loaders";

import EmptyState from "~/components/core/EmptyState";
import SceneSlate from "~/scenes/SceneSlate";

export default class ScenePublicSlate extends React.Component {
  state = {
    slate: null,
  };

  componentDidMount = async () => {
    await this.renderSlate();
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

    await this.renderSlate();
  };

  renderSlate = async () => {
    for (let slate of this.props.viewer.slates) {
      if (!this.props.data) {
        this.props.onAction({
          type: "NAVIGATE",
          value: slate.id,
        });
        return;
      }

      if (slate.id === this.props.data.id) {
        this.props.onAction({
          type: "NAVIGATE",
          value: this.props.data.id,
        });
        return;
      }
    }

    let slate = await Actions.getSerializedSlate({ id: this.props.data.id });
    this.setState({ slate: slate.data });
  };

  render() {
    if (!this.state.slate) {
      return (
        <EmptyState style={{ marginTop: "88px" }}>
          <LoaderSpinner />
        </EmptyState>
      );
    }
    return <SceneSlate {...this.props} current={this.state.slate} />;
  }
}
