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

  const response = await Upload.formMultipart(req, res, {
    user,
  });

  if (!response) {
    return res
      .status(404)
      .send({ decorator: "SERVER_UPLOAD_ERROR", error: true });
  }

  if (response.error) {
    // NOTE(jim): To debug potential textile issues with matching CIDs.
    console.log({ message: response.message });
    return res
      .status(500)
      .send({ decorator: response.decorator, error: response.error });
  }

  const { data, ipfs } = response;

  const finalData = LibraryManager.updateDataIPFS(data, {
    ipfs,
  });

  const updatedUserDataFields = LibraryManager.addData({
    user,
    data: finalData,
  });

  await Data.updateUserById({
    id: user.id,
    data: updatedUserDataFields,
  });

  return res.status(200).send({
    decorator: "SERVER_UPLOAD",
    data: finalData,
  });
};
