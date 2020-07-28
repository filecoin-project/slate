import "isomorphic-fetch";

import * as State from "~/common/state";
import * as Strings from "~/common/strings";

const REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
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

  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/addresses/send`, options);
  const json = await response.json();

  return json;
};

export const updateViewer = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify(data),
  };

  const response = await fetch(`/api/users/update`, options);
  const json = await response.json();

  return json;
};

export const signIn = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/sign-in`, options);
  const json = await response.json();

  return json;
};

export const hydrateAuthenticatedUser = async () => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
  };

  const response = await fetch(`/api/hydrate`, options);
  const json = await response.json();

  return json;
};

export const deleteViewer = async () => {
  const options = {
    method: "DELETE",
    headers: REQUEST_HEADERS,
    credentials: "include",
  };

  const response = await fetch(`/api/users/delete`, options);
  const json = await response.json();
  return json;
};

export const createUser = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/users/create`, options);
  const json = await response.json();
  return json;
};

export const checkCIDStatus = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/data/cid-status`, options);
  const json = await response.json();
  return json;
};

export const health = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data: { success: true } }),
  };

  const response = await fetch(`/api/_`, options);
  const json = await response.json();
  return json;
};

export const createSlate = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/slates/create`, options);
  const json = await response.json();
  return json;
};

export const updateSlate = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/slates/update`, options);
  const json = await response.json();
  return json;
};

export const generateAPIKey = async () => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
  };

  const response = await fetch(`/api/keys/generate`, options);
  const json = await response.json();
  return json;
};

export const deleteAPIKey = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/keys/delete`, options);
  const json = await response.json();
  return json;
};
