import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).json({ decorator: "SERVER_GET_BUCKET_DATA", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  const { buckets, bucketKey, bucketName } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

  const r = await buckets.list();
  const items = await buckets.listIpfsPath(r[0].path);

  return res.status(200).send({
    decorator: "SERVER_GET",
    data: items.itemsList,
  });
};
