import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import Slate, { generateLayout } from "~/components/core/Slate";
import SlateMediaObject from "~/components/core/SlateMediaObject";
import CircleButtonLight from "~/components/core/CircleButtonLight";

const moveIndex = (set, fromIndex, toIndex) => {
  const element = set[fromIndex];
  set.splice(fromIndex, 1);
  set.splice(toIndex, 0, element);

  return set;
};

export default class SceneSlate extends React.Component {
  state = {
    slatename: this.props.current.slatename,
    public: this.props.current.data.public,
    objects: this.props.current.data.objects,
    body: this.props.current.data.body,
    layouts: this.props.current.data.layouts
      ? this.props.current.data.layouts
      : { lg: generateLayout(this.props.current.data.objects) },
    loading: false,
  };

  componentDidMount() {
    this._handleUpdateCarousel(this.state);
  }

  componentDidUpdate(prevProps) {
    const isNewSlateScene = prevProps.current.slatename !== this.props.current.slatename;

    let isUpdated = false;
    if (this.props.current.data.objects.length !== prevProps.current.data.objects.length) {
      isUpdated = true;
    }

    if (this.props.current.data.body !== prevProps.current.data.body) {
      isUpdated = true;
    }

    if (isNewSlateScene || isUpdated) {
      let layouts = this.props.current.data.layouts;
      if (!layouts) {
        layouts = { lg: generateLayout(this.props.current.data.objects) };
      }

      this.setState({
        slatename: this.props.current.slatename,
        public: this.props.current.data.public,
        objects: this.props.current.data.objects,
        body: this.props.current.data.body,
        layouts: layouts,
        loading: false,
      });

      this._handleUpdateCarousel({
        objects: this.props.current.data.objects,
      });
    }
  }

  _handleChangeLayout = async (layout, layouts) => {
    this.setState({ layouts });
  };

  _handleSaveLayout = async () => {
    await this._handleSave(null, null, this.state.layouts);
  };

  _handleMoveIndex = async (from, to) => {
    const objects = moveIndex(this.state.objects, from.index, to.index);
    this.setState({ objects });
    await this._handleSave(null, objects);
  };

  _handleSave = async (e, objects, layouts) => {
    this.setState({ loading: true });

    const response = await Actions.updateSlate({
      id: this.props.current.slateId,
      slatename: this.state.slatename,
      data: {
        objects: objects ? objects : this.state.objects,
        layouts: layouts ? layouts : this.state.layouts,
        public: this.state.public,
        body: this.state.body,
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

  _handleObjectSave = async (object) => {
    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { saving: true },
    });

    const objects = [...this.state.objects];
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === object.id) {
        objects[i] = object;
        break;
      }
    }

    this.setState({ objects });

    await this._handleSave(null, objects);

    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { saving: false },
    });
  };

  _handleUpdateCarousel = (state) => {
    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        slides: state.objects.map((each) => {
          // NOTE
          // regex here performs https://{cid}.ipfs.hub.textile.io => [https://{cid}, {cid}]
          let cid = each.url.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i)[1]
          return {
            onDelete: this._handleDelete,
            onObjectSave: this._handleObjectSave,
            id: each.id,
            cid,
            data: each,
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

    let index;
    const objects = this.state.objects.filter((o, i) => {
      if (o.id === id) {
        index = i;
      }

      return o.id !== id;
    });

    // NOTE(jim): Every time we remove an object from a slate.
    // We will want to remove the object from the layouts too.
    const keys = Object.keys(this.state.layouts);
    let layouts = this.state.layouts;
    for (let j = 0; j < keys.length; j++) {
      layouts[keys[j]] = layouts[keys[j]].filter((each, i) => {
        return i !== index;
      });
    }

    const response = await Actions.updateSlate({
      id: this.props.current.slateId,
      slatename: this.state.slatename,
      data: {
        objects,
        layouts,
        public: this.state.public,
        body: this.state.body,
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
    const { slatename, objects, body = "A slate." } = this.state;

    console.log(this.state.layouts);

    return (
      <ScenePage style={{ padding: `88px 24px 128px 24px` }}>
        <ScenePageHeader
          style={{ padding: `0 24px 0 24px` }}
          title={slatename}
          actions={
            <React.Fragment>
              <CircleButtonLight onClick={this._handleAdd} style={{ marginLeft: 12, marginRight: 12 }}>
                <SVG.Plus height="16px" />
              </CircleButtonLight>
              <CircleButtonLight onClick={this._handleShowSettings}>
                <SVG.Settings height="16px" />
              </CircleButtonLight>
            </React.Fragment>
          }>
          {body}
        </ScenePageHeader>
        <Slate
          key={slatename}
          editing
          items={objects}
          layouts={this.state.layouts}
          onLayoutChange={this._handleChangeLayout}
          onLayoutSave={this._handleSaveLayout}
          onMoveIndex={this._handleMoveIndex}
          onSelect={this._handleSelect}
        />
      </ScenePage>
    );
  }
}
