import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Powergate from "~/node_common/powergate";

export default async (req, res) => {
  if (Strings.isEmpty(req.headers.authorization)) {
    return res.status(404).send({
      decorator: "SERVER_API_KEY_MISSING",
      error: true,
    });
  }

  const parsed = Strings.getKey(req.headers.authorization);

  const key = await Data.getAPIKeyByKey({
    key: parsed,
  });

  if (!key) {
    return res.status(403).send({
      decorator: "V1_GET_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (key.error) {
    return res.status(500).send({
      decorator: "V1_GET_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const user = await Data.getUserById({
    id: key.owner_id,
  });

  if (!user) {
    return res.status(404).send({ decorator: "V1_GET_SLATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "V1_GET_SLATE_USER_NOT_FOUND", error: true });
  }

  const name = user.data.name;
  const profilePhoto = user.data.photo;

  let slates = await Data.getSlatesByUserId({
    userId: user.id,
    publicOnly: req.body.data && req.body.data.private ? false : true,
  });

  slates = slates.map((each) => {
    each.data.url = `https://slate.host/${user.username}/${each.slatename}`;
    return each;
  });

  if (!slates) {
    return res.status(404).send({
      decorator: "V1_GET_SLATES_NOT_FOUND",
      error: true,
    });
  }

  if (slates.error) {
    return res.status(500).send({
      decorator: "V1_GET_SLATES_NOT_FOUND",
      error: true,
    });
  }

  return res.status(200).send({ decorator: "V1_GET", slates, name, profilePhoto });
};
