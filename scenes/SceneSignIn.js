import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";

import { css } from "@emotion/react";

import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";

const delay = (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  text-align: center;
  font-size: 1rem;

  @media (max-width: 880px) {
    :after {
      content: "We're sorry! This application is only supported on desktop or desktop web.";
      z-index: 999999;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px;
      color: ${Constants.system.white};
      background-color: ${Constants.system.pitchBlack};
    }
  }
`;

const STYLES_MIDDLE = css`
  position: relative;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 24px;
`;

const STYLES_POPOVER = css`
  padding: 32px;
  border-radius: 4px;
  max-width: 336px;
  width: 100%;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
`;

const STYLES_CODE_PREVIEW = css`
  color: ${Constants.system.black};
  font-family: ${Constants.font.code};
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

export default class SceneSignIn extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    await delay(100);

    if (!Validations.username(this.state.username)) {
      alert(
        "TODO: Your username was invalid, only characters and numbers allowed."
      );
      this.setState({ loading: false });
      return;
    }

    if (!Validations.password(this.state.password)) {
      alert("TODO: Your password must be at least 8 characters.");
      return;
    }

    const response = await this.props.onAuthenticate({
      username: this.state.username,
      password: this.state.password,
    });

    console.log("AUTH_RESPONSE", response);

    if (!response || response.error) {
      alert("TODO: Failed to authenticate message.");
      this.setState({ loading: false });
      return;
    }

    return this.props.onNavigateTo({ id: 1 });
  };

  render() {
    let popover = (
      <div css={STYLES_POPOVER}>
        <System.H3>Welcome</System.H3>
        <System.P style={{ marginTop: 8, marginBottom: 32 }}>
          Sign in to manage your data, slates, and profile.
        </System.P>

        <System.Input
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this._handleChange}
        />
        <div css={STYLES_CODE_PREVIEW} style={{ marginTop: 8 }}>
          Characters + numbers only
        </div>

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />
        <div css={STYLES_CODE_PREVIEW} style={{ marginTop: 8 }}>
          At least 8 characters
        </div>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={!this.state.loading ? this._handleSubmit : () => {}}
          loading={this.state.loading}
        >
          Sign in
        </System.ButtonPrimary>
      </div>
    );

    return (
      <div css={STYLES_ROOT}>
        <WebsitePrototypeHeader />
        <div css={STYLES_MIDDLE}>{popover}</div>
        <WebsitePrototypeFooter />
      </div>
    );
  }
}
