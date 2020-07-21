import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";

import PG from "~/node_common/powergate";
import FS from "fs-extra";
import path from "path";

const initCORS = MW.init(MW.CORS);

export default async (req, res) => {
  initCORS(req, res);

  const user = await Data.getUserByUsername({
    username: req.body.data.username,
  });

  if (!user) {
    return res.status(200).json({ decorator: "SERVER_HYDRATE", error: true });
  }

  if (user.error) {
    return res.status(200).json({ decorator: "SERVER_HYDRATE", error: true });
  }

  const {
    buckets,
    bucketKey,
    bucketName,
  } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

  // TODO(jim): This is obviously a test!
  // Slates will hold an index
  // Library will hold an index
  let data = {
    peersList: null,
    messageList: null,
    status: null,
    addrsList: null,
    info: null,
    state: null,
    local: {
      photo: null,
      name: `node`,
      settings_deals_auto_approve: false,
    },
    library: [
      {
        ...Utilities.createFolder({ id: bucketName, name: "Data" }),
        children: [
          await Utilities.addFileFromFilePath({
            buckets,
            bucketKey,
            filePath: "./public/static/social.jpg",
          }),
          await Utilities.addFileFromFilePath({
            buckets,
            bucketKey,
            filePath: "./public/static/cube_000.jpg",
          }),
          await Utilities.addFileFromFilePath({
            buckets,
            bucketKey,
            filePath: "./public/static/cube_f7f7f7.jpg",
          }),
        ],
      },
    ],
  };

  // NOTE(jim): Should render a list of buckets.
  const roots = await buckets.list();
  console.log({ roots });

  PG.setToken(user.data.tokens.pg);

  const updates = await Utilities.refresh({ PG });
  const updatesWithToken = await Utilities.refreshWithToken({
    PG,
  });

  data = await Utilities.updateStateData(data, {
    ...updates,
    ...updatesWithToken,
  });

  return res
    .status(200)
    .send({ decorator: "SERVER_HYDRATE", success: true, data });
};
