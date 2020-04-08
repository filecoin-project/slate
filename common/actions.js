import 'isomorphic-fetch';

import * as Strings from '~/common/strings';

const REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const SERVER_PATH = '';

export const createWalletAddress = async (data) => {
  if (Strings.isEmpty(data.name)) {
    return null;
  }

  const options = {
    method: 'POST',
    headers: REQUEST_HEADERS,
    credentials: 'include',
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
    method: 'POST',
    headers: REQUEST_HEADERS,
    credentials: 'include',
    body: JSON.stringify(data),
  };

  const response = await fetch(`/_/wallet/send`, options);
  const json = await response.json();

  return json;
};
