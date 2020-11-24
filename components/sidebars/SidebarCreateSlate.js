import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Actions from "~/common/actions";

import { dispatchCustomEvent } from "~/common/custom-events";
import { css } from "@emotion/core";

const SLATE_LIMIT = 50;

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-top: 8px;
`;

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  margin-top: 32px;
`;

export default class SidebarCreateSlate extends React.Component {
  state = {
    name: "",
    public: true,
    body: "",
    loading: false,
  };

  _handleSubmit = async () => {
    if (this.props.viewer.slates.length >= SLATE_LIMIT) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: `You have reached the limit of ${SLATE_LIMIT} Slates!`,
          },
        },
      });
      return;
    }

    this.setState({ loading: true });

    if (!Validations.slatename(this.state.name)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Please provide a name between 1-48 characters." },
        },
      });
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.createSlate({
      name: this.state.name,
      public: this.state.public,
      body: this.state.body,
    });

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

    if (this.props.sidebarData && this.props.sidebarData.files) {
      let data = this.props.sidebarData.files.map((file) => {
        return { title: file.title || file.name, ...file };
      });
      const addResponse = await Actions.addFileToSlate({
        slate: response.slate,
        data,
        fromSlate: this.props.sidebarData.fromSlate,
      });

      if (!addResponse) {
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

      if (addResponse.error) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: response.decorator } },
        });
        this.setState({ loading: false });
        return;
      }

      const { added, skipped } = addResponse;
      let message = Strings.formatAsUploadMessage(added, skipped, true);
      if (message) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: { message, status: !added ? null : "INFO" },
          },
        });
      }
    }

    await this.setState({ loading: false });
    window.setTimeout(
      () =>
        this.props.onAction({
          type: "NAVIGATE",
          value: response.slate.id,
        }),
      200
    );
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: "64px",
          }}
        >
          Create slate
        </System.P>

        <System.P css={STYLES_HEADER}>Name</System.P>
        <System.Input
          name="name"
          style={{ marginTop: 12 }}
          placeholder="Slate name..."
          value={this.state.name}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P style={{ marginTop: 12 }}>
          Your slate URL will be:{" "}
          <a
            href={`${this.props.viewer.username}/${Strings.createSlug(this.state.name)}`}
            target="_blank"
          >
            https://slate.host/
            {this.props.viewer.username}/{Strings.createSlug(this.state.name)}
          </a>
        </System.P>

        <System.P css={STYLES_HEADER}>Description</System.P>

        <System.Textarea
          style={{ marginTop: 12 }}
          name="body"
          value={this.state.body}
          placeholder="Slate description..."
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P css={STYLES_HEADER} style={{ marginTop: 48 }}>
          Privacy
        </System.P>
        <div css={STYLES_GROUP}>
          <System.P style={{ marginRight: 16 }}>
            {this.state.public
              ? "Public. Anyone can search for and view this slate."
              : "Private. Only you can view this slate."}
          </System.P>
          <System.Toggle name="public" onChange={this._handleChange} active={this.state.public} />
        </div>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Create {this.state.name}
        </System.ButtonPrimary>
      </div>
    );
  }
}
