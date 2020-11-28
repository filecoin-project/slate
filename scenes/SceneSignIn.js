import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/core";
import { SignIn } from "~/components/core/SignIn";

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
  text-align: center;
  font-size: 1rem;

  min-height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;
  background-size: cover;
  background-position: 50% 50%:
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

export default class SceneSignIn extends React.Component {
  state = {
    scene: "WELCOME",
    username: "",
    password: "",
    loading: false,
    usernameTaken: false,
  };

  // componentDidMount() {
  //   window.history.replaceState({ id: null }, "Slate", `/_`);
  // }

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

    if (Events.hasError(response)) {
      this.setState({ loading: false });
    }
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
    return (
      <div css={STYLES_ROOT}>
        <WebsitePrototypeHeader style={{ background: `none` }} />
        <div css={STYLES_MIDDLE}>
          <SignIn {...this.props} />
        </div>
        <WebsitePrototypeFooter />
      </div>
    );
  }
}
