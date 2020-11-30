import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { Logo, Symbol } from "~/common/logo";

const delay = (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );

const STYLES_POPOVER = css`
  height: 424px;
  padding: 32px 36px;
  border-radius: 4px;
  max-width: 376px;
  width: 95vw;
  display: flex;
  flex-direction: column;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
  ${"" /* box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25); */}
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);

  @keyframes authentication-popover-fade-in {
    from {
      transform: translateY(-8px);
      opacity: 0;
    }

    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  animation: authentication-popover-fade-in 400ms ease;
`;

const STYLES_LINKS = css`
  margin-top: 24px;
  max-width: 376px;
  width: 100%;
  padding-left: 26px;
`;

const STYLES_LINK_ITEM = css`
  display: block;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
  font-family: ${Constants.font.semiBold};
  user-select: none;
  cursor: pointer;
  margin-top: 2px;
  color: ${Constants.system.black};
  transition: 200ms ease all;
  word-wrap: break-word;

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

export class SignIn extends React.Component {
  state = {
    scene: "WELCOME",
    username: "",
    password: "",
    loading: false,
    usernameTaken: false,
  };

  componentDidMount() {
    //   window.history.replaceState({ id: null }, "Slate", `/_`);
  }

  _handleChange = (e) => {
    if (e.target.name === "accepted" && e.target.value) {
      const hash = Strings.generateRandomString();
      const confirm = window.prompt(`Please type ${hash} to continue.`);

      if (confirm !== hash) {
        window.alert("Please try again.");
        return;
      }
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  _handleUsernameChange = (e) => {
    const value = Strings.createSlug(e.target.value, "");
    this.setState({ [e.target.name]: value, usernameTaken: false });
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    await delay(100);

    if (!this.state.accepted && this.state.scene === "CREATE_ACCOUNT") {
      Events.dispatchMessage({
        message: "You must accept the terms of service to create an account",
      });
      this.setState({ loading: false });
      return;
    }

    if (!Validations.username(this.state.username)) {
      Events.dispatchMessage({
        message:
          this.state.scene === "CREATE_ACCOUNT"
            ? "Usernames must between 1-48 characters and consist of only characters and numbers"
            : "Invalid username",
      });
      this.setState({ loading: false });
      return;
    }

    if (!Validations.password(this.state.password)) {
      Events.dispatchMessage({
        message:
          this.state.scene === "CREATE_ACCOUNT"
            ? "Your password must be at least 8 characters"
            : "Incorrect password",
      });
      this.setState({ loading: false });
      return;
    }

    let response = null;

    if (this.state.scene === "CREATE_ACCOUNT") {
      response = await this.props.onCreateUser({
        username: this.state.username.toLowerCase(),
        password: this.state.password,
        accepted: this.state.accepted,
      });
    } else {
      response = await this.props.onAuthenticate({
        username: this.state.username.toLowerCase(),
        password: this.state.password,
      });
    }
    this.setState({ loading: false });
  };

  _handleCheckUsername = async () => {
    if (!this.state.username || !this.state.username.length) {
      return;
    }
    if (!Validations.username(this.state.username)) {
      Events.dispatchMessage({
        message:
          "Usernames must between 1-48 characters and consist of only characters and numbers",
      });
      return;
    }

    const response = await Actions.checkUsername({
      username: this.state.username.toLowerCase(),
    });

    if (Events.hasError(response)) {
      return;
    }

    if (response.data) {
      //NOTE(martina): username taken
      this.setState({ usernameTaken: true });
      Events.dispatchMessage({ message: "That username is taken" });
      return;
    }

    //NOTE(martina): username not taken
    return this.setState({
      usernameTaken: false,
    });
  };

  render() {
    if (this.state.scene === "WELCOME") {
      return (
        <React.Fragment>
          <div css={STYLES_POPOVER} key={this.state.scene}>
            <Logo height="36px" style={{ display: "block", margin: "56px auto 0px auto" }} />

            <System.P style={{ margin: "56px 0", textAlign: "center" }}>
              {this.props.external
                ? "Sign up or sign in to continue"
                : "An open-source file sharing network for research and collaboration"}
            </System.P>

            <System.ButtonPrimary
              full
              style={{ marginTop: 24 }}
              onClick={() => this.setState({ scene: "CREATE_ACCOUNT" })}
              loading={this.state.loading}
            >
              Sign up
            </System.ButtonPrimary>

            <System.ButtonSecondary
              full
              style={{ marginTop: 16 }}
              onClick={() => this.setState({ scene: "SIGN_IN" })}
              loading={this.state.loading}
            >
              Sign in
            </System.ButtonSecondary>
          </div>
          <div css={STYLES_LINKS}>
            <a css={STYLES_LINK_ITEM} href="/terms" target="_blank">
              ⭢ Terms of service
            </a>

            <a css={STYLES_LINK_ITEM} href="/guidelines" target="_blank">
              ⭢ Community guidelines
            </a>
          </div>
        </React.Fragment>
      );
    }

    if (this.state.scene === "CREATE_ACCOUNT") {
      return (
        <React.Fragment>
          <div css={STYLES_POPOVER} key={this.state.scene} style={{ minHeight: 496 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 56,
              }}
            >
              <Symbol height="36px" />
            </div>

            <System.P
              style={{
                marginTop: 56,
                textAlign: "center",
                fontFamily: Constants.font.medium,
              }}
            >
              Create your account
            </System.P>

            <System.Input
              autoFocus
              containerStyle={{ marginTop: 32 }}
              placeholder="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this._handleUsernameChange}
              onBlur={this._handleCheckUsername}
              onSubmit={this._handleSubmit}
            />

            <System.Input
              containerStyle={{ marginTop: 16 }}
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this._handleChange}
              onSubmit={this._handleSubmit}
            />

            <System.CheckBox
              style={{ marginTop: 24 }}
              name="accepted"
              value={this.state.accepted}
              onChange={this._handleChange}
            >
              To create an account you must accept the <a href="/terms">terms of service</a>.
            </System.CheckBox>

            <System.ButtonPrimary
              full
              style={{ marginTop: 24 }}
              onClick={!this.state.loading ? this._handleSubmit : () => {}}
              loading={this.state.loading}
            >
              Sign up
            </System.ButtonPrimary>
          </div>
          <div css={STYLES_LINKS}>
            <div
              css={STYLES_LINK_ITEM}
              onClick={() => {
                this.setState({ scene: "SIGN_IN", loading: false });
              }}
            >
              ⭢ Already have an account?
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div css={STYLES_POPOVER} key={this.state.scene}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 56,
            }}
          >
            <Symbol height="36px" />
          </div>

          <System.P
            style={{
              marginTop: 56,
              textAlign: "center",
              fontFamily: Constants.font.medium,
            }}
          >
            Welcome back
          </System.P>

          <System.Input
            autoFocus
            containerStyle={{ marginTop: 32 }}
            placeholder="Username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this._handleUsernameChange}
            onSubmit={this._handleSubmit}
          />

          <System.Input
            containerStyle={{ marginTop: 16 }}
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />

          <System.ButtonPrimary
            full
            style={{ marginTop: 24 }}
            onClick={!this.state.loading ? this._handleSubmit : () => {}}
            loading={this.state.loading}
          >
            Sign in
          </System.ButtonPrimary>
        </div>
        <div css={STYLES_LINKS}>
          <div
            css={STYLES_LINK_ITEM}
            onClick={() => {
              this.setState({ scene: "CREATE_ACCOUNT", loading: false });
            }}
          >
            ⭢ Not registered? Sign up instead
          </div>
        </div>
      </React.Fragment>
    );
  }
}
