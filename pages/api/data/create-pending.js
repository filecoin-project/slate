import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);

  if (!id) {
    return res.status(500).send({ decorator: "CREATE_PENDING_ERROR", error: true });
  }

  const response = await Data.createPendingData(req.body.data.data);

  if (!response) {
    return res.status(404).send({ decorator: "CREATE_PENDING_ERROR", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: response.decorator, error: response.error });
  }

  return res.status(200).send({
    decorator: "CREATE_PENDING_DATA",
    data: response,
  });
};
