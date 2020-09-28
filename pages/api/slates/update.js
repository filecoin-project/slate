import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_FIND_USER_UPDATE_SLATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const response = await Data.getSlateById({ id: req.body.data.id });

  if (!response) {
    return res
      .status(404)
      .send({ decorator: "SERVER_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (response.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_UPDATE_SLATE_NOT_FOUND", error: true });
  }

  if (!req.body.data) {
    return res.status(500).send({
      decorator: "SERVER_UPDATE_SLATE_MUST_PROVIDE_DATA",
      error: true,
    });
  }

  if (!req.body.data.data.name) {
    return res.status(500).send({
      decorator: "SERVER_UPDATE_SLATE_MUST_PROVIDE_NAME",
      error: true,
    });
  }

  const existingSlate = await Data.getSlateByName({
    slatename: req.body.data.data.name,
    ownerId: user.id,
  });
  if (existingSlate && existingSlate.id !== req.body.data.id) {
    return res.status(500).send({
      decorator: "SERVER_UPDATE_SLATE_NAME_TAKEN",
      error: true,
    });
  }

  const slate = await Data.updateSlateById({
    id: response.id,
    slatename: Strings.createSlug(req.body.data.data.name),
    updated_at: new Date(),
    data: {
      ...response.data,
      ...req.body.data.data,
    },
  });

  if (!slate) {
    return res
      .status(404)
      .send({ decorator: "SERVER_UPDATE_SLATE", error: true });
  }

  if (slate.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_UPDATE_SLATE", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_UPDATE_SLATE", slate });
};
