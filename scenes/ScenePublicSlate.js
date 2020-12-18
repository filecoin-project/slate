import * as React from "react";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";
import * as Strings from "~/common/strings";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { css } from "@emotion/react";

import SceneSlate from "~/scenes/SceneSlate";
import EmptyState from "~/components/core/EmptyState";
import ScenePage from "~/components/core/ScenePage";

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
    notFound: false,
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
    const pageState = this.props.data?.pageState;
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

    //NOTE(martina): look for the slate in the user's slates
    let slate;
    if (this.props.data?.id) {
      for (let s of this.props.viewer.slates) {
        if (this.props.data.id && this.props.data.id === s.id) {
          slate = s;
          break;
        }
      }
    } else if (slatename && username === this.props.viewer.username) {
      for (let s of this.props.viewer.slates) {
        if (username && slatename === s.slatename) {
          slate = s;
          break;
        }
      }
      if (!slate) {
        Events.dispatchMessage({ message: "We're having trouble fetching that slate right now." });
        this.setState({ notFound: true });
        return;
      }
    }
    if (slate) {
      window.history.replaceState(
        window.history.state,
        "Slate",
        `/${this.props.viewer.username}/${slate.slatename}`
      );
    }

    if (!slate) {
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
      if (Events.hasError(response)) {
        this.setState({ notFound: true });
        return;
      }
      slate = response.data;
      window.history.replaceState(
        window.history.state,
        "Slate",
        `/${response.data.user.username}/${response.data.slatename}`
      );
    }

    // let slateIds = this.props.viewer.slates.map((slate) => slate.id);
    // if (this.props.data && this.props.data.id && slateIds.includes(this.props.data.id)) {
    //   this.props.onAction({
    //     type: "NAVIGATE",
    //     value: this.props.data.id,
    //     redirect: true,
    //   });
    //   return;
    // }

    // if (username === this.props.viewer.username) {
    //   for (let slate of this.props.viewer.slates) {
    //     if (slate.slatename === slatename) {
    //       this.props.onAction({
    //         type: "NAVIGATE",
    //         value: slate.id,
    //         redirect: true,
    //       });
    //       return;
    //     }
    //   }
    //   Events.dispatchMessage({ message: "We're having trouble fetching that slate right now." });
    //   this.setState({ notFound: true });
    //   return;
    // }

    // let query;
    // if (username && slatename) {
    //   query = { username, slatename };
    // } else if (this.props.data && this.props.data.id) {
    //   query = { id: this.props.data.id };
    // }
    // let response;
    // if (query) {
    //   response = await Actions.getSerializedSlate(query);
    // }

    // if (Events.hasError(response)) {
    //   this.setState({ notFound: true });
    //   return;
    // }

    // window.history.replaceState(
    //   window.history.state,
    //   "Slate",
    //   `/${response.data.user.username}/${response.data.slatename}`
    // );

    this.props.onUpdateData({ data: slate });
    await this.setState({ slate });

    let index = -1;
    if (pageState || !Strings.isEmpty(cid)) {
      if (pageState?.index) {
        index = pageState.index;
      } else {
        for (let i = 0; i < slate.data.objects.length; i++) {
          let obj = slate.data.objects[i];
          if (
            (obj.cid && (obj.cid === cid || obj.cid === pageState?.cid)) ||
            (obj.id && obj.id === pageState?.id)
          ) {
            index = i;
            break;
          }
        }
      }
    }

    if (index !== -1) {
      Events.dispatchCustomEvent({
        name: "slate-global-open-carousel",
        detail: { index },
      });
    }
  };

  render() {
    if (this.state.notFound) {
      return (
        <ScenePage>
          <EmptyState>
            <SVG.Layers height="24px" style={{ marginBottom: 24 }} />
            <div>We were unable to locate that slate</div>
          </EmptyState>
        </ScenePage>
      );
    }
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
