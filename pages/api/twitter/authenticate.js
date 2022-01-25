import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Logging from "~/common/logging";

import JWT from "jsonwebtoken";

import { createOAuthProvider } from "~/node_common/managers/twitter";

export default async (req, res) => {
  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_TWITTER_OAUTH_NOT_ALLOWED", error: true });
  }

  if (Strings.isEmpty(req.body.data.authToken)) {
    return res.status(500).send({ decorator: "SERVER_TWITTER_OAUTH_NO_OAUTH_TOKEN", error: true });
  }

  if (Strings.isEmpty(req.body.data.authVerifier)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_TWITTER_OAUTH_NO_OAUTH_VERIFIER", error: true });
  }

  const { authToken, authVerifier } = req.body.data;

  let twitterUser;
  try {
    const { tokenSecret: authSecretToken } = await Data.getTwitterToken({ token: authToken });
    const { getOAuthAccessToken, getProtectedResource } = createOAuthProvider();

    const { authAccessToken, authSecretAccessToken } = await getOAuthAccessToken({
      authToken,
      authSecretToken,
      authVerifier,
    });

    const response = await getProtectedResource({
      url: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      method: "GET",
      authAccessToken,
      authSecretAccessToken,
    });
    twitterUser = JSON.parse(response.data);
  } catch (err) {
    Logging.error(err);
    return res.status(500).send({ decorator: "SERVER_TWITTER_OAUTH_FAILED", error: true });
  }
  if (!twitterUser) {
    return res.status(500).send({ decorator: "SERVER_TWITTER_OAUTH_FAILED", error: true });
  }

  // const userFriends = await getProtectedResource({
  //   url: "https://api.twitter.com/1.1/friends/ids.json",
  //   method: "GET",
  //   authAccessToken,
  //   authSecretAccessToken,
  // });

  // NOTE(Amine): If a user with TwitterId exists
  const user = await Data.getUserByTwitterId({ twitterId: twitterUser.id_str });
  if (user) {
    const token = JWT.sign({ id: user.id, username: user.username }, Environment.JWT_SECRET);
    return res.status(200).send({ decorator: "SERVER_SIGN_IN", success: true, token });
  }

  // NOTE(amine): Twitter account doesn't have an email
  if (Strings.isEmpty(twitterUser.email)) {
    await Data.updateTwitterToken({
      token: authToken,
      screen_name: twitterUser.screen_name,
      id: twitterUser.id_str,
      verified: twitterUser.verified,
    });
    return res.status(201).send({ decorator: "SERVER_TWITTER_OAUTH_NO_EMAIL" });
  }

  // NOTE(amine): If there is an account with the user's twitter email
  // but not linked to any twitter account
  const userByEmail = await Data.getUserByEmail({ email: twitterUser.email });
  if (userByEmail && !userByEmail.twitterId) {
    await Data.updateUserById({
      id: userByEmail.id,
      twitterId: twitterUser.id_str,
      twitterUsername: twitterUser.screen_name,
      twitterVerified: twitterUser.verified,
    });
    const token = JWT.sign(
      { id: userByEmail.id, username: userByEmail.username },
      Environment.JWT_SECRET
    );
    return res.status(200).send({ decorator: "SERVER_SIGN_IN", success: true, token });
  }

  //NOTE(amine): If we have twitter email but no user is associated with it
  await Data.updateTwitterToken({
    token: authToken,
    screen_name: twitterUser.screen_name,
    email: twitterUser.email,
    id: twitterUser.id_str,
    verified: twitterUser.verified,
  });
  return res
    .status(200)
    .json({ decorator: "SERVER_TWITTER_CONTINUE_SIGNUP", email: twitterUser.email });
};
