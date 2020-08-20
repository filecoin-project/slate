import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Slate from "~/components/core/Slate";
import SlateMediaObject from "~/components/core/SlateMediaObject";
import CircleButtonLight from "~/components/core/CircleButtonLight";

export default class SceneSlate extends React.Component {
  state = {
    slatename: this.props.current.slatename,
    public: this.props.current.data.public,
    objects: this.props.current.data.objects,
    loading: false,
  };

  componentDidMount() {
    this._handleUpdateCarousel(this.state);
  }

  componentDidUpdate(prevProps) {
    const isNewSlateScene = prevProps.current.slatename !== this.props.current.slatename;
    const isUpdated = this.props.current.data.objects.length !== prevProps.current.data.objects.length;

    if (isNewSlateScene || isUpdated) {
      this.setState({
        slatename: this.props.current.slatename,
        public: this.props.current.data.public,
        objects: this.props.current.data.objects,
        loading: false,
      });

      this._handleUpdateCarousel({
        objects: this.props.current.data.objects,
      });
    }
  }

  _handleSave = async (e) => {
    this.setState({ loading: true });

    const response = await Actions.updateSlate({
      id: this.props.current.slateId,
      slatename: this.state.slatename,
      data: {
        objects: this.state.objects,
        public: this.state.public,
      },
    });

    if (!response) {
      this.setState({ loading: false });
      alert("TODO: Server Error");
    }

    if (response.error) {
      this.setState({ loading: false });
      alert(`TODO: ${response.decorator}`);
    }

    await this.props.onRehydrate();

    this._handleUpdateCarousel(this.state);
  };

  _handleUpdateCarousel = (state) => {
    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        slides: state.objects.map((each) => {
          return {
            onDelete: this._handleDelete,
            id: each.id,
            component: <SlateMediaObject key={each.id} useImageFallback data={each} />,
          };
        }),
      },
    });
  };

  _handleDelete = async (id) => {
    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: true },
    });

    const response = await Actions.updateSlate({
      id: this.props.current.slateId,
      slatename: this.state.slatename,
      data: {
        objects: this.state.objects.filter((o) => o.id !== id),
        public: this.state.public,
      },
    });

    if (!response) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: false },
      });
      alert("TODO: Server Error");
    }

    if (response.error) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: false },
      });
      alert(`TODO: ${response.decorator}`);
    }

    await this.props.onRehydrate();

    this._handleUpdateCarousel(this.state);

    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: false },
    });
  };

  _handleSelect = (index) =>
    System.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: { index },
    });

  _handleAdd = () => {
    return this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_ADD_FILE_TO_BUCKET",
      data: this.props.current,
    });
  };

  _handleShowSettings = () => {
    return this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_SINGLE_SLATE_SETTINGS",
      data: this.props.current,
    });
  };

  render() {
    const { slatename, objects } = this.state;

    return (
      <ScenePage style={{ padding: `88px 24px 128px 24px` }}>
        <System.H1 style={{ marginBottom: 24, paddingLeft: 24 }}>
          {slatename}{" "}
          <CircleButtonLight onClick={this._handleAdd} style={{ marginLeft: 16, marginRight: 12 }}>
            <SVG.Plus height="16px" />
          </CircleButtonLight>
          <CircleButtonLight onClick={this._handleShowSettings}>
            <SVG.Settings height="16px" />
          </CircleButtonLight>
        </System.H1>

        <Slate editing items={objects} onSelect={this._handleSelect} />
      </ScenePage>
    );
  }
}
