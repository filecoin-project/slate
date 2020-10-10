import * as Upload from "~/node_common/upload";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as Strings from "~/common/strings";

// NOTE(jim): To support multipart request.
const STAGING_DEAL_BUCKET = "stage-deal";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
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
    bucketName: STAGING_DEAL_BUCKET,
  });

  if (!response) {
    return res
      .status(413)
      .send({ decorator: "SERVER_UPLOAD_ERROR", error: true });
  }

  if (response.error) {
    return res
      .status(413)
      .send({ decorator: response.decorator, error: response.error });
  }

  return res.status(200).send({
    decorator: "SERVER_DEAL_UPLOAD",
    data: response,
  });
};
