import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";

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
  flex-direction: column;
  background-color: #f7f7f7;
  height: 100vh;
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

const STYLES_POPOVER_CARD = css`
  max-width: 124px;
  width: 100%;
  background: ${Constants.system.pitchBlack};
  border-radius: 24px;
  margin-bottom: 24px;
`;

const STYLES_POPOVER_CARD_IMAGE = css`
  display: block;
  background-position: 50% 50%;
  background-size: cover;
  background-image: url("/static/social.png");
  border-radius: 24px;
  width: 100%;
  height: 124px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
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

    // TODO(jim):
    // Lets add some proper error messages here.
    if (!Validations.username(this.state.username)) {
      alert(
        "TODO: Your username was invalid, only characters and numbers allowed."
      );
      this.setState({ loading: false });
      return;
    }

    if (!Validations.password(this.state.password)) {
      alert("TODO: Your password must be at least 8 characters.");

      // TODO(jim):
      // Let it slide because this rule is new.
      // this.setState({ loading: false });
      // return;
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
    let element = (
      <div css={STYLES_POPOVER_CARD}>
        <div css={STYLES_POPOVER_CARD_IMAGE} />
      </div>
    );

    let popover = (
      <div css={STYLES_POPOVER}>
        <div css={STYLES_CODE_PREVIEW}>
          Version {Constants.values.version}
          <br />
          Public Test Preview <br />
          Warning: THE Entire Network & Database Will Be Wiped
          <br />
        </div>

        <System.Input
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this._handleChange}
        />
        <div css={STYLES_CODE_PREVIEW} style={{ marginTop: 8 }}>
          Usernames should only have characters or numbers.
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
          Password should be at least 8 characters
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
      <div css={STYLES_PAGE}>
        {element}
        {popover}
      </div>
    );
  }
}
