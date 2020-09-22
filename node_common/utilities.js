import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";
import * as Constants from "~/node_common/constants";
import * as Social from "~/node_common/social";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

import { Buckets, PrivateKey, Pow, Client, ThreadID } from "@textile/hub";

const BUCKET_NAME = "data";

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export const checkTextile = async () => {
  try {
    const response = await fetch("https://slate.textile.io/health", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const getIdFromCookie = (req) => {
  let id = null;
  if (Strings.isEmpty(req.headers.cookie)) {
    return id;
  }

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

  return id;
};

export const encryptPassword = async (text, salt) => {
  if (!text) {
    return null;
  }

  let hash = text;
  for (let i = 0; i < Environment.LOCAL_PASSWORD_ROUNDS_MANUAL; i++) {
    hash = await BCrypt.hash(hash, salt);
  }
  hash = await BCrypt.hash(hash, Environment.LOCAL_PASSWORD_SECRET);

  return hash;
};

export const parseAuthHeader = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  var matches = value.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};

// NOTE(jim): Requires @textile/hub
export const getPowergateAPIFromUserToken = async (token, user) => {
  const identity = await PrivateKey.fromString(token);
  const power = await Pow.withKeyInfo(TEXTILE_KEY_INFO);
  await power.getToken(identity);

  // TODO(jim): Put this call into a file for all Textile related calls.
  let info = {};
  try {
    const powerInfoResponse = await power.info();
    info = powerInfoResponse.info;
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/utilities.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `power.info`,
    });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let health = {};
  try {
    health = await power.health();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/utilities.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `power.health`,
    });
  }

  return {
    power,
    powerHealth: health,
    powerInfo: info,
  };
};

// NOTE(jim): Requires @textile/hub
export const getBucketAPIFromUserToken = async (token, user) => {
  const identity = await PrivateKey.fromString(token);
  const buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  await buckets.getToken(identity);

  // TODO(jim): Put this call into a file for all Textile related calls.
  console.log(`[buckets] getOrCreate`);
  try {

    // Create a threads client
    const client = new Client(buckets.context)
    try {
      // Get a default thread to store our buckets
      const res = await client.getThread('buckets')
      buckets.withThread(res.id.toString())
      console.log(`[buckets] getThread success ${res.id.toString()}`);
    } catch (error) {
      if (error.message !== 'Thread not found') {
        throw new Error(error.message)
      }
      const newId = ThreadID.fromRandom()
      await client.newDB(newId, 'buckets')
      const threadID = newId.toString()
      buckets.withThread(threadID)
      console.log(`[buckets] newDB success ${newId.toString()}`);
    }

    const roots = await buckets.list()
    let root = roots.find((bucket) => bucket.name === BUCKET_NAME)
    if (!root) {
      const created = await buckets.create(BUCKET_NAME)
      root = created.root
    }
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/utilities.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.getOrCreate`,
    });

    return { buckets: null, bucketKey: null, bucketRoot: null };

  }
  console.log(`[buckets] getOrCreate succes!`);
  return {
    buckets,
    bucketKey: root.key,
    bucketRoot: root,
    bucketName: BUCKET_NAME,
  };
};

export const getFileName = (s) => {
  let target = s;
  if (target.endsWith("/")) {
    target = target.substring(0, target.length - 1);
  }

  return target.substr(target.lastIndexOf("/") + 1);
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
