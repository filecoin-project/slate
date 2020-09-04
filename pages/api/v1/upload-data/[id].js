import * as Data from "~/node_common/data";
import * as Constants from "~/node_common/constants";
import * as LibraryManager from "~/node_common/managers/library";
import * as Strings from "~/common/strings";
import * as Upload from "~/node_common/upload";

const generateLayout = (items) => {
  if (!items) {
    return [];
  }

  if (!items.length) {
    return [];
  }

  return items.map((item, i) => {
    var y = Math.ceil(Math.random() * 4) + 1;

    return {
      x: (i * 2) % 10,
      y: 0,
      w: 2,
      h: 2,
      minW: 2,
      minH: 2,
      // NOTE(jim): Library quirk thats required.
      i: i.toString(),
    };
  });
};

// NOTE(jim): To support multipart request.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (Strings.isEmpty(req.headers.authorization)) {
    return res.status(404).send({
      decorator: "SERVER_API_KEY_MISSING",
      error: true,
    });
  }

  let slate = await Data.getSlateById({ id: req.query.id });

  if (!slate) {
    return res.status(404).send({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).send({
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
    return res.status(404).send({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  if (slate.error) {
    return res.status(500).send({
      decorator: "V1_SERVER_UPLOAD_SLATE_NOT_FOUND",
      error: true,
    });
  }

  const cid = updatedData.ipfs.replace("/ipfs/", "");
  const url = `https://${cid}.${Constants.IPFS_GATEWAY_DOMAIN}`;
  const newSlateObjectEntity = {
    id: updatedData.id,
    name: updatedData.name,
    title: updatedData.name,
    type: updatedData.type,
    ownerId: user.id,
    url,
  };
  const objects = [...slate.data.objects, newSlateObjectEntity];

  // TODO(jim): Preserve layouts when adding.
  let layouts = { lg: generateLayout(objects) };

  const updatedSlate = await Data.updateSlateById({
    id: slate.id,
    updated_at: new Date(),
    data: {
      ...slate.data,
      objects,
      layouts,
    },
  });

  if (!updatedSlate) {
    return res.status(500).send({
      decorator: "V1_SERVER_UPLOAD_TO_SLATE_ERROR",
      error: true,
    });
  }

  if (updatedSlate.error) {
    return res.status(500).send({
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
