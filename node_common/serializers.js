import DB from "~/node_common/database";

export const user = (entity) => {
  return {
    type: "USER",
    id: entity.id,
    username: entity.username,
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

  return { serializedSlates: JSON.parse(JSON.stringify(sanitized)), userToSlatesMap };
};

export const doTrusted = async ({ users, trusted }) => {
  trusted.forEach((each) => {
    if (each.target_user_id) {
      users.push(each.target_user_id);
    }
  });

  const userEntities = await DB.select("id", "username", "data").from("users").whereIn("id", users);

  const sanitized = trusted.map((data) => {
    let u = null;
    let o = null;

    // TODO(jim): Cache these as you go.
    if (data.target_user_id) {
      u = userEntities.find((e) => data.target_user_id === e.id);
      u = user(u);
    }

    if (data.owner_user_id) {
      o = userEntities.find((e) => data.owner_user_id === e.id);
      o = user(o);
    }

    return { ...data, user: u, owner: o };
  });

  return JSON.parse(JSON.stringify(sanitized));
};

export const doPendingTrusted = async ({ users, pendingTrusted }) => {
  pendingTrusted.forEach((each) => {
    if (each.owner_user_id) {
      users.push(each.owner_user_id);
    }
  });

  const userEntities = await DB.select("id", "username", "data").from("users").whereIn("id", users);

  const sanitized = pendingTrusted.map((data) => {
    let u = null;
    let o = null;

    // TODO(jim): Cache these as you go.
    if (data.target_user_id) {
      u = userEntities.find((e) => data.target_user_id === e.id);
      u = user(u);
    }

    if (data.owner_user_id) {
      o = userEntities.find((e) => data.owner_user_id === e.id);
      o = user(o);
    }

    return { ...data, user: u, owner: o };
  });

  return JSON.parse(JSON.stringify(sanitized));
};

export const doSubscriptions = async ({ users, slates, subscriptions }) => {
  subscriptions.forEach((each) => {
    if (each.target_user_id) {
      users.push(each.target_user_id);
    }

    if (each.target_slate_id) {
      slates.push(each.target_slate_id);
    }
  });

  const userEntities = await DB.select("id", "username", "data").from("users").whereIn("id", users);

  const slateEntities = await DB.select("id", "slatename", "data").from("slates").whereIn("id", slates);

  const sanitized = subscriptions.map((data) => {
    let u = null;
    let o = null;
    let s = null;

    // TODO(jim): Cache these as you go.
    if (data.target_user_id) {
      u = userEntities.find((e) => data.target_user_id === e.id);
      u = user(u);
    }

    if (data.owner_user_id) {
      o = userEntities.find((e) => data.owner_user_id === e.id);
      o = user(o);
    }

    if (data.target_slate_id) {
      s = slateEntities.find((e) => data.target_slate_id === e.id);
      s = slate(s);
    }

    return { ...data, user: u, owner: o, slate: s };
  });

  return JSON.parse(JSON.stringify(sanitized));
};
