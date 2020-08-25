import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";
import * as Constants from "~/node_common/constants";

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
  const slates = await Data.getSlatesByUserId({ userId: id });
  const keys = await Data.getAPIKeysByUserId({ userId: id });
  const subscriptions = await Data.getSubscriptionsByUserId({ userId: id });
  const activity = await Data.getActivityForUserId({ userId: id });
  const trusted = await Data.getTrustedRelationshipsByUserId({ userId: id });

  let bytes = 0;
  user.data.library[0].children.forEach((each) => {
    bytes = each.size + bytes;
  });

  try {
    data = {
      id: user.id,
      data: {
        photo: user.data.photo,
        name: user.data.name ? user.data.name : user.username,
        body: user.data.body ? user.data.body : "",
      },
      settings: {
        deals_auto_approve: user.data.settings_deals_auto_approve,
      },
      stats: {
        bytes,
        maximumBytes: Constants.TEXTILE_ACCOUNT_BYTE_LIMIT,
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
      subscriptions,
      activity,
      trusted,
    };
  } catch (e) {
    console.log(e);
    return null;
  }

  return data;
};
