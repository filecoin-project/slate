import * as React from "react";
import * as Actions from "~/common/actions";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { css } from "@emotion/core";

import EmptyState from "~/components/core/EmptyState";
import SceneSlate from "~/scenes/SceneSlate";

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;
`;

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
          redirect: true,
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
        <div css={STYLES_LOADER}>
          <LoaderSpinner />
        </div>
      );
    }
    return <SceneSlate {...this.props} current={this.state.slate} />;
  }
}
