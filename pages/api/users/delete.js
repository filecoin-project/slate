import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";
import * as SearchManager from "~/node_common/managers/search";

import { Buckets, PrivateKey } from "@textile/hub";

import JWT from "jsonwebtoken";

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export const deleteUser = async (user) => {
  // NOTE(jim): remove their slates from the live site cache.
  let slates = await Data.getSlatesByUserId({ userId: user.id, publicOnly: true });
  for (let slate of slates) {
    SearchManager.updateSlate(slate, "REMOVE");
  }

  // NOTE(jim): revoke all of their API keys
  await Data.deleteAPIKeysForUserId({ userId: user.id });

  // NOTE(jim): delete all of their public and private slates.
  await Data.deleteSlatesForUserId({ userId: user.id });

  const i = await PrivateKey.fromString(user.data.tokens.api);
  const b = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  const defaultData = await Utilities.getBucketAPIFromUserToken({ user });

  // NOTE(jim): delete every bucket
  try {
    const roots = await defaultData.buckets.list();

    for (let i = 0; i < roots.length; i++) {
      await defaultData.buckets.remove(roots[i].key);
    }
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/users/delete.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `b.remove`,
    });
  }

  // NOTE(jim): remove user from live site cache.
  SearchManager.updateUser(user, "REMOVE");

  // NOTE(jim): remove orphan
  await Data.createOrphan({
    data: { token: user.data.tokens.api },
  });

  // NOTE(jim): finally delete user by username (irreversible)
  const deleted = await Data.deleteUserByUsername({
    username: user.username,
  });

  return deleted;
};

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_USER_DELETE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_USER_DELETE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_USER_DELETE_USER_NOT_FOUND", error: true });
  }

  const deleted = await deleteUser(user);

  if (!deleted || deleted.error) {
    return res.status(500).send({ decorator: "SERVER_USER_DELETE", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_USER_DELETE", deleted });
};
