import * as Upload from "~/node_common/upload";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as Strings from "~/common/strings";

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

  let response = null;
  try {
    response = await Upload.formMultipart(req, res, {
      user,
    });
  } catch (e) {
    console.log("exiting !!!");
    console.log(e);
  }

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
