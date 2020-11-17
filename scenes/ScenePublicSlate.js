import * as React from "react";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";
import * as Strings from "~/common/strings";

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
    if (
      this.props.data &&
      prevProps.data &&
      this.props.data.id &&
      prevProps.data.id &&
      this.props.data.id !== prevProps.data.id
    ) {
      await this.fetchSlate();
    }
  };

  fetchSlate = async () => {
    console.log(this.props.data);
    const username = Window.getQueryParameterByName("user");
    const slatename = Window.getQueryParameterByName("slate");
    const cid = Window.getQueryParameterByName("cid");
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
    let response;
    if (query) {
      response = await Actions.getSerializedSlate(query);
    }

    if (!response || response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "We're having trouble fetching that slate right now." } },
      });
      this.props.onBack();
      return;
    }

    this.props.onUpdateData({ data: response.data });
    this.setState({ slate: response.data });

    if (!Strings.isEmpty(cid)) {
      let index = -1;
      for (let i = 0; i < response.data.data.objects.length; i++) {
        let obj = response.data.data.objects[i];
        if ((obj.cid && obj.cid === cid) || (obj.url && obj.url.includes(cid))) {
          index = i;
          break;
        }
      }

      if (index !== -1) {
        dispatchCustomEvent({
          name: "slate-global-open-carousel",
          detail: { index },
        });
      }
    }
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
