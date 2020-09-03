import * as ViewerManager from "~/node_common/managers/viewer";
import * as Utilities from "~/node_common/utilities";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_HYDRATE_FAILURE", error: true });
  }

  const data = await ViewerManager.getById({ id });

  if (!data) {
    return res
      .status(500)
      .send({ decorator: "SERVER_VIEWER_DATA_ERROR", error: true, data: null });
  }

  return res
    .status(200)
    .send({ decorator: "SERVER_HYDRATE", success: true, data });
};
