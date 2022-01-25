import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";

import SearchManager from "~/node_common/managers/search";
import JWT from "jsonwebtoken";

export default async (req, res) => {
  const { authToken, email, username } = req.body.data;

  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_TWITTER_OAUTH_NOT_ALLOWED", error: true });
  }

  if (Strings.isEmpty(authToken)) {
    return res.status(500).send({ decorator: "SERVER_TWITTER_OAUTH_NO_OAUTH_TOKEN", error: true });
  }

  if (!Validations.email(email)) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_INVALID_EMAIL", error: true });
  }

  if (!Validations.username(username)) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_INVALID_USERNAME", error: true });
  }

  const newUsername = Strings.createUsername(username);
  const newEmail = email.toLowerCase();

  const twitterUser = await Data.getTwitterToken({ token: authToken });
  if (!twitterUser) {
    return res.status(401).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  if (twitterUser.email !== email) {
    return res.status(401).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  const userByTwitterId = await Data.getUserByTwitterId({ twitterId: twitterUser.id_str });
  // NOTE(Amine): If a user with TwitterId exists
  if (userByTwitterId) {
    return res.status(201).send({ decorator: "SERVER_CREATE_USER_TWITTER_EXISTS" });
  }

  // NOTE(Amine): If there is an account with the user's twitter email
  const userByEmail = await Data.getUserByEmail({ email: twitterUser.email });
  if (userByEmail) {
    return res.status(201).send({ decorator: "SERVER_CREATE_USER_EMAIL_TAKEN" });
  }

  // NOTE(Amine): If there is an account with the provided username
  const userByUsername = await Data.getUserByUsername({ username: newUsername });
  if (userByUsername) {
    return res.status(201).send({ decorator: "SERVER_CREATE_USER_USERNAME_TAKEN" });
  }

  const { textileKey, textileToken, textileThreadID, textileBucketCID } =
    await Utilities.createBucket({});

  if (!textileKey || !textileToken || !textileThreadID || !textileBucketCID) {
    return res
      .status(500)
      .send({ decorator: "SERVER_CREATE_USER_BUCKET_INIT_FAILURE", error: true });
  }

  const user = await Data.createUser({
    username: newUsername,
    email: newEmail,
    twitterId: twitterUser.id_str,
    twitterUsername: twitterUser.screen_name,
    twitterVerified: twitterUser.verified,
    textileKey,
    textileToken,
    textileThreadID,
    textileBucketCID,
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  SearchManager.indexUser(user);

  const token = JWT.sign({ id: user.id, username: user.username }, Environment.JWT_SECRET);
  return res.status(200).send({ decorator: "SERVER_SIGN_IN", success: true, token });
};
