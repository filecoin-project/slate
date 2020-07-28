import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";

export const getById = async ({ id }) => {
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
  const response = await Data.getSlatesByUserId({ userId: id });
  const slates = JSON.parse(JSON.stringify(response));

  const keysRaw = await Data.getAPIKeysByUserId({ userId: id });
  const keys = JSON.parse(JSON.stringify(keysRaw));

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
      slates,
      keys,
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
