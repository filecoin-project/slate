import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Window from "~/common/window";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";
import { dispatchCustomEvent } from "~/common/custom-events";
import { SlateLayout } from "~/components/core/SlateLayout";
import { SlateLayoutMobile } from "~/components/core/SlateLayoutMobile";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import SlateMediaObject from "~/components/core/SlateMediaObject";
import CircleButtonGray from "~/components/core/CircleButtonGray";
import EmptyState from "~/components/core/EmptyState";

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const STYLES_USERNAME = css`
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

let isMounted = false;

export default class SceneSlate extends React.Component {
  _timeout = null;
  _remoteLock = false;

  state = {
    ...(this.props.current, this.props.viewer),
    loading: false,
    saving: "IDLE",
    isOwner: this.props.current.data.ownerId === this.props.viewer.id,
    editing: false,
    followLoading: false,
  };

  // NOTE(jim):
  // The purpose of this is to update the Scene appropriately when
  // it changes but isn't mounted.
  async componentDidUpdate(prevProps) {
    if (prevProps.current.id !== this.props.current.id) {
      await this.setState({
        loading: false,
        saving: "IDLE",
        isOwner: this.props.current.data.ownerId === this.props.viewer.id,
      });

      this._handleUpdateCarousel(this.props.current.data.objects, this.state.isOwner);
    }
  }

  componentDidMount() {
    if (isMounted) {
      return false;
    }
    isMounted = true;

    this._handleUpdateCarousel();

    window.addEventListener("remote-update-slate-screen", this._handleRemoteAddObject);
    window.addEventListener("remote-delete-object", this._handleRemoteDeleteObject);
    window.addEventListener("remote-object-update", this._handleRemoteEditObject);

    if (this.state.isOwner) {
      let changed = false;
      let objects = [...this.props.current.data.objects];
      for (let obj of objects) {
        if (!obj.size) {
          let matches = this.props.viewer.library[0].children.filter((file) => {
            return file.id === obj.id;
          });
          if (matches.length) {
            obj.size = matches[0].size;
            changed = true;
          }
        }
      }
      if (changed) {
        this._handleSave(null, objects, null, true);
      }
    }
  }

  componentWillUnmount() {
    isMounted = false;

    window.removeEventListener("remote-update-slate-screen", this._handleRemoteAddObject);
    window.removeEventListener("remote-delete-object", this._handleRemoteDeleteObject);
    window.removeEventListener("remote-object-update", this._handleRemoteEditObject);
  }

  _handleRemoteAddObject = () => {
    this._handleUpdateCarousel();
  };

  _handleFollow = () => {
    this.setState({ followLoading: true }, async () => {
      let response = await Actions.createSubscription({
        slateId: this.props.current.id,
      });
      await this.props.onRehydrate();
      this.setState({ followLoading: false });
    });
  };

  _handleSaveLayout = async (layouts, autoSave) => {
    await this._handleSave(null, null, layouts, autoSave);
  };

  _handleSave = async (e, objects, layouts, autoSave = false, preview) => {
    this.setState({ loading: true, saving: "SAVING" });

    let layoutOnly = layouts && !objects;

    let data = {};
    if (objects) {
      data.objects = objects;
    }
    if (layouts) {
      data.layouts = layouts;
    }
    if (preview) {
      data.preview = preview;
    }
    const response = await Actions.updateSlate({
      id: this.props.current.id,
      layoutOnly,
      autoSave,
      data,
    });

    if (!autoSave) {
      if (!response) {
        this.setState({ loading: false, saving: "ERROR" });
        System.dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: {
              message: "We're having trouble connecting right now. Please try again later",
            },
          },
        });
      }

      if (response.error) {
        this.setState({ loading: false, saving: "ERROR" });
        System.dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: response.decorator } },
        });
      }
    }

    if (this.state.isOwner) {
      await this.props.onRehydrate();
    }

    this.setState({
      saving: "SAVED",
    });

    if (!layoutOnly) {
      this._handleUpdateCarousel(
        objects ? objects : this.props.current.data.objects,
        this.state.isOwner
      );
    }
  };

  _handleRemoteEditObject = async ({ detail }) => {
    const { object } = detail;
    console.log(object);

    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { saving: true },
    });

    const objects = [...this.props.current.data.objects];
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

  _handleUpdateCarousel = (newObjects, isOwner) => {
    let objects = newObjects ? newObjects : [...this.props.current.data.objects];
    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        carouselType: "slate",
        slides: objects.map((each) => {
          // NOTE(jim):
          // This is a hack to catch this undefined case I don't want to track down yet.
          const url = each.url.replace("https://undefined", "https://");
          const cid = Strings.getCIDFromIPFS(url);
          const data = { ...each, cid, url };

          return {
            onDelete: () =>
              System.dispatchCustomEvent({
                name: "remote-delete-object",
                detail: { ids: [data.id] },
              }),
            onObjectSave: (object) =>
              System.dispatchCustomEvent({
                name: "remote-object-update",
                detail: { object },
              }),
            id: data.id,
            cid,
            data,
            username: this.props.viewer.username,
            slatename: this.props.current.slatename,
            isOwner: isOwner ? isOwner : this.state.isOwner,
            component: <SlateMediaObject key={each.id} data={data} />,
          };
        }),
      },
    });
  };

  _handleDeleteFiles = async (cids) => {
    const message = `Are you sure you want to delete these files? They will be deleted from your slates as well`;
    if (!window.confirm(message)) {
      return;
    }

    const response = await Actions.deleteBucketItems({ cids });
    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return;
    }
    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return;
    }
    await this.props.onRehydrate();
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Files successfully deleted!", status: "INFO" },
      },
    });
  };

  _handleRemoteDeleteObject = async ({ detail }) => {
    console.log(detail.ids);
    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: true },
    });

    let objects = this.props.current.data.objects.filter((obj) => {
      return !detail.ids.includes(obj.id);
    });

    const response = await Actions.updateSlate({
      id: this.props.current.id,
      data: {
        objects,
      },
    });

    if (!response) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: false },
      });
      System.dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return;
    }
    if (response.error) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: false },
      });
      System.dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return;
    }

    this._handleUpdateCarousel(response.slate.data.objects);

    await this.props.onRehydrate();

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

  _handleAdd = async () => {
    await this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_ADD_FILE_TO_BUCKET",
      data: this.props.current,
    });
  };

  _handleSaveCopy = async (items) => {
    this.setState({ loading: true });
    let response = await Actions.addCIDToData({ items });

    if (!response) {
      this.setState({ loading: false, saving: "ERROR" });
      System.dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return;
    }
    if (response.error) {
      this.setState({ loading: false, saving: "ERROR" });
      System.dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return;
    }
    this.setState({ loading: false, saving: "SAVED" });
    this.props.onRehydrate();
  };

  _handleShowSettings = () => {
    return this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_SINGLE_SLATE_SETTINGS",
      data: this.props.current,
    });
  };

  render() {
    console.log(this.props);
    const { user, data } = this.props.current;
    const { body = "", preview } = data;
    let objects = this.props.current.data.objects;
    let layouts = this.props.current.data.layouts;
    const isPublic = data.public;

    let following = !!this.props.viewer.subscriptions.filter((subscription) => {
      return subscription.target_slate_id === this.props.current.id;
    }).length;

    let actions = this.state.isOwner ? (
      <span>
        <CircleButtonGray onClick={this._handleAdd} style={{ marginRight: 16 }}>
          <SVG.Plus height="16px" />
        </CircleButtonGray>
        {isPublic ? (
          <a
            href={
              user
                ? `/${user.username}/${this.props.current.slatename}`
                : this.state.isOwner
                ? `/${this.props.viewer.username}/${this.props.current.slatename}`
                : ""
            }
            target="_blank"
          >
            <CircleButtonGray style={{ marginRight: 16 }}>
              <SVG.Upload height="16px" />
            </CircleButtonGray>
          </a>
        ) : null}
        <CircleButtonGray onClick={this._handleShowSettings}>
          <SVG.Settings height="16px" />
        </CircleButtonGray>
      </span>
    ) : (
      <div onClick={this._handleFollow}>
        {following ? (
          <ButtonSecondary
            transparent
            style={{ minWidth: 120, paddingLeft: 0 }}
            loading={this.state.followLoading}
          >
            Unfollow
          </ButtonSecondary>
        ) : (
          <ButtonPrimary
            transparent
            style={{ minWidth: 120, paddingLeft: 0 }}
            loading={this.state.followLoading}
          >
            Follow
          </ButtonPrimary>
        )}
      </div>
    );
    return (
      <ScenePage contentstyle={{ maxWidth: "1660px" }}>
        <ScenePageHeader
          wide
          title={
            user ? (
              <span>
                <span
                  onClick={() =>
                    this.props.onAction({
                      type: "NAVIGATE",
                      value: this.props.sceneId,
                      scene: "PUBLIC_PROFILE",
                      data: user,
                    })
                  }
                  css={STYLES_USERNAME}
                >
                  {user.username}
                </span>{" "}
                / {data.name}
              </span>
            ) : (
              data.name
            )
          }
          actions={<span css={STYLES_MOBILE_HIDDEN}>{actions}</span>}
        >
          <span
            style={{
              color: Constants.system.darkGray,
              fontFamily: Constants.font.medium,
            }}
          >
            <ProcessedText text={body} />
          </span>
        </ScenePageHeader>
        <span css={STYLES_MOBILE_ONLY}>{actions}</span>
        {objects && objects.length ? (
          this.props.mobile ? (
            <SlateLayoutMobile
              isOwner={this.state.isOwner}
              items={objects}
              fileNames={layouts && layouts.ver === "2.0" ? layouts.fileNames : false}
              onSelect={this._handleSelect}
            />
          ) : (
            <div style={{ marginTop: this.state.isOwner ? 24 : 48 }}>
              <SlateLayout
                link={
                  user
                    ? `${window.location.hostname}${
                        window.location.port ? ":" + window.location.port : ""
                      }/${user.username}/${this.props.current.slatename}`
                    : this.state.isOwner
                    ? `${window.location.hostname}${
                        window.location.port ? ":" + window.location.port : ""
                      }/${this.props.viewer.username}/${this.props.current.slatename}`
                    : ""
                }
                viewer={this.props.viewer}
                slateId={this.props.current.id}
                layout={layouts && layouts.ver === "2.0" ? layouts.layout || [] : null}
                onSaveLayout={this._handleSaveLayout}
                isOwner={this.state.isOwner}
                fileNames={layouts && layouts.ver === "2.0" ? layouts.fileNames : false}
                preview={preview}
                onSavePreview={(preview) => this._handleSave(null, null, null, false, preview)}
                items={objects}
                onSelect={this._handleSelect}
                defaultLayout={layouts && layouts.ver === "2.0" ? layouts.defaultLayout : true}
                onAction={this.props.onAction}
                onRemoveFromSlate={this._handleRemoteDeleteObject}
                onDeleteFiles={this._handleDeleteFiles}
                onSaveCopy={this._handleSaveCopy}
              />
            </div>
          )
        ) : this.state.isOwner ? (
          <div style={{ padding: "24px" }}>
            <EmptyState>
              <div css={STYLES_ICONS}>
                <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
                <SVG.Document height="24px" style={{ margin: "0 16px" }} />
                <SVG.Image height="24px" style={{ margin: "0 16px" }} />
                <SVG.Book height="24px" style={{ margin: "0 16px" }} />
                <SVG.Video height="24px" style={{ margin: "0 16px" }} />
              </div>
              <div style={{ marginTop: 24 }}>Drag and drop files to add them to this slate</div>
            </EmptyState>
          </div>
        ) : (
          <div style={{ padding: "24px" }}>
            <EmptyState>There's nothing here :)</EmptyState>
          </div>
        )}
      </ScenePage>
    );
  }
}
