import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/node_common/utilities";
import * as Powergate from "~/node_common/powergate";
import * as LibraryManager from "~/node_common/managers/library";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(403)
      .json({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_BUCKET_ARCHIVE_DEAL_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
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
