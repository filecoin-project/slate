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
    const { user: username, slate: slatename, cid } = window.history.state;

    const pageState = this.props.data?.pageState;
    if (!this.props.data && (!username || !slatename)) {
      this.setState({ notFound: true });
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
        { ...window.history.state, data: slate },
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
        { ...window.history.state, data: slate },
        "Slate",
        `/${response.data.user.username}/${response.data.slatename}`
      );
    }

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
