import { createPow, ffs } from "@textile/powergate-client";

const host = "http://0.0.0.0:6002";
const PowerGate = createPow({ host });

import * as Middleware from "~/common/middleware";
import * as Strings from "~/common/strings";

import FS from "fs-extra";
import express from "express";
import formidable from "formidable";
import next from "next";
import bodyParser from "body-parser";
import compression from "compression";
import WebSocketServer from "ws";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 1337;
const wsPort = 2448;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

const AVATAR_STORAGE_URL = `${__dirname}/public/static/system/`;
const FILE_STORAGE_URL = `${__dirname}/public/static/files/`;

// TODO(jim): Just a solution for testing.
// Probably should refactor this or use a database.
let client = null;
let token = null;
let library = null;
let status = null;
let messageList = null;
let peersList = null;
let addrsList = null;
let info = null;

const refresh = async () => {
  const Health = await PowerGate.health.check();
  status = Health.status ? Health.status : null;
  messageList = Health.messageList ? Health.messageList : null;

  const Peers = await PowerGate.net.peers();
  peersList = Peers.peersList ? Peers.peersList : null;
};

const refreshWithToken = async () => {
  const Addresses = await PowerGate.ffs.addrs();
  addrsList = Addresses.addrsList ? Addresses.addrsList : null;

  const NetworkInfo = await PowerGate.ffs.info();
  info = NetworkInfo.info ? NetworkInfo.info : null;
};

const getFileName = (s) => {
  let target = s;
  if (target.endsWith("/")) {
    target = target.substring(0, target.length - 1);
  }

  return target.substr(target.lastIndexOf("/") + 1);
};

const createFile = (id, data) => {
  return {
    decorator: "FILE",
    id: id,
    icon: "PNG",
    file: getFileName(id),
    miner: null,
    job_id: null,
    cid: null,
    date: new Date(),
    size: data.size,
    amount: 0,
    remaining: null,
    deal_category: 1,
    retrieval_status: 0,
    storage_status: 0,
    errors: [],
  };
};

const createFolder = (id) => {
  return {
    decorator: "FOLDER",
    id,
    folderId: id,
    icon: "FOLDER",
    file: getFileName(id),
    name: getFileName(id),
    pageTitle: null,
    date: null,
    size: null,
    children: [],
  };
};

const getData = async () => {
  const data = {
    production: !dev,
    status,
    messageList,
    peersList,
    addrsList,
    info,
    library,
  };

  return data;
};

const emitStateUpdate = async () => {
  await refresh();
  await refreshWithToken();
  const data = await getData();
  client.send(JSON.stringify({ action: "UPDATE_VIEWER", data }));
};

const checkFileStatus = async () => {
  // TODO(jim): Refactor this so we repeat this less often.
  let write = false;
  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      if (library[i].children[j].job_id) {
        if (library[i].children[j].storage_status === 1) {
          library[i].children[j].storage_status = 2;
          write = true;
          continue;
        }

        PowerGate.ffs.watchJobs((job) => {
          console.log(job);
          if (job.status === ffs.JobStatus.JOB_STATUS_SUCCESS) {
            library[i].children[j].storage_status = 6;
            write = true;
          }
        }, library[i].children[j].job_id);
      }
    }
  }

  if (write) {
    FS.writeFileSync("./.data/library.json", JSON.stringify({ library }));
  }
};

const setIntervalViewerUpdates = async () => {
  console.log("[ prototype ] checking for library deal updates.");
  if (client) {
    try {
      await emitStateUpdate();
      await checkFileStatus();
    } catch (e) {}
  }
  setTimeout(setIntervalViewerUpdates, 5000);
};

const resetAllLocalData = async () => {
  // NOTE(jim): For testing purposes.
  // We wipe all of the local data each time you run the application.
  console.log("[ prototype ] deleting old token and library data ");
  if (FS.existsSync(`./.data`)) {
    FS.removeSync("./.data", { recursive: true });
  }

  console.log("[ prototype ] deleting old avatar data ");
  if (FS.existsSync(AVATAR_STORAGE_URL)) {
    FS.removeSync(AVATAR_STORAGE_URL, { recursive: true });
  }

  console.log("[ prototype ] deleting old file data ");
  if (FS.existsSync(FILE_STORAGE_URL)) {
    FS.removeSync(FILE_STORAGE_URL, { recursive: true });
  }

  console.log("[ prototype ] creating new avatar folder ");
  FS.mkdirSync(AVATAR_STORAGE_URL, { recursive: true });
  FS.writeFileSync(`${AVATAR_STORAGE_URL}.gitkeep`, "");

  console.log("[ prototype ] creating new local file folder ");
  FS.mkdirSync(FILE_STORAGE_URL, { recursive: true });
  FS.writeFileSync(`${FILE_STORAGE_URL}.gitkeep`, "");
};

app.prepare().then(async () => {
  if (dev) {
    await resetAllLocalData();

    try {
      await refresh();

      // NOTE(jim): This is a configuration folder with all of the client tokens.
      if (!FS.existsSync(`./.data`)) {
        FS.mkdirSync(`./.data`, { recursive: true });
      }

      // NOTE(jim): This will create a token for authentication with powergate.
      if (!FS.existsSync("./.data/powergate-token")) {
        const FFS = await PowerGate.ffs.create();
        token = FFS.token ? FFS.token : null;

        // NOTE(jim): Write a new token file.
        if (token) {
          FS.writeFileSync("./.data/powergate-token", token);
        }
      } else {
        token = FS.readFileSync("./.data/powergate-token", "utf8");
      }

      if (token) {
        PowerGate.setToken(token);
      }

      await refreshWithToken();

      if (!FS.existsSync("./.data/library.json")) {
        const librarySchema = {
          library: [
            { ...createFolder(FILE_STORAGE_URL), file: "Files", name: "Files" },
          ],
        };
        FS.writeFileSync("./.data/library.json", JSON.stringify(librarySchema));
        library = librarySchema.library;
      } else {
        const parsedLibrary = FS.readFileSync("./.data/library.json", "utf8");
        library = JSON.parse(parsedLibrary).library;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const server = express();
  const WSS = new WebSocketServer.Server({ port: wsPort });

  WSS.on("connection", (s) => {
    // TODO(jim): Suppport more than one client.
    client = s;

    s.on("close", function() {
      s.send(JSON.stringify({ action: null, data: "closed" }));
    });

    s.send(JSON.stringify({ action: null, data: "connected" }));
  });

  if (!dev) {
    server.use(compression());
  }

  server.use(Middleware.CORS);
  server.use("/public", express.static("public"));
  server.use(bodyParser.json());
  server.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  server.post("/_/viewer", async (req, res) => {
    if (dev) {
      await refresh();
      await refreshWithToken();
    }

    return res.status(200).send({ success: true, data: await getData() });
  });

  server.post("/_/deals/storage", async (req, res) => {
    if (Strings.isEmpty(req.body.src)) {
      return res.status(500).send({ success: false });
    }

    const localPath = `${__dirname}${req.body.src}`;
    const buffer = FS.readFileSync(localPath);
    const { cid } = await PowerGate.ffs.addToHot(buffer);
    const { jobId } = await PowerGate.ffs.pushConfig(cid);

    // TODO(jim): Refactor this so we repeat this less often.
    let write = false;
    for (let i = 0; i < library.length; i++) {
      for (let j = 0; j < library[i].children.length; j++) {
        if (localPath === library[i].children[j].id) {
          library[i].children[j].job_id = jobId;
          library[i].children[j].cid = cid;
          library[i].children[j].storage_status = 1;
          write = true;
        }
      }
    }

    if (write) {
      FS.writeFileSync("./.data/library.json", JSON.stringify({ library }));
    }

    await emitStateUpdate();
    return res.status(200).send({ success: true, cid, jobId });
  });

  server.post("/_/storage/:file", async (req, res) => {
    const form = formidable({ multiples: true, uploadDir: FILE_STORAGE_URL });

    form.once("error", console.error);

    form.on("progress", (bytesReceived, bytesExpected) => {
      console.log(`[ prototype ] ${bytesReceived} / ${bytesExpected}`);
    });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        if (!files.image) {
          console.error("[ prototype ] File type unspported", files);
          return res
            .status(500)
            .send({ error: "File type unsupported", files });
        }

        const newPath = form.uploadDir + req.params.file;
        FS.rename(files.image.path, newPath, function(err) {});

        const localFile = createFile(newPath, files.image);

        let pushed = false;
        for (let i = 0; i < library.length; i++) {
          const currentFolder = library[i];
          if (!pushed) {
            currentFolder.children.push(localFile);
            pushed = true;
            break;
          }
        }

        if (pushed) {
          FS.writeFileSync("./.data/library.json", JSON.stringify({ library }));
        }

        await emitStateUpdate();
        return res.status(200).send({ success: true, file: localFile });
      }
    });
  });

  server.post("/_/upload/avatar", async (req, res) => {
    const form = formidable({ multiples: true, uploadDir: AVATAR_STORAGE_URL });

    form.once("error", console.error);

    form.on("progress", (bytesReceived, bytesExpected) => {
      console.log(`[ prototype ] ${bytesReceived} / ${bytesExpected}`);
    });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        const newPath = form.uploadDir + "avatar.png";
        FS.rename(files.image.path, newPath, function(err) {});

        await emitStateUpdate();
        return res.status(200).send({ success: true });
      }
    });
  });

  server.post("/_/settings", async (req, res) => {
    let data;
    try {
      data = await PowerGate.ffs.setDefaultConfig(req.body.config);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    await emitStateUpdate();
    return res.status(200).send({ success: true, data });
  });

  server.post("/_/wallet/create", async (req, res) => {
    let data;
    try {
      data = await PowerGate.ffs.newAddr(
        req.body.name,
        req.body.type,
        req.body.makeDefault
      );
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    await emitStateUpdate();
    return res.status(200).send({ success: true, data });
  });

  server.post("/_/wallet/send", async (req, res) => {
    let data;
    try {
      data = await PowerGate.ffs.sendFil(
        req.body.source,
        req.body.target,
        req.body.amount
      );
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }

    await emitStateUpdate();
    return res
      .status(200)
      .send({ success: true, data: { ...data, ...req.body } });
  });

  server.get("/", async (req, res) => {
    if (!dev) {
      return res.redirect(
        "https://github.com/filecoin-project/filecoin-client"
      );
    }

    return app.render(req, res, "/", { production: false, wsPort });
  });

  server.get("*", async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, async (err) => {
    if (err) {
      throw err;
    }

    console.log("[ prototype ] initializing ");
    console.log("[ prototype ] powergate token:", token);
    console.log(`[ prototype ] listening on: http://localhost:${port}`);
    console.log(`[ prototype ] avatar storage: ${AVATAR_STORAGE_URL}`);

    await setIntervalViewerUpdates();
  });
});
