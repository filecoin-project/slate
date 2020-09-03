import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";

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

const setStateData = (source) => {
  return {
    objects: source.data.objects,
    layouts: source.data.layouts
      ? source.data.layouts
      : { lg: generateLayout(source.data.objects) },
  };
};

export default class SceneSlate extends React.Component {
  _timeout = null;
  _remoteLock = false;

  state = {
    ...setStateData(this.props.current, this.props.viewer),
    loading: false,
    saving: "IDLE",
    editing: this.props.current.data.ownerId === this.props.viewer.id,
  };

  // NOTE(jim):
  // The purpose of this is to update the Scene appropriately when
  // it changes but isn't mounted.
  componentDidUpdate(prevProps) {
    if (prevProps.current.id !== this.props.current.id) {
      this.setState({
        ...setStateData(this.props.current, this.props.viewer),
        loading: false,
        saving: "IDLE",
        editing: this.props.current.data.ownerId === this.props.viewer.id,
      });

      this._handleUpdateCarousel({
        objects: this.props.current.data.objects,
        editing: this.state.editing,
      });
    }
  }

  componentDidMount() {
    this._handleUpdateCarousel(this.state);
    window.addEventListener(
      "remote-update-slate-screen",
      this._handleRemoteUpdate
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "update-current-slate",
      this._handleRemoteUpdate
    );
  }

  _handleRemoteUpdate = async ({ detail }) => {
    if (!this._remoteLock) {
      this._remoteLock = true;
      const response = await Actions.getSlateById({
        id: this.props.current.id,
      });

      if (!response || response.error) {
        this._remoteLock = false;
        return;
      }

      this.setState({ layouts: null, objects: null });

      const { slate } = response;
      console.log(slate);

      await this._handleSave(null, slate.data.objects, slate.data.layouts);
      this._remoteLock = false;
    }
  };

  _handleUpdate = async (e) => {
    let response = await this.props.onRehydrate();
    if (!response || response.error) {
      alert("TODO: error fetching authenticated viewer");
      return null;
    }

    let viewer = response.data;

    this.setState({
      following: !!viewer.subscriptions.filter((subscription) => {
        return subscription.target_slate_id === this.props.current.id;
      }).length,
    });
  };

  _handleFollow = async () => {
    let response = await Actions.createSubscription({
      slateId: this.props.current.id,
    });
    console.log(response);
    // await this._handleUpdate();
  };

  _handleChangeLayout = async (layout, layouts) => {
    this.setState({ layouts, saving: "IDLE" });
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
    this.setState({ loading: true, saving: "SAVING" });

    const response = await Actions.updateSlate({
      id: this.props.current.id,
      data: {
        name: this.props.current.data.name,
        objects: objects ? objects : this.state.objects,
        layouts: layouts ? layouts : this.state.layouts,
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

    this.setState({
      saving: "SAVED",
      layouts: layouts ? layouts : this.state.layouts,
      objects: objects ? objects : this.state.objects,
    });

    this._handleUpdateCarousel({
      objects: objects ? objects : this.state.objects,
      editing: this.state.editing,
    });
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

    // TODO(jim): This is a brute force way to handle this.
    const layouts = { lg: generateLayout(objects) };
    const response = await Actions.updateSlate({
      id: this.props.current.slateId,
      data: {
        name: this.props.current.data.name,
        objects,
        layouts,
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

    this._handleUpdateCarousel({ objects, editing: this.state.editing });
    this.setState({ layouts: null, objects: null });
    await this.props.onRehydrate();
    this.setState({ layouts, objects });

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
    const { username, slatename, data, name } = this.props.current;
    const { body = "A slate." } = data;
    const { objects, layouts } = this.state;

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
                      data: this.props.current.owner,
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
            ) : (
              <div onClick={this._handleFollow}>
                {!!this.props.viewer.subscriptions.filter((subscription) => {
                  return subscription.target_slate_id === this.props.current.id;
                }).length
                  ? "Unfollow"
                  : "Follow"}
              </div>
            )
          }
        >
          <ProcessedText text={body} />
        </ScenePageHeader>
        {layouts ? (
          <Slate
            editing={this.state.editing}
            saving={this.state.saving}
            items={objects}
            layouts={layouts}
            onLayoutChange={this._handleChangeLayout}
            onLayoutSave={this._handleSaveLayout}
            onMoveIndex={this._handleMoveIndex}
            onSelect={this._handleSelect}
          />
        ) : null}
      </ScenePage>
    );
  }
}
