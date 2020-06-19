import "isomorphic-fetch";

import * as State from "~/common/state";
import * as Strings from "~/common/strings";

const REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const dev = process.env.NODE_ENV !== "production";

const SERVER_PATH = dev
  ? "http://localhost:1337"
  : "https://filecoin.onrender.com";

export const rehydrateViewer = async () => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify({}),
  };

  const response = await fetch(`${SERVER_PATH}/_/viewer`, options);
  const json = await response.json();

  return json;
};

export const setDefaultConfig = async (data) => {
  const options = {
    method: "POST",
    headers: REQUEST_HEADERS,
    credentials: "include",
    body: JSON.stringify(data),
  };

  const response = await fetch(`${SERVER_PATH}/_/settings`, options);
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

  const response = await fetch(`${SERVER_PATH}/_/wallet/create`, options);
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

  const response = await fetch(`${SERVER_PATH}/_/wallet/send`, options);
  const json = await response.json();

  return json;
};
