import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Powergate from "~/node_common/powergate";

const initCORS = MW.init(MW.CORS);

export default async (req, res) => {
  initCORS(req, res);

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
    return res
      .status(404)
      .json({ decorator: "V1_GET_SLATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .json({ decorator: "V1_GET_SLATE_USER_NOT_FOUND", error: true });
  }

  let slateId = req.body.data ? req.body.data.id : null;
  let slate;

  if (Strings.isEmpty(slateId)) {
    const slates = await Data.getSlatesByUserId({ userId: user.id });
    if (!slates) {
      return res
        .status(404)
        .json({ decorator: "V1_GET_SLATE_SLATE_NOT_FOUND", error: true });
    }

    if (slates.error || !slates.length) {
      return res
        .status(500)
        .json({ decorator: "V1_GET_SLATE_SLATE_NOT_FOUND", error: true });
    }

    return res
      .status(200)
      .json({ decorator: "V1_GET_SLATE_MOST_RECENT", slate: slates[0] });
  }

  slate = await Data.getSlateById({ id: slateId });

  if (!slate) {
    return res.status(404).json({
      decorator: "V1_GET_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).json({
      decorator: "V1_GET_SLATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  return res.status(200).json({ decorator: "V1_GET_SLATE", slate });
};
