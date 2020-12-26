import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);

  const user = await Data.getUserById({
    id,
  });

  if (!user || user.error) {
    return res
      .status(403)
      .send({ decorator: "SERVER_GET_ZIP_FILES_PATHS_USER_NOT_FOUND", error: true });
  }

  let { buckets, bucketKey } = await Utilities.getBucketAPIFromUserToken({
    user,
  });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_GET_BUCKET_DATA",
      error: true,
    });
  }

  let filesPaths = null;
  try {
    filesPaths = await buckets.listPathFlat(bucketKey, `/${req.body.data.id}`, false);
  } catch (e) {
    res.set("Connection", "close");
    return {
      decorator: "GET_ZIP_FILES_PATHS_BUCKET_CHECK_FAILED",
      error: true,
    };
  }

  return res.status(200).send({
    decorator: "SERVER_ZIP_FILES_PATHS",
    data: { filesPaths },
  });
};
