import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";

export const updateStateData = async (state, newState) => {
  return {
    ...state,
    ...newState,
  };
};

// NOTE(jim): Requires Powergate, does not require token.
// But we provide it anyway because we can.
const refresh = async (user) => {
  const PG = Powergate.get(user);
  const Health = await PG.health.check();
  const status = Health.status ? Health.status : null;
  const messageList = Health.messageList ? Health.messageList : null;

  const Peers = await PG.net.peers();
  const peersList = Peers.peersList ? Peers.peersList : null;

  return { peersList, messageList, status };
};

// NOTE(jim): Requires Powergate & authentication
const refreshWithToken = async (user) => {
  const PG = Powergate.get(user);
  const Addresses = await PG.ffs.addrs();
  const addrsList = Addresses.addrsList ? Addresses.addrsList : null;

  const NetworkInfo = await PG.ffs.info();
  const info = NetworkInfo.info ? NetworkInfo.info : null;

  const includeFinal = ffsOptions.withIncludeFinal(true);
  const includePending = ffsOptions.withIncludePending(true);

  // TODO(jim): Should be pulling deals from all your addresses.
  // This works okay for now. But people will be confused.
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

export const getViewer = async ({ id }) => {
  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return null;
  }

  if (user.error) {
    return null;
  }

  let data = {
    id: user.id,
    data: { photo: user.data.photo },
    settings: {
      deals_auto_approve: user.data.settings_deals_auto_approve,
    },
    username: user.username,
    library: user.data.library,
    storageList: [],
    retrievalList: [],
    peersList: null,
    messageList: null,
    status: null,
    addrsList: null,
    info: null,
  };

  try {
    const updates = await refresh(user);
    const updatesWithToken = await refreshWithToken(user);

    data = await Utilities.updateStateData(data, {
      ...updates,
      ...updatesWithToken,
    });
  } catch (e) {
    console.log(e);
    return null;
  }

  return data;
};
