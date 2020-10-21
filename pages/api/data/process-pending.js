import * as Upload from "~/node_common/upload";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);

  if (!id) {
    return res
      .status(500)
      .send({ decorator: "PROCESS_PENDING_ERROR", error: true });
  }

  const response = await Data.deletePendingDataByUserId({ owner_user_id: id });

  if (!response) {
    return res
      .status(404)
      .send({ decorator: "PROCESS_PENDING_ERROR", error: true });
  }

  if (response.error) {
    return res
      .status(500)
      .send({ decorator: response.decorator, error: response.error });
  }

  return res.status(200).send({
    decorator: "PROCESS_PENDING_DATA",
    data: response,
  });
};
