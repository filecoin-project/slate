import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";
import * as Powergate from "~/node_common/powergate";
import * as Constants from "~/node_common/constants";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

import { Buckets } from "@textile/hub";
import { Libp2pCryptoIdentity } from "@textile/threads-core";
import { ffsOptions } from "@textile/powergate-client";

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

export const getBucketAPI = async () => {
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

// NOTE(jim): Requires Powergate, does not require token.
export const refresh = async (user) => {
  const PG = Powergate.get(user);
  const Health = await PG.health.check();
  const status = Health.status ? Health.status : null;
  const messageList = Health.messageList ? Health.messageList : null;

  return { messageList, status };
};

// NOTE(jim): Requires Powergate & authentication
export const refreshWithToken = async (user) => {
  const PG = Powergate.get(user);
  const Addresses = await PG.ffs.addrs();
  const addrsList = Addresses.addrsList ? Addresses.addrsList : null;

  const NetworkInfo = await PG.ffs.info();
  const info = NetworkInfo.info ? NetworkInfo.info : null;

  const includeFinal = ffsOptions.withIncludeFinal(true);
  const includePending = ffsOptions.withIncludePending(true);
  const fromAddresses = ffsOptions.withFromAddresses(
    info.defaultStorageConfig.cold.filecoin.addr
  );

  const s = await PG.ffs.listStorageDealRecords(
    includeFinal,
    includePending,
    fromAddresses
  );

  const r = await PG.ffs.listRetrievalDealRecords();

  return {
    addrsList,
    info,
    storageList: s.recordsList,
    retrievalList: r.recordsList,
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
