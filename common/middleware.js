import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';
import * as Data from '~/common/data';
import * as Credentials from '~/common/credentials';

import JWT from 'jsonwebtoken';

export const CORS = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

export const RequireCookieAuthentication = async (req, res, next) => {
  if (Strings.isEmpty(req.headers.cookie)) {
    return res.redirect('/sign-in-error');
  }

  const token = req.headers.cookie.replace(
    /(?:(?:^|.*;\s*)WEB_SERVICE_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  try {
    var decoded = JWT.verify(token, Credentials.JWT_SECRET);
    const user = await Data.getUserByEmail({ email: decoded.email });

    if (!user) {
      return res.redirect('/sign-in-error');
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/sign-in-error');
  }

  next();
};
