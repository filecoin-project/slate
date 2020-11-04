import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Actions from "~/common/actions";

import { dispatchCustomEvent } from "~/common/custom-events";
import { css } from "@emotion/core";

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  margin-top: 32px;
`;

export default class SidebarCreateSlate extends React.Component {
  state = {
    name: this.props.viewer.data && this.props.viewer.data.name ? this.props.viewer.data.name : "",
    email: "",
    twitter: "",
    message: "",
    loading: false,
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });
    if (Strings.isEmpty(this.state.email)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Please provide an email address where we can reach you",
          },
        },
      });
      this.setState({ loading: false });
      return;
    }

    if (!this.state.message || !this.state.message.length) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Please provide a message",
          },
        },
      });
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.createSupportMessage({
      username: this.props.viewer.username,
      name: this.state.name,
      email: this.state.email,
      twitter: this.state.twitter,
      message: this.state.message,
      stored: Strings.bytesToSize(this.props.viewer.stats.bytes),
    });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble sending out your message right now. Please try again",
          },
        },
      });
      this.setState({ loading: false });
      return;
    }

    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          decorator: response.decorator,
        },
      });
      this.setState({ loading: false });
      return;
    }

    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message: "Message sent. You'll hear from us shortly",
          status: "INFO",
        },
      },
    });
    this.setState({ loading: false });
    this.props.onCancel();
    return;
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
          Talk to us
        </System.P>

        <System.P css={STYLES_HEADER}>Name</System.P>
        <System.Input
          name="name"
          style={{ marginTop: 16 }}
          placeholder="Name"
          value={this.state.name}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P css={STYLES_HEADER}>Email</System.P>
        <System.Input
          name="email"
          style={{ marginTop: 16 }}
          placeholder="Email"
          value={this.state.email}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P css={STYLES_HEADER}>Twitter</System.P>
        <System.Input
          name="twitter"
          style={{ marginTop: 16 }}
          placeholder="Twitter (optional)"
          value={this.state.twitter}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P css={STYLES_HEADER}>Message</System.P>

        <System.Textarea
          style={{ marginTop: 16 }}
          name="message"
          value={this.state.message}
          placeholder="Leave us your questions or feedback and we'll get back to you soon!"
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Send message
        </System.ButtonPrimary>
      </div>
    );
  }
}
