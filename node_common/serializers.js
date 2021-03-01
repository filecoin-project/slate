import DB from "~/node_common/database";
import * as Data from "~/node_common/data";

export const user = (entity) => {
  return {
    type: "USER",
    id: entity.id,
    username: entity.username,
    slates: entity.slates ? entity.slates : [],
    library: entity.library ? entity.library : [],
    data: {
      name: entity.data.name ? entity.data.name : "",
      photo: entity.data.photo ? entity.data.photo : "",
      body: entity.data.body ? entity.data.body : "",
    },
  };
};

export const slate = (entity) => {
  return {
    type: "SLATE",
    id: entity.id,
    slatename: entity.slatename,
    data: {
      ownerId: entity.data.ownerId,
      name: entity.data.name ? entity.data.name : "",
      body: entity.data.body ? entity.data.body : "",
      objects: entity.data.objects,
      layouts: entity.data.layouts,
      public: entity.data.public,
    },
  };
};

export const doSlates = async ({ serializedUsers, slates }) => {
  const userToSlatesMap = {};

  const sanitized = slates.map((d) => {
    let o = null;

    if (userToSlatesMap[d.data.ownerId]) {
      userToSlatesMap[d.data.ownerId].push(d);
    }

    if (!userToSlatesMap[d.data.ownerId]) {
      userToSlatesMap[d.data.ownerId] = [d];
    }

    if (d.data.ownerId) {
      o = serializedUsers.find((e) => d.data.ownerId === e.id);
    }

    return { ...d, owner: o };
  });

  return {
    serializedSlates: JSON.parse(JSON.stringify(sanitized)),
    userToSlatesMap,
  };
};

// export const doTrusted = async ({ users, trusted, serializedUsersMap, serializedSlatesMap }) => {
//   trusted.forEach((each) => {
//     if (each.target_user_id && !serializedUsersMap[each.target_user_id]) {
//       users.push(each.target_user_id);
//     }
//   });

//   let userEntities = [];
//   try {
//     if (users.length) {
//       userEntities = await DB.select("id", "username", "data")
//         .from("users")
//         .whereIn("id", users);
//     }
//   } catch (e) {
//     return {
//       serializedTrusted: trusted,
//       serializedUsersMap,
//       serializedSlatesMap,
//     };
//   }

//   const sanitized = trusted.map((data) => {
//     let u = null;
//     let o = null;

//     if (data.target_user_id) {
//       if (serializedUsersMap[data.target_user_id]) {
//         u = serializedUsersMap[data.target_user_id];
//       } else {
//         u = userEntities.find((e) => data.target_user_id === e.id);
//         u = user(u);
//         serializedUsersMap[data.target_user_id] = u;
//       }
//     }

//     if (data.owner_user_id) {
//       if (serializedUsersMap[data.owner_user_id]) {
//         o = serializedUsersMap[data.owner_user_id];
//       } else {
//         o = userEntities.find((e) => data.owner_user_id === e.id);
//         o = user(o);
//         serializedUsersMap[data.owner_user_id] = o;
//       }
//     }

//     return { ...data, user: u, owner: o };
//   });

//   return {
//     serializedTrusted: JSON.parse(JSON.stringify(sanitized)),
//     serializedUsersMap,
//     serializedSlatesMap,
//   };
// };

// export const doPendingTrusted = async ({
//   users,
//   pendingTrusted,
//   serializedUsersMap,
//   serializedSlatesMap,
// }) => {
//   pendingTrusted.forEach((each) => {
//     if (each.owner_user_id && !serializedUsersMap[each.owner_user_id]) {
//       users.push(each.owner_user_id);
//     }
//   });

//   let userEntities = [];

//   try {
//     if (users.length) {
//       userEntities = await DB.select("id", "username", "data")
//         .from("users")
//         .whereIn("id", users);
//     }
//   } catch (e) {
//     return {
//       serializedPendingTrusted: pendingTrusted,
//       serializedUsersMap,
//       serializedSlatesMap,
//     };
//   }

//   const sanitized = pendingTrusted.map((data) => {
//     let u = null;
//     let o = null;

//     if (data.target_user_id) {
//       if (serializedUsersMap[data.target_user_id]) {
//         u = serializedUsersMap[data.target_user_id];
//       } else {
//         u = userEntities.find((e) => data.target_user_id === e.id);
//         u = user(u);
//         serializedUsersMap[data.target_user_id] = u;
//       }
//     }

//     if (data.owner_user_id) {
//       if (serializedUsersMap[data.owner_user_id]) {
//         o = serializedUsersMap[data.owner_user_id];
//       } else {
//         o = userEntities.find((e) => data.owner_user_id === e.id);
//         o = user(o);
//         serializedUsersMap[data.owner_user_id] = o;
//       }
//     }

//     return { ...data, user: u, owner: o };
//   });

//   return {
//     serializedPendingTrusted: JSON.parse(JSON.stringify(sanitized)),
//     serializedUsersMap,
//     serializedSlatesMap,
//   };
// };

export const doSubscriptions = async ({
  users,
  slates,
  subscriptions,
  serializedUsersMap,
  serializedSlatesMap,
}) => {
  subscriptions.forEach((each) => {
    if (each.target_user_id && !serializedUsersMap[each.target_user_id]) {
      users.push(each.target_user_id);
    }

    if (each.target_slate_id && !serializedSlatesMap[each.target_slate_id]) {
      slates.push(each.target_slate_id);
    }
  });

  let userEntities = [];
  try {
    if (users.length) {
      userEntities = await DB.select("id", "username", "data").from("users").whereIn("id", users);
    }
  } catch (e) {
    return {
      serializedSubscriptions: subscriptions,
      serializedUsersMap,
      serializedSlatesMap,
    };
  }

  let slateEntities = [];
  try {
    if (slates.length) {
      slateEntities = await DB.select("id", "slatename", "data")
        .from("slates")
        .whereIn("id", slates);
    }
  } catch (e) {
    return {
      serializedSubscriptions: subscriptions,
      serializedUsersMap,
      serializedSlatesMap,
    };
  }

  const sanitized = subscriptions.map((data) => {
    let u = null;
    let o = null;
    let s = null;

    if (data.target_user_id) {
      if (serializedUsersMap[data.target_user_id]) {
        u = serializedUsersMap[data.target_user_id];
      } else {
        u = userEntities.find((e) => data.target_user_id === e.id);
        u = user(u);
        serializedUsersMap[data.target_user_id] = u;
      }
    }

    if (data.owner_user_id) {
      if (serializedUsersMap[data.owner_user_id]) {
        o = serializedUsersMap[data.owner_user_id];
      } else {
        o = userEntities.find((e) => data.owner_user_id === e.id);
        o = user(o);
        serializedUsersMap[data.owner_user_id] = o;
      }
    }

    if (data.target_slate_id) {
      if (serializedSlatesMap[data.target_slate_id]) {
        s = serializedSlatesMap[data.target_slate_id];
      } else {
        s = slateEntities.find((e) => data.target_slate_id === e.id);
        s = slate(s);
        serializedSlatesMap[data.target_slate_id] = s;
      }
    }

    return { ...data, user: u, owner: o, slate: s };
  });

  return {
    serializedSubscriptions: JSON.parse(JSON.stringify(sanitized)),
    serializedUsersMap,
    serializedSlatesMap,
  };
};

export const doSubscribers = async ({
  users,
  slates,
  subscribers,
  serializedUsersMap,
  serializedSlatesMap,
}) => {
  subscribers.forEach((each) => {
    if (each.owner_user_id && !serializedUsersMap[each.owner_user_id]) {
      users.push(each.owner_user_id);
    }
  });

  let userEntities = [];
  try {
    if (users.length) {
      userEntities = await DB.select("id", "username", "data").from("users").whereIn("id", users);
    }
  } catch (e) {
    return {
      serializedSubscribers: subscribers,
      serializedUsersMap,
      serializedSlatesMap,
    };
  }

  const sanitized = subscribers.map((data) => {
    let u = null;
    let o = null;
    let s = null;

    if (data.owner_user_id) {
      if (serializedUsersMap[data.owner_user_id]) {
        o = serializedUsersMap[data.owner_user_id];
      } else {
        o = userEntities.find((e) => data.owner_user_id === e.id);
        o = user(o);
        serializedUsersMap[data.owner_user_id] = o;
      }
    }

    if (data.target_user_id) {
      if (serializedUsersMap[data.target_user_id]) {
        u = serializedUsersMap[data.target_user_id];
      } else {
        u = userEntities.find((e) => data.target_user_id === e.id);
        u = user(u);
        serializedUsersMap[data.target_user_id] = u;
      }
    }

    return { ...data, user: u, owner: o, slate: s };
  });

  return {
    serializedSubscribers: JSON.parse(JSON.stringify(sanitized)),
    serializedUsersMap,
    serializedSlatesMap,
  };
};

export const doActivity = async (fetchedActivity) => {
  let activity = fetchedActivity;
  let slateIds = [];
  if (activity && activity.length) {
    activity = activity.filter((item) => {
      if (item.data.type === "SUBSCRIBED_CREATE_SLATE") {
        slateIds.push(item.data.context.slate.id);
      }
      return (
        item.data.type === "SUBSCRIBED_CREATE_SLATE" || item.data.type === "SUBSCRIBED_ADD_TO_SLATE"
      );
    });
  }

  let slates = [];
  if (slateIds && slateIds.length) {
    slates = await Data.getSlatesByIds({ ids: slateIds });
  }

  let slateTable = {};
  for (let slate of slates || []) {
    slateTable[slate.id] = slate;
  }

  for (let item of activity) {
    if (item.data.type === "SUBSCRIBED_CREATE_SLATE") {
      let slate = slateTable[item.data.context.slate.id];
      if (slate?.data?.objects?.length) {
        item.data.context.slate = slate;
      }
    }
  }
  //NOTE(martina): remove empty slates
  activity = activity.filter((item) => {
    if (item.data.type === "SUBSCRIBED_ADD_TO_SLATE") return true;
    let slate = item.data.context.slate;
    return slate?.data?.objects?.length;
  });

  return activity;
};
