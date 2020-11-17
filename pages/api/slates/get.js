import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_GET_SLATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_GET_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_GET_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (Array.isArray(req.body.data.id)) {
    const responseMultiple = Data.getSlatesByIds({ id: req.body.data.id });
    if (!responseMultiple) {
      return res.status(404).send({ decorator: "SERVER_GET_SLATES_NOT_FOUND", error: true });
    }

    if (responseMultiple.error) {
      return res.status(500).send({ decorator: "SERVER_GET_SLATES_NOT_FOUND", error: true });
    }
    console.log(responseMultiple);

    return res.status(200).send({ decorator: "SERVER_GET_SLATES", slate: responseMultiple });
  } else {
    const response = await Data.getSlateById({ id: req.body.data.id });
    if (!response) {
      return res.status(404).send({ decorator: "SERVER_GET_SLATE_NOT_FOUND", error: true });
    }

    if (response.error) {
      return res.status(500).send({ decorator: "SERVER_GET_SLATE_NOT_FOUND", error: true });
    }

    return res.status(200).send({ decorator: "SERVER_GET_SLATE", slate: response });
  }
};
