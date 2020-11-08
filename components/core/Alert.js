import * as React from "react";
import * as Constants from "~/common/constants";

import { error } from "~/common/messages";
import { css } from "@emotion/core";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_ALERT = `
  box-sizing: border-box;
  z-index: ${Constants.zindex.alert};
  position: fixed;
  top: 56px;
  width: 100%;
  color: ${Constants.system.white};
  min-height: 48px;
  padding: 12px 48px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: top 0.25s;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 12px 24px 12px 24px;
    left: 0px;
    right: 0px;
    width: 100%;
  }
`;

const STYLES_WARNING = css`
  ${STYLES_ALERT}
  background-color: ${Constants.system.red};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(255, 212, 201, 0.75);
    color: ${Constants.system.red};
  }
`;

const STYLES_INFO = css`
  ${STYLES_ALERT}
  background-color: ${Constants.system.brand};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(212, 233, 250, 0.75);
    color: ${Constants.system.brand};
  }
`;

const STYLES_MESSAGE = css`
  ${STYLES_ALERT}
  background-color: ${Constants.system.foreground};
  color: ${Constants.system.grayBlack};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(244, 244, 244, 0.75);
    color: ${Constants.system.grayBlack};
  }
`;

const STYLES_TEXT = css`
  max-width: ${Constants.sizes.mobile}px;
  width: 100%;
`;

const STYLES_MESSAGE_BOX = css`
  display: flex;
  align-items: center;
`;

export class Alert extends React.Component {
  state = {
    message: null,
    status: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-alert", this._handleCreate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-alert", this._handleCreate);
  };

  _handleCreate = (e) => {
    if (e.detail.alert) {
      if (e.detail.alert.decorator && error[e.detail.alert.decorator]) {
        this.setState({
          message: error[e.detail.alert.decorator],
          status: e.detail.alert.status || null,
        });
      } else {
        this.setState({
          message: e.detail.alert.message || "Whoops something went wrong! Please try again.",
          status: e.detail.alert.status || null,
        });
      }
      window.setTimeout(this._handleDelete, 5000);
    }
  };

  _handleDelete = (e) => {
    if (this.state.message) {
      this.setState({ message: null, status: null });
    }
  };

  render() {
    if (!this.state.message) {
      if (!this.props.fileLoading || !Object.keys(this.props.fileLoading).length) {
        if (this.props.noWarning) {
          return null;
        }

        return (
          <div css={STYLES_MESSAGE} style={this.props.style}>
            <div css={STYLES_MESSAGE_BOX} style={{ fontSize: 14 }}>
              Please don't upload sensitive information to Slate yet. Private storage is coming
              soon.
            </div>
          </div>
        );
      }
      let total = Object.values(this.props.fileLoading).filter((upload) => {
        return !upload.cancelled;
      }).length;
      let uploaded =
        Object.values(this.props.fileLoading).filter((upload) => {
          return upload.loaded === upload.total;
        }).length || 0;

      return (
        <div
          css={STYLES_INFO}
          style={{ cursor: "pointer", ...this.props.style }}
          onClick={() =>
            this.props.onAction({
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_FILE_TO_BUCKET",
            })
          }
        >
          <div css={STYLES_MESSAGE_BOX}>
            <div style={{ height: 16, width: 16, marginRight: 16 }}>
              <LoaderSpinner style={{ height: 16, width: 16 }} />
            </div>
            <span css={STYLES_TEXT}>
              {uploaded} / {total} file
              {total === 1 ? "" : "s"} uploading{" "}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div
        css={this.state.status === "INFO" ? STYLES_INFO : STYLES_WARNING}
        style={this.props.style}
      >
        {this.state.message}
      </div>
    );
  }
}
