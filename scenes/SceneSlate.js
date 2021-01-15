import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Events from "~/common/custom-events";

import { LoaderSpinner } from "~/components/system/components/Loaders";
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

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;
`;

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

export default class SceneSlate extends React.Component {
  state = {
    notFound: false,
  };

  componentDidMount = async () => {
    await this.fetchSlate();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.data?.id && prevProps.data?.id && this.props.data.id !== prevProps.data.id) {
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
      await Window.delay(250);
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
    if (!this.props.data?.data?.objects) {
      return (
        <ScenePage>
          <div css={STYLES_LOADER}>
            <LoaderSpinner />
          </div>
        </ScenePage>
      );
    }
    return <SlatePage {...this.props} current={this.props.data} />;
  }
}

class SlatePage extends React.Component {
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
  componentDidUpdate(prevProps) {
    if (
      prevProps.current.id !== this.props.current.id ||
      this.props.viewer.subscriptions !== prevProps.viewer.subscriptions
    ) {
      this.setState({
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
                      scene: "PROFILE",
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
