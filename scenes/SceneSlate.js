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

const STYLES_USERNAME = css`
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const moveIndex = (set, fromIndex, toIndex) => {
  const element = set[fromIndex];
  set.splice(fromIndex, 1);
  set.splice(toIndex, 0, element);

  return set;
};

// TODO(jim + martina):
// Sub state for scenes and sidebars is getting out of hand.
// I don't want some crazy global solution, so lets think of a rudimentry
// way to keep things sane
const setStateData = (source) => {
  return {
    name: source.data.name,
    username: source.owner ? source.owner.username : null,
    slatename: source.slatename,
    public: source.data.public,
    objects: source.data.objects,
    body: source.data.body,
    layouts: source.data.layouts
      ? source.data.layouts
      : { lg: generateLayout(source.data.objects) },
  };
};

export default class SceneSlate extends React.Component {
  state = {
    ...setStateData(this.props.data, this.props.viewer),
    loading: false,
    saving: "IDLE",
    editing: this.props.data.data.ownerId === this.props.viewer.id,
  };

  componentDidMount() {
    this._handleUpdateCarousel(this.state);
  }

  componentDidUpdate(prevProps) {
    const updated =
      this.props.current.updated_at !== prevProps.current.updated_at;

    if (!updated) {
      return;
    }

    let editing;

    this.props.viewer.slates.forEach((slate) => {
      if (slate.id === this.props.current.slateId) {
        editing = true;
      }
    });

    this.setState({
      ...setStateData(this.props.current, this.props.viewer),
      loading: false,
      saving: "SAVED",
      editing,
    });

    this._handleUpdateCarousel({
      objects: this.props.data.data.objects,
    });
  }

  _handleChangeLayout = async (layout, layouts) => {
    this.setState({ layouts, saving: "SAVING" });
    await this._handleSave(null, null, layouts);
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
      this.setState({ loading: false, saving: "ERROR" });
      alert("TODO: Server Error");
    }

    if (response.error) {
      this.setState({ loading: false, saving: "ERROR" });
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
            editing: this.state.editing,
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
    const {
      username,
      slatename,
      objects,
      body = "A slate.",
      name,
    } = this.state;

    return (
      <ScenePage style={{ padding: `88px 24px 128px 24px` }}>
        <ScenePageHeader
          style={{ padding: `0 24px 0 24px` }}
          title={
            username ? (
              <span>
                <span
                  onClick={() =>
                    this.props.onAction({
                      type: "NAVIGATE",
                      value: this.props.sceneId,
                      scene: "PROFILE",
                      data: this.props.data.owner,
                    })
                  }
                  css={STYLES_USERNAME}
                >
                  {username}
                </span>{" "}
                / {slatename}
              </span>
            ) : (
              slatename
            )
          }
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
          saving={this.state.saving}
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
