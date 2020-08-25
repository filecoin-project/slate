// NOTE(jim):
// User postgres queries
import createUser from "~/node_common/data/methods/create-user";
import updateUserById from "~/node_common/data/methods/update-user-by-id";
import deleteUserByUsername from "~/node_common/data/methods/delete-user-by-username";
import getUserByUsername from "~/node_common/data/methods/get-user-by-username";
import getUserById from "~/node_common/data/methods/get-user-by-id";

// NOTE(jim):
// Slate postgres queries
import createSlate from "~/node_common/data/methods/create-slate";
import getSlateByName from "~/node_common/data/methods/get-slate-by-name";
import getSlateById from "~/node_common/data/methods/get-slate-by-id";
import getSlatesByUserId from "~/node_common/data/methods/get-slates-by-user-id";
import updateSlateById from "~/node_common/data/methods/update-slate-by-id";
import deleteSlatesForUserId from "~/node_common/data/methods/delete-slates-for-user-id";
import deleteSlateById from "~/node_common/data/methods/delete-slate-by-id";

// NOTE(jim):
// API postgres queries
import createAPIKeyForUserId from "~/node_common/data/methods/create-api-key-for-user-id";
import deleteAPIKeyById from "~/node_common/data/methods/delete-api-key-by-id";
import deleteAPIKeysForUserId from "~/node_common/data/methods/delete-api-keys-for-user-id";
import getAPIKey from "~/node_common/data/methods/get-api-key";
import getAPIKeyByKey from "~/node_common/data/methods/get-api-key-by-key";
import getAPIKeysByUserId from "~/node_common/data/methods/get-api-keys-by-user-id";

// NOTE(jim):
// Subscription postgres queries
import createSubscription from "~/node_common/data/methods/create-subscription";
import getSubscriptionById from "~/node_common/data/methods/get-subscription-by-id";
import getSubscriptionsByUserId from "~/node_common/data/methods/get-subscriptions-by-user-id";
import getSubscriptionsToUserId from "~/node_common/data/methods/get-subscriptions-to-user-id";
import getSubscriptionsToSlateId from "~/node_common/data/methods/get-subscriptions-to-slate-id";
import deleteSubscriptionById from "~/node_common/data/methods/delete-subscription-by-id";

// NOTE(jim):
// Trust postgres queries
import createTrustedRelationship from "~/node_common/data/methods/create-trusted-relationship";
import getTrustedRelationshipsByUserId from "~/node-common/data/methods/get-trusted-relationships-by-user-id";
import getTrustedRelationshipByUserIds from "~/node_common/data/methods/get-trusted-relationship-by-ids";
import getTrustedRelationshipById from "~/node_common/data/methods/get-trusted-relationship-by-id";
import deleteTrustedRelationshipById from "~/node_common/data/methods/delete-trusted-relationship-by-id";

// NOTE(jim):
// Activity postgres queries
import createActivity from "~/node_common/data/methods/create-activity";
import getActivityForUserId from "~/node_common/data/methods/get-activity-for-user-id";
import getActivityForSlateId from "~/node_common/data/methods/get-activity-for-slate-id";
import getActivityById from "~/node_common/data/methods/get-activity-by-id";
import deleteActivityById from "~/node_common/data/methods/delete-activity-by-id";

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
  deleteSlatesForUserId,
  deleteSlateById,
  // NOTE(jim): API key operations,
  createAPIKeyForUserId,
  deleteAPIKeyById,
  deleteAPIKeysForUserId,
  getAPIKey,
  getAPIKeyByKey,
  getAPIKeysByUserId,
  // NOTE(jim): Subscription operations,
  createSubscription,
  getSubscriptionById,
  getSubscriptionsByUserId,
  getSubscriptionsToSlateId,
  getSubscriptionsToUserId,
  deleteSubscriptionById,
  // NOTE(jim): Trust operations
  createTrustedRelationship,
  getTrustedRelationshipsByUserId,
  getTrustedRelationshipByUserIds,
  getTrustedRelationshipById,
  deleteTrustedRelationshipById,
  // NOTE(jim): Activity operations
  createActivity,
  getActivityForUserId,
  getActivityForSlateId,
  getActivityById,
  deleteActivityById,
};
