import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Avatar from "~/components/core/Avatar";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const delay = (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );

export default class SceneEditAccount extends React.Component {
  state = { name: this.props.viewer.name, deleting: false };

  _handleUpload = async (e) => {
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      alert("Something went wrong");
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

    await fetch(`/_/upload/avatar`, options);
  };

  _handleSave = async (e) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ local: { name: this.state.name } }),
    };

    await fetch(`/_/local-settings`, options);
  };

  _handleDelete = async (e) => {
    this.setState({ deleting: true });

    await delay(100);

    const response = await this.props.onDeleteYourself();
    if (!response) {
      this.setState({ deleting: false });
    }
  };

  _handleChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state.deleting);

    return (
      <ScenePage>
        <System.H1>Account</System.H1>

        <System.DescriptionGroup
          style={{ marginTop: 48 }}
          label="Avatar image"
          description="This image will appear in various lists."
        />

        <Avatar
          style={{ marginTop: 24 }}
          size={256}
          url={this.props.viewer.photoURL}
        />

        <div style={{ marginTop: 24 }}>
          <input
            css={STYLES_FILE_HIDDEN}
            type="file"
            id="file"
            onChange={this._handleUpload}
          />
          <System.ButtonPrimary
            style={{ margin: "0 16px 16px 0" }}
            type="label"
            htmlFor="file"
          >
            Upload
          </System.ButtonPrimary>
        </div>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          label="Name"
          description="The name of your Filecoin Client can be seen by your peers."
          name="name"
          value={this.state.name}
          placeholder="Name"
          onChange={this._handleChange}
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary onClick={this._handleSave}>
            Save
          </System.ButtonPrimary>
        </div>

        <System.DescriptionGroup
          style={{ marginTop: 48 }}
          label="Delete your account"
          description="If you choose to delete your account you will lose your Textile Hub and Powergate key. Make sure you back those up before deleting your account."
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary
            onClick={this._handleDelete}
            loading={this.state.deleting}
          >
            Delete my account
          </System.ButtonPrimary>
        </div>
      </ScenePage>
    );
  }
}
