import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as FileUtilities from "~/common/file-utilities";

import { css } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";
import { TabGroup } from "~/components/core/TabGroup";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
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

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

export default class SceneEditAccount extends React.Component {
  state = {
    username: this.props.viewer.username,
    password: "",
    confirm: "",
    body: this.props.viewer.data.body,
    photo: this.props.viewer.data.photo,
    name: this.props.viewer.data.name,
    deleting: false,
    allow_filecoin_directory_listing: this.props.viewer.allow_filecoin_directory_listing,
    allow_automatic_data_storage: this.props.viewer.allow_automatic_data_storage,
    allow_encrypted_data_storage: this.props.viewer.allow_encrypted_data_storage,
    changingPassword: false,
    changingUsername: false,
    changingAvatar: false,
    changingFilecoin: false,
    tab: 0,
  };

  _handleUpload = async (e) => {
    this.setState({ changingAvatar: true });
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Something went wrong with the upload. Please try again",
          },
        },
      });
      return;
    }

    // NOTE(jim): Only allow images for account avatar.
    if (!file.type.startsWith("image/")) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Upload failed. Only images and gifs are allowed" },
        },
      });
      return;
    }

    const response = await FileUtilities.upload({ file, routes: this.props.resources });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "We're having trouble connecting right now" },
        },
      });
      this.setState({ changingAvatar: false });
      return;
    }

    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: json.decorator } },
      });
      this.setState({ changingAvatar: false });
      return;
    }

    const { json } = response;

    const cid = json.data.ipfs.replace("/ipfs/", "");
    const url = Strings.getCIDGatewayURL(cid);
    await Actions.updateViewer({
      data: {
        photo: Strings.getCIDGatewayURL(cid),
        body: this.state.body,
        name: this.state.name,
      },
    });

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

    this.setState({ changingBio: false });
  };

  _handleSaveFilecoin = async (e) => {
    this.setState({ changingFilecoin: true });

    await Actions.updateViewer({
      data: {
        photo: this.state.photo,
        body: this.state.body,
        name: this.state.name,
        allow_filecoin_directory_listing: this.state.allow_filecoin_directory_listing,
        allow_automatic_data_storage: this.state.allow_automatic_data_storage,
        allow_encrypted_data_storage: this.state.allow_encrypted_data_storage,
      },
    });

    this.setState({ changingFilecoin: false });
  };

  _handleSave = async (e) => {
    this.setState({ changingUsername: true });

    if (!Validations.username(this.state.username)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Please include only letters and numbers in your username",
          },
        },
      });
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

    this.setState({ changingUsername: false });
  };

  _handleUsernameChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };

  _handleChangePassword = async (e) => {
    this.setState({ changingPassword: true });
    if (this.state.password !== this.state.confirm) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { message: "Passwords did not match" } },
      });
      this.setState({ changingPassword: false });
      return;
    }

    if (!Validations.password(this.state.password)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Password length must be more than 8 characters" },
        },
      });
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

    await Window.delay(100);

    const response = await this.props.onDeleteYourself();
    this.setState({ deleting: false });
  };

  _handleChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleCheckboxChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const profileURL = `https://slate.host/${this.state.username}`;

    return (
      <ScenePage>
        <ScenePageHeader title="Settings" />
        <TabGroup
          tabs={["Profile", "Data Storage", "Security", "Account"]}
          value={this.state.tab}
          onChange={(value) => this.setState({ tab: value })}
        />
        {this.state.tab === 0 ? (
          <div>
            <System.DescriptionGroup
              style={{ marginTop: 48 }}
              label="Avatar image"
              description="This image will appear in various lists."
            />

            <Avatar style={{ marginTop: 24 }} size={256} url={this.props.viewer.data.photo} />

            <div style={{ marginTop: 24 }}>
              <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />
              <System.ButtonPrimary
                style={{ margin: "0 16px 16px 0" }}
                type="label"
                htmlFor="file"
                loading={this.state.changingAvatar}
              >
                Upload avatar
              </System.ButtonPrimary>
            </div>
            <System.Input
              containerStyle={{ marginTop: 64 }}
              label="Username"
              description={
                <React.Fragment>
                  This is your username on Slate. Your username is unique and used for your profile
                  URL{" "}
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
              <System.ButtonPrimary onClick={this._handleSaveBio} loading={this.state.changingBio}>
                Save
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
        {this.state.tab === 1 ? (
          <div>
            <System.DescriptionGroup
              style={{ marginTop: 48 }}
              label="Allow Slate to make Filecoin archive storage deals on your behalf"
              description="If this box is checked, then we will make Filecoin archive storage deals on your behalf. By default these storage deals are not encrypted and anyone can retrieve them from the Filecoin Network."
            />

            <System.CheckBox
              style={{ marginTop: 48 }}
              name="allow_filecoin_directory_listing"
              value={this.state.allow_filecoin_directory_listing}
              onChange={this._handleCheckboxChange}
            >
              Show your successful deals on a directory page where others can retrieve them.
            </System.CheckBox>

            <System.CheckBox
              style={{ marginTop: 24 }}
              name="allow_automatic_data_storage"
              value={this.state.allow_automatic_data_storage}
              onChange={this._handleCheckboxChange}
            >
              Allow Slate to make archive storage deals on your behalf to the Filecoin Network. You
              will get a receipt in the Filecoin section.
            </System.CheckBox>

            <System.CheckBox
              style={{ marginTop: 24 }}
              name="allow_encrypted_data_storage"
              value={this.state.allow_encrypted_data_storage}
              onChange={this._handleCheckboxChange}
            >
              Force encryption on archive storage deals (only you can see retrieved data from the
              Filecoin network).
            </System.CheckBox>

            <div style={{ marginTop: 24 }}>
              <System.ButtonPrimary
                onClick={this._handleSaveFilecoin}
                loading={this.state.changingFilecoin}
              >
                Save
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
        {this.state.tab === 2 ? (
          <div>
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
          </div>
        ) : null}
        {this.state.tab === 3 ? (
          <div>
            <System.DescriptionGroup
              style={{ marginTop: 48 }}
              label="Delete your account"
              description="If you choose to delete your account you will lose your Textile Hub and Powergate key. Make sure you back those up before deleting your account."
            />

            <div style={{ marginTop: 24 }}>
              <System.ButtonPrimary onClick={this._handleDelete} loading={this.state.deleting}>
                Delete my account
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          tabIndex="-1"
          css={STYLES_COPY_INPUT}
        />{" "}
      </ScenePage>
    );
  }
}
