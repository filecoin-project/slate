import * as Middleware from '~/common/middleware';
import * as Strings from '~/common/strings';
import * as Utilities from '~/node_common/utilities';
import * as Constants from '~/node_common/constants';

import { createPow, ffs } from '@textile/powergate-client';

// NOTE(jim):
// https://github.com/textileio/js-powergate-client
const PowerGate = createPow({ host: Constants.POWERGATE_HOST });

import FS from 'fs-extra';
import WebSocketServer from 'ws';
import express from 'express';
import formidable from 'formidable';
import next from 'next';
import bodyParser from 'body-parser';
import compression from 'compression';
import { v4 as uuid } from 'uuid';

// TODO(jim): Support multiple desktop applications.
let client = null;
let state = null;

const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 1337;
const wsPort = process.env.WS_PORT || 2448;
const app = next({ dev: !production, quiet: false });
const nextRequestHandler = app.getRequestHandler();

const setIntervalViewerUpdatesUnsafe = async () => {
  if (client) {
    try {
      console.log('[ prototype ] polling: new viewer state.');
      state = await Utilities.emitState({
        state,
        client,
        PG: PowerGate,
      });

      console.log('[ prototype ] polling: new library state.');
      state = await Utilities.refreshLibrary({
        state,
        PG: PowerGate,
        FFS: ffs,
      });
    } catch (e) {
      console.log(e);
    }
  }

  setTimeout(setIntervalViewerUpdatesUnsafe, Constants.POLLING_RATE);
};

app.prepare().then(async () => {
  console.log('[ prototype ] initializing ');

  state = {
    production,
    port,
    wsPort,
    token: null,
    library: null,
    status: null,
    messageList: null,
    peersList: null,
    addrsList: null,
    info: null,
    local: null,
  };

  if (!production) {
    try {
      // TODO(jim): Remove later.
      // We wipe all of the local data each time you run the application.
      await Utilities.resetFileSystem();

      const updates = await Utilities.refresh({ PG: PowerGate });
      state = await Utilities.updateStateData(state, updates);
      console.log('[ prototype ] updated without token');

      // NOTE(jim): This is a configuration folder with all of the client tokens.
      // TODO(jim): Unnecessary if we use a local and remote postgres.
      if (!FS.existsSync(`./.data`)) {
        FS.mkdirSync(`./.data`, { recursive: true });
      }

      // NOTE(jim): This will create a token for authentication with powergate.
      // TODO(jim): Roll this up into Postgres instead.
      if (!FS.existsSync('./.data/powergate-token')) {
        const FFS = await PowerGate.ffs.create();
        state.token = FFS.token ? FFS.token : null;

        // NOTE(jim): Write a new token file.
        if (state.token) {
          FS.writeFileSync('./.data/powergate-token', state.token);
        }
      } else {
        state.token = FS.readFileSync('./.data/powergate-token', 'utf8');
      }

      if (state.token) {
        console.log('[ prototype ] powergate token:', state.token);
        PowerGate.setToken(state.token);
      }

      const tokenUpdates = await Utilities.refreshWithToken({
        PG: PowerGate,
      });
      state = await Utilities.updateStateData(state, tokenUpdates);
      console.log('[ prototype ] updated with token');

      // NOTE(jim): Local library retrieval or creation
      // TODO(jim): Needs to support nested folders in the future.
      // TODO(jim): May consider a move to buckets.
      if (!FS.existsSync('./.data/library.json')) {
        const librarySchema = {
          library: [
            {
              ...Utilities.createFolder({ id: Constants.FILE_STORAGE_URL }),
              file: 'Files',
              name: 'Files',
            },
          ],
        };

        FS.writeFileSync('./.data/library.json', JSON.stringify(librarySchema));
        state.library = librarySchema.library;
      } else {
        const parsedLibrary = FS.readFileSync('./.data/library.json', 'utf8');
        state.library = JSON.parse(parsedLibrary).library;
      }

      // NOTE(jim): Local settings retrieval or creation
      // TODO(jim): Move this to postgres later.
      if (!FS.existsSync('./.data/local-settings.json')) {
        const localSettingsSchema = {
          local: { photo: null, name: `node-${uuid()}` },
        };

        FS.writeFileSync('./.data/local-settings.json', JSON.stringify(localSettingsSchema));
        state.local = localSettingsSchema.local;
      } else {
        const parsedLocal = FS.readFileSync('./data/local-settings.json', 'utf8');
        state.local = JSON.parse(parsedLocal).local;
      }
    } catch (e) {
      console.log(e);
      console.log('[ prototype ] "/" -- WILL REDIRECT TO /SYSTEM ');
      console.log('[ prototype ]        SLATE WILL NOT RUN LOCALLY UNTIL YOU HAVE ');
      console.log('[ prototype ]        PROPERLY CONFIGURED POWERGATE AND ');
      console.log('[ prototype ]        CONNECTED TO THE FILECOIN NETWORK (DEVNET/TESTNET) ');
    }
  }

  const server = express();
  const WSS = new WebSocketServer.Server({ port: wsPort });

  WSS.on('connection', (s) => {
    // TODO(jim): Suppport more than one client.
    client = s;

    s.on('close', function () {
      s.send(JSON.stringify({ action: null, data: 'closed' }));
    });

    s.send(JSON.stringify({ action: null, data: 'connected' }));
  });

  if (production) {
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

  server.post('/_/viewer', async (req, res) => {
    let data = state;

    if (!production) {
      const updates = await Utilities.refresh({ PG: PowerGate });
      const updatesWithToken = await Utilities.refreshWithToken({
        PG: PowerGate,
      });
      data = await Utilities.updateStateData(data, {
        ...updates,
        ...updatesWithToken,
      });
    }

    return res.status(200).send({ success: true, data });
  });

  server.post('/_/deals/storage', async (req, res) => {
    if (Strings.isEmpty(req.body.src)) {
      return res.status(500).send({ success: false });
    }

    const localPath = `.${req.body.src}`;
    const buffer = FS.readFileSync(localPath);
    const { cid } = await PowerGate.ffs.addToHot(buffer);
    const { jobId } = await PowerGate.ffs.pushConfig(cid);

    // TODO(jim): Refactor this so we repeat this less often.
    let write = false;
    for (let i = 0; i < state.library.length; i++) {
      for (let j = 0; j < state.library[i].children.length; j++) {
        if (localPath === state.library[i].children[j].id) {
          state.library[i].children[j].job_id = jobId;
          state.library[i].children[j].cid = cid;
          state.library[i].children[j].storage_status = 1;
          write = true;
        }
      }
    }

    // NOTE(jim): Writes the updated deal state.
    if (write) {
      FS.writeFileSync('./.data/library.json', JSON.stringify({ library: state.library }));
    }

    state = await Utilities.emitState({ state, client, PG: PowerGate });
    return res.status(200).send({ success: true, cid, jobId });
  });

  server.post('/_/storage/:file', async (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: Constants.FILE_STORAGE_URL,
    });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        // TODO(jim): Need to support other file types.
        if (!files.image) {
          console.error('[ prototype ] File type unspported', files);
          return res.status(500).send({ error: 'File type unsupported', files });
        }

        const newPath = form.uploadDir + req.params.file;
        FS.rename(files.image.path, newPath, function (err) {});

        const localFile = Utilities.createFile({
          id: newPath,
          data: files.image,
        });

        // TODO(jim): Messy, refactor.
        let pushed = false;
        for (let i = 0; i < state.library.length; i++) {
          if (!pushed) {
            state.library[i].children.push(localFile);
            pushed = true;
            break;
          }
        }

        // NOTE(jim): Writes the added file.
        if (pushed) {
          FS.writeFileSync('./.data/library.json', JSON.stringify({ library: state.library }));
        }

        state = await Utilities.emitState({
          state,
          client,
          PG: PowerGate,
        });

        return res.status(200).send({ success: true, file: localFile });
      }
    });
  });

  server.post('/_/upload/avatar', async (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: Constants.AVATAR_STORAGE_URL,
    });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        const newName = `avatar-${uuid()}.png`;
        const newPath = form.uploadDir + newName;
        FS.rename(files.image.path, newPath, function (err) {});

        // NOTE(jim): updates avatar photo.
        state.local.photo = `/static/system/${newName}`;
        FS.writeFileSync('./.data/local-settings.json', JSON.stringify({ local: { ...state.local } }));

        state = await Utilities.emitState({
          state,
          client,
          PG: PowerGate,
        });

        return res.status(200).send({ success: true });
      }
    });
  });

  server.post('/_/settings', async (req, res) => {
    let data;
    try {
      data = await PowerGate.ffs.setDefaultConfig(req.body.config);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    state = await Utilities.emitState({ state, client, PG: PowerGate });
    return res.status(200).send({ success: true, data });
  });

  server.post('/_/local-settings', async (req, res) => {
    state.local = { ...state.local, ...req.body.local };

    FS.writeFileSync('./.data/local-settings.json', JSON.stringify({ local: { ...state.local } }));
    state = await Utilities.emitState({ state, client, PG: PowerGate });
    return res.status(200).send({ success: true });
  });

  server.post('/_/wallet/create', async (req, res) => {
    let data;
    try {
      data = await PowerGate.ffs.newAddr(req.body.name, req.body.type, req.body.makeDefault);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    state = await Utilities.emitState({ state, client, PG: PowerGate });
    return res.status(200).send({ success: true, data });
  });

  server.post('/_/wallet/send', async (req, res) => {
    let data;
    try {
      data = await PowerGate.ffs.sendFil(req.body.source, req.body.target, req.body.amount);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    state = await Utilities.emitState({ state, client, PG: PowerGate });
    return res.status(200).send({ success: true, data: { ...data, ...req.body } });
  });

  server.get('/', async (req, res) => {
    if (!state.token) {
      return res.redirect('/system');
    }

    return app.render(req, res, '/', {
      production,
      wsPort,
    });
  });

  server.get('*', async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, async (err) => {
    if (err) {
      throw err;
    }

    console.log(`[ prototype ] client: http://localhost:${port}`);
    console.log(`[ prototype ] constants:`, Constants);

    if (!production) {
      await setIntervalViewerUpdatesUnsafe();
    }
  });
});
