import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";

import PG from "~/node_common/powergate";

export const getViewer = async ({ username }) => {
  const user = await Data.getUserByUsername({
    username,
  });

  if (!user) {
    return null;
  }

  if (user.error) {
    return null;
  }

  const {
    buckets,
    bucketKey,
    bucketName,
  } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

  let data = {
    id: user.id,
    data: user.data,
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
    library: user.data.library,
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

  return data;
};
