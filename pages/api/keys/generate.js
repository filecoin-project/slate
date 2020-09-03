import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

import { v4 as uuid } from "uuid";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_GENERATE_API_KEY_AUTH", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_GENERATE_API_KEY_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_GENERATE_API_KEY_USER_NOT_FOUND",
      error: true,
    });
  }

  const keys = await Data.getAPIKeysByUserId({ userId: user.id });

  if (keys.length > 9) {
    return res.status(404).send({
      decorator: "SERVER_GENERATE_API_KEY_TOO_MANY_KEYS",
      error: true,
    });
  }

  const key = await Data.createAPIKeyForUserId({
    userId: user.id,
    key: `SLA${uuid()}TE`,
  });

  if (!key) {
    return res.status(404).send({
      decorator: "SERVER_GENERATE_API_KEY_ERROR",
      error: true,
    });
  }

  if (key.error) {
    return res.status(500).send({
      decorator: "SERVER_GENERATE_API_KEY_ERROR",
      error: true,
    });
  }

  return res.status(200).send({ decorator: "SERVER_GENERATE_API_KEY", key });
};
