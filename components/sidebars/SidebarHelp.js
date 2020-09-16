import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";

import { dispatchCustomEvent } from "~/common/custom-events";
import { css } from "@emotion/react";

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  font-size: 18px;
  margin-top: 32px;
`;

export default class SidebarCreateSlate extends React.Component {
  state = {
    name:
      this.props.viewer.data && this.props.viewer.data.name
        ? this.props.viewer.data.name
        : "",
    email: "",
    message: "",
    loading: false,
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });
    if (!this.state.email || !this.state.email.length) {
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

    if (!Validations.email(this.state.email)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Please check that your email address is valid" },
        },
      });
      this.setState({ loading: false });
      return;
    }

    // const response = await this.props.onSubmit({
    //   type: "CREATE_SLATE",
    //   name: this.state.name,
    //   public: this.state.public,
    //   body: this.state.body,
    // });

    // if (!response) {
    //   dispatchCustomEvent({
    //     name: "create-alert",
    //     detail: {
    //       alert: {
    //         message:
    //           "We're having trouble sending your message right now. Please try again",
    //       },
    //     },
    //   });
    //   return;
    // }

    // if (response.error) {
    //   dispatchCustomEvent({
    //     name: "create-alert",
    //     detail: { alert: { decorator: response.decorator } },
    //   });
    //   return;
    // }

    // this.setState({ loading: false });
    // this.props.onAction({
    //   type: "NAVIGATE",
    //   value: response.slate.id,
    //   data: response.slate,
    // });
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
