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
import CircleButtonGray from "~/components/core/CircleButtonGray";

const moveIndex = (set, fromIndex, toIndex) => {
  const element = set[fromIndex];
  set.splice(fromIndex, 1);
  set.splice(toIndex, 0, element);

  return set;
};

export default class SceneSlate extends React.Component {
  state = {
    name: this.props.data.data.name,
    slatename: this.props.data.slatename,
    public: this.props.data.data.public,
    objects: this.props.data.data.objects,
    body: this.props.data.data.body,
    layouts: this.props.data.data.layouts
      ? this.props.data.data.layouts
      : { lg: generateLayout(this.props.data.data.objects) },
    loading: false,
    editing: this.props.viewer.slates
      .map((slate) => slate.id)
      .includes(this.props.data.id),
  };

  componentDidMount() {
    console.log(this.props);
    this._handleUpdateCarousel(this.state);
  }

  componentDidUpdate(prevProps) {
    const isNewSlateScene =
      prevProps.data.slatename !== this.props.data.slatename;

    let isUpdated = false;
    if (
      this.props.data.data.objects.length !== prevProps.data.data.objects.length
    ) {
      isUpdated = true;
    }

    if (this.props.data.data.body !== prevProps.data.data.body) {
      isUpdated = true;
    }

    if (isNewSlateScene || isUpdated) {
      let layouts = this.props.data.data.layouts;
      if (!layouts) {
        layouts = { lg: generateLayout(this.props.data.data.objects) };
      }

      this.setState({
        slatename: this.props.data.slatename,
        public: this.props.data.data.public,
        objects: this.props.data.data.objects,
        body: this.props.data.data.body,
        name: this.props.data.data.name,
        layouts: layouts,
        loading: false,
        isOwner: this.props.viewer.slates
          .map((slate) => slate.id)
          .includes(this.props.data.slateId),
      });

      this._handleUpdateCarousel({
        objects: this.props.data.data.objects,
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
      id: this.props.data.id,
      data: {
        objects: objects ? objects : this.state.objects,
        layouts: layouts ? layouts : this.state.layouts,
        public: this.state.public,
        body: this.state.body,
        name: this.state.name,
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
          // NOTE(jim):
          // This is a hack to catch this undefined case I don't want to track down yet.
          const url = each.url.replace("https://undefined", "https://");

          // NOTE
          // regex here performs https://{cid}.ipfs.slate.textile.io => [https://{cid}, {cid}]
          let cid = url.match(
            /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i
          )[1];
          const data = { ...each, cid, url };

          return {
            onDelete: this._handleDelete,
            onObjectSave: this._handleObjectSave,
            id: data.id,
            cid,
            data,
            component: (
              <SlateMediaObject key={each.id} useImageFallback data={data} />
            ),
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
      id: this.props.data.slateId,
      data: {
        objects,
        layouts,
        public: this.state.public,
        body: this.state.body,
        name: this.state.name,
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
      data: this.props.data,
    });
  };

  _handleShowSettings = () => {
    return this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_SINGLE_SLATE_SETTINGS",
      data: this.props.data,
    });
  };

  render() {
    const { slatename, objects, body = "A slate.", name } = this.state;

    return (
      <ScenePage style={{ padding: `88px 24px 128px 24px` }}>
        <ScenePageHeader
          style={{ padding: `0 24px 0 24px` }}
          title={name}
          actions={
            this.state.editing ? (
              <React.Fragment>
                <CircleButtonGray
                  onMouseUp={this._handleAdd}
                  onTouchEnd={this._handleAdd}
                  style={{ marginLeft: 12, marginRight: 12 }}
                >
                  <SVG.Plus height="16px" />
                </CircleButtonGray>
                <CircleButtonGray
                  onMouseUp={this._handleShowSettings}
                  onTouchEnd={this._handleShowSettings}
                >
                  <SVG.Settings height="16px" />
                </CircleButtonGray>
              </React.Fragment>
            ) : null
          }
        >
          {body}
        </ScenePageHeader>
        <Slate
          key={slatename}
          editing={this.state.editing}
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
