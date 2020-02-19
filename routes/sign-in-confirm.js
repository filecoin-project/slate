import * as Credentials from '~/common/credentials';
import * as Data from '~/common/data';

import JWT from 'jsonwebtoken';
import BCrypt from 'bcrypt';

const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;

export default async (req, res, app) => {
  const client = new OAuth2(
    Credentials.CLIENT_ID,
    Credentials.CLIENT_SECRET,
    Credentials.REDIRECT_URIS
  );

  if (req.query.error) {
    return res.redirect('/sign-in-error');
  }

  client.getToken(req.query.code, async (error, token) => {
    if (error) {
      return res.redirect('/sign-in-error');
    }

    const jwt = JWT.sign(token, Credentials.JWT_SECRET);
    const client = new OAuth2(
      Credentials.CLIENT_ID,
      Credentials.CLIENT_SECRET,
      Credentials.REDIRECT_URIS
    );
    client.credentials = JWT.verify(jwt, Credentials.JWT_SECRET);

    const people = google.people({
      version: 'v1',
      auth: client,
    });

    const response = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,organizations,memberships',
    });

    const email = response.data.emailAddresses[0].value;
    const name = response.data.names[0].displayName;
    const password = BCrypt.genSaltSync(10);

    let user = await Data.getUserByEmail({ email });

    if (!user) {
      const salt = BCrypt.genSaltSync(10);
      const hash = BCrypt.hashSync(password, salt);
      const double = BCrypt.hashSync(hash, salt);
      const triple = BCrypt.hashSync(double, process.env.PASSWORD_SECRET);

      user = await Data.createUser({
        email,
        password: triple,
        salt,
        data: { name },
      });
    }

    const authToken = JWT.sign(
      { user: user.id, email: user.email },
      Credentials.JWT_SECRET
    );

    app.render(req, res, '/sign-in-confirm', { jwt: authToken, viewer: user });
  });
};
