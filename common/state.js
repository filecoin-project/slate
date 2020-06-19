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

const transformPeers = (peersList) => {
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

export const getInitialState = (props) => {
  const { status, messageList, peersList, addrsList, info, library } = props;

  if (!info || !info.id) {
    return {
      id: null,
      notifications: [],
      payment_channels_active: [],
      payment_channels_redeemed: [],
      data_transfers: [],
      peers: [],
      deals: [],
      addresses: [],
      library: [],
    };
  }

  return {
    id: info.id,
    name: "New Node",
    photoURL: "/static/system/avatar.png",
    upload_bandwidth: 0,
    download_bandwidth: 0,

    settings_deals_auto_approve: true,

    settings_hot_enabled: info.defaultConfig.hot.enabled,
    settings_hot_allow_unfreeze: info.defaultConfig.hot.allowUnfreeze,
    settings_hot_ipfs_add_timeout: info.defaultConfig.hot.ipfs.addTimeout,

    settings_cold_enabled: info.defaultConfig.cold.enabled,
    settings_cold_default_address: info.defaultConfig.cold.filecoin.addr,
    settings_cold_default_duration:
      info.defaultConfig.cold.filecoin.dealMinDuration,
    settings_cold_default_replication_factor:
      info.defaultConfig.cold.filecoin.repFactor,
    settings_cold_default_excluded_miners:
      info.defaultConfig.cold.filecoin.excludedMinersList,
    settings_cold_default_trusted_miners:
      info.defaultConfig.cold.filecoin.trustedMinersList,
    settings_cold_default_max_price: info.defaultConfig.cold.filecoin.maxPrice,
    settings_cold_default_auto_renew:
      info.defaultConfig.cold.filecoin.renew.enabled,
    settings_cold_default_auto_renew_max_price:
      info.defaultConfig.cold.filecoin.renew.threshold,

    notifications: [],
    payment_channels_active: [],
    payment_channels_redeemed: [],
    data_transfers: [],
    peers: transformPeers(peersList),
    deals: [],
    addresses: transformAddresses(addrsList, info),
    library,
  };
};
