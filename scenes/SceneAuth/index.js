import * as React from "react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import { AuthWrapper } from "~/components/core/Auth/components";

import { css } from "@emotion/react";
import {
  Initial,
  Signin,
  Signup,
  TwitterSignup,
  TwitterLinking,
  ResetPassword,
} from "~/components/core/Auth";
import {
  useAuthFlow,
  useTwitter,
  useSignup,
  useSignin,
  usePasswordReset,
} from "~/scenes/SceneAuth/hooks";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 1rem;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
`;

const STYLES_MIDDLE = (theme) => css`
  position: relative;
  min-height: 10%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 24px;
  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 24px 16px;
    //NOTE(amine): additional scroll space for mobile
    padding-bottom: 64px;
  }
`;

const AuthScene = ({ onAuthenticate, onTwitterAuthenticate, page, onAction, ...props }) => {
  const {
    goToSigninScene,
    goToSignupScene,
    goToTwitterSignupScene,
    goToTwitterLinkingScene,
    goToResetPassword,
    clearMessages,
    goBack,
    prevScene,
    scene,
    context,
  } = useAuthFlow();

  // NOTE(amine): if the redirectUrl is provided, redirect users to it when they authenticate
  const redirectUrl = React.useRef(page?.params?.redirect && decodeURI(page?.params?.redirect));

  const handleAuthentication = (...params) => onAuthenticate(redirectUrl.current, ...params);
  const handleTwitterAuthentication = (...params) =>
    onTwitterAuthenticate(redirectUrl.current, ...params);

  const signinProvider = useSignin({
    onAuthenticate: handleAuthentication,
  });

  const signupProvider = useSignup({ onAuthenticate: handleAuthentication });

  const twitterProvider = useTwitter({
    onTwitterAuthenticate: handleTwitterAuthentication,
    onAuthenticate: handleAuthentication,
    goToTwitterSignupScene,
  });

  const passwordResetProvider = usePasswordReset({
    onAuthenticate: handleAuthentication,
  });

  // NOTE(amine): authenticate via params
  const initialScreenRef = React.useRef();
  React.useEffect(() => {
    if (!initialScreenRef.current) return;

    if (page?.params?.tab === "signup" && page?.params?.email)
      initialScreenRef.current.submitSignupForm();

    if (page?.params?.tab === "signin" && page?.params?.email)
      initialScreenRef.current.submitSigninField();
  }, []);

  if (scene === "signin")
    return (
      <Signin
        {...props}
        emailOrUsername={context.emailOrUsername}
        message={context.message}
        signin={signinProvider.signin}
        createVerification={signinProvider.createVerification}
        migrateAccount={signinProvider.migrateAccount}
        resendEmailVerification={signinProvider.resendVerification}
        goToResetPassword={goToResetPassword}
        goBack={goBack}
        clearMessages={clearMessages}
      />
    );

  if (scene === "password_reset") {
    return (
      <ResetPassword
        goBack={goBack}
        createVerification={passwordResetProvider.createVerification}
        verifyEmail={passwordResetProvider.verifyEmail}
        resetPassword={passwordResetProvider.resetPassword}
        resendEmailVerification={passwordResetProvider.resendVerification}
      />
    );
  }

  if (scene === "signup")
    return (
      <Signup
        verifyEmail={signupProvider.verifyEmail}
        resendEmailVerification={signupProvider.resendVerification}
        createUser={signupProvider.createUser}
      />
    );

  if (scene === "twitter_signup")
    return (
      <TwitterSignup
        initialEmail={context.twitterEmail}
        createVerification={twitterProvider.createVerification}
        resendEmailVerification={twitterProvider.resendVerification}
        goToTwitterLinkingScene={goToTwitterLinkingScene}
        onSignupWithVerification={twitterProvider.signupWithVerification}
        onSignup={twitterProvider.signup}
      />
    );

  if (scene === "twitter_linking") {
    return (
      <TwitterLinking
        linkAccount={twitterProvider.linkAccount}
        linkAccountWithVerification={twitterProvider.linkAccountWithVerification}
        resendEmailVerification={twitterProvider.resendVerification}
        createVerification={twitterProvider.createVerification}
      />
    );
  }
  // NOTE(amine): if the user goes back, we should prefill the email
  const initialEmail =
    prevScene === "signin" && context.emailOrUsername
      ? context.emailOrUsername
      : page?.params?.email || "";

  return (
    <Initial
      ref={initialScreenRef}
      page={page}
      initialEmail={initialEmail}
      isSigninViaTwitter={twitterProvider.isLoggingIn}
      onTwitterSignin={twitterProvider.signin}
      goToSigninScene={goToSigninScene}
      goToSignupScene={goToSignupScene}
      createVerification={signupProvider.createVerification}
      onAction={onAction}
    />
  );
};

const WithCustomWrapper = (Component) => (props) => {
  return (
    <WebsitePrototypeWrapper>
      <AuthWrapper css={STYLES_ROOT} isMobile={props.isMobile}>
        <div css={STYLES_MIDDLE}>
          <Component {...props} />
        </div>
      </AuthWrapper>
    </WebsitePrototypeWrapper>
  );
};

export default WithCustomWrapper(AuthScene);
