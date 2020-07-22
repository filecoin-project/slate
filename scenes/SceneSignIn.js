import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

const delay = (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );

const STYLES_PAGE = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  height: 100vh;
  padding: 24px;
`;

const STYLES_POPOVER = css`
  padding: 32px;
  border-radius: 4px;
  max-width: 336px;
  width: 100%;
  background: ${Constants.system.white};
`;

const STYLES_POPOVER_CARD = css`
  max-width: 280px;
  width: 100%;
  background: ${Constants.system.pitchBlack};
  border-radius: 24px;
`;

const STYLES_POPOVER_CARD_IMAGE = css`
  display: block;
  background-position: 50% 50%;
  background-size: cover;
  background-image: url("/static/social.png");
  border-radius: 24px;
  width: 100%;
  height: 280px;
`;

const STYLES_CODE_PREVIEW = css`
  color: ${Constants.system.white};
  font-family: ${Constants.font.code};
  font-size: 12px;
  text-transform: uppercase;
  padding: 24px;
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

    // TODO(jim):
    // Lets add some proper error messages here.
    if (Strings.isEmpty(this.state.username)) {
      alert("TODO: No username");
      return;
    }

    if (Strings.isEmpty(this.state.password)) {
      alert("TODO: No password");
      return;
    }

    const response = await this.props.onAuthenticate({
      username: this.state.username,
      password: this.state.password,
    });

    console.log("AUTH_RESPONSE", response);

    if (!response || response.error) {
      alert("TODO: Failed to authenticate message.");
      return;
    }

    return this.props.onNavigateTo({ id: 1 });
  };

  render() {
    let element = (
      <div css={STYLES_POPOVER_CARD}>
        <div css={STYLES_POPOVER_CARD_IMAGE} />
        <div css={STYLES_CODE_PREVIEW}>
          Version 0.0.1
          <br />
          Public Sign In Disabled
        </div>
      </div>
    );

    if (!this.props.production) {
      element = (
        <div css={STYLES_POPOVER}>
          <System.Input
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this._handleChange}
          />
          <System.Input
            containerStyle={{ marginTop: 24 }}
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this._handleChange}
          />
          <System.ButtonPrimaryFull
            style={{ marginTop: 48 }}
            onClick={!this.state.loading ? this._handleSubmit : () => {}}
            loading={this.state.loading}
          >
            Sign in
          </System.ButtonPrimaryFull>
        </div>
      );
    }

    return <div css={STYLES_PAGE}>{element}</div>;
  }
}
