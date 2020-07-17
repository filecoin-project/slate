import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";

import { Buckets, UserAuth } from "@textile/hub";
import { Libp2pCryptoIdentity } from "@textile/threads-core";

import PG from "~/node_common/powergate";

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

  const identity = await Libp2pCryptoIdentity.fromString(user.data.tokens.api);

  const b = Buckets.withUserAuth(identity);

  // TODO(jim): API key not found or is invalid.
  const buckets = await b.list();
  // console.log(buckets);

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
        ...Utilities.createFolder({ id: Constants.FILE_STORAGE_URL }),
        file: "Files",
        name: "Files",
      },
    ],
    buckets: [],
  };

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
