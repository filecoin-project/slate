// TODO(jim): The claim is that we can remove this
// and the package.json depdencies at some later time.
import { grpc } from "@improbable-eng/grpc-web";
import { WebsocketTransport } from "@textile/grpc-transport";
grpc.setDefaultTransport(WebsocketTransport());

import * as Environment from "~/node_common/environment";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Constants from "~/node_common/constants";
import * as Serializers from "~/node_common/serializers";
import * as Social from "~/node_common/social";
import * as Strings from "~/common/strings";
import * as Websocket from "~/node_common/nodejs-websocket";

const STAGING_DEAL_BUCKET = "stage-deal";

const delay = async (waitMs) => {
  return await new Promise((resolve) => setTimeout(resolve, waitMs));
};

Websocket.create();

export const hydratePartialViewer = async (user) => {
  const data = {
    ...Serializers.user(user),
    type: "PARTIAL_VIEWER",
    library: user.data.library,
    onboarding: user.data.onboarding || {},

    // TODO(jim): Move this elsewhere.
    allow_filecoin_directory_listing: user.data.allow_filecoin_directory_listing
      ? user.data.allow_filecoin_directory_listing
      : null,
    allow_automatic_data_storage: user.data.allow_automatic_data_storage
      ? user.data.allow_automatic_data_storage
      : null,
    allow_encrypted_data_storage: user.data.allow_encrypted_data_storage
      ? user.data.allow_encrypted_data_storage
      : null,
  };

  if (Strings.isEmpty(Environment.PUBSUB_SECRET)) {
    return;
  }

  const ws = Websocket.get();
  const encryptedData = await Utilities.encryptWithSecret(
    JSON.stringify(data),
    Environment.PUBSUB_SECRET
  );

  // NOTE(jim): Only allow this to be passed around encrypted.
  ws.send(
    JSON.stringify({
      type: "UPDATE",
      iv: encryptedData.iv,
      data: encryptedData.hex,
    })
  );
};

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
  const subscribers = await Data.getSubscribersByUserId({ userId: id });

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

  const r2 = await Serializers.doSubscribers({
    users: [],
    slates: [],
    subscribers,
    serializedUsersMap: r1.serializedUsersMap,
    serializedSlatesMap: r1.serializedSlatesMap,
  });

  // NOTE(jim): If any trusted users are subscription users, this ends up being cheaper.
  const trusted = await Data.getTrustedRelationshipsByUserId({ userId: id });
  const r3 = await Serializers.doTrusted({
    users: [],
    trusted,
    serializedUsersMap: r2.serializedUsersMap,
    serializedSlatesMap: r2.serializedSlatesMap,
  });

  // NOTE(jim): This should be the cheapest call.
  const pendingTrusted = await Data.getPendingTrustedRelationshipsByUserId({
    userId: id,
  });
  const r4 = await Serializers.doPendingTrusted({
    users: [id],
    pendingTrusted,
    serializedUsersMap: r3.serializedUsersMap,
    serializedSlatesMap: r3.serializedSlatesMap,
  });

  let bytes = 0;
  let imageBytes = 0;
  let videoBytes = 0;
  let audioBytes = 0;
  let epubBytes = 0;
  let pdfBytes = 0;
  user.data.library[0].children.forEach((each) => {
    if (each.type && each.type.startsWith("image/")) {
      imageBytes += each.size;
    } else if (each.type && each.type.startsWith("video/")) {
      videoBytes += each.size;
    } else if (each.type && each.type.startsWith("audio/")) {
      audioBytes += each.size;
    } else if (each.type && each.type.startsWith("application/epub")) {
      epubBytes += each.size;
    } else if (each.type && each.type.startsWith("application/pdf")) {
      pdfBytes += each.size;
    }
    bytes += each.size;
  });

  return {
    ...Serializers.user(user),
    type: "VIEWER",
    library: user.data.library,
    onboarding: user.data.onboarding || {},

    // TODO(jim): Move this elsewhere.
    allow_filecoin_directory_listing: user.data.allow_filecoin_directory_listing
      ? user.data.allow_filecoin_directory_listing
      : null,
    allow_automatic_data_storage: user.data.allow_automatic_data_storage
      ? user.data.allow_automatic_data_storage
      : null,
    allow_encrypted_data_storage: user.data.allow_encrypted_data_storage
      ? user.data.allow_encrypted_data_storage
      : null,

    // NOTE(jim): Remaining data.
    stats: {
      bytes,
      maximumBytes: Constants.TEXTILE_ACCOUNT_BYTE_LIMIT,
      imageBytes,
      videoBytes,
      audioBytes,
      epubBytes,
      pdfBytes,
    },
    keys,
    activity,
    slates,
    subscriptions: r1.serializedSubscriptions,
    subscribers: r2.serializedSubscribers,
    trusted: r3.serializedTrusted,
    pendingTrusted: r4.serializedPendingTrusted,
  };
};

export const getDealHistory = async ({ id }) => {
  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return null;
  }

  if (user.error) {
    return null;
  }

  let deals = [];

  try {
    const PowergateSingleton = await Utilities.getPowergateAPIFromUserToken({
      user,
    });
    const { power } = PowergateSingleton;

    const result = await power.listStorageDealRecords({
      ascending: false,
      includePending: true,
      includeFinal: true,
    });

    for (let i = 0; i < result.recordsList.length; i++) {
      const o = result.recordsList[i];

      deals.push({
        dealId: o.dealInfo.dealId,
        rootCid: o.rootCid,
        proposalCid: o.dealInfo.proposalCid,
        pieceCid: o.dealInfo.pieceCid,
        addr: o.addr,
        miner: o.dealInfo.miner,
        size: o.dealInfo.size,
        // NOTE(jim): formatted size.
        formattedSize: Strings.bytesToSize(o.dealInfo.size),
        pricePerEpoch: o.dealInfo.pricePerEpoch,
        startEpoch: o.dealInfo.startEpoch,
        // NOTE(jim): just for point of reference on the total cost.
        totalSpeculatedCost: Strings.formatAsFilecoinConversion(
          o.dealInfo.pricePerEpoch * o.dealInfo.duration
        ),
        duration: o.dealInfo.duration,
        formattedDuration: Strings.getDaysFromEpoch(o.dealInfo.duration),
        activationEpoch: o.dealInfo.activationEpoch,
        time: o.time,
        createdAt: Strings.toDateSinceEpoch(o.time),
        pending: o.pending,
        user: Serializers.user(user),
      });
    }
  } catch (e) {
    console.log(e);
    Social.sendTextileSlackMessage({
      file: "/node_common/managers/viewer.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `power.listStorageDealRecords`,
    });
  }

  return { type: "VIEWER_FILECOIN_DEALS", deals };
};

export const getTextileById = async ({ id }) => {
  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return null;
  }

  if (user.error) {
    return null;
  }

  let dealJobs = [];

  const { power, powerInfo, powerHealth } = await Utilities.getPowergateAPIFromUserToken({ user });

  // NOTE(jim): This bucket is purely for staging data for other deals.
  const stagingData = await Utilities.getBucketAPIFromUserToken({
    user,
    bucketName: STAGING_DEAL_BUCKET,
    encrypted: false,
  });

  let r = null;
  try {
    r = await stagingData.buckets.list();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/managers/viewer.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  let items = null;
  const dealBucket = r.find((bucket) => bucket.name === STAGING_DEAL_BUCKET);
  try {
    const path = await stagingData.buckets.listPath(dealBucket.key, "/");
    items = path.item.items;
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/managers/viewer.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listPath`,
    });
  }

  return {
    type: "VIEWER_FILECOIN",
    settings: {
      deals_auto_approve: user.data.settings_deals_auto_approve,
    },
    powerInfo,
    powerHealth,
    deal: items ? items.filter((f) => f.name !== ".textileseed") : [],
  };
};
