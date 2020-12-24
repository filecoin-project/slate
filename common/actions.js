import "isomorphic-fetch";

import * as Strings from "~/common/strings";

const REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const DEFAULT_OPTIONS = {
  method: "POST",
  headers: REQUEST_HEADERS,
  credentials: "include",
};

const CORS_OPTIONS = {
  method: "POST",
  headers: REQUEST_HEADERS,
  credentials: "omit",
};

const returnJSON = async (route, options) => {
  const response = await fetch(route, options);
  const json = await response.json();

  return json;
};

export const health = async (data = {}) => {
  return await returnJSON(`/api/_`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data: { buckets: data.buckets } }),
  });
};

export const sendFilecoin = async (data) => {
  if (Strings.isEmpty(data.source)) {
    return null;
  }

  if (Strings.isEmpty(data.target)) {
    return null;
  }

  if (!data.amount) {
    return null;
  }

  return await returnJSON(`/api/addresses/send`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const checkUsername = async (data) => {
  return await returnJSON(`/api/users/check`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const archive = async (data) => {
  return await returnJSON(`/api/data/archive`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const removeFromBucket = async (data) => {
  return await returnJSON(`/api/data/bucket-remove`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const getNetworkDirectory = async () => {
  return await returnJSON(`/api/directory`, {
    ...DEFAULT_OPTIONS,
  });
};

export const getSlateById = async (data) => {
  return await returnJSON(`/api/slates/get`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const getSlatesByIds = async (data) => {
  return await returnJSON(`/api/slates/get`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const deleteTrustRelationship = async (data) => {
  return await returnJSON(`/api/users/trust-delete`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const updateTrustRelationship = async (data) => {
  return await returnJSON(`/api/users/trust-update`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const createTrustRelationship = async (data) => {
  return await returnJSON(`/api/users/trust`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const createSubscription = async (data) => {
  return await returnJSON(`/api/subscribe`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const search = async (data) => {
  if (Strings.isEmpty(data.query)) {
    return { decorator: "NO_SERVER_TRIP", data: { results: [] } };
  }

  if (Strings.isEmpty(data.resourceURI)) {
    return { decorator: "NO_RESOURCE_URI", data: { results: [] } };
  }

  return await returnJSON(`${data.resourceURI}/search`, {
    ...CORS_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const createPendingFiles = async (data) => {
  return await returnJSON(`/api/data/create-pending`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const processPendingFiles = async () => {
  return await returnJSON(`/api/data/process-pending`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify(),
  });
};

export const addFileToSlate = async (data) => {
  return await returnJSON(`/api/slates/add-url`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const updateViewer = async (data) => {
  return await returnJSON(`/api/users/update`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const signIn = async (data) => {
  return await returnJSON(`/api/sign-in`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const hydrateAuthenticatedUser = async () => {
  return await returnJSON(`/api/hydrate`, {
    ...DEFAULT_OPTIONS,
  });
};

export const deleteViewer = async () => {
  return await returnJSON(`/api/users/delete`, {
    ...DEFAULT_OPTIONS,
  });
};

export const createUser = async (data) => {
  return await returnJSON(`/api/users/create`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const updateStatus = async (data) => {
  return await returnJSON(`/api/users/status-update`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const updateSearch = async (data) => {
  return await returnJSON(`/api/search/update`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const checkCIDStatus = async (data) => {
  return await returnJSON(`/api/data/cid-status`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const createSlate = async (data) => {
  return await returnJSON(`/api/slates/create`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const updateSlate = async (data) => {
  return await returnJSON(`/api/slates/update`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const deleteSlate = async (data) => {
  return await returnJSON(`/api/slates/delete`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const removeFileFromSlate = async (data) => {
  return await returnJSON(`/api/slates/remove`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const generateAPIKey = async () => {
  return await returnJSON(`/api/keys/generate`, {
    ...DEFAULT_OPTIONS,
  });
};

export const deleteAPIKey = async (data) => {
  return await returnJSON(`/api/keys/delete`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const addCIDToData = async (data) => {
  return await returnJSON(`/api/data/add`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const updateData = async (data) => {
  return await returnJSON(`/api/data/update`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const deleteBucketItems = async (data) => {
  return await returnJSON(`/api/data/remove`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const getSerializedSlate = async (data) => {
  return await returnJSON(`/api/slates/get-serialized`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const getSerializedProfile = async (data) => {
  return await returnJSON(`/api/users/get-serialized`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const createSupportMessage = async (data) => {
  return await returnJSON(`/api/support-message`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};

export const getActivity = async () => {
  return await returnJSON(`/api/activity/get`, {
    ...DEFAULT_OPTIONS,
  });
};

export const getZipFilesPaths = async (data) => {
  return await returnJSON(`api/zip/get-paths`, {
    ...DEFAULT_OPTIONS,
    body: JSON.stringify({ data }),
  });
};
