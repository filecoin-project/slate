import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { SlateLayout } from "~/components/core/SlateLayout";
import { SlateLayoutMobile } from "~/components/core/SlateLayoutMobile";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";

import ProcessedText from "~/components/core/ProcessedText";
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
    editing: false,
    isFollowing: !!this.props.viewer.subscriptions.filter((subscription) => {
      return subscription.target_slate_id === this.props.current.id;
    }).length,
  };

  // NOTE(jim):
  // The purpose of this is to update the Scene appropriately when
  // it changes but isn't mounted.
  async componentDidUpdate(prevProps) {
    if (
      prevProps.current.id !== this.props.current.id ||
      this.props.viewer.subscriptions !== prevProps.viewer.subscriptions
    ) {
      await this.setState({
        isFollowing: !!this.props.viewer.subscriptions.filter((subscription) => {
          return subscription.target_slate_id === this.props.current.id;
        }).length,
      });
    }
  }

  _handleFollow = () => {
    this.setState({ isFollowing: !this.state.isFollowing });
    Actions.createSubscription({
      slateId: this.props.current.id,
    });
  };

  _handleSaveLayout = async (layouts, autoSave) => {
    await this._handleSave(null, null, layouts, autoSave);
  };

  _handleSave = async (e, objects, layouts, autoSave = false, preview) => {
    let layoutOnly = layouts && !objects;

    let data = {};
    if (objects) {
      data.objects = objects;
    }
    if (layouts) {
      data.layouts = layouts;
    }
    if (preview) {
      let slates = this.props.viewer.slates;
      let slateId = this.props.current.id;
      for (let slate of slates) {
        if (slate.id === slateId) {
          slate.data.preview = preview;
          break;
        }
      }
      this.props.onUpdateViewer({ slates });
      data.preview = preview;
    }
    const response = await Actions.updateSlate({
      id: this.props.current.id,
      layoutOnly,
      autoSave,
      data,
    });

    if (!autoSave) {
      Events.hasError(response);
    }
  };

  _handleSelect = (index) =>
    Events.dispatchCustomEvent({
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
    const isOwner = this.props.current.data.ownerId === this.props.viewer.id;

    let actions = isOwner ? (
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
                  : isOwner
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
          {this.state.isFollowing ? (
            <ButtonSecondary>Unfollow</ButtonSecondary>
          ) : (
            <ButtonPrimary>Follow</ButtonPrimary>
          )}
        </div>
        <CircleButtonGray
          style={{ marginLeft: 16 }}
          onClick={(e) =>
            this._handleCopy(
              e,
              user
                ? Strings.getURLFromPath(`/${user.username}/${this.props.current.slatename}`)
                : isOwner
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
          {body}
        </ScenePageHeader>
        <span css={STYLES_MOBILE_ONLY}>{actions}</span>
        {objects && objects.length ? (
          this.props.mobile ? (
            <SlateLayoutMobile
              isOwner={isOwner}
              items={objects}
              fileNames={layouts && layouts.ver === "2.0" ? layouts.fileNames : false}
              onSelect={this._handleSelect}
            />
          ) : (
            <div style={{ marginTop: isOwner ? 24 : 48 }}>
              <SlateLayout
                link={
                  user
                    ? Strings.getURLFromPath(`/${user.username}/${this.props.current.slatename}`)
                    : isOwner
                    ? Strings.getURLFromPath(
                        `/${this.props.viewer.username}/${this.props.current.slatename}`
                      )
                    : ""
                }
                current={this.props.current}
                onUpdateViewer={this.props.onUpdateViewer}
                viewer={this.props.viewer}
                slateId={this.props.current.id}
                layout={layouts && layouts.ver === "2.0" ? layouts.layout || [] : null}
                onSaveLayout={this._handleSaveLayout}
                onSave={this._handleSave}
                isOwner={isOwner}
                fileNames={layouts && layouts.ver === "2.0" ? layouts.fileNames : false}
                preview={preview}
                onSavePreview={(preview) => this._handleSave(null, null, null, false, preview)}
                items={objects}
                onSelect={this._handleSelect}
                defaultLayout={layouts && layouts.ver === "2.0" ? layouts.defaultLayout : true}
                onAction={this.props.onAction}
              />
            </div>
          )
        ) : isOwner ? (
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
