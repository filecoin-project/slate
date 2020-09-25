import * as Upload from "~/node_common/upload";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";

// NOTE(jim): To support multipart request.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);

  const user = await Data.getUserById({
    id,
  });

  if (!user || user.error) {
    return res
      .status(403)
      .send({ decorator: "UPLOAD_NOT_ALLOWED", error: true });
  }

  const response = await Upload.formMultipart(req, res, {
    user,
    bucketName: "encrypted-deal",
  });

  if (!response) {
    return res
      .status(404)
      .send({ decorator: "SERVER_UPLOAD_ERROR", error: true });
  }

  if (response.error) {
    return res
      .status(500)
      .send({ decorator: response.decorator, error: response.error });
  }

  return res.status(200).send({
    decorator: "SERVER_DEAL_UPLOAD",
    data: response,
  });
};
