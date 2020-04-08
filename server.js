import { createPow } from '@textile/powergate-client';

const host = 'http://0.0.0.0:6002';
const pow = createPow({ host });

import * as Middleware from '~/common/middleware';

import FS from 'fs';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import compression from 'compression';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 1337;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

// TODO(jim): Just a solution for testing.
let token;
let status;
let messageList;
let peersList;
let addrsList;
let info;

app.prepare().then(async () => {
  try {
    const Health = await pow.health.check();
    status = Health.status ? Health.status : null;
    messageList = Health.messageList ? Health.messageList : null;

    const Peers = await pow.net.peers();
    peersList = Peers.peersList ? Peers.peersList : null;

    // NOTE(jim): This is a configuration folder with all of the client tokens.
    !FS.existsSync(`./.data`) && FS.mkdirSync(`./.data`, { recursive: true });

    // NOTE(jim): This will create a token for authentication with powergate.
    if (!FS.existsSync('./.data/powergate-token')) {
      const FFS = await pow.ffs.create();
      token = FFS.token ? FFS.token : null;

      // NOTE(jim): Write a new token file.
      FS.writeFileSync('./.data/powergate-token', token);
    } else {
      token = FS.readFileSync('./.data/powergate-token', 'utf8');
    }

    pow.setToken(token);

    const Addresses = await pow.ffs.addrs();
    addrsList = Addresses.addrsList;

    const NetworkInfo = await pow.ffs.info();
    info = NetworkInfo.info;
  } catch (e) {
    console.log(e);
  }

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

  server.get('/health', async (req, res) => {
    res.send('ok');
  });

  server.post('/_/wallet/create', async (req, res) => {
    let data;
    try {
      data = await pow.ffs.newAddr(req.body.name);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    return res.status(200).send({ success: true, data });
  });

  server.post('/_/wallet/send', async (req, res) => {
    let data;
    try {
      data = await pow.ffs.sendFil(req.body.source, req.body.target, req.body.amount);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    return res.status(200).send({ success: true, data });
  });

  server.get('/', async (req, res) => {
    return app.render(req, res, '/', {
      status,
      messageList,
      peersList,
      addrsList,
      info,
    });
  });

  server.get('*', async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log('[ prototype ] initializing ');
    console.log('[ prototype ] powergate token:', token);
    console.log(`[ prototype ] listening on: http://localhost:${port}`);
  });
});
