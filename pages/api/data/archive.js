import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

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
  } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

  console.log(bucketRoot.root);

  // bucketRoot.root.key
  // bucketRoot.root.path

  const response = await buckets.archive(bucketRoot.root.key);
  console.log(response);

  return res.status(200).send({
    decorator: "SERVER_BUCKET_ARCHIVE_DEAL",
    data: {},
  });
};
