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
    children: [],
  };
};

const constructSlatesTreeForNavigation = (slates) => {
  return slates.map((s) => {
    return {
      ...s,
      slateId: s.id,
      name: s.slatename,
      pageTitle: `Viewing ${s.slatename}`,
      decorator: "SLATE",
    };
  });
};

export const generate = ({ library = [], slates = [] }) => [
  {
    id: "V1_NAVIGATION_HOME",
    name: "Home",
    pageTitle: "Welcome back!",
    decorator: "HOME",
    children: null,
  },
  {
    id: "V1_NAVIGATION_DIRECTORY",
    name: "Directory",
    pageTitle: "Your directory",
    decorator: "DIRECTORY",
    children: null,
  },
  {
    id: "V1_NAVIGATION_SLATES",
    name: "Slates",
    pageTitle: "Slates",
    decorator: "SLATES",
    children: constructSlatesTreeForNavigation(slates),
  },
  constructFilesTreeForNavigation(library),
  {
    id: "V1_NAVIGATION_LOCAL",
    name: "Local",
    pageTitle: "Your local data",
    decorator: "LOCAL_DATA",
    children: [],
    ignore: false,
  },
  {
    id: "V1_NAVIGATION_WALLET",
    name: "Wallet",
    pageTitle: "Your wallet and addresses",
    decorator: "WALLET",
    children: [
      {
        id: "V1_NAVIGATION_DEAL_HISTORY",
        name: "Deal history",
        pageTitle: "Your deal history",
        decorator: "DEALS",
      },
    ],
  },
  {
    id: "V1_NAVIGATION_NETWORK",
    name: "Network",
    pageTitle: "The Filecoin Network",
    decorator: "ACTIVITY",
    children: null,
  },
  {
    id: "V1_NAVIGATION_API",
    name: "API",
    pageTitle: "Developer API",
    decorator: "SETTINGS_DEVELOPER",
    children: null,
  },
  {
    id: "V1_NAVIGATION_PROFILE",
    name: "Profile & Account Settings",
    pageTitle: "Your Profile & Account Settings",
    decorator: "EDIT_ACCOUNT",
    children: null,
    ignore: true,
  },
  {
    id: "V1_NAVIGATION_FILECOIN_SETTINGS",
    name: "Filecoin Settings",
    pageTitle: "Filecoin Settings.",
    decorator: "SETTINGS",
    children: null,
    ignore: true,
  },
];
