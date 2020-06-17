import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as System from "~/components/system";

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
  font-family: "inter-medium";
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: "inter-semi-bold";
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

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "Anywhere" },
  { value: "2", name: "China" },
  { value: "3", name: "Russia" },
  { value: "4", name: "USA" },
];

const SELECT_MENU_MAP = {
  "1": "Anywhere",
  "2": "China",
  "3": "Russia",
  "4": "USA",
};

export default class SidebarFileStorageDeal extends React.Component {
  state = {
    file: null,
    settings_cold_default_duration: this.props.viewer
      .settings_cold_default_duration,
    settings_cold_default_replication_factor: this.props.viewer
      .settings_cold_default_replication_factor,
  };

  _handleUpload = async (e) => {
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      alert("Something went wrong");
      return;
    }

    let data = new FormData();
    data.append("image", file);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    };

    const response = await fetch(`/_/storage/${file.name}`, options);
    const json = await response.json();

    if (json && json.success) {
      this.setState({ file });
    }
  };

  _handleMakeDeal = async (src) => {
    console.log(src);

    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ src }),
    };

    const response = await fetch("/_/deals/storage", options);
    const json = await response.json();
    return json;
  };

  _handleSubmit = async (e) => {
    e.persist();

    const path = `/public/static/files/${this.state.file.name}`;
    await this._handleMakeDeal(path);

    await this.props.onSubmit({});
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let addresses = {};
    let lastAddress;

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.address] = a;
      lastAddress = a.address;
    });

    const currentAddress = this.props.selected.address
      ? addresses[this.props.selected.address]
      : addresses[lastAddress];

    return (
      <React.Fragment>
        <System.P style={{ fontFamily: "inter-semi-bold" }}>
          Upload a file to the network
        </System.P>
        <input
          css={STYLES_FILE_HIDDEN}
          type="file"
          id="file"
          onChange={this._handleUpload}
        />

        {this.state.file ? (
          <div>
            <img
              src={`/static/files/${this.state.file.name}`}
              css={STYLES_IMAGE_PREVIEW}
            />

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

        <System.ButtonSecondaryFull
          type="label"
          htmlFor="file"
          style={{ marginTop: 24 }}
        >
          Add file
        </System.ButtonSecondaryFull>

        {this.state.file ? (
          <System.Input
            containerStyle={{ marginTop: 48 }}
            label="Deal duration"
            name="settings_cold_default_duration"
            placeholder="Type in epochs (~25 seconds)"
            type="number"
            value={this.state.settings_cold_default_duration}
            onChange={this._handleChange}
          />
        ) : null}

        {this.state.file ? (
          <System.Input
            containerStyle={{ marginTop: 24 }}
            label="Replication factor"
            name="settings_cold_default_replication_factor"
            value={this.state.settings_cold_default_replication_factor}
            onChange={this._handleChange}
          />
        ) : null}

        {this.state.file ? (
          <System.SelectMenuFull
            containerStyle={{ marginTop: 24 }}
            name="address"
            label="Payment address"
            value={this.props.selected.address}
            category="address"
            onChange={this.props.onSelectedChange}
            options={this.props.viewer.addresses}
          >
            {currentAddress.name}
          </System.SelectMenuFull>
        ) : null}

        {this.state.file ? (
          <System.ButtonPrimaryFull
            style={{ marginTop: 48 }}
            onClick={this._handleSubmit}
          >
            Make storage deal
          </System.ButtonPrimaryFull>
        ) : null}
      </React.Fragment>
    );
  }
}
