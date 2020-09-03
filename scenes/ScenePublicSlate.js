import * as React from "react";
import * as Actions from "~/common/actions";

import { LoaderSpinner } from "~/components/system/components/Loaders";

import EmptyState from "~/components/core/EmptyState";
import SceneSlate from "~/scenes/SceneSlate";

export default class ScenePublicSlate extends React.Component {
  state = {
    slate: null,
  };

  componentDidMount = () => {
    this.renderSlate();
  };

  componentDidUpdate = (prevProps) => {
    console.log(this.props);
    console.log(prevProps);
    if (this.props.data.id !== prevProps.data.id) {
      this.renderSlate();
    }
  };

  renderSlate = async () => {
    for (let slate of this.props.viewer.slates) {
      if (slate.id === this.props.data.id) {
        this.props.onAction({
          type: "NAVIGATE",
          value: this.props.data.id,
        });
        return;
      }
    }
    let slate = await Actions.getSerializedSlate({ id: this.props.data.id });
    console.log(slate);
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
