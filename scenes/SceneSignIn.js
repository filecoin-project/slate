import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { Logo } from "~/common/logo";
import { dispatchCustomEvent } from "~/common/custom-events";

import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";
import Avatar from "~/components/core/Avatar";

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
  min-height: 100vh;
  text-align: center;
  font-size: 1rem;
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
  max-width: 376px;
  width: 100%;
  background: ${Constants.system.white};
  color: ${Constants.system.black};

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

const STYLES_CODE_PREVIEW = css`
  color: ${Constants.system.black};
  font-family: ${Constants.font.code};
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

export default class SceneSignIn extends React.Component {
  state = {
    scene: "WELCOME",
    username: "",
    password: "",
    loading: false,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleUsernameChange = (e) => {
    const value = Strings.createSlug(e.target.value, "");
    this.setState({ [e.target.name]: value });
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    await delay(100);

    if (!Validations.username(this.state.username)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "Only characters and numbers are allowed in usernames",
          },
        },
      });
      this.setState({ loading: false });
      return;
    }

    if (!Validations.password(this.state.password)) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "Your password must be at least 8 characters" },
        },
      });
      this.setState({ loading: false });
      return;
    }

    const response = await this.props.onAuthenticate({
      username: this.state.username.toLowerCase(),
      password: this.state.password,
    });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We could not sign you into your account, please try again later.",
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

    return this.props.onNavigateTo({ id: "V1_NAVIGATION_HOME" });
  };

  _handleCheckUsername = async () => {
    if (!Validations.username(this.state.username)) {
      console.log("invalid username");
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "Your username was invalid, only characters and numbers are allowed. Usernames must between 1-48 characters",
          },
        },
      });
      return;
    }

    this.setState({ loading: true });

    const response = await Actions.checkUsername({
      username: this.state.username.toLowerCase(),
    });

    if (!response) {
      return this.setState({
        scene: "CREATE_ACCOUNT",
        password: "",
        loading: false,
        user: null,
      });
    }

    if (response.data) {
      return this.setState({
        scene: "SIGN_IN",
        password: "",
        loading: false,
        user: response.data,
      });
    }

    return this.setState({
      scene: "CREATE_ACCOUNT",
      password: "",
      loading: false,
      user: null,
    });
  };

  _getPopoverComponent = () => {
    if (this.state.scene === "WELCOME") {
      return (
        <React.Fragment>
          <div css={STYLES_POPOVER} key={this.state.scene}>
            <Logo
              height="36px"
              style={{ display: "block", margin: "48px auto 64px auto" }}
            />

            <System.H3 style={{ fontWeight: 700, textAlign: "center" }}>
              Welcome
            </System.H3>
            <System.P style={{ marginTop: 16, textAlign: "center" }}>
              Enter your username to create a new account or sign into an
              existing one.
            </System.P>

            <System.Input
              autoFocus
              containerStyle={{ marginTop: 24 }}
              label="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this._handleUsernameChange}
              onSubmit={this._handleCheckUsername}
            />

            <System.ButtonPrimary
              full
              style={{ marginTop: 24 }}
              loading={this.state.loading}
              onClick={this._handleCheckUsername}
            >
              Continue
            </System.ButtonPrimary>
          </div>
          <div css={STYLES_LINKS}>
            <a css={STYLES_LINK_ITEM} href="/privacy" target="_blank">
              ⭢ Terms & privacy policy
            </a>
          </div>
        </React.Fragment>
      );
    }

    if (this.state.scene === "CREATE_ACCOUNT") {
      return (
        <React.Fragment>
          <div css={STYLES_POPOVER} key={this.state.scene}>
            <Avatar
              size={112}
              url={
                "https://slate.textile.io/ipfs/bafkreibf3hoiyuk2ywjyoy24ywaaclo4k5rz53flesvr5h4qjlyzxamozm"
              }
              style={{ margin: "48px auto 64px auto", display: "block" }}
            />

            <System.H3 style={{ fontWeight: 700, textAlign: "center" }}>
              {this.state.username} is available!
            </System.H3>
            <System.P
              style={{ marginTop: 16, marginBottom: 24, textAlign: "center" }}
            >
              Enter a password to create an account.
            </System.P>

            <System.Input
              autoFocus
              containerStyle={{ marginTop: 24 }}
              label="Password"
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
              Create account
            </System.ButtonPrimary>
          </div>
          <div css={STYLES_LINKS}>
            <div
              css={STYLES_LINK_ITEM}
              onClick={() => {
                this.setState({ scene: "WELCOME", loading: false });
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
          <Avatar
            size={112}
            url={this.state.user.data.photo}
            style={{ margin: "48px auto 64px auto", display: "block" }}
          />

          <System.H3
            style={{ fontWeight: 700, textAlign: "center", display: "block" }}
          >
            Welcome back {Strings.getPresentationName(this.state.user)}!
          </System.H3>
          <System.P
            style={{ marginTop: 16, marginBottom: 24, textAlign: "center" }}
          >
            Enter your password to access your account, slates, and the
            developer API.
          </System.P>

          <System.Input
            autoFocus
            containerStyle={{ marginTop: 24 }}
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />

          <System.ButtonPrimary
            full
            style={{ marginTop: 32 }}
            onClick={!this.state.loading ? this._handleSubmit : () => {}}
            loading={this.state.loading}
          >
            Sign In
          </System.ButtonPrimary>
        </div>
        <div css={STYLES_LINKS}>
          <div
            css={STYLES_LINK_ITEM}
            onClick={() => {
              this.setState({ scene: "WELCOME", loading: false });
            }}
          >
            ⭢ Not {Strings.getPresentationName(this.state.user)}? Sign in as
            someone else.
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const popover = this._getPopoverComponent();

    return (
      <div css={STYLES_ROOT}>
        <WebsitePrototypeHeader />
        <div css={STYLES_MIDDLE}>{popover}</div>
        <WebsitePrototypeFooter />
      </div>
    );
  }
}
