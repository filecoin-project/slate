import * as Credentials from '~/common/credentials';
import * as Utilities from '~/common/utilities';

import DB from '~/db';
import JWT, { decode } from 'jsonwebtoken';

const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;

const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn();
  } catch (e) {
    response = errorFn(e);
  }

  console.log('[ database-query ]', { query: label });
  return response;
};

export const getViewer = async (req, existingToken = undefined) => {
  let viewer = {};

  try {
    let token = existingToken;
    if (!token) {
      token = Utilities.getToken(req);
    }

    let decode = JWT.verify(token, Credentials.JWT_SECRET);
    viewer = await getUserByEmail({ email: decode.email });
  } catch (e) {}

  return { viewer };
};

export const getUserByEmail = async ({ email }) => {
  return await runQuery({
    label: 'GET_USER_BY_EMAIL',
    queryFn: async () => {
      const query = await DB.select('*')
        .from('users')
        .where({ email })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async e => {
      return {
        error: 'A new user could not be created.',
        source: e,
      };
    },
  });
};

export const createUser = async ({ email, password, salt, data = {} }) => {
  return await runQuery({
    label: 'createUser',
    queryFn: async () => {
      const query = await DB.insert({
        email,
        password,
        salt,
        data,
      })
        .into('users')
        .returning('*');

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async e => {
      return {
        error: 'A new user could not be created.',
        source: e,
      };
    },
  });
};
