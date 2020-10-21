// NOTE(jim):
// User postgres queries
import createUser from "~/node_common/data/methods/create-user";
import updateUserById from "~/node_common/data/methods/update-user-by-id";
import deleteUserByUsername from "~/node_common/data/methods/delete-user-by-username";
import getUserByUsername from "~/node_common/data/methods/get-user-by-username";
import getUserById from "~/node_common/data/methods/get-user-by-id";

//NOTE(martina):
// Pending user upload queries
import getPendingDataForUserId from "~/node_common/data/methods/get-pending-data-for-user-id";
import deletePendingDataByUserId from "~/node_common/data/methods/delete-pending-data-by-user-id";
import createPendingData from "~/node_common/data/methods/create-pending-data";

// NOTE(jim):
// Slate postgres queries
import createSlate from "~/node_common/data/methods/create-slate";
import getSlateByName from "~/node_common/data/methods/get-slate-by-name";
import getSlateById from "~/node_common/data/methods/get-slate-by-id";
import getSlatesByUserId from "~/node_common/data/methods/get-slates-by-user-id";
import updateSlateById from "~/node_common/data/methods/update-slate-by-id";
import deleteSlatesForUserId from "~/node_common/data/methods/delete-slates-for-user-id";
import deleteSlateById from "~/node_common/data/methods/delete-slate-by-id";
import deleteRepostsByCid from "~/node_common/data/methods/delete-reposts-by-cid";

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
import getSubscribersByUserId from "~/node_common/data/methods/get-subscribers-by-user-id";
import deleteSubscriptionById from "~/node_common/data/methods/delete-subscription-by-id";

// NOTE(jim):
// Trust postgres queries
import createTrustedRelationship from "~/node_common/data/methods/create-trusted-relationship";
import updateTrustedRelationshipById from "~/node_common/data/methods/update-trusted-relationship-by-id";
import getTrustedRelationshipsByUserId from "~/node_common/data/methods/get-trusted-relationships-by-user-id";
import getPendingTrustedRelationshipsByUserId from "~/node_common/data/methods/get-pending-trusted-relationships-by-user-id";
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

// NOTE(jim):
// Search postgres queries
import querySlates from "~/node_common/data/methods/query-slates";
import queryUsers from "~/node_common/data/methods/query-users";
import getEverySlate from "~/node_common/data/methods/get-every-slate";
import getEveryUser from "~/node_common/data/methods/get-every-user";

// NOTE(jim):
// Deals
import getAllDeals from "~/node_common/data/methods/get-all-deals";

export {
  getAllDeals,
  // NOTE(jim): User operations.
  createUser,
  updateUserById,
  deleteUserByUsername,
  getUserByUsername,
  getUserById,
  // NOTE(martina): Pending user upload operations
  getPendingDataForUserId,
  deletePendingDataByUserId,
  createPendingData,
  // NOTE(jim): Slate operations.
  createSlate,
  getSlateByName,
  getSlateById,
  getSlatesByUserId,
  updateSlateById,
  deleteSlatesForUserId,
  deleteSlateById,
  deleteRepostsByCid,
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
  getSubscribersByUserId,
  deleteSubscriptionById,
  // NOTE(jim): Trust operations
  createTrustedRelationship,
  updateTrustedRelationshipById,
  getPendingTrustedRelationshipsByUserId,
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
  // NOTE(jim): Search
  queryUsers,
  querySlates,
  getEverySlate,
  getEveryUser,
};
