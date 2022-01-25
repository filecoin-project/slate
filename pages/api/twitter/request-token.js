import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Logging from "~/common/logging";

import { createOAuthProvider } from "~/node_common/managers/twitter";

export default async (req, res) => {
  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_TWITTER_OAUTH_NOT_ALLOWED", error: true });
  }

  try {
    const { getOAuthRequestToken } = createOAuthProvider();
    const { authToken, authSecretToken } = await getOAuthRequestToken();

    await Data.createTwitterToken({ token: authToken, tokenSecret: authSecretToken });
    res.json({ authToken });
  } catch (e) {
    Logging.error("error", e);
    res.status(500).send({ decorator: "SERVER_TWITTER_REQUEST_TOKEN_FAILED", error: true });
  }
};
