import * as React from "react";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { ProcessedText } from "~/components/system/components/Typography";
import { SlatePicker } from "~/components/core/SlatePicker";
import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_SIDEBAR_INPUT = css`
  position: relative;
  padding: 12px;
`;

const STYLES_SIDEBAR_TEXTAREA = css`
  resize: none;
  box-sizing: border-box;
  line-height: 1.255;
  font-size: 16px;
  outline: 0;
  border: 0;
  background: transparent;
  width: 100%;
  white-space: pre-wrap;
  color: ${Constants.system.white};
  font-family: ${Constants.font.text};
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    display: none;
  }
`;

class SidebarInput extends React.Component {
  render() {
    return (
      <div css={STYLES_SIDEBAR_INPUT}>
        <TextareaAutoSize
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
          id={`sidebar-label-${this.props.name}`}
          placeholder={this.props.placeholder}
          style={this.props.style}
          css={STYLES_SIDEBAR_TEXTAREA}
        />
      </div>
    );
  }
}

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
  padding: 48px 24px;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
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

const STYLES_BUTTON = css`
  border-top: 1px solid #222222;
  flex-shrink: 0;
  color: ${Constants.system.white};
  width: 100%;
  padding: 16px 24px 16px 24px;
  min-height: 56px;
  font-size: 14px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  cursor: pointer;
  overflow-wrap: break-word;
  text-decoration: none;

  :hover {
    background-color: ${Constants.system.brand};
  }
`;

const STYLES_SIDEBAR_SECTION = css`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid rgba(60, 60, 60, 1);
  border-radius: 4px;
  height: 48px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const STYLES_SIDEBAR_CONTENT = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  margin-bottom: 16px;
  border: 1px solid rgba(60, 60, 60, 1);
  border-radius: 4px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_HEADING = css`
  font-family: ${Constants.font.medium};
  font-size: 16px;
  line-height: 1.225;
  font-weight: 400;
  padding: 16px 24px 24px 24px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_BODY = css`
  font-size: 16px;
  line-height: 1.225;
  padding: 24px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_SECTION_HEADER = css`
  font-family: ${Constants.font.semiBold};
  font-size: 1.1rem;
  margin-bottom: 32px;
`;

const STYLES_ACTIONS = css`
  color: ${Constants.system.white};
  width: 100%;
  border: 1px solid rgba(60, 60, 60, 1);
  border-radius: 4px;
  background-color: transparent;
  margin-bottom: 48px;
`;

const STYLES_ACTION = css`
  cursor: pointer;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(60, 60, 60, 1);
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

export default class SlateMediaObjectSidebar extends React.Component {
  _ref = null;

  state = {
    title: this.props.data.title ? this.props.data.title : "",
    body: this.props.data.body ? this.props.data.body : "",
    source: this.props.data.source ? this.props.data.source : "",
    author: this.props.data.author ? this.props.data.author : "",
    selected: {},
    isPublic: false,
    copyValue: "",
  };

  componentDidMount = () => {
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
  };

  _handleCreateSlate = async () => {
    this.props.onClose();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: { files: [this.props.data] },
    });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleAdd = (slate) => {
    if (this.state.selected[slate.id]) {
      this.props.onRemoveFromSlate({
        id: this.props.data.id,
        slate: slate,
        data: this.props.data,
      });
      this.setState({
        selected: { ...this.state.selected, [slate.id]: false },
      });
    } else {
      this.props.onAddToSlate({
        id: this.props.data.id,
        slate: slate,
        data: this.props.data,
      });
      this.setState({
        selected: { ...this.state.selected, [slate.id]: slate },
      });
    }
  };

  _handleCopy = (copyValue, loading) => {
    this.setState({ copyValue, loading }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 10000);
  };

  _handleDelete = async (cid) => {
    this.setState({ loading: "deleting" });
    if (
      !window.confirm(
        "Are you sure you want to delete this? It will be removed from your slates too."
      )
    ) {
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.deleteBucketItem({ cid });
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
    await this.props.onRehydrate();
    this.setState({ loading: false });
    dispatchCustomEvent({
      name: "remote-update-carousel",
      detail: {},
    });
  };

  render() {
    const elements = [];
    const { cid, url } = this.props.data;
    console.log(this.props);

    if (this.props.data) {
      if (this.props.isOwner) {
        elements.push(
          <React.Fragment key="sidebar-media-object-info">
            <div css={STYLES_SIDEBAR_SECTION}>
              <SidebarInput
                name="title"
                value={this.state.title}
                onChange={this._handleChange}
                style={{ fontFamily: Constants.font.medium, fontSize: 16 }}
              />
            </div>
            <div css={STYLES_SIDEBAR_CONTENT}>
              <SidebarInput
                name="body"
                placeholder="Add notes or a description..."
                value={this.state.body}
                onChange={this._handleChange}
              />
            </div>
            <div css={STYLES_SIDEBAR_SECTION}>
              <SidebarInput
                name="source"
                placeholder="Source"
                value={this.state.source}
                onChange={this._handleChange}
              />
            </div>
            <div css={STYLES_SIDEBAR_SECTION}>
              <SidebarInput
                name="author"
                placeholder="Author"
                value={this.state.author}
                onChange={this._handleChange}
              />
            </div>
          </React.Fragment>
        );
      } else {
        const hasTitle = !Strings.isEmpty(this.props.data.title);
        const hasBody = !Strings.isEmpty(this.props.data.body);
        const hasSource = !Strings.isEmpty(this.props.data.source);
        const hasAuthor = !Strings.isEmpty(this.props.data.author);

        if (hasTitle) {
          elements.push(
            <div key="sidebar-media-info-title" css={STYLES_SIDEBAR_SECTION}>
              <h1 css={STYLES_HEADING}>
                <ProcessedText text={this.props.data.title} />
              </h1>
            </div>
          );
        }

        if (hasBody || hasTitle || hasSource || hasAuthor) {
          elements.push(
            <div key="sidebar-media-info-body" css={STYLES_SIDEBAR_CONTENT}>
              <p css={STYLES_BODY}>
                <ProcessedText text={this.props.data.body} />
              </p>
            </div>
          );
        }

        if (hasSource) {
          elements.push(
            <div key="sidebar-media-info-source" css={STYLES_SIDEBAR_SECTION}>
              <div css={STYLES_SIDEBAR_INPUT_LABEL} style={{ position: "relative" }}>
                Source
              </div>
              <p css={STYLES_BODY}>
                <ProcessedText text={this.props.data.source} />
              </p>
            </div>
          );
        }

        if (hasAuthor) {
          elements.push(
            <div key="sidebar-media-info-author" css={STYLES_SIDEBAR_SECTION}>
              <div css={STYLES_SIDEBAR_INPUT_LABEL} style={{ position: "relative" }}>
                Author
              </div>
              <p css={STYLES_BODY}>
                <ProcessedText text={this.props.data.author} />
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
      <div css={STYLES_SIDEBAR}>
        {elements}
        <br />
        <div css={STYLES_SECTION_HEADER}>Connected Slates</div>
        <div css={STYLES_ACTIONS} style={{ border: `none` }}>
          <SlatePicker
            slates={this.props.slates}
            selected={this.state.selected}
            onAdd={this._handleAdd}
            onCreateSlate={this._handleCreateSlate}
            loading={this.props.loading}
            dark={true}
            selectedColor={Constants.system.white}
          />
        </div>
        <div css={STYLES_SECTION_HEADER}>File</div>
        <div css={STYLES_ACTIONS}>
          <div
            css={STYLES_ACTION}
            onClick={() => this.props.onObjectSave({ ...this.props.data, ...this.state })}
          >
            <SVG.HardDrive height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.props.saving ? (
                <LoaderSpinner style={{ height: 16, width: 16 }} />
              ) : (
                <span>Save</span>
              )}
            </span>
          </div>
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(cid, "cidCopying")}>
            <SVG.CopyAndPaste height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "cidCopying" ? "Copied!" : "Copy file CID"}
            </span>
          </div>
          <input
            css={STYLES_HIDDEN}
            ref={(c) => {
              this._ref = c;
            }}
            readOnly
            value={this.state.copyValue}
          />
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(url, "urlCopying")}>
            <SVG.DeepLink height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "urlCopying" ? "Copied!" : "Copy link"}
            </span>
          </div>
          <div css={STYLES_ACTION} onClick={() => this._handleDelete(cid)}>
            <SVG.Trash height="24px" />
            {this.state.loading === "deleting" ? (
              <LoaderSpinner style={{ height: 20, width: 20, marginLeft: 16 }} />
            ) : (
              <span style={{ marginLeft: 16 }}>Delete</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
