import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as Strings from "~/common/strings";
import * as Upload from "~/node_common/upload";

const initCORS = MW.init(MW.CORS);

// NOTE(jim): To support multipart request.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  initCORS(req, res);

  if (Strings.isEmpty(req.headers.authorization)) {
    return res.status(404).send({
      decorator: "SERVER_API_KEY_MISSING",
      error: true,
    });
  }

  let slate = await Data.getSlateById({ id: req.query.id });

  if (!slate) {
    return res.status(404).json({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).json({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const parsed = Strings.getKey(req.headers.authorization);
  const key = await Data.getAPIKeyByKey({
    key: parsed,
  });

  if (!key) {
    return res.status(403).send({
      decorator: "V1_SERVER_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  if (key.error) {
    return res.status(500).send({
      decorator: "V1_SERVER_API_KEY_NOT_FOUND",
      error: true,
    });
  }

  const user = await Data.getUserById({
    id: key.owner_id,
  });

  const uploadResponse = await Upload.formMultipart(req, res, {
    user,
  });

  if (!uploadResponse) {
    return res
      .status(404)
      .send({ decorator: "V1_SERVER_API_UPLOAD_ERROR", error: true });
  }

  if (uploadResponse.error) {
    // NOTE(jim): Just to debug potential textile issues with matching CIDs.
    console.log({ message: uploadResponse.message });
    return res.status(500).send({
      decorator: uploadResponse.decorator,
      error: uploadResponse.error,
    });
  }

  const { data, ipfs } = uploadResponse;

  const updatedData = LibraryManager.updateDataIPFS(data, {
    ipfs,
  });

  const updatedUserDataFields = LibraryManager.addData({
    user,
    data: updatedData,
  });

  await Data.updateUserById({
    id: user.id,
    data: updatedUserDataFields,
  });

  slate = await Data.getSlateById({ id: req.query.id });

  if (!slate) {
    return res.status(404).json({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).json({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const url = `https://hub.textile.io${updatedData.ipfs}`;
  const newSlateObjectEntity = {
    id: updatedData.id,
    ownerId: user.id,
    name: updatedData.name,
    url,
  };

  const updatedSlate = await Data.updateSlateById({
    id: slate.id,
    updated_at: new Date(),
    data: {
      ...slate.data,
      objects: [newSlateObjectEntity, ...slate.data.objects],
    },
  });

  if (!updatedSlate) {
    return res.status(500).json({
      decorator: "V1_SERVER_UPLOAD_TO_SLATE_ERROR",
      error: true,
    });
  }

  if (updatedSlate.error) {
    return res.status(500).json({
      decorator: "V1_SERVER_UPLOAD_TO_SLATE_ERROR",
      error: true,
    });
  }

  return res.status(200).send({
    decorator: "V1_UPLOAD_DATA_TO_SLATE",
    data: updatedData,
    slate: updatedSlate,
    url,
  });
};
