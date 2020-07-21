import "isomorphic-fetch";

import * as State from "~/common/state";
import * as Strings from "~/common/strings";

const REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const setDefaultConfig = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify(data),
  };

  const response = await fetch(`/_/settings`, options);
  const json = await response.json();

  return json;
};

export const createWalletAddress = async (data) => {
  if (Strings.isEmpty(data.name)) {
    return null;
  }

  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify(data),
  };

  const response = await fetch(`/_/wallet/create`, options);
  const json = await response.json();

  return json;
};

export const sendWalletAddressFilecoin = async (data) => {
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
    body: JSON.stringify(data),
  };

  const response = await fetch(`/_/wallet/send`, options);
  const json = await response.json();

  return json;
};

// NOTE(jim):
// New WWW Requests.

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

export const hydrateAuthenticatedUser = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
  };

  const response = await fetch(`/api/hydrate`, options);
  const json = await response.json();

  return json;
};

export const deleteUser = async (data) => {
  const options = {
    method: "DELETE",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({ data }),
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
