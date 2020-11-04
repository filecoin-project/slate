import * as React from "react";
import * as Constants from "~/common/constants";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";

import { css } from "@emotion/core";
import { dispatchCustomEvent } from "~/common/custom-events";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  padding: 24px;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid ${Constants.system.border};
  max-width: 320px;
  width: 100%;
`;

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_FOCUS = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

const STYLES_ITEM = css`
  margin-top: 16px;
`;

export class CreateFilecoinStorageDeal extends React.Component {
  static defaultProps = {
    onSubmit: () => {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Filecoin storage deals are still under development",
          },
        },
      });
    },
  };

  state = { file: null };

  _handleUpload = (e) => {
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Something went wrong. Please try again" },
        },
      });
      return;
    }

    this.setState({ file });
  };

  _handleSubmit = (e) => {
    this.props.onSubmit({ file });
  };

  render() {
    return (
      <div css={STYLES_CONTAINER}>
        <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />
        {this.state.file ? (
          <div style={{ marginBottom: 24 }}>
            <div css={STYLES_ITEM}>
              <div css={STYLES_FOCUS}>{this.state.file.name}</div>
              <div css={STYLES_SUBTEXT}>Name</div>
            </div>

            <div css={STYLES_ITEM}>
              <div css={STYLES_FOCUS}>{this.state.file.size}</div>
              <div css={STYLES_SUBTEXT}>File size</div>
            </div>
          </div>
        ) : null}
        <ButtonSecondary full type="label" htmlFor="file">
          Add file
        </ButtonSecondary>
        {this.state.file ? (
          <ButtonPrimary full style={{ marginTop: 24 }} onClick={this._handleSubmit}>
            Make storage deal
          </ButtonPrimary>
        ) : null}
      </div>
    );
  }
}
