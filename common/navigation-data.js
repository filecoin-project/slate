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
    id: "NAV_DATA",
    decorator: "DATA",
    name: "Home",
    // children: [
    //   {
    //     id: "V1_NAVIGATION_ENCRYPTED_DATA",
    //     decorator: "ENCRYPTED",
    //     name: "Encrypted Data",
    //     pageTitle: "Encrypted data",
    //     children: null,
    //   },
    // ],
  };
};

// const constructSlatesTreeForNavigation = (slates) => {
//   return slates.map((s) => {
//     return {
//       ...s,
//       slateId: s.id,
//       name: Strings.getPresentationSlateName(s),
//       pageTitle: `Viewing ${s.slatename}`,
//       decorator: "SLATE",
//       ignore: true,
//     };
//   });
// };

export const generate = ({ library = [], slates = [] }) => [
  constructFilesTreeForNavigation(library),
  {
    id: "NAV_ACTIVITY",
    decorator: "ACTIVITY",
    name: "Activity",
    pageTitle: "Welcome back!",
    children: null,
    ignore: true,
  },
  {
    id: "NAV_SLATES",
    decorator: "SLATES",
    name: "Slates",
    pageTitle: "Slates",
    children: null,
    ignore: true,
  },
  {
    id: "NAV_SLATES_FOLLOWING",
    decorator: "SLATES_FOLLOWING",
    name: "Slates",
    pageTitle: "Slates",
    children: null,
    ignore: true,
  },
  {
    id: "NAV_DIRECTORY",
    decorator: "DIRECTORY",
    name: "Directory",
    pageTitle: "Your directory",
    children: null,
  },
  {
    id: "NAV_DIRECTORY_FOLLOWERS",
    decorator: "DIRECTORY_FOLLOWERS",
    name: "Directory",
    pageTitle: "Your directory",
    children: null,
    ignore: true,
  },
  {
    id: "NAV_SLATE",
    decorator: "SLATE",
    name: "Slate",
    pageTitle: "Slate",
    children: null,
    ignore: true,
  },
  // ...constructSlatesTreeForNavigation(slates),
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
    id: "V1_NAVIGATION_NETWORK",
    decorator: "NETWORK",
    name: "Network",
    pageTitle: "The Filecoin Network",
    children: null,
  },
  */
  {
    id: "NAV_FILECOIN",
    decorator: "FILECOIN",
    name: "Filecoin",
    pageTitle: "Archive on Filecoin",
    filecoin: true,
    children: null,
  },
  {
    id: "NAV_STORAGE_DEAL",
    decorator: "STORAGE_DEAL",
    name: "Storage Deal",
    filecoin: true,
    pageTitle: "Make an one-off Filecoin storage deal",
  },
  {
    id: "NAV_API",
    decorator: "API",
    name: "API",
    pageTitle: "Developer API",
    children: null,
  },
  {
    id: "NAV_SETTINGS",
    decorator: "SETTINGS",
    name: "Profile & Account Settings",
    pageTitle: "Your Profile & Account Settings",
    children: null,
    ignore: true,
  },
  {
    id: "NAV_PROFILE",
    decorator: "PROFILE",
    name: "Profile",
    pageTitle: "Profile",
    children: null,
    ignore: true,
  },
  {
    id: "NAV_FILE",
    decorator: "FILE",
    name: "File",
    pageTitle: "File",
    children: null,
    ignore: true,
  },
];
