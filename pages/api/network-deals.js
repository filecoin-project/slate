import * as ViewerManager from "~/node_common/managers/viewer";
import * as Utilities from "~/node_common/utilities";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_FILECOIN_NETWORK_DEALS_FAILURE", error: true });
  }

  const data = await ViewerManager.getDealHistory({ id });

  if (!data) {
    return res.status(500).send({
      decorator: "SERVER_FILECOIN_NETWORK_DEALS_ERROR",
      error: true,
      data: null,
    });
  }

  return res.status(200).send({ decorator: "SERVER_FILECOIN_NETWORK_DEALS", success: true, data });
};
