const STATIC_ADDRESS_TYPE_MAP = {
  bls: "BLS",
  secp256k1: "SECP256K1",
  multisig: "MULTISIG",
};

const transformAddresses = (addrsList, info) => {
  const balanceMap = {};
  info.balancesList.forEach((b) => {
    balanceMap[b.addr.addr] = b.balance;
  });

  return addrsList.map((each, index) => {
    return {
      id: each.addr,
      value: each.addr,
      balance: balanceMap[each.addr],
      name: each.name,
      address: each.addr,
      type: STATIC_ADDRESS_TYPE_MAP[each.type],
      deals: 0,
      transactions: [],
    };
  });
};

const transformPeers = (peersList = []) => {
  return peersList.map((each) => {
    return {
      id: each.addrInfo.id,
      "peer-avatar": null,
      "chain-head": null,
      height: null,
      location: null,
      upload: null,
      download: null,
    };
  });
};

export const getSelectedState = (props) => {
  if (!props) {
    return null;
  }

  const { info } = props;

  if (!info || !info.id) {
    return {
      address: "",
    };
  }

  return {
    address: null,
    // address: info.defaultStorageConfig.cold.filecoin.addr,
  };
};

export const getInitialState = (props) => {
  if (!props) {
    return null;
  }

  const {
    id,
    status,
    stats,
    messageList,
    peersList,
    addrsList,
    info,
    library,
    data,
    settings,
    username,
    storageList,
    retrievalList,
    slates,
    keys,
  } = props;

  return {
    id,
    username,
    data,

    // NOTE(jim): Local settings
    settings_deals_auto_approve: settings.deals_auto_approve,

    // NOTE(jim): Powergate Hot Settings
    // settings_hot_enabled: info.defaultStorageConfig.hot.enabled,
    // settings_hot_allow_unfreeze: info.defaultStorageConfig.hot.allowUnfreeze,
    // settings_hot_ipfs_add_timeout: info.defaultStorageConfig.hot.ipfs.addTimeout,

    // NOTE(jim): Powergate Cold Settings
    // settings_cold_enabled: info.defaultStorageConfig.cold.enabled,
    // settings_cold_default_address: info.defaultStorageConfig.cold.filecoin.addr,
    // settings_cold_default_duration: info.defaultStorageConfig.cold.filecoin.dealMinDuration,
    // settings_cold_default_replication_factor: info.defaultStorageConfig.cold.filecoin.repFactor,
    // settings_cold_default_excluded_miners: info.defaultStorageConfig.cold.filecoin.excludedMinersList,
    // settings_cold_default_trusted_miners: info.defaultStorageConfig.cold.filecoin.trustedMinersList,
    // settings_cold_default_max_price: info.defaultStorageConfig.cold.filecoin.maxPrice,
    // settings_cold_default_auto_renew: info.defaultStorageConfig.cold.filecoin.renew.enabled,
    // settings_cold_default_auto_renew_max_price: info.defaultStorageConfig.cold.filecoin.renew.threshold,

    storageList,
    retrievalList,
    slates,
    keys,
    stats,
    library,
    // peers: transformPeers(peersList),
    // addresses: transformAddresses(addrsList, info),
  };
};
