import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(403)
      .send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_BUCKET_ARCHIVE_DEAL_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_BUCKET_ARCHIVE_DEAL_USER_NOT_FOUND",
      error: true,
    });
  }

  const {
    buckets,
    bucketKey,
    bucketName,
    bucketRoot,
  } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api, user);

  // bucketRoot.root.key
  // bucketRoot.root.path

  let response = {};
  let error = {};
  try {
    response = await buckets.archive(bucketRoot.root.key);
  } catch (e) {
    error.message = e.message;
    error.code = e.code;
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/archive.js",
      user: user,
      message: e.message,
      code: e.code,
      functionName: `buckets.archive`,
    });
  }

  return res.status(200).send({
    decorator: "SERVER_BUCKET_ARCHIVE_DEAL",
    data: { response, error },
  });
};
