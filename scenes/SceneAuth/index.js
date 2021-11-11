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

const STYLES_MIDDLE = css`
  position: relative;
  min-height: 10%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 24px;
`;

const SigninScene = ({ onAuthenticate, onTwitterAuthenticate, page, ...props }) => {
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

  const signinProvider = useSignin({
    onAuthenticate,
  });
  const twitterProvider = useTwitter({
    onTwitterAuthenticate: onTwitterAuthenticate,
    onAuthenticate,
    goToTwitterSignupScene,
  });

  const signupProvider = useSignup({ onAuthenticate });

  const passwordResetProvider = usePasswordReset({
    onAuthenticate,
  });

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
    prevScene === "signin" && context.emailOrUsername ? context.emailOrUsername : "";
  return (
    <Initial
      createVerification={signupProvider.createVerification}
      isSigninViaTwitter={twitterProvider.isLoggingIn}
      onTwitterSignin={twitterProvider.signin}
      initialEmail={initialEmail}
      goToSigninScene={goToSigninScene}
      goToSignupScene={goToSignupScene}
      page={page}
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

export default WithCustomWrapper(SigninScene);
