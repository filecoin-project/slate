import DB from "~/node_common/database";

export const user = (entity) => {
  return {
    type: "USER",
    id: entity.id,
    username: entity.username,
    data: {
      name: entity.data.name,
      photo: entity.data.photo,
      body: entity.data.body,
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
      name: entity.data.name,
      body: entity.data.body,
      objects: entity.data.objects,
    },
  };
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

  const userEntities = await DB.select("id", "username", "data")
    .from("users")
    .whereIn("id", users);

  const slateEntities = await DB.select("id", "slatename", "data")
    .from("slates")
    .whereIn("id", slates);

  const sanitized = subscriptions.map((data) => {
    let u = null;
    let o = null;
    let s = null;

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
