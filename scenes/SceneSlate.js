import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/core";
import { ProcessedText } from "~/components/system/components/Typography";
import { dispatchCustomEvent } from "~/common/custom-events";
import { SlateLayout } from "~/components/core/SlateLayout";
import { SlateLayoutMobile } from "~/components/core/SlateLayoutMobile";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import CircleButtonGray from "~/components/core/CircleButtonGray";
import EmptyState from "~/components/core/EmptyState";

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
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

const STYLES_BUTTON_PRIMARY = css`
  min-width: 120px;
  min-height: 36px;
  border-radius: 4px;
  border: 1px solid ${Constants.system.gray};
  padding: 8px 24px;
  cursor: pointer;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  text-align: center;
  text-decoration: none;
  color: ${Constants.system.brand};

  :hover {
    background-color: ${Constants.system.gray};
    transition: 200ms background-color linear;
  }
  :visited {
    color: ${Constants.system.black};
  }
`;

const STYLES_BUTTON_SECONDARY = css`
  min-width: 120px;
  min-height: 36px;
  border-radius: 4px;
  border: 1px solid ${Constants.system.gray};
  padding: 8px 24px;
  cursor: pointer;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  text-align: center;
  text-decoration: none;
  color: ${Constants.system.black};

  :hover {
    background-color: ${Constants.system.gray};
    transition: 200ms background-color linear;
  }
  :visited {
    color: ${Constants.system.black};
  }
`;

let isMounted = false;

export default class SceneSlate extends React.Component {
  _copy = null;
  _timeout = null;
  _remoteLock = false;

  state = {
    ...(this.props.current, this.props.viewer),
    loading: false,
    saving: "IDLE",
    isOwner: this.props.current.data.ownerId === this.props.viewer.id,
    editing: false,
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
    }
  }

  componentDidMount() {
    if (isMounted) {
      return false;
    }
    isMounted = true;
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
    window.removeEventListener("remote-delete-object", this._handleRemoteDeleteObject);
    window.removeEventListener("remote-object-update", this._handleRemoteEditObject);
  }

  _handleFollow = () => {
    Actions.createSubscription({
      slateId: this.props.current.id,
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

    this.setState({
      saving: "SAVED",
    });
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
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Files successfully deleted!", status: "INFO" },
      },
    });
  };

  _handleRemoteDeleteObject = async ({ detail }) => {
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
    let message = Strings.formatAsUploadMessage(response.data.added, response.data.skipped);
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message, status: !response.data.added ? null : "INFO" },
      },
    });
    this.setState({ loading: false, saving: "SAVED" });
  };

  _handleShowSettings = () => {
    return this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_SINGLE_SLATE_SETTINGS",
      data: this.props.current,
    });
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ copyValue: value, copying: true }, () => {
      this._copy.select();
      document.execCommand("copy");
    });
    setTimeout(() => {
      this.setState({ copying: false });
    }, 1000);
  };

  render() {
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
          <CircleButtonGray
            style={{ marginRight: 16 }}
            onClick={(e) =>
              this._handleCopy(
                e,
                user
                  ? Strings.getURLFromPath(`/${user.username}/${this.props.current.slatename}`)
                  : this.state.isOwner
                  ? Strings.getURLFromPath(
                      `/${this.props.viewer.username}/${this.props.current.slatename}`
                    )
                  : ""
              )
            }
          >
            {this.state.copying ? <SVG.CheckBox height="16px" /> : <SVG.DeepLink height="16px" />}
          </CircleButtonGray>
        ) : null}
        <CircleButtonGray onClick={this._handleShowSettings}>
          <SVG.Settings height="16px" />
        </CircleButtonGray>
      </span>
    ) : (
      <div style={{ display: `flex` }}>
        <div onClick={this._handleFollow}>
          {following ? (
            <div css={STYLES_BUTTON_SECONDARY}>Unfollow</div>
          ) : (
            <div css={STYLES_BUTTON_PRIMARY}>Follow</div>
          )}
        </div>
        <CircleButtonGray
          style={{ marginLeft: 16 }}
          onClick={(e) =>
            this._handleCopy(
              e,
              user
                ? Strings.getURLFromPath(`/${user.username}/${this.props.current.slatename}`)
                : this.state.isOwner
                ? Strings.getURLFromPath(
                    `/${this.props.viewer.username}/${this.props.current.slatename}`
                  )
                : ""
            )
          }
        >
          {this.state.copying ? <SVG.CheckBox height="16px" /> : <SVG.DeepLink height="16px" />}
        </CircleButtonGray>
      </div>
    );
    return (
      <ScenePage>
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
                    ? Strings.getURLFromPath(`/${user.username}/${this.props.current.slatename}`)
                    : this.state.isOwner
                    ? Strings.getURLFromPath(
                        `/${this.props.viewer.username}/${this.props.current.slatename}`
                      )
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
          <div>
            <EmptyState>
              <FileTypeGroup />
              <div style={{ marginTop: 24 }}>Drag and drop files to add them to this slate</div>
            </EmptyState>
          </div>
        ) : (
          <div>
            <EmptyState>There's nothing here :)</EmptyState>
          </div>
        )}
        <input
          ref={(c) => {
            this._copy = c;
          }}
          readOnly
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </ScenePage>
    );
  }
}
