import 'isomorphic-fetch';

import Cookies from 'universal-cookie';

import * as Constants from '~/common/constants';

const cookies = new Cookies();

const REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const SERVER_PATH = '';

const getHeaders = () => {
  const jwt = cookies.get(Constants.session.key);

  if (jwt) {
    return {
      ...REQUEST_HEADERS,
      authorization: `Bearer ${jwt}`,
    };
  }

  return REQUEST_HEADERS;
};

export const onLocalSignIn = async (e, props, auth) => {
  const options = {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify({
      ...auth,
    }),
  };

  const response = await fetch(`${SERVER_PATH}/api/sign-in`, options);
  const json = await response.json();

  if (json.error) {
    console.log(json.error);
    return;
  }

  if (json.token) {
    cookies.set(Constants.session.key, json.token);
  }

  window.location.href = '/sign-in-success';
};
