import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as FileUtilities from "~/common/file-utilities";

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
  state = {
    username: this.props.viewer.username,
    password: "",
    confirm: "",
    body: this.props.viewer.data.body,
    photo: this.props.viewer.data.photo,
    name: this.props.viewer.data.name,
    deleting: false,
    changingPassword: false,
    changingUsername: false,
    changingAvatar: false,
  };

  _handleUpload = async (e) => {
    this.setState({ changingAvatar: true });
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      alert("TODO: Something went wrong");
      return;
    }

    // NOTE(jim): Only allow images for account avatar.
    if (!file.type.startsWith("image/")) {
      alert("TODO: Error message for not an image.");
      return;
    }

    const json = await FileUtilities.upload({ file });

    if (json.error) {
      alert("TODO: Image already exists in bucket error message");
      this.setState({ changingAvatar: false });
      return;
    }

    const cid = json.data.ipfs.replace("/ipfs/", "");
    const url = Strings.getCIDGatewayURL(cid);
    await Actions.updateViewer({
      data: {
        photo: Strings.getCIDGatewayURL(cid),
        body: this.state.body,
        name: this.state.name,
      },
    });

    await this.props.onRehydrate();

    this.setState({ changingAvatar: false, photo: url });
  };

  _handleSaveBio = async (e) => {
    this.setState({ changingBio: true });

    await Actions.updateViewer({
      data: {
        photo: this.state.photo,
        body: this.state.body,
        name: this.state.name,
      },
    });

    await this.props.onRehydrate();
    this.setState({ changingBio: false });
  };

  _handleSave = async (e) => {
    this.setState({ changingUsername: true });

    if (!Validations.username(this.state.username)) {
      alert("TODO: Not a valid username");
      this.setState({ changingUsername: false });
      return;
    }

    await Actions.updateViewer({
      username: this.state.username,
      data: {
        photo: this.state.photo,
        body: this.state.body,
        name: this.state.name,
      },
    });

    await this.props.onRehydrate();
    this.setState({ changingUsername: false });
  };

  _handleUsernameChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };

  _handleChangePassword = async (e) => {
    this.setState({ changingPassword: true });
    if (this.state.password !== this.state.confirm) {
      alert("TODO: Error message for non-matching passwords");
      this.setState({ changingPassword: false });
      return;
    }

    if (!Validations.password(this.state.password)) {
      alert("TODO: Not a valid password");
      this.setState({ changingPassword: false });
      return;
    }

    await Actions.updateViewer({
      type: "CHANGE_PASSWORD",
      password: this.state.password,
    });

    this.setState({ changingPassword: false, password: "", confirm: "" });
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
    const profileURL = `https://slate.host/${this.state.username}`;

    return (
      <ScenePage>
        <System.H1>Account Settings</System.H1>

        <System.DescriptionGroup
          style={{ marginTop: 48 }}
          label="Avatar image"
          description="This image will appear in various lists."
        />

        <Avatar
          style={{ marginTop: 24 }}
          size={256}
          url={this.props.viewer.data.photo}
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
            loading={this.state.changingAvatar}
          >
            Pick avatar
          </System.ButtonPrimary>
        </div>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          label="Username"
          description={
            <React.Fragment>
              This is your username on Slate. Your username is unique and used
              for your profile URL{" "}
              <a href={profileURL} target="_blank">
                {profileURL}
              </a>
            </React.Fragment>
          }
          name="username"
          value={this.state.username}
          placeholder="Username"
          onChange={this._handleUsernameChange}
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary
            onClick={this._handleSave}
            loading={this.state.changingUsername}
          >
            Change username
          </System.ButtonPrimary>
        </div>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          label="Name"
          description={`This is how your name will be publicly shown.`}
          name="name"
          value={this.state.name}
          placeholder="Your name"
          onChange={this._handleChange}
        />

        <System.DescriptionGroup label="Bio" style={{ marginTop: 24 }} />
        <System.Textarea
          style={{ marginTop: 24 }}
          label="Bio"
          name="body"
          value={this.state.body}
          placeholder="A user on Slate."
          onChange={this._handleChange}
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary
            onClick={this._handleSaveBio}
            loading={this.state.changingBio}
          >
            Update information
          </System.ButtonPrimary>
        </div>

        <System.DescriptionGroup
          style={{ marginTop: 48 }}
          label="Reset password"
          description="Your new password must be a minimum of eight characters."
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="New password"
          name="password"
          type="password"
          value={this.state.password}
          placeholder="Your new password"
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Confirm password"
          name="confirm"
          type="password"
          value={this.state.confirm}
          placeholder="Confirm it!"
          onChange={this._handleChange}
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary
            onClick={this._handleChangePassword}
            loading={this.state.changingPassword}
          >
            Change password
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
