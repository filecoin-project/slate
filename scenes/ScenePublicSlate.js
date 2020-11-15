import * as React from "react";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { css } from "@emotion/core";
import { dispatchCustomEvent } from "~/common/custom-events";

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
    await this.fetchSlate();
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

    await this.fetchSlate();
  };

  fetchSlate = async () => {
    const username = Window.getQueryParameterByName("user");
    const slatename = Window.getQueryParameterByName("slate");
    if (
      !this.props.data &&
      !username &&
      !slatename &&
      this.props.viewer.slates &&
      this.props.viewer.slates.length
    ) {
      this.props.onAction({
        type: "NAVIGATE",
        value: this.props.viewer.slates[0].id,
      });
      return;
    }

    let slateIds = this.props.viewer.slates.map((slate) => slate.id);
    if (this.props.data && this.props.data.id && slateIds.includes(this.props.data.id)) {
      this.props.onAction({
        type: "NAVIGATE",
        value: this.props.data.id,
        redirect: true,
      });
      return;
    }
    if (username === this.props.viewer.username) {
      for (let slate of this.props.viewer.slates) {
        if (slate.slatename === slatename) {
          this.props.onAction({
            type: "NAVIGATE",
            value: slate.id,
            redirect: true,
          });
          return;
        }
      }
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "We're having trouble fetching that slate right now." } },
      });
      this.props.onBack();
      return;
    }

    let query;
    if (username && slatename) {
      query = { username, slatename };
    } else if (this.props.data && this.props.data.id) {
      query = { id: this.props.data.id };
    }
    let slate;
    if (query) {
      slate = await Actions.getSerializedSlate(query);
    }

    if (!slate || slate.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "We're having trouble fetching that slate right now." } },
      });
      this.props.onBack();
    }

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
