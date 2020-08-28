import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";
import * as Constants from "~/node_common/constants";
import * as Serializers from "~/node_common/serializers";

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

  const activity = await Data.getActivityForUserId({ userId: id });
  const slates = await Data.getSlatesByUserId({ userId: id });
  const keys = await Data.getAPIKeysByUserId({ userId: id });
  const subscriptions = await Data.getSubscriptionsByUserId({ userId: id });
  const serializedSubscriptions = await Serializers.doSubscriptions({
    users: [id],
    slates: [],
    subscriptions,
  });
  const trusted = await Data.getTrustedRelationshipsByUserId({ userId: id });
  const serializedTrusted = await Serializers.doTrusted({
    users: [id],
    trusted,
  });
  const pendingTrusted = await Data.getPendingTrustedRelationshipsByUserId({
    userId: id,
  });
  const serializedPendingTrusted = await Serializers.doPendingTrusted({
    users: [id],
    pendingTrusted,
  });

  let bytes = 0;
  user.data.library[0].children.forEach((each) => {
    bytes = each.size + bytes;
  });

  return {
    ...Serializers.user(user),
    type: "VIEWER",

    // NOTE(jim): The only safe viewer fields to expose.
    settings: {
      deals_auto_approve: user.data.settings_deals_auto_approve,
    },
    library: user.data.library,

    // NOTE(jim): Remaining data.
    stats: {
      bytes,
      maximumBytes: Constants.TEXTILE_ACCOUNT_BYTE_LIMIT,
    },
    keys,
    activity,
    slates,
    subscriptions: serializedSubscriptions,
    trusted: serializedTrusted,
    pendingTrusted: serializedPendingTrusted,
  };
};
