import * as MW from "~/node_common/middleware";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

import FS from "fs-extra";

const initCORS = MW.init(MW.CORS);

export default async (req, res) => {
  initCORS(req, res);

  const { buckets } = await Utilities.getBucketAPI();

  return res.status(200).send({
    decorator: "SERVER_GET",
  });
};
