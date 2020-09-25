import * as Strings from "~/common/strings";

// NOTE(jim):
// Recursion for nested entities (any number).
export const getCurrentById = (navigation, targetId) => {
  let target = null;
  let activeIds = {};

  const findById = (state, id) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id === id) {
        target = state[i];
        activeIds[state[i].id] = true;
      }

      if (!target && state[i].children) {
        activeIds[state[i].id] = true;
        findById(state[i].children, id);

        if (!target) {
          activeIds[state[i].id] = false;
        }
      }
    }
  };

  findById(navigation, targetId);

  return { target, activeIds };
};

const constructFilesTreeForNavigation = (library) => {
  return {
    ...library[0],
    name: `Data`,
    children: [
      {
        id: "V1_NAVIGATION_ENCRYPTED_DATA",
        decorator: "ENCRYPTED",
        name: "Encrypted Data",
        pageTitle: "Encrypted data",
        children: null,
      },
    ],
  };
};

const constructSlatesTreeForNavigation = (slates) => {
  return slates.map((s) => {
    return {
      ...s,
      slateId: s.id,
      name: s.data.name || s.slatename,
      pageTitle: `Viewing ${s.slatename}`,
      decorator: "SLATE",
      ignore: true,
    };
  });
};

export const generate = ({ library = [], slates = [] }) => [
  {
    id: "V1_NAVIGATION_HOME",
    decorator: "HOME",
    name: "Home",
    pageTitle: "Welcome back!",
    children: null,
  },
  {
    id: "V1_NAVIGATION_DIRECTORY",
    decorator: "DIRECTORY",
    name: "Directory",
    pageTitle: "Your directory",
    children: null,
  },
  {
    id: "V1_NAVIGATION_SLATES",
    decorator: "SLATES",
    name: "Slates",
    pageTitle: "Slates",
    children: null,
  },
  {
    id: "V1_NAVIGATION_SLATE",
    decorator: "PUBLIC_SLATE",
    name: "Slate",
    pageTitle: "Slate",
    children: null,
    ignore: true,
  },
  ...constructSlatesTreeForNavigation(slates),
  constructFilesTreeForNavigation(library),
  /*
  {
    id: "V1_NAVIGATION_LOCAL",
    decorator: "LOCAL_DATA",
    name: "Local",
    pageTitle: "Your local data",
    children: [],
    ignore: false,
  },
  {
    id: "V1_NAVIGATION_WALLET",
    decorator: "WALLET",
    name: "Wallet",
    pageTitle: "Your wallet and addresses",
    children: [
      {
        id: "V1_NAVIGATION_DEAL_HISTORY",
        decorator: "DEALS",
        name: "Deal history",
        pageTitle: "Your deal history",
      },
    ],
  }, 
  {
    id: "V1_NAVIGATION_NETWORK",
    decorator: "NETWORK",
    name: "Network",
    pageTitle: "The Filecoin Network",
    children: null,
  },
  */
  {
    id: "V1_NAVIGATION_API",
    decorator: "SETTINGS_DEVELOPER",
    name: "API",
    pageTitle: "Developer API",
    children: [],
  },
  {
    id: "V1_NAVIGATION_ARCHIVE",
    decorator: "FILECOIN",
    name: "Filecoin",
    pageTitle: "Archive on Filecoin",
    children: [
      {
        id: "V1_NAVIGATION_NETWORK",
        decorator: "NETWORK",
        name: "Network API",
        pageTitle: "The Filecoin Network",
        children: null,
      },
      {
        id: "V1_NAVIGATION_WALLET",
        decorator: "WALLET",
        name: "Wallet",
        pageTitle: "Your wallet and addresses",
        children: [],
      },
      {
        id: "V1_NAVIGATION_FILECOIN_SETTINGS",
        decorator: "SETTINGS",
        name: "Deal Settings",
        pageTitle: "Deal Settings.",
        children: null,
      },
    ],
  },
  {
    id: "V1_NAVIGATION_FILECOIN_STORAGE_DEAL",
    decorator: "MAKE_DEAL",
    name: "Storage Deal",
    pageTitle: "Make an one-off Filecoin storage deal",
  },
  {
    id: "V1_NAVIGATION_PROFILE_EDIT",
    decorator: "EDIT_ACCOUNT",
    name: "Profile & Account Settings",
    pageTitle: "Your Profile & Account Settings",
    children: null,
    ignore: true,
  },
  {
    id: "V1_NAVIGATION_FILECOIN_SETTINGS",
    decorator: "SETTINGS",
    name: "Filecoin Settings",
    pageTitle: "Filecoin Settings.",
    children: null,
    ignore: true,
  },
  {
    id: "V1_NAVIGATION_PROFILE",
    decorator: "PUBLIC_PROFILE",
    name: "Profile",
    pageTitle: "Profile",
    children: null,
    ignore: true,
  },
  {
    id: "V1_NAVIGATION_FILE",
    decorator: "FILE",
    name: "File",
    pageTitle: "File",
    children: null,
    ignore: true,
  },
];
