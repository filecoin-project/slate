import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";

export const getViewer = async ({ id }) => {
  const user = await Data.getUserById({
    id,
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
    data = {
      id: user.id,
      data: { photo: user.data.photo },
      settings: {
        deals_auto_approve: user.data.settings_deals_auto_approve,
      },
      username: user.username,
      library: user.data.library,
      storageList: [],
      retrievalList: [],
      peersList: null,
      messageList: null,
      status: null,
      addrsList: null,
      info: null,
    };

    const updates = await Utilities.refresh(user);
    const updatesWithToken = await Utilities.refreshWithToken(user);

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
