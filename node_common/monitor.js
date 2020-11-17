import * as Data from "~/node_common/data";
import * as Social from "~/node_common/social";

export const deal = ({ userId, data }) => {
  try {
    // Data.createOrUpdateStats(new Date(), { deals: 1 });

    // NOTE(jim):
    // <USER> CREATED <DEAL>
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
    // Data.createOrUpdateStats(new Date(), { users: 1 });

    // NOTE(jim):
    // <USER> INIT
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

export const createSlate = ({ userId, data }) => {
  try {
    // Data.createOrUpdateStats(new Date(), { slates: 1 });

    // NOTE(jim):
    // <USER> CREATED <SLATE>
    Data.createActivity({
      userId,
      data: { type: "CREATE_SLATE", actorUserId: data.actorUserId, context: data.context },
    });

    // TODO(JIM):
    // <USER SUBSCRIBER> WITNESSES <USER> CREATING <SLATE>
    // --

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;
    const message = `*${userURL}* created a slate: https://slate.host/${data.context.username}/${data.context.slatename}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

export const createSlateObject = ({ slateId, data }) => {
  // Data.createOrUpdateStats(new Date(), { objects: 1 });

  // TODO(jim): We may do some private tracking here.
  if (data.context.private) {
    return;
  }

  try {
    // NOTE(jim):
    // <USER> ADDED <SLATE OBJECT> TO <SLATE>
    Data.createActivity({
      slateId,
      data: {
        type: "CREATE_SLATE_OBJECT",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // TODO(jim):
    // <SUBSCRIBED USER> WITNESS <USER> ADDED OBJECT TO <SLATE>
    // --

    // TODO(JIM):
    // <SLATE SUBSCRIBER> WITNESS <USER> ADD OBJECT TO <SLATE>
    // --

    const userProfileURL = `https://slate.host/${data.context.username}`;
    const userURL = `<${userProfileURL}|${data.context.username}>`;
    const objectURL = `<https://slate.host/${data.context.username}/${data.context.slatename}/cid:${data.context.cid}|${data.context.cid}>`;
    const message = `*${userURL}* added ${objectURL} to https://slate.host/${data.context.username}/${data.context.slatename}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    console.log(e);
  }
};

export const subscribeUser = ({ userId, data }) => {
  // Data.createOrUpdateStats(new Date(), { subscribeUsers: 1 });

  try {
    // NOTE(jim):
    // YOU SUBSCRIBED TO <USER>
    Data.createActivity({
      userId,
      data: {
        type: "SUBSCRIBE_USER",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // NOTE(jim):
    // <USER> SUBSCRIBES TO YOU
    Data.createActivity({
      userId: data.context.targetUserId,
      data: {
        type: "SUBSCRIBE_USER",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // TODO(jim):
    // <USER SUBSCRIBER> WITNESSES <USER> SUBSCRIBE TO <USER>
    // --

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
  // Data.createOrUpdateStats(new Date(), { subscribeSlates: 1 });

  try {
    // NOTE(jim):
    // <SLATE> OBTAINS NEW <USER>
    Data.createActivity({
      slateId,
      data: {
        type: "SUBSCRIBE_SLATE",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // NOTE(jim):
    // YOU SUBSCRIBES TO <SLATE>
    Data.createActivity({
      userId: data.actorUserId,
      data: {
        type: "SUBSCRIBE_SLATE",
        actorUserId: data.actorUserId,
        context: data.context,
      },
    });

    // TODO(jim):
    // <SLATE SUBSCRIBER> WITNESSES <SLATE> OBTAIN NEW <USER>
    // --

    // TODO(jim):
    // <USER SUBSCRIBER> WITNESSES <USER> SUBSCRIBES TO <SLATE>
    // --

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

// TODO: ADD PEER
