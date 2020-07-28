import createUser from "~/node_common/data/methods/create-user";
import updateUserById from "~/node_common/data/methods/update-user-by-id";
import deleteUserByUsername from "~/node_common/data/methods/delete-user-by-username";
import getUserByUsername from "~/node_common/data/methods/get-user-by-username";
import getUserById from "~/node_common/data/methods/get-user-by-id";

import createSlate from "~/node_common/data/methods/create-slate";
import getSlateByName from "~/node_common/data/methods/get-slate-by-name";
import getSlateById from "~/node_common/data/methods/get-slate-by-id";
import getSlatesByUserId from "~/node_common/data/methods/get-slates-by-user-id";
import updateSlateById from "~/node_common/data/methods/update-slate-by-id";

import createAPIKeyForUserId from "~/node_common/data/methods/create-api-key-for-user-id";
import deleteAPIKeyById from "~/node_common/data/methods/delete-api-key-by-id";
import deleteAPIKeysForUserId from "~/node_common/data/methods/delete-api-keys-for-user-id";
import getAPIKey from "~/node_common/data/methods/get-api-key";
import getAPIKeysByUserId from "~/node_common/data/methods/get-api-keys-by-user-id";

export {
  // NOTE(jim): User operations.
  createUser,
  updateUserById,
  deleteUserByUsername,
  getUserByUsername,
  getUserById,
  // NOTE(jim): Slate operations.
  createSlate,
  getSlateByName,
  getSlateById,
  getSlatesByUserId,
  updateSlateById,
  // NOTE(jim): API key operations,
  createAPIKeyForUserId,
  deleteAPIKeyById,
  deleteAPIKeysForUserId,
  getAPIKey,
  getAPIKeysByUserId,
};
