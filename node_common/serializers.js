import DB from "~/node_common/database";

export const user = (entity) => {
  return {
    type: "USER",
    id: entity.id,
    username: entity.username,
    slates: entity.slates ? entity.slates : [],
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

export const doTrusted = async ({
  users,
  trusted,
  serializedUsersMap,
  serializedSlatesMap,
}) => {
  trusted.forEach((each) => {
    if (each.target_user_id && !serializedUsersMap[each.target_user_id]) {
      users.push(each.target_user_id);
    }
  });

  let userEntities = [];
  try {
    console.log({ query: `CHECK_TO_SERIALIZE` });
    if (users.length) {
      console.log({ query: `(${users.length}) USERS_FOR_SERIALIZATION` });
      userEntities = await DB.select("id", "username", "data")
        .from("users")
        .whereIn("id", users);
    }
  } catch (e) {
    console.log("FAILED TO SERIALIZE");
    return {
      serializedTrusted: trusted,
      serializedUsersMap,
      serializedSlatesMap,
    };
  }

  const sanitized = trusted.map((data) => {
    let u = null;
    let o = null;

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

    return { ...data, user: u, owner: o };
  });

  return {
    serializedTrusted: JSON.parse(JSON.stringify(sanitized)),
    serializedUsersMap,
    serializedSlatesMap,
  };
};

export const doPendingTrusted = async ({
  users,
  pendingTrusted,
  serializedUsersMap,
  serializedSlatesMap,
}) => {
  pendingTrusted.forEach((each) => {
    if (each.owner_user_id && !serializedUsersMap[each.owner_user_id]) {
      users.push(each.owner_user_id);
    }
  });

  let userEntities = [];

  try {
    console.log({ query: `CHECK_TO_SERIALIZE` });
    if (users.length) {
      console.log({ query: `(${users.length}) USERS_FOR_SERIALIZATION` });
      userEntities = await DB.select("id", "username", "data")
        .from("users")
        .whereIn("id", users);
    }
  } catch (e) {
    console.log("FAILED TO SERIALIZE");
    return {
      serializedPendingTrusted: pendingTrusted,
      serializedUsersMap,
      serializedSlatesMap,
    };
  }

  const sanitized = pendingTrusted.map((data) => {
    let u = null;
    let o = null;

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

    return { ...data, user: u, owner: o };
  });

  return {
    serializedPendingTrusted: JSON.parse(JSON.stringify(sanitized)),
    serializedUsersMap,
    serializedSlatesMap,
  };
};

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
    console.log({ query: `CHECK_TO_SERIALIZE` });
    if (users.length) {
      console.log({ query: `(${users.length}) USERS_FOR_SERIALIZATION` });
      userEntities = await DB.select("id", "username", "data")
        .from("users")
        .whereIn("id", users);
    }
  } catch (e) {
    console.log("FAILED TO SERIALIZE");
    return {
      serializedSubscriptions: subscriptions,
      serializedUsersMap,
      serializedSlatesMap,
    };
  }

  let slateEntities = [];
  try {
    console.log({ query: `CHECK_TO_SERIALIZE` });
    if (slates.length) {
      console.log({ query: `(${slates.length}) SLATES_FOR_SERIALIZATION` });
      slateEntities = await DB.select("id", "slatename", "data")
        .from("slates")
        .whereIn("id", slates);
    }
  } catch (e) {
    console.log("FAILED TO SERIALIZE");
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
