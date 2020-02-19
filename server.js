import * as Middleware from '~/common/middleware';
import * as Data from '~/common/data';
import * as Routes from '~/routes';

import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import compression from 'compression';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 1337;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(compression());
  }

  server.use(Middleware.CORS);
  server.use('/public', express.static('public'));
  server.use(bodyParser.json());
  server.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  server.post('/api/sign-in', async (req, res) => {
    return await Routes.api.signIn(req, res);
  });

  server.get('/', async (req, res) => {
    return await Routes.signIn(req, res, app);
  });

  server.get('/sign-in-confirm', async (req, res) => {
    return await Routes.signInConfirm(req, res, app);
  });

  server.get(
    '/sign-in-success',
    Middleware.RequireCookieAuthentication,
    async (req, res) => {
      return await Routes.signInSuccess(req, res, app);
    }
  );

  server.get('/sign-in-error', async (req, res) => {
    const { viewer } = await Data.getViewer(req);
    app.render(req, res, '/sign-in-error', { viewer });
  });

  server.get('/sign-out', async (req, res) => {
    const { viewer } = await Data.getViewer(req);
    app.render(req, res, '/sign-out', { viewer });
  });

  server.get('*', async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`[ filecoin pinning server ] http://localhost:${port}`);
  });
});
