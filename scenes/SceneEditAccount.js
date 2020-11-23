import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as Constants from "~/common/constants";
import * as FileUtilities from "~/common/file-utilities";
import * as UserBehaviors from "~/common/user-behaviors";

import { css } from "@emotion/core";
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

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  margin-top: 32px;
  margin-bottom: 16px;
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
    changingDetails: false,
    changingAvatar: false,
    changingFilecoin: false,
    tab: 0,
  };

  _handleUpload = async (e) => {
    this.setState({ changingAvatar: true });
    let json = await UserBehaviors.uploadImage(e.target.files[0], this.props.resources);
    if (!json) {
      this.setState({ changingAvatar: false });
      return;
    }

    const cid = json.data.cid || json.data.ipfs.replace("/ipfs/", "");
    const url = Strings.getCIDGatewayURL(cid);
    let updateResponse = await Actions.updateViewer({
      data: {
        photo: Strings.getCIDGatewayURL(cid),
      },
    });

    if (!updateResponse) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now.",
          },
        },
      });
    }

    if (updateResponse.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: response.decorator,
          },
        },
      });
    }

    this.setState({ changingAvatar: false, photo: url });
  };

  _handleSaveFilecoin = async (e) => {
    this.setState({ changingFilecoin: true });

    let response = await Actions.updateViewer({
      data: {
        allow_filecoin_directory_listing: this.state.allow_filecoin_directory_listing,
        allow_automatic_data_storage: this.state.allow_automatic_data_storage,
        allow_encrypted_data_storage: this.state.allow_encrypted_data_storage,
      },
    });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now.",
          },
        },
      });
    } else if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: response.decorator,
          },
        },
      });
    }

    this.setState({ changingFilecoin: false });
  };

  _handleSave = async (e) => {
    this.setState({ changingDetails: true });

    if (!Validations.username(this.state.username)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Please include only letters and numbers in your username",
          },
        },
      });
      this.setState({ changingDetails: false });
      return;
    }

    let response = await Actions.updateViewer({
      username: this.state.username,
      data: {
        photo: this.state.photo,
        body: this.state.body,
        name: this.state.name,
      },
    });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now.",
          },
        },
      });
    } else if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: response.decorator,
          },
        },
      });
    }

    this.setState({ changingDetails: false });
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

    let response = await Actions.updateViewer({
      type: "CHANGE_PASSWORD",
      password: this.state.password,
    });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now.",
          },
        },
      });
    } else if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: response.decorator,
          },
        },
      });
    }

    this.setState({ changingPassword: false, password: "", confirm: "" });
  };

  _handleDelete = async (e) => {
    this.setState({ deleting: true });

    await Window.delay(100);

    await UserBehaviors.deleteMe();
    this.setState({ deleting: false });
  };

  _handleChange = (e) => {
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
          style={{ marginBottom: 48 }}
        />
        {this.state.tab === 0 ? (
          <div>
            <div css={STYLES_HEADER}>Your Avatar</div>

            <Avatar size={256} url={this.props.viewer.data.photo} />

            <div style={{ marginTop: 24 }}>
              <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />
              <System.ButtonPrimary
                style={{ margin: "0 16px 16px 0", width: "200px" }}
                type="label"
                htmlFor="file"
                loading={this.state.changingAvatar}
              >
                Upload avatar
              </System.ButtonPrimary>
            </div>

            <div css={STYLES_HEADER}>Display name</div>
            <System.Input
              name="name"
              value={this.state.name}
              placeholder="Your name..."
              onChange={this._handleChange}
            />

            <div css={STYLES_HEADER}>Bio</div>
            <System.Textarea
              name="body"
              value={this.state.body}
              placeholder="A bit about yourself..."
              onChange={this._handleChange}
            />

            <div style={{ marginTop: 24 }}>
              <System.ButtonPrimary
                onClick={this._handleSave}
                loading={this.state.changingDetails}
                style={{ width: "200px" }}
              >
                Save
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
        {this.state.tab === 1 ? (
          <div style={{ maxWidth: 800 }}>
            <div css={STYLES_HEADER}>
              Allow Slate to make Filecoin archive storage deals on your behalf
            </div>
            <div style={{ maxWidth: 800 }}>
              If this box is checked, then we will make Filecoin archive storage deals on your
              behalf. By default these storage deals are not encrypted and anyone can retrieve them
              from the Filecoin Network.
            </div>

            <System.CheckBox
              style={{ marginTop: 48 }}
              name="allow_filecoin_directory_listing"
              value={this.state.allow_filecoin_directory_listing}
              onChange={this._handleChange}
            >
              Show your successful deals on a directory page where others can retrieve them.
            </System.CheckBox>

            <System.CheckBox
              style={{ marginTop: 24 }}
              name="allow_automatic_data_storage"
              value={this.state.allow_automatic_data_storage}
              onChange={this._handleChange}
            >
              Allow Slate to make archive storage deals on your behalf to the Filecoin Network. You
              will get a receipt in the Filecoin section.
            </System.CheckBox>

            <System.CheckBox
              style={{ marginTop: 24 }}
              name="allow_encrypted_data_storage"
              value={this.state.allow_encrypted_data_storage}
              onChange={this._handleChange}
            >
              Force encryption on archive storage deals (only you can see retrieved data from the
              Filecoin network).
            </System.CheckBox>

            <div style={{ marginTop: 24 }}>
              <System.ButtonPrimary
                onClick={this._handleSaveFilecoin}
                loading={this.state.changingFilecoin}
                style={{ width: "200px" }}
              >
                Save
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
        {this.state.tab === 2 ? (
          <div>
            <div css={STYLES_HEADER}>Change password</div>
            <div>Passwords must be a minimum of eight characters.</div>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Your new password"
              onChange={this._handleChange}
            />
            <System.Input
              containerStyle={{ marginTop: 12 }}
              name="confirm"
              type="password"
              value={this.state.confirm}
              placeholder="Confirm password"
              onChange={this._handleChange}
            />

            <div style={{ marginTop: 24 }}>
              <System.ButtonPrimary
                onClick={this._handleChangePassword}
                loading={this.state.changingPassword}
                style={{ width: "200px" }}
              >
                Change password
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
        {this.state.tab === 3 ? (
          <div>
            <div css={STYLES_HEADER}>Change username</div>
            <div style={{ maxWidth: 800 }}>
              Username must be unique. <br />
              Changing your username will make any links to your profile or slates that you
              previously shared invalid.
            </div>
            <System.Input
              containerStyle={{ marginTop: 12 }}
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this._handleUsernameChange}
            />
            <div style={{ marginTop: 24 }}>
              <System.ButtonPrimary
                onClick={this._handleSave}
                loading={this.state.changingDetails}
                style={{ width: "200px" }}
              >
                Change my username
              </System.ButtonPrimary>
            </div>

            <div css={STYLES_HEADER} style={{ marginTop: 64 }}>
              Delete your account
            </div>
            <div style={{ maxWidth: 800 }}>
              If you choose to delete your account you will lose your Textile Hub and Powergate key.
            </div>

            <div style={{ marginTop: 24 }}>
              <System.ButtonWarning
                onClick={this._handleDelete}
                loading={this.state.deleting}
                style={{ width: "200px" }}
              >
                Delete my account
              </System.ButtonWarning>
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
