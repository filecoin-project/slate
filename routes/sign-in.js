import * as Credentials from '~/common/credentials';
import * as Data from '~/common/data';

const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;

export default async (req, res, app) => {
  const client = new OAuth2(
    Credentials.CLIENT_ID,
    Credentials.CLIENT_SECRET,
    Credentials.REDIRECT_URIS
  );

  const googleURL = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/user.organization.read',
    ],
    prompt: 'consent',
  });

  const { viewer } = await Data.getViewer(req);

  app.render(req, res, '/', { googleURL, viewer });
};
