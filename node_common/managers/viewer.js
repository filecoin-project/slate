import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";
import * as Constants from "~/node_common/constants";
import * as Serializers from "~/node_common/serializers";

// TODO(jim): Work on better serialization when adoption starts occuring.
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

  // TODO(jim): You can serialize this last because you will have all the information
  // from subscriptionsed, trusted, and pendingTrusted most likely.
  const activity = await Data.getActivityForUserId({ userId: id });
  const slates = await Data.getSlatesByUserId({ userId: id });
  const keys = await Data.getAPIKeysByUserId({ userId: id });
  const subscriptions = await Data.getSubscriptionsByUserId({ userId: id });

  let serializedUsersMap = { [user.id]: Serializers.user(user) };
  let serializedSlatesMap = {};

  // NOTE(jim): The most expensive call first.
  const r1 = await Serializers.doSubscriptions({
    users: [],
    slates: [],
    subscriptions,
    serializedUsersMap,
    serializedSlatesMap,
  });

  // NOTE(jim): If any trusted users are subscription users, this ends up being cheaper.
  const trusted = await Data.getTrustedRelationshipsByUserId({ userId: id });
  const r2 = await Serializers.doTrusted({
    users: [],
    trusted,
    serializedUsersMap: r1.serializedUsersMap,
    serializedSlatesMap: r1.serializedSlatesMap,
  });

  // NOTE(jim): This should be the cheapest call.
  const pendingTrusted = await Data.getPendingTrustedRelationshipsByUserId({
    userId: [],
  });
  const r3 = await Serializers.doPendingTrusted({
    users: [id],
    pendingTrusted,
    serializedUsersMap: r2.serializedUsersMap,
    serializedSlatesMap: r2.serializedSlatesMap,
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
    subscriptions: r1.serializedSubscriptions,
    trusted: r2.serializedTrusted,
    pendingTrusted: r3.serializedPendingTrusted,
  };
};
