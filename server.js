import { createPow } from '@textile/powergate-client';

const host = 'http://0.0.0.0:6002';
const pow = createPow({ host });

import * as Middleware from '~/common/middleware';

import FS from 'fs';
import express from 'express';
import formidable from 'formidable';
import next from 'next';
import bodyParser from 'body-parser';
import compression from 'compression';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 1337;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();
const AVATAR_STORAGE_URL = `${__dirname}/public/static/system/`;

// TODO(jim): Just a solution for testing.
let token = null;
let status = null;
let messageList = null;
let peersList = null;
let addrsList = null;
let info = null;

const refresh = async () => {
  const Health = await pow.health.check();
  status = Health.status ? Health.status : null;
  messageList = Health.messageList ? Health.messageList : null;

  const Peers = await pow.net.peers();
  peersList = Peers.peersList ? Peers.peersList : null;
};

const refreshWithToken = async () => {
  const Addresses = await pow.ffs.addrs();
  addrsList = Addresses.addrsList ? Addresses.addrsList : null;

  const NetworkInfo = await pow.ffs.info();
  info = NetworkInfo.info ? NetworkInfo.info : null;
};

const getData = async () => {
  const data = {
    production: !dev,
    status,
    messageList,
    peersList,
    addrsList,
    info,
  };

  console.log('ON THE SERVER', data);

  return data;
};

app.prepare().then(async () => {
  try {
    await refresh();

    // NOTE(jim): This is a configuration folder with all of the client tokens.
    !FS.existsSync(`./.data`) && FS.mkdirSync(`./.data`, { recursive: true });

    // NOTE(jim): This will create a token for authentication with powergate.
    if (!FS.existsSync('./.data/powergate-token')) {
      const FFS = await pow.ffs.create();
      token = FFS.token ? FFS.token : null;

      // NOTE(jim): Write a new token file.
      if (token) {
        FS.writeFileSync('./.data/powergate-token', token);
      }
    } else {
      token = FS.readFileSync('./.data/powergate-token', 'utf8');
    }

    if (token) {
      pow.setToken(token);
    }

    await refreshWithToken();
  } catch (e) {
    console.log(e);
  }

  if (!token) {
    throw new Error('[ prototype ] can not start client without proper auth token');
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

  server.post('/_/upload/avatar', async (req, res) => {
    const form = formidable({ multiples: true, uploadDir: AVATAR_STORAGE_URL });

    form.once('error', console.error);

    form.on('progress', (bytesReceived, bytesExpected) => {
      console.log(`[ prototype ] ${bytesReceived} / ${bytesExpected}`);
    });

    form.on('fileBegin', (filename, file) => {
      form.emit('data', { name: '[ prototype ] file uploading', filename, value: file });
    });

    form.on('file', (filename, file) => {
      form.emit('data', { name: '[ prototype ] file:', key: filename, value: file });
    });

    form.on('field', (fieldName, fieldValue) => {
      form.emit('data', { name: '[ prototype ] field:', key: fieldName, value: fieldValue });
    });

    form.once('end', () => {
      console.log('[ prototype ] finished upload');
    });

    form.parse(req, (error, fields, files) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        const newPath = form.uploadDir + 'avatar.png';
        FS.rename(files.image.path, newPath, function (err) {});

        return res.status(200).send({ success: true });
      }
    });
  });

  server.post('/_/viewer', async (req, res) => {
    await refresh();
    await refreshWithToken();

    return res.status(200).send({ success: true, data: await getData() });
  });

  server.post('/_/settings', async (req, res) => {
    let data;
    try {
      data = await pow.ffs.setDefaultConfig(req.body.config);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    return res.status(200).send({ success: true, data });
  });

  server.post('/_/wallet/create', async (req, res) => {
    let data;
    try {
      data = await pow.ffs.newAddr(req.body.name, req.body.type, req.body.makeDefault);
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

    return res.status(200).send({ success: true, data: { ...data, ...req.body } });
  });

  server.get('/', async (req, res) => {
    return app.render(req, res, '/', { production: false });
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
    console.log(`[ prototype ] avatar storage: ${AVATAR_STORAGE_URL}`);
  });
});
