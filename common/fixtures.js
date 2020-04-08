import * as Strings from '~/common/strings';
import * as Data from '~/common/data';

const LOCAL_CONFIG = `
"Identity": {
  "PeerID": "Qma9T5YraSnpRDZqRR4krcS",
  "PubKey": "CAAS4AQwggJcAgEAAoGBAMB"
  "PrivKey": "CAASogEwgZ8wDQYJKoZIhvd"
}
`;

export const getInitialState = (props) => {
  const { status, messageList, peersList, addrsList, info } = props;
  console.log(props);

  return {
    name: 'Andrew Hill',
    photoURL: '/static/avatar-andrew-hill.jpg',
    config: LOCAL_CONFIG,
    upload_bandwidth: 40023,
    download_bandwidth: 12323,
    settings_deal_country: `3`,
    settings_deals_auto_approve: true,
    settings_deal_default_duration: 1,
    settings_deal_replication_factor: 1,
    settings_deal_maximum_storage_payment: 100,
    settings_deal_default_miners: 't0123, t0124, t0125',
    notifications: [
      {
        id: 6,
        type: 'DEFAULT',
        text: 'cats-are-cool.png was retrieved from the Filecoin network.',
        createdAt: '2017-01-01 00:00:00 UTC',
      },
      {
        id: 5,
        type: 'DEFAULT',
        text: 'cats-are-cool.png was transfered from Miner B over to your local storage.',
        createdAt: '2016-12-28 00:00:00 UTC',
      },
      {
        id: 4,
        type: 'DEFAULT',
        text: 'A transfer has been initiated for cats-are-cool.png from Miner B.',
        createdAt: '2016-12-27 00:00:00 UTC',
      },
      {
        id: 3,
        type: 'DEFAULT',
        text: 'cats-are-cool.png retrieval deal accepted by Miner B.',
        createdAt: '2016-12-26 00:00:00 UTC',
      },
      {
        id: 2,
        type: 'DEFAULT',
        text: 'You have proposed a deal with Miner B for cats-are-cool.png.',
        createdAt: '2016-12-25 00:00:00 UTC',
      },
      {
        id: 1,
        type: 'DEFAULT',
        text: 'cats-are-cool-2.png is stored with Miner A on the Filecoin Network.',
        createdAt: '2016-12-24 00:00:00 UTC',
      },
      {
        id: 1,
        type: 'DEFAULT',
        text: 'cats-are-cool-2.png has been transferred to Miner A.',
        createdAt: '2016-12-23 00:00:00 UTC',
      },
      {
        id: 1,
        type: 'DEFAULT',
        text: 'A transfer has begun for cats-are-cool-2.png to Miner A.',
        createdAt: '2016-12-22 00:00:00 UTC',
      },
      {
        id: 1,
        type: 'DEFAULT',
        text: 'The storage deal for cats-are-cool-2.png has been accepted by Miner A.',
        createdAt: '2016-12-21 00:00:00 UTC',
      },
      {
        id: 1,
        type: 'DEFAULT',
        text: 'A storage deal for cats-are-cool-2.png has been proposed to Miner A.',
        createdAt: '2016-12-20 00:00:00 UTC',
      },
      {
        id: 1,
        type: 'DEFAULT',
        text: 'Searching for a Miner A to store cats-are-cool-2.png.',
        createdAt: '2016-12-19 00:00:00 UTC',
      },
    ],
    payment_channels_active: [
      {
        id: 1,
        category: 1,
        'channel-id': 'example-channel-id-1',
        'max-value': Strings.formatAsFilecoin(3232100),
        'current-value': Strings.formatAsFilecoin(423233),
        redeemable: 'Redeem',
      },
      {
        id: 2,
        category: 2,
        'channel-id': 'example-channel-id-2',
        'max-value': Strings.formatAsFilecoin(3232100),
        'current-value': Strings.formatAsFilecoin(423233),
      },
    ],
    payment_channels_redeemed: [
      {
        id: 1,
        category: 1,
        'channel-id': 'example-channel-id-3',
        'max-value': Strings.formatAsFilecoin(3232100),
        'redeemed-value': Strings.formatAsFilecoin(423233),
      },
      {
        id: 2,
        category: 1,
        'channel-id': 'example-channel-id-4',
        'max-value': Strings.formatAsFilecoin(223100),
        'redeemed-value': Strings.formatAsFilecoin(12200),
      },
    ],
    data_transfers: [
      {
        id: 1,
        'data-cid': '44Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '55Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'data-source': 'LOCAL',
        'data-destination': 't05141',
        size: Strings.bytesToSize(202000),
      },
      {
        id: 2,
        'data-cid': '66Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '77Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'data-source': 'LOCAL',
        'data-destination': 't05141',
        size: Strings.bytesToSize(202000),
      },
      {
        id: 3,
        'data-cid': '44Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '55Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'data-source': 't05141',
        'data-destination': 'LOCAL',
        size: Strings.bytesToSize(202000),
      },
    ],
    peers: [
      {
        id: 1,
        'peer-avatar': '/static/avatar-adrian-lanzafame.png',
        online: true,
        'chain-head': 'bafy2bzacecvuycbaik2dn4ktxeyrzrtuviqxvhbk67qxt5lqgrwogxhk4twx6',
        height: 8888,
        location: 1,
        upload: 22222,
        download: 11111,
      },
      {
        id: 2,
        'peer-avatar': '/static/avatar-andrew-hill.jpg',
        online: true,
        'chain-head': 'bafy2bzacecvuycbaik2dn4ktxeyrzrtuviqxvhbk67qxt5lqgrwogxhk4twx6',
        height: 8888,
        location: 2,
        upload: 22222,
        download: 11111,
      },
      {
        id: 3,
        'peer-avatar': '/static/avatar-colin-evran.jpg',
        'chain-head': 'bafy2bzacecvuycbaik2dn4ktxeyrzrtuviqxvhbk67qxt5lqgrwogxhk4twx6',
        height: 8888,
        location: 3,
        upload: 22222,
        download: 11111,
      },
      {
        id: 4,
        'peer-avatar': '/static/avatar-juan-benet.png',
        'chain-head': 'bafy2bzacecvuycbaik2dn4ktxeyrzrtuviqxvhbk67qxt5lqgrwogxhk4twx6',
        height: 8888,
        location: 3,
        upload: 22222,
        download: 11111,
      },
    ],
    deals: [
      {
        id: 1,
        'deal-category': 1,
        'data-cid': '14Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '23Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner A',
        price: Strings.formatAsFilecoin(1000),
        'auto-renew': 1,
        remaining: null,
        status: 1,
      },
      {
        id: 2,
        'deal-category': 1,
        'data-cid': '34Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '56Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner B',
        price: Strings.formatAsFilecoin(1000),
        'auto-renew': 1,
        remaining: null,
        status: 2,
      },
      {
        id: 3,
        'deal-category': 1,
        'data-cid': '78Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '89Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner C',
        price: Strings.formatAsFilecoin(1000),
        'auto-renew': 2,
        remaining: null,
        status: 3,
      },
      {
        id: 4,
        'deal-category': 1,
        'data-cid': '99Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '11Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner D',
        price: Strings.formatAsFilecoin(1000),
        'auto-renew': 2,
        remaining: null,
        status: 4,
      },
      {
        id: 5,
        'deal-category': 1,
        'data-cid': '12Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '34Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner E',
        price: Strings.formatAsFilecoin(1000),
        'auto-renew': 2,
        remaining: null,
        status: 5,
      },
      {
        id: 6,
        'deal-category': 1,
        'data-cid': '56Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': '78Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner F',
        price: Strings.formatAsFilecoin(1000),
        'auto-renew': 1,
        remaining: Strings.getRemainingTime(184000),
        status: 6,
      },
      {
        id: 7,
        'deal-category': 2,
        'data-cid': 'abY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': 'cdY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner A',
        price: Strings.formatAsFilecoin(100),
        status: 1,
      },
      {
        id: 8,
        'deal-category': 2,
        'data-cid': 'efY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': 'ghY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner B',
        price: Strings.formatAsFilecoin(100),
        status: 2,
      },
      {
        id: 9,
        'deal-category': 2,
        'data-cid': 'ilY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': 'qqY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner C',
        price: Strings.formatAsFilecoin(100),
        status: 3,
      },
      {
        id: 10,
        'deal-category': 2,
        'data-cid': 'xxY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': 'wwY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner D',
        price: Strings.formatAsFilecoin(100),
        status: 4,
      },
      {
        id: 11,
        'deal-category': 2,
        'data-cid': 'zzY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        'deal-cid': 'qzY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU',
        miner: 'Example Miner E',
        price: Strings.formatAsFilecoin(100),
        status: 5,
      },
    ],
    addresses: [
      {
        value: '1',
        name: 'Capricorn',
        address: Data.EXAMPLE_ADDRESSES[0],
        transactions: [
          {
            id: 1,
            category: 1,
            amount: Strings.formatAsFilecoin(11000),
            source: Data.EXTERNAL_ADDRESSES[0],
            destination: 'Capricorn',
            date: Strings.toDate('2017-01-01 00:00:00 UTC'),
            status: 1,
          },
          {
            id: 2,
            category: 2,
            amount: Strings.formatAsFilecoin(11000),
            source: 'Capricorn',
            destination: Data.EXTERNAL_ADDRESSES[0],
            date: Strings.toDate('2017-01-01 00:00:00 UTC'),
            status: 2,
          },
          {
            id: 3,
            category: 1,
            amount: Strings.formatAsFilecoin(11000),
            source: Data.EXTERNAL_ADDRESSES[0],
            destination: 'Capricorn',
            date: Strings.toDate('2017-01-01 00:00:00 UTC'),
            status: 2,
          },
          {
            id: 4,
            category: 2,
            amount: Strings.formatAsFilecoin(11000),
            source: 'Capricorn',
            destination: Data.EXTERNAL_ADDRESSES[0],
            date: Strings.toDate('2017-01-01 00:00:00 UTC'),
            status: 1,
          },
        ],
        type: 'SECP256K',
        balance: 10230,
        deals: 42,
      },
      {
        value: '2',
        name: 'Aquarius',
        address: Data.EXAMPLE_ADDRESSES[1],
        transactions: [],
        type: 'MULTISIG',
        balance: 0,
        deals: 0,
      },
      {
        value: '3',
        name: 'Pisces',
        address: Data.EXAMPLE_ADDRESSES[2],
        transactions: [],
        type: 'BLS',
        balance: 0,
        deals: 0,
      },
    ],
  };
};

const getFolderById = (id) => {
  for (let i = 0; i < Data.EXAMPLE_FOLDERS.length; i++) {
    if (id === Data.EXAMPLE_FOLDERS[i].id) {
      return Data.EXAMPLE_FOLDERS[i];
    }
  }

  return null;
};

const getFileById = (id) => {
  for (let i = 0; i < Data.EXAMPLE_FILES.length; i++) {
    if (id === Data.EXAMPLE_FILES[i].id) {
      return Data.EXAMPLE_FILES[i];
    }
  }
};

const constructFilesTreeForNavigation = () => {
  const SCAFFOLD = [
    {
      folderId: `folder-root`,
      children: [
        `folder-1`,
        `folder-2`,
        `file-1`,
        `file-2`,
        `file-3`,
        `file-8`,
        `file-9`,
        `file-10`,
        `file-11`,
        `file-12`,
        `file-13`,
        `file-14`,
        `file-15`,
        `file-16`,
        `file-17`,
      ],
    },
    {
      folderId: `folder-1`,
      children: [`folder-3`, `file-4`, `file-5`, `file-6`],
    },
    {
      folderId: `folder-2`,
      children: [],
    },
    {
      folderId: `folder-3`,
      children: [`file-7`],
    },
  ];

  const navigation = {
    ...getFolderById('folder-root'),
  };

  // TODO(jim): Refactor after proving the concept this is ugly.
  SCAFFOLD.forEach((o) => {
    if (navigation.children) {
      for (let i = 0; i < navigation.children.length; i++) {
        if (navigation.children[i] && navigation.children[i].id === o.folderId) {
          if (!navigation.children[i].children) {
            navigation.children[i].children = o.children.map((each) => {
              const folder = getFolderById(each);
              if (folder) {
                return folder;
              }

              const file = getFileById(each);
              if (file) {
                return { ...file, ignore: true };
              }

              return null;
            });
          }
        }
      }
    }

    if (navigation.id === o.folderId) {
      if (!navigation.children) {
        navigation.children = o.children.map((each) => {
          const folder = getFolderById(each);
          if (folder) {
            return folder;
          }

          const file = getFileById(each);
          if (file) {
            return { ...file, ignore: true };
          }

          return null;
        });
      }
    }
  });

  return navigation;
};

export const NavigationState = [
  {
    id: 1,
    name: 'Home',
    pageTitle: 'home',
    decorator: 'HOME',
    children: null,
  },
  {
    id: 2,
    name: 'Wallet',
    pageTitle: 'your wallet and addresses',
    decorator: 'WALLET',
    children: [
      {
        id: 3,
        name: 'Payment Channels',
        children: null,
        pageTitle: 'your payment channels',
        decorator: 'CHANNELS',
      },
    ],
  },
  constructFilesTreeForNavigation(),
  {
    id: 5,
    name: 'Deals',
    pageTitle: 'your deals',
    decorator: 'DEALS',
    children: [
      {
        id: 6,
        name: 'Data Transfer',
        pageTitle: 'your data transfers',
        decorator: 'DATA_TRANSFER',
        children: null,
      },
    ],
  },
  {
    id: 9,
    name: 'Stats',
    pageTitle: 'your filecoin usage',
    decorator: 'STATS',
    children: [
      {
        id: 10,
        name: 'Storage Market',
        pageTitle: 'the storage market',
        decorator: 'STORAGE_MARKET',
        children: null,
      },
      {
        id: 11,
        name: 'Miners',
        pageTitle: 'miners',
        decorator: 'MINERS',
        children: null,
      },
    ],
  },
  {
    id: 7,
    name: 'Status',
    pageTitle: 'your status',
    decorator: 'STATUS',
    children: null,
  },
  {
    id: 8,
    name: 'Peers',
    pageTitle: 'your peers',
    decorator: 'PEERS',
    children: null,
  },
  {
    id: 12,
    name: 'Logs',
    pageTitle: 'your logs',
    decorator: 'LOGS',
    children: null,
  },
  {
    id: 13,
    name: 'Edit account',
    pageTitle: 'your account',
    decorator: 'EDIT_ACCOUNT',
    children: null,
    ignore: true,
  },
  {
    id: 14,
    name: 'Settings',
    pageTitle: 'your settings',
    decorator: 'SETTINGS',
    children: null,
    ignore: true,
  },
  {
    id: 15,
    name: null,
    pageTitle: 'files',
    decorator: 'FILE',
    children: null,
    ignore: true,
  },
];
