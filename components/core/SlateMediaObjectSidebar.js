import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_SIDEBAR_INPUT = css`
  position: relative;
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
  padding: 48px 24px 24px 24px;
  color: ${Constants.system.white};
  font-family: ${Constants.font.text};
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_SIDEAR_INPUT_LABEL = css`
  font-family: ${Constants.font.code};
  letter-spacing: 0.1px;
  color: #999;
  font-size: 10px;
  text-transform: uppercase;
  width: 100%;
  position: absolute;
  padding: 16px 24px 0px 24px;
`;

class SidebarInput extends React.Component {
  render() {
    return (
      <div css={STYLES_SIDEBAR_INPUT}>
        <label for={`sidebar-label-${this.props.name}`} css={STYLES_SIDEAR_INPUT_LABEL}>
          {this.props.name}
        </label>
        <TextareaAutoSize
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
          id={`sidebar-label-${this.props.name}`}
          placeholder="..."
          style={this.props.style}
          css={STYLES_SIDEBAR_TEXTAREA}
        />
      </div>
    );
  }
}

const STYLES_SIDEBAR = css`
  width: 320px;
  flex-shrink: 0;
  height: 100%;
  background-color: ${Constants.system.pitchBlack};
  border-left: 1px solid #222;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

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
`;

const STYLES_SIDEBAR_CONTENT = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default class SlateMediaObjectSidebar extends React.Component {
  state = this.props.data
    ? {
        title: this.props.data.title ? this.props.data.title : "",
        body: this.props.data.body ? this.props.data.body : "",
        source: this.props.data.source ? this.props.data.source : "",
        author: this.props.data.author ? this.props.data.author : "",
      }
    : { title: "", body: "", source: "", author: "" };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const elements = [];

    if (this.props.onObjectSave) {
      elements.push(
        <React.Fragment key="sidebar-media-object-info">
          <div css={STYLES_SIDEBAR_SECTION}>
            <SidebarInput
              name="title"
              value={this.state.title}
              onChange={this._handleChange}
              style={{ fontFamily: Constants.font.medium, fontSize: 20 }}
            />
          </div>
          <div css={STYLES_SIDEBAR_CONTENT} style={{ borderTop: `1px solid #222222` }}>
            <SidebarInput name="body" value={this.state.body} onChange={this._handleChange} />
          </div>
          <div css={STYLES_SIDEBAR_SECTION} style={{ borderTop: `1px solid #222222` }}>
            <SidebarInput name="source" value={this.state.source} onChange={this._handleChange} />
          </div>
          <div css={STYLES_SIDEBAR_SECTION} style={{ borderTop: `1px solid #222222` }}>
            <SidebarInput name="author" value={this.state.author} onChange={this._handleChange} />
          </div>{" "}
        </React.Fragment>
      );

      elements.push(
        <span
          key="sidebar-media-save-button"
          css={STYLES_BUTTON}
          onClick={() => this.props.onObjectSave({ ...this.props.data, ...this.state })}>
          {this.props.saving ? (
            <LoaderSpinner style={{ height: 16, width: 16 }} />
          ) : (
            <span>Save&nbsp;&nbsp;&nbsp;⭢</span>
          )}
        </span>
      );
    }

    if (this.props.cid) {
      elements.push(
        <a
          key="sidebar-media-open-file"
          css={STYLES_BUTTON}
          href={`https://hub.textile.io/ipfs/${this.props.cid}`}
          target="_blank">
          Open file in a new browser tab &nbsp;&nbsp;⭢
        </a>
      );

      elements.push(
        <a
          key="sidebar-media-download-file"
          css={STYLES_BUTTON}
          href={`https://hub.textile.io/ipfs/${this.props.cid}`}
          target="_blank"
          download={this.props.cid}>
          Download file &nbsp;&nbsp;⭢
        </a>
      );
    }

    if (this.props.onDelete) {
      <span key="sidebar-media-object-delete" css={STYLES_BUTTON} onClick={() => this.props.onDelete(this.props.id)}>
        {this.props.loading ? (
          <LoaderSpinner style={{ height: 16, width: 16 }} />
        ) : (
          <span>Delete Slate object&nbsp;&nbsp;&nbsp;⭢</span>
        )}
      </span>;
    }

    if (!elements.length) {
      return null;
    }

    return <div css={STYLES_SIDEBAR}>{elements}</div>;
  }
}
