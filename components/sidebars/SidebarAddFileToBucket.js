import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";

import { css } from "@emotion/react";

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

const STYLES_IMAGE_PREVIEW = css`
  display: block;
  width: 100%;
  margin-top: 48px;
`;

export default class SidebarAddFileToBucket extends React.Component {
  _handleUpload = async (e) => {
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      alert("TODO: Something went wrong");
      return;
    }

    console.log(file);

    const isAllowed = Validations.isFileTypeAllowed(file.type);
    if (!isAllowed) {
      alert("TODO: File type is not allowed, yet.");
      return;
    }

    await this.props.onSetFile({
      file,
      slate: this.props.data && this.props.data.slateId ? { id: this.props.data.slateId } : null,
    });
  };

  render() {
    return (
      <React.Fragment>
        <System.P style={{ fontFamily: Constants.font.semiBold }}>Upload data</System.P>
        <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />

        {this.props.data && this.props.data.decorator === "SLATE" ? (
          <System.P style={{ marginTop: 24 }}>
            This will add data to your Slate named <strong>{this.props.data.slatename}</strong>.
          </System.P>
        ) : null}

        <System.ButtonPrimary
          full
          type="label"
          htmlFor="file"
          style={{ marginTop: 24 }}
          loading={this.props.fileLoading}
        >
          Add file
        </System.ButtonPrimary>

        {!this.props.fileLoading ? (
          <System.ButtonSecondary
            full
            style={{ marginTop: 16 }}
            onClick={this.props.onCancel}
          >
            Cancel
          </System.ButtonSecondary>
        ) : null}
      </React.Fragment>
    );
  }
}
