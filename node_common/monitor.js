import * as Data from "~/node_common/data";
import * as Social from "~/node_common/social";

export const deal = ({ userId, data }) => {
  try {
    Data.createOrUpdateStats(new Date(), { deals: 1 });

    // NOTE(jim):
    // <VIEWER>, CREATED DEAL
    Data.createActivity({
      userId,
      data: { type: "USER_DEAL", actorUserId: data.actorUserId, context: data.context },
    });

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;
    const message = `*${userURL}* made a one-off storage deal with bucket "${data.context.bucketName}".`;

    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

export const createUser = ({ userId, data }) => {
  try {
    Data.createOrUpdateStats(new Date(), { users: 1 });

    // NOTE(jim):
    // <VIEWER>, CREATED ACCOUNT
    Data.createActivity({
      userId,
      data: { type: "CREATE_USER", actorUserId: data.actorUserId, context: data.context },
    });

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;
    const message = `*${userURL}* joined the movement.`;

    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

const createSlateActivityForEachSubscriber = async ({ userId, data }) => {
  const subscriptions = await Data.getSubscriptionsToUserId({ userId });

  if (subscriptions.length) {
    for (let i = 0; i < subscriptions.length; i++) {
      const s = subscriptions[i];

      // NOTE(jim):
      // <USER> CREATED <SLATE>
      Data.createActivity({
        userId: s.owner_user_id,
        data: {
          type: "SUBSCRIBED_CREATE_SLATE",
          actorUserId: data.actorUserId,
          context: data.context,
        },
      });
    }
  }
};

export const createSlate = ({ userId, data }) => {
  try {
    Data.createOrUpdateStats(new Date(), { slates: 1 });

    // NOTE(jim):
    // <VIEWER> CREATED <SLATE>
    Data.createActivity({
      userId,
      data: { type: "CREATE_SLATE", actorUserId: data.actorUserId, context: data.context },
    });

    // NOTE(JIM):
    // <VIEWER> WITNESSES <USER> CREATING <SLATE>
    createSlateActivityForEachSubscriber({ userId, data });

    const userProfileURL = `https://slate.host/${data.context.user.username}`;
    const userURL = `<${userProfileURL}|${data.context.user.username}>`;
    const message = `*${userURL}* created a slate: https://slate.host/${data.context.user.username}/${data.context.slate.slatename}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

const createSlateObjectActivityForEachSubscriber = async ({ slateId, userId, data }) => {
  let subscriptions = await Data.getSubscriptionsToUserId({ userId });

  if (subscriptions.length) {
    for (let i = 0; i < subscriptions.length; i++) {
      const s = subscriptions[i];

      // NOTE(jim):
      // <VIEWER> WITNESS <USER> ADDED OBJECT TO <SLATE>
      Data.createActivity({
        userId: s.owner_user_id,
        data: {
          type: "SUBSCRIBED_ADD_TO_SLATE",
          actorUserId: data.actorUserId,
          context: data.context,
        },
      });
    }
  }

  subscriptions = await Data.getSubscriptionsToSlateId({ slateId });

  if (subscriptions.length) {
    for (let i = 0; i < subscriptions.length; i++) {
      const s = subscriptions[i];

      // NOTE(jim):
      // <VIEWER> WITNESS <USER> ADDED OBJECT TO <SLATE>
      Data.createActivity({
        userId: s.owner_user_id,
        data: {
          type: "SUBSCRIBED_ADD_TO_SLATE",
          actorUserId: data.actorUserId,
          context: data.context,
        },
      });
    }
  }
};

export const createSlateObject = ({ slateId, userId, data }) => {
  Data.createOrUpdateStats(new Date(), { objects: 1 });

  // TODO(jim): We may do some private tracking here.
  if (data.context.private) {
    return;
  }

  try {
    // NOTE(jim):
    // <USER> ADDED <SLATE OBJECT> TO <VIEWER-SLATE>
    Data.createActivity({
      slateId,
      data: {
        type: "CREATE_SLATE_OBJECT",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // NOTE(jim):
    // <VIEWER> WITNESS <USER> ADDED OBJECT TO <SLATE>
    createSlateObjectActivityForEachSubscriber({ slateId, userId, data });

    const userProfileURL = `https://slate.host/${data.context.user.username}`;
    const userURL = `<${userProfileURL}|${data.context.user.username}>`;
    const objectURL = `<https://slate.host/${data.context.user.username}/${data.context.slate.slatename}/cid:${data.context.file.cid}|${data.context.file.cid}>`;
    const message = `*${userURL}* added ${objectURL} to https://slate.host/${data.context.user.username}/${data.context.slate.slatename}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

const createSubscribeUserActivityForEachSubscriber = async ({ userId, data }) => {
  const subscriptions = await Data.getSubscriptionsToUserId({ userId });

  if (subscriptions.length) {
    for (let i = 0; i < subscriptions.length; i++) {
      const s = subscriptions[i];

      // NOTE(jim):
      // <VIEWER>, <USER> SUBSCRIBED TO <SUBSCRIBED_USER>
      Data.createActivity({
        userId: s.owner_user_id,
        data: {
          type: "USER_SUBSCRIBED_TO_SUBSCRIBED_USER",
          actorUserId: data.actorUserId,
          context: data.context,
        },
      });
    }
  }
};

export const subscribeUser = ({ userId, data }) => {
  Data.createOrUpdateStats(new Date(), { subscribeUsers: 1 });

  try {
    // NOTE(jim):
    // <VIEWER>, YOU SUBSCRIBED TO <USER>
    Data.createActivity({
      userId,
      data: {
        type: "SUBSCRIBE_USER",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // NOTE(jim):
    // <USER>. <VIEWER> SUBSCRIBED TO <USER>
    Data.createActivity({
      userId: data.context.targetUserId,
      data: {
        type: "RECEIVED_SUBSCRIBER",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // NOTE(jim):
    // <VIEWER> WITNESSES <USER> SUBSCRIBE TO <SUBSCRIBED_USER>
    // createSubscribeUserActivityForEachSubscriber({ userId, data });

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;

    const targetUserProfileURL = `https://slate.host/${data.context.targetUsername}`;
    const targetUserURL = `<${targetUserProfileURL}|${data.context.targetUsername}>`;

    const message = `*${userURL}* subscribed to ${targetUserURL}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

export const subscribeSlate = ({ slateId, data }) => {
  Data.createOrUpdateStats(new Date(), { subscribeSlates: 1 });

  try {
    // NOTE(jim):
    // <VIEWER-SLATE>, <USER> HAS SUBSCRIBED
    Data.createActivity({
      slateId,
      data: {
        type: "USER_SUBSCRIBED_SLATE",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // NOTE(jim):
    // <VIEWER>, YOU HAVE SUBSCRIBED TO <SLATE>
    Data.createActivity({
      userId: data.actorUserId,
      data: {
        type: "SUBSCRIBE_SLATE",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;

    const targetSlatePageURL = `https://slate.host/$/${data.context.slateId}`;
    const targetSlateURL = `<${targetSlatePageURL}|${data.context.slateId}>`;

    const message = `*${userURL}* subscribed to slate:${targetSlateURL}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

export const requestPeer = ({ userId, data }) => {
  // NOTE(jim): Don't track stats on this.

  try {
    // NOTE(jim):
    // <VIEWER>, <USER> WANTS TO BE YOUR PEER.
    Data.createActivity({
      userId,
      data: {
        type: "REQUEST_PEER",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;

    const targetUserProfileURL = `https://slate.host/${data.context.targetUsername}`;
    const targetUserURL = `<${targetUserProfileURL}|${data.context.targetUsername}>`;

    const message = `*${userURL}* made a request to trust ${targetUserURL}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

export const verifyPeer = ({ userId, data }) => {
  // NOTE(jim): Don't track stats on this.

  try {
    // NOTE(jim):
    // <VIEWER>, <USER> ACCEPTED YOUR REQUEST.
    Data.createActivity({
      userId,
      data: {
        type: "VERIFY_PEER",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;

    const targetUserProfileURL = `https://slate.host/${data.context.targetUsername}`;
    const targetUserURL = `<${targetUserProfileURL}|${data.context.targetUsername}>`;

    const message = `*${userURL}* has accepted a peer-to-peer relationship with ${targetUserURL}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};
