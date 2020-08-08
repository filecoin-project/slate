import * as Strings from "~/common/strings";

// NOTE(jim)
// Return the desired navigation entity based on the constructed navigation
// and targetId
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
      ignore: true,
    };
  });
};

export const generate = ({ library = [], slates = [] }) => [
  {
    id: 1,
    name: "Home",
    pageTitle: "Welcome back!",
    decorator: "HOME",
    children: null,
  },
  {
    id: 18,
    name: "Activity",
    pageTitle: "Your activity",
    decorator: "ACTIVITY",
    children: null,
  },
  {
    id: 3,
    name: "Slates",
    pageTitle: "Slates",
    decorator: "SLATES",
    children: null,
  },
  ...constructSlatesTreeForNavigation(slates),
  constructFilesTreeForNavigation(library),
  {
    id: 4,
    name: "Local",
    pageTitle: "Local data",
    decorator: "LOCAL_DATA",
    children: [],
    ignore: false,
  },
  {
    id: 15,
    name: null,
    pageTitle: "files",
    decorator: "FILE",
    children: null,
    ignore: true,
  },
  {
    id: 17,
    name: null,
    pageTitle: "slate",
    decorator: "SLATE",
    children: null,
    ignore: true,
  },
  {
    id: 2,
    name: "Wallet",
    pageTitle: "Your wallet and addresses",
    decorator: "WALLET",
    children: [
      {
        id: 6,
        name: "Deal history",
        pageTitle: "Your deal history",
        decorator: "DEALS",
      },
    ],
  },
  {
    id: 16,
    name: "API",
    pageTitle: "Developer API",
    decorator: "SETTINGS_DEVELOPER",
    children: null,
  },
  {
    id: 13,
    name: "Profile & Account Settings",
    pageTitle: "Your Profile & Account Settings",
    decorator: "EDIT_ACCOUNT",
    children: null,
    ignore: true,
  },
  {
    id: 14,
    name: "Filecoin Settings",
    pageTitle: "Filecoin Settings.",
    decorator: "SETTINGS",
    children: null,
    ignore: true,
  },
];
