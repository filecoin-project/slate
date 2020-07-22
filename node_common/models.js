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

  let data = null;

  // NOTE(jim): Essential for getting the right Powergate data for a user.
  try {
    PG.setToken(user.data.tokens.pg);

    const {
      buckets,
      bucketKey,
      bucketName,
    } = await Utilities.getBucketAPIFromUserToken(user.data.tokens.api);

    data = {
      id: user.id,
      data: { photo: user.data.photo },
      settings: {
        deals_auto_approve: user.data.settings_deals_auto_approve,
      },
      username: user.username,
      library: user.data.library,
      peersList: null,
      messageList: null,
      status: null,
      addrsList: null,
      info: null,
    };

    const updates = await Utilities.refresh({ PG });
    const updatesWithToken = await Utilities.refreshWithToken({
      PG,
    });

    data = await Utilities.updateStateData(data, {
      ...updates,
      ...updatesWithToken,
    });
  } catch (e) {
    console.log(e);
    return null;
  }

  return data;
};
