import * as React from "react";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";

import { css } from "@emotion/core";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { ProcessedText } from "~/components/system/components/Typography";
import { SlatePicker } from "~/components/core/SlatePicker";
import { Input } from "~/components/system/components/Input";
import { Textarea } from "~/components/system/components/Textarea";
import { dispatchCustomEvent } from "~/common/custom-events";
import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_SIDEBAR = css`
  width: 420px;
  padding: 80px 24px 64px 24px;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  background-color: rgba(20, 20, 20, 0.8);
  ${STYLES_NO_VISIBLE_SCROLL}

  @supports (
  (-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))
) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: rgba(150, 150, 150, 0.2);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_SIDEBAR_SECTION = css`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 16px;
`;

const STYLES_HEADING = css`
  font-family: ${Constants.font.semiBold};
  font-size: 20px;
  font-weight: 400;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 32px;
`;

const STYLES_BODY = css`
  font-size: 16px;
  line-height: 1.225;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 32px;
`;

const STYLES_SIDEBAR_INPUT_LABEL = css`
  font-size: 16px;
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.darkGray};
  margin-bottom: 8px;
`;

const STYLES_SECTION_HEADER = css`
  font-family: ${Constants.font.semiBold};
  font-size: 1.1rem;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const STYLES_ACTIONS = css`
  color: ${Constants.system.white};
  width: 100%;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  background-color: transparent;
  margin-bottom: 48px;
`;

const STYLES_ACTION = css`
  cursor: pointer;
  padding: 12px 16px;
  border-bottom: 1px solid #3c3c3c;
  display: flex;
  align-items: center;

  :hover {
    color: ${Constants.system.brand};
  }

  :last-child {
    border: none;
  }
`;

const STYLES_HIDDEN = css`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const STYLES_INPUT = {
  marginBottom: 16,
  backgroundColor: "transparent",
  boxShadow: "0 0 0 1px #3c3c3c inset",
  color: Constants.system.white,
  height: 48,
};

const STYLES_DISMISS_BOX = css`
  position: absolute;
  top: 20px;
  right: 24px;
  color: ${Constants.system.darkGray};
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
  }
`;

export default class CarouselSidebarSlate extends React.Component {
  _ref = null;

  state = {
    title: this.props.data.title ? this.props.data.title : "",
    body: this.props.data.body ? this.props.data.body : "",
    source: this.props.data.source ? this.props.data.source : "",
    author: this.props.data.author ? this.props.data.author : "",
    selected: {},
    isPublic: false,
    copyValue: "",
    showConnected: false,
    showFile: false,
    unsavedChanges: false,
  };

  componentDidMount = () => {
    if (this.props.isOwner && !this.props.external) {
      this.debounceInstance = this.debounce(this._handleSave, 3000);
      let isPublic = false;
      let selected = {};
      const id = this.props.data.id;
      for (let slate of this.props.slates) {
        if (slate.data.objects.some((o) => o.id === id)) {
          if (slate.data.public) {
            isPublic = true;
          }
          selected[slate.id] = true;
        }
      }
      this.setState({ selected, isPublic });
    }
  };

  debounce = (func, ms) => {
    let timer;

    return () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(func, ms);
    };
  };

  _handleClose = () => {
    if (this.state.unsavedChanges) {
      this._handleSave();
    }
    this.props.onClose();
  };

  _handleSave = () => {
    let data = {
      title: this.state.title,
      body: this.state.body,
      source: this.state.source,
      author: this.state.author,
    };
    this.props.onSave(data);
    this.setState({ unsavedChanges: false });
  };

  _handleCreateSlate = async () => {
    if (this.props.external) return;
    this.props.onClose();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: { files: [this.props.data], fromSlate: true },
    });
  };

  _handleChange = (e) => {
    this.debounceInstance();
    this.setState({ [e.target.name]: e.target.value, unsavedChanges: true });
  };

  _handleAdd = async (slate) => {
    if (this.props.external) return;
    if (this.state.selected[slate.id]) {
      const removeResponse = await Actions.removeFileFromSlate({
        slateId: slate.id,
        ids: [this.props.data.id],
      });
      if (!removeResponse) {
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
      if (removeResponse.error) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: removeResponse.decorator } },
        });
        return;
      }
      this.setState({
        selected: { ...this.state.selected, [slate.id]: false },
      });
    } else {
      const addResponse = await Actions.addFileToSlate({
        slate,
        data: [{ title: this.props.data.title || this.props.data.name, ...this.props.data }],
        fromSlate: true,
      });
      if (!addResponse) {
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
      if (addResponse.error) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: addResponse.decorator } },
        });
        return;
      }
      this.setState({
        selected: { ...this.state.selected, [slate.id]: true },
      });
    }
  };

  _handleDownload = () => {
    const filename = this.props.data.name || this.props.data.title;
    const uri = this.props.data.url.replace("https://undefined", "https://");
    Window.saveAs(uri, filename);
  };

  _handleCopy = (copyValue, loading) => {
    this.setState({ copyValue, loading }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  _handleSaveCopy = async (data) => {
    this.setState({ loading: "savingCopy" });
    let items = [
      {
        ownerId: data.ownerId,
        cid: data.cid || Strings.urlToCid(data.url),
      },
    ];
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
    this.setState({ loading: false });
  };

  _handleDelete = async (cid) => {
    if (this.props.external || !this.props.isOwner) return;
    this.setState({ loading: "deleting" });
    if (
      !window.confirm(
        "Are you sure you want to delete this? It will be removed from your slates too."
      )
    ) {
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.deleteBucketItems({ cids: [cid] });
    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      this.setState({ loading: false });
      return;
    }
    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: false });
    console.log("got here to end of handle delete");
  };

  _toggleAccordion = (tab) => {
    this.setState({ [tab]: !this.state[tab] });
  };

  render() {
    const elements = [];
    const { cid, url } = this.props.data;

    if (this.props.data) {
      if (this.props.isOwner) {
        elements.push(
          <React.Fragment key="sidebar-media-object-info">
            <Input
              full
              value={this.state.title}
              name="title"
              onChange={this._handleChange}
              id={`sidebar-label-title`}
              style={{
                fontSize: Constants.typescale.lvl1,
                ...STYLES_INPUT,
              }}
            />
            <Textarea
              name="body"
              placeholder="Add notes or a description..."
              value={this.state.body}
              onChange={this._handleChange}
              style={STYLES_INPUT}
            />
            <Input
              full
              value={this.state.source}
              name="source"
              placeholder="Source"
              onChange={this._handleChange}
              id={`sidebar-label-source`}
              style={STYLES_INPUT}
            />
            <Input
              full
              value={this.state.author}
              name="author"
              placeholder="Author"
              onChange={this._handleChange}
              id={`sidebar-label-author`}
              style={{ ...STYLES_INPUT, marginBottom: 24 }}
            />
          </React.Fragment>
        );
      } else {
        const hasTitle = !Strings.isEmpty(this.props.data.title || this.props.data.name);
        const hasBody = !Strings.isEmpty(this.props.data.body);
        const hasSource = !Strings.isEmpty(this.props.data.source);
        const hasAuthor = !Strings.isEmpty(this.props.data.author);
        console.log(this.props.data);

        if (hasTitle) {
          elements.push(
            <div key="sidebar-media-info-title" css={STYLES_SIDEBAR_SECTION}>
              <h1 css={STYLES_HEADING}>
                <ProcessedText dark text={this.props.data.title || this.props.data.name} />
              </h1>
            </div>
          );
        }

        if (hasBody) {
          elements.push(
            <div key="sidebar-media-info-body" css={STYLES_SIDEBAR_SECTION}>
              <p css={STYLES_BODY}>
                <ProcessedText dark text={this.props.data.body} />
              </p>
            </div>
          );
        }

        if (hasSource) {
          elements.push(
            <div key="sidebar-media-info-source" css={STYLES_SIDEBAR_SECTION}>
              <div css={STYLES_SIDEBAR_INPUT_LABEL} style={{ position: "relative" }}>
                Source:
              </div>
              <p css={STYLES_BODY} style={{ color: Constants.system.darkGray }}>
                <ProcessedText dark text={this.props.data.source} />
              </p>
            </div>
          );
        }

        if (hasAuthor) {
          elements.push(
            <div key="sidebar-media-info-author" css={STYLES_SIDEBAR_SECTION}>
              <div css={STYLES_SIDEBAR_INPUT_LABEL} style={{ position: "relative" }}>
                Author:
              </div>
              <p css={STYLES_BODY} style={{ color: Constants.system.darkGray }}>
                <ProcessedText dark text={this.props.data.author} />
              </p>
            </div>
          );
        }
      }
    }

    if (!elements.length) {
      return null;
    }
    return (
      <div css={STYLES_SIDEBAR} style={{ display: this.props.display }}>
        <div css={STYLES_DISMISS_BOX} onClick={this._handleClose}>
          <SVG.Dismiss height="24px" />
        </div>
        {elements}
        {this.props.external ? null : (
          <React.Fragment>
            <div
              css={STYLES_SECTION_HEADER}
              style={{ cursor: "pointer", marginTop: 44 }}
              onClick={() => this._toggleAccordion("showConnected")}
            >
              <span
                style={{
                  marginRight: 8,
                  transform: this.state.showConnected ? "none" : "rotate(-90deg)",
                  transition: "100ms ease transform",
                }}
              >
                <SVG.ChevronDown height="24px" display="block" />
              </span>
              <span>{this.props.isOwner ? "Connected slates" : "My slates"}</span>
            </div>
            {this.state.showConnected ? (
              <div style={{ width: "100%", margin: "24px 0 44px 0" }}>
                <SlatePicker
                  slates={this.props.slates}
                  selected={this.state.selected}
                  onAdd={this._handleAdd}
                  onCreateSlate={this._handleCreateSlate}
                  loading={this.props.loading}
                  dark
                  selectedColor={Constants.system.white}
                />
              </div>
            ) : null}
          </React.Fragment>
        )}
        <div
          css={STYLES_SECTION_HEADER}
          style={{ cursor: "pointer" }}
          onClick={() => this._toggleAccordion("showFile")}
        >
          <span
            style={{
              marginRight: 8,
              transform: this.state.showFile ? "none" : "rotate(-90deg)",
              transition: "100ms ease transform",
            }}
          >
            <SVG.ChevronDown height="24px" display="block" />
          </span>
          <span>File</span>
        </div>
        {this.state.showFile ? (
          <div css={STYLES_ACTIONS} style={{ marginTop: 24 }}>
            {this.props.isOwner ? (
              <div css={STYLES_ACTION} onClick={() => this._handleCopy(cid, "cidCopying")}>
                <SVG.CopyAndPaste height="24px" />
                <span style={{ marginLeft: 16 }}>
                  {this.state.loading === "cidCopying" ? "Copied!" : "Copy file CID"}
                </span>
              </div>
            ) : null}
            <div
              css={STYLES_ACTION}
              onClick={() =>
                this._handleCopy(
                  this.props.link
                    ? `${this.props.link}/cid:${Strings.urlToCid(this.props.data.url)}`
                    : this.props.data.url.replace("https://undefined", "https://"),
                  "urlCopying"
                )
              }
            >
              <SVG.DeepLink height="24px" />
              <span style={{ marginLeft: 16 }}>
                {this.state.loading === "urlCopying" ? "Copied!" : "Copy link"}
              </span>
            </div>
            {this.props.isOwner || this.props.external ? null : (
              <div css={STYLES_ACTION} onClick={() => this._handleSaveCopy(this.props.data)}>
                <SVG.Save height="24px" />
                <span style={{ marginLeft: 16 }}>
                  {this.state.loading === "savingCopy" ? (
                    <LoaderSpinner style={{ height: 16, width: 16 }} />
                  ) : (
                    <span>Save copy</span>
                  )}
                </span>
              </div>
            )}
            {this.props.external ? null : (
              <div css={STYLES_ACTION} onClick={this._handleDownload}>
                <SVG.Download height="24px" />
                <span style={{ marginLeft: 16 }}>
                  {this.props.saving ? (
                    <LoaderSpinner style={{ height: 16, width: 16 }} />
                  ) : (
                    <span>Download</span>
                  )}
                </span>
              </div>
            )}
            {this.props.isOwner && !this.props.isRepost ? (
              <div css={STYLES_ACTION} onClick={() => this._handleDelete(cid)}>
                <SVG.Trash height="24px" />
                {this.state.loading === "deleting" ? (
                  <LoaderSpinner style={{ height: 20, width: 20, marginLeft: 16 }} />
                ) : (
                  <span style={{ marginLeft: 16 }}>Delete</span>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        <input
          css={STYLES_HIDDEN}
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
        />
      </div>
    );
  }
}
