import * as Environment from "~/node_common/environment";
import * as Constants from "./constants";
import * as Converter from "~/vendor/bytes-base64-converter.js";
import * as Strings from "~/common/strings";

import FS from "fs-extra";
import JWT from "jsonwebtoken";

import { Buckets } from "@textile/hub";
import { Libp2pCryptoIdentity } from "@textile/threads-core";

const BUCKET_NAME = "data";

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export const getIdFromCookie = (req) => {
  let id;
  if (!Strings.isEmpty(req.headers.cookie)) {
    const token = req.headers.cookie.replace(
      /(?:(?:^|.*;\s*)WEB_SERVICE_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!Strings.isEmpty(token)) {
      try {
        const decoded = JWT.verify(token, Environment.JWT_SECRET);
        id = decoded.id;
      } catch (e) {
        console.log(e);
      }
    }
  }

  return id;
};

export const parseAuthHeader = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  var matches = value.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};

export const getBucketsAPI = async () => {
  const buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  return { buckets };
};

// NOTE(jim): Requires @textile/hub
export const getBucketAPIFromUserToken = async (token) => {
  const identity = await Libp2pCryptoIdentity.fromString(token);
  const buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  await buckets.getToken(identity);
  const root = await buckets.open(BUCKET_NAME);

  return { buckets, bucketKey: root.key, bucketName: BUCKET_NAME };
};

// NOTE(jim): Requires @textile/hub
export const addFileFromFilePath = async ({ buckets, bucketKey, filePath }) => {
  const file = await FS.readFileSync(filePath).buffer;
  const fileName = getFileName(filePath);
  const push = await buckets.pushPath(bucketKey, fileName, file);
  const metadata = await buckets.pullPath(bucketKey, fileName);
  const { value } = await metadata.next();

  return createFile({
    id: fileName,
    file: Converter.bytesToBase64(value),
    data: { size: 0 },
  });
};

// NOTE(jim): Requires Powergate, does not require token.
export const refresh = async ({ PG }) => {
  const Health = await PG.health.check();
  const status = Health.status ? Health.status : null;
  const messageList = Health.messageList ? Health.messageList : null;

  const Peers = await PG.net.peers();
  const peersList = Peers.peersList ? Peers.peersList : null;

  return { peersList, messageList, status };
};

// NOTE(jim): Requires Powergate & authentication
export const refreshWithToken = async ({ PG }) => {
  const Addresses = await PG.ffs.addrs();
  const addrsList = Addresses.addrsList ? Addresses.addrsList : null;

  const NetworkInfo = await PG.ffs.info();
  const info = NetworkInfo.info ? NetworkInfo.info : null;

  return { addrsList, info };
};

export const emitState = async ({ state, client, PG }) => {
  const { peersList, messageList, status } = await refresh({ PG });
  const { addrsList, info } = await refreshWithToken({ PG });

  const data = await updateStateData(state, {
    peersList,
    messageList,
    status,
    addrsList,
    info,
    state,
  });

  if (client) {
    client.send(JSON.stringify({ action: "UPDATE_VIEWER", data }));
  }

  return data;
};

export const getFileName = (s) => {
  let target = s;
  if (target.endsWith("/")) {
    target = target.substring(0, target.length - 1);
  }

  return target.substr(target.lastIndexOf("/") + 1);
};

export const createFile = ({ id, data, file }) => {
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
    data: data,
    deal_category: 1,
    retrieval_status: 0,
    storage_status: 0,
    file_data: file,
    errors: [],
  };
};

export const createFolder = ({ id, name }) => {
  return {
    decorator: "FOLDER",
    id,
    folderId: id,
    icon: "FOLDER",
    name: name ? name : getFileName(id),
    pageTitle: `Exploring ${getFileName(id)}`,
    date: null,
    size: null,
    children: [],
  };
};

export const updateStateData = async (state, newState) => {
  return {
    ...state,
    ...newState,
  };
};

// TODO(jim): Refactor this so we repeat this less often.
export const refreshLibrary = async ({ state, PG, FFS }) => {
  let write = false;
  for (let i = 0; i < state.library.length; i++) {
    for (let j = 0; j < state.library[i].children.length; j++) {
      if (state.library[i].children[j].job_id) {
        if (state.library[i].children[j].storage_status === 1) {
          console.log(
            "[ prototype ] update file",
            state.library[i].children[j]
          );
          state.library[i].children[j].storage_status = 2;
          write = true;
          continue;
        }

        PG.ffs.watchJobs((job) => {
          console.log("[ prototype ] job status", job.status);
          // NOTE(jim): FFS is undefined?
          if (job.status >= 5) {
            console.log(
              "[ prototype ] update file",
              state.library[i].children[j]
            );
            state.library[i].children[j].storage_status = 6;
            write = true;
          }
        }, state.library[i].children[j].job_id);
      }
    }
  }

  if (write) {
    FS.writeFileSync(
      "./.data/library.json",
      JSON.stringify({ library: state.library })
    );
  }

  return { ...state };
};
