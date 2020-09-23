import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_GET_BUCKET_DATA", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  const {
    buckets,
    bucketKey,
    bucketName,
  } = await Utilities.getBucketAPIFromUserToken({ user });

  if (!buckets) {
    return res
      .status(500)
      .send({ decorator: "SERVER_GET_BUCKET_INIT", error: true });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let r = null;
  try {
    r = await buckets.list();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/get.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  if (!r) {
    return res
      .status(500)
      .send({ decorator: "SERVER_GET_BUCKET_NO_TEXTILE", error: true });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let items = null;
  try {
    items = await buckets.listIpfsPath(r[0].path);
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/get.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });
  }

  if (!items) {
    return res
      .status(500)
      .send({ decorator: "SERVER_GET_BUCKET_NO_TEXTILE", error: true });
  }

  return res.status(200).send({
    decorator: "SERVER_GET",
    data: items.items,
  });
};
