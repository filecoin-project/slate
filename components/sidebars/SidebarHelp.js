import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
`;

const STYLES_GROUPING = css`
  width: 100%;
  border: 1px solid rgba(196, 196, 196, 0.5);
  background-color: ${Constants.system.white};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
`;

const STYLES_TEXT = css`
  color: ${Constants.system.textGray};
  font-size: ${Constants.typescale.lvl0};
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
      Events.dispatchMessage({ message: "Please provide an email address where we can reach you" });
      this.setState({ loading: false });
      return;
    }

    if (!this.state.message || !this.state.message.length) {
      Events.dispatchMessage({ message: "Please provide a message" });
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

    if (Events.hasError(response)) {
      this.setState({ loading: false });
      return;
    }

    Events.dispatchMessage({
      message: "Message sent. You'll hear from us shortly",
      status: "INFO",
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
            marginBottom: 36,
          }}
        >
          Talk to us
        </System.P>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Your Info</System.P>
          <System.P css={STYLES_TEXT} style={{ marginTop: 12 }}>
            Let us know how we can reach you!
          </System.P>
          <System.Input
            name="name"
            style={{ marginTop: 12 }}
            placeholder="Name"
            value={this.state.name}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />

          <System.Input
            name="email"
            style={{ marginTop: 8 }}
            placeholder="Email"
            value={this.state.email}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />
          <System.Input
            name="twitter"
            style={{ marginTop: 8 }}
            placeholder="Twitter (optional)"
            value={this.state.twitter}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Message</System.P>

          <System.Textarea
            style={{ marginTop: 16 }}
            name="message"
            value={this.state.message}
            placeholder="Leave us your questions or feedback and we'll get back to you soon!"
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />
        </div>

        <System.ButtonPrimary full onClick={this._handleSubmit} loading={this.state.loading}>
          Send message
        </System.ButtonPrimary>

        <System.P
          css={STYLES_TEXT}
          style={{ cursor: "pointer", marginTop: 24 }}
          onClick={() => this.props.onAction({ type: "SIDEBAR", value: "SIDEBAR_FAQ" })}
        >
          In the meantime, feel free to view our FAQ!
        </System.P>
      </div>
    );
  }
}
