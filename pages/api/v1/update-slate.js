import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";

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
      decorator: "V1_UPDATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (key.error) {
    return res.status(500).send({
      decorator: "V1_UPDATE_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const user = await Data.getUserById({
    id: key.owner_id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "V1_UPDATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "V1_UPDATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const response = await Data.getSlateById({ id: req.body.data.id });

  if (!response) {
    return res.status(404).send({ decorator: "V1_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: "V1_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (!req.body.data) {
    return res.status(500).send({
      decorator: "V1_UPDATE_SLATE_MUST_PROVIDE_DATA",
      error: true,
    });
  }

  if (!Strings.isEmpty(req.body.data.data.name)) {
    const existingSlate = await Data.getSlateByName({
      slatename: req.body.data.data.name,
      ownerId: user.id,
    });

    if (existingSlate && existingSlate.id !== req.body.data.id) {
      return res.status(500).send({
        decorator: "V1_UPDATE_SLATE_NAME_TAKEN",
        error: true,
      });
    }
  }

  let slate = await Data.updateSlateById({
    id: response.id,
    slatename: !Strings.isEmpty(req.body.data.data.name)
      ? Strings.createSlug(req.body.data.data.name)
      : response.slatename,
    updated_at: new Date(),
    data: {
      ...response.data,
      ...req.body.data.data,
    },
  });

  if (!slate) {
    return res.status(404).send({ decorator: "V1_UPDATE_SLATE", error: true });
  }

  if (slate.error) {
    return res.status(500).send({ decorator: "V1_UPDATE_SLATE", error: true });
  }

  let slates = await Data.getSlatesByUserId({ userId: id });
  if (slates) {
    ViewerManager.hydratePartialSlates(slates, id);
  }

  return res.status(200).send({ decorator: "V1_UPDATE_SLATE", slate });
};
