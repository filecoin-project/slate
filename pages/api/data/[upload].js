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

  console.log(`[upload] upload for ${user.username} started`);
  const response = await Upload.formMultipart(req, res, {
    user,
  });
  console.log(`[upload] upload for ${user.username} responded`);

  if (!response) {
    console.log(`[upload] upload for ${user.username} unsuccessful`);
    return res
      .status(404)
      .send({ decorator: "SERVER_UPLOAD_ERROR", error: true });
  }

  if (response.error) {
    // NOTE(jim): To debug potential textile issues with matching CIDs.
    console.log(`[upload] upload for ${user.username} unsuccessful`);
    console.log({ message: response.message });
    return res
      .status(500)
      .send({ decorator: response.decorator, error: response.error });
  }

  console.log(`[upload] upload for ${user.username} successful`);

  const { data, ipfs } = response;

  const finalData = LibraryManager.updateDataIPFS(data, {
    ipfs,
  });

  const slateId = req.params ? req.params.b : null;

  await Data.createPendingData({
    data: finalData,
    owner_user_id: user.id,
    slate_id: slateId,
  });

  return res.status(200).send({
    decorator: "SERVER_UPLOAD",
    data: finalData,
  });
};
