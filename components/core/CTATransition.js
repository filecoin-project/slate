import * as React from "react";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";
import * as Strings from "~/common/strings";

import { Boundary } from "~/components/system/components/fragments/Boundary";
import { css } from "@emotion/react";
import { Alert } from "~/components/core/Alert";

import AuthInitial from "~/components/core/Auth/Initial";

const STYLES_BACKGROUND = css`
  z-index: ${Constants.zindex.cta};
  ${Styles.CONTAINER_CENTERED};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  text-align: center;
  font-size: 1rem;

  @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }

  @keyframes CTATransition-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: CTATransition-fade-in 400ms ease;
`;

const STYLES_TRANSITION = css`
  max-width: 432px;

  @keyframes authentication-popover-fade-in {
    from {
      transform: translateY(-80px);
      opacity: 0;
    }

    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  animation: authentication-popover-fade-in 300ms ease;
`;

const STYLES_EXPLAINER = css`
  color: ${Constants.system.white};
`;

export default class CTATransition extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount = () => {
    window.addEventListener("slate-global-open-cta", this._handleOpen);
    window.addEventListener("slate-global-close-cta", this._handleClose);
  };

  componentWillUnmount = () => {
    window.removeEventListener("slate-global-open-cta", this._handleOpen);
    window.removeEventListener("slate-global-close-cta", this._handleClose);
  };

  _handleOpen = (e) => {
    this.setState({ visible: true });
  };

  _handleClose = (e) => {
    this.setState({ visible: false });
  };

  _handleAction = (props) => {
    this.setState({ visible: false }, () => {
      this.props.onAction(props);
    });
  };

  _handleTwitterSignin = () => {
    const currentURL = Strings.getCurrentURL(this.props.page?.params);
    this.props.onAction({
      type: "NAVIGATE",
      href: `/_/auth?redirect=${encodeURI(currentURL)}`,
    });
    this._handleClose();
  };

  _handleSignin = ({ emailOrUsername }) => {
    const currentURL = Strings.getCurrentURL(this.props.page?.params);
    this.props.onAction({
      type: "NAVIGATE",
      href: `/_/auth?tab=signin&email=${emailOrUsername}&redirect=${encodeURI(currentURL)}`,
    });
    this._handleClose();
  };

  _handleSignup = ({ email }) => {
    const currentURL = Strings.getCurrentURL(this.props.page?.params);
    this.props.onAction({
      type: "NAVIGATE",
      href: `/_/auth?tab=signup&email=${email}&redirect=${encodeURI(currentURL)}`,
    });
    this._handleClose();
  };

  render() {
    return (
      this.state.visible && (
        <div>
          <div css={STYLES_BACKGROUND}>
            <div css={STYLES_TRANSITION}>
              <div css={STYLES_EXPLAINER}>Sign up or log in continue</div>
              <br />
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={this._handleClose}
              >
                <AuthInitial
                  showTermsAndServices
                  isSigninViaTwitter={false}
                  onTwitterSignin={this._handleTwitterSignin}
                  goToSigninScene={this._handleSignin}
                  goToSignupScene={this._handleSignup}
                  page={this.props.page}
                />
                <Alert
                  noWarning
                  id={this.props.isMobile ? "slate-mobile-alert" : null}
                  style={
                    this.props.isMobile
                      ? null
                      : {
                          bottom: 0,
                          left: 0,
                          top: "auto",
                        }
                  }
                />
              </Boundary>
            </div>
          </div>
        </div>
      )
    );
  }
}

// `/_${Strings.createQueryParams({
//   scene: "NAV_PROFILE",
//   user: this.props.creator.username,
// })}`
