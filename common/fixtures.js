const constructFilesTreeForNavigation = (library) => {
  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      let e = library[i].children[j];
      if (e.decorator === "FILE") {
        library[i].children[j].ignore = true;
      }
    }
  }

  return library;
};

export const generateNavigationState = (library) => [
  {
    id: 1,
    name: "Home",
    pageTitle: "home",
    decorator: "HOME",
    children: null,
  },
  {
    id: 2,
    name: "Wallet",
    pageTitle: "your wallet and addresses",
    decorator: "WALLET",
  },
  ...constructFilesTreeForNavigation(library),
  {
    id: 13,
    name: "Edit account",
    pageTitle: "your account",
    decorator: "EDIT_ACCOUNT",
    children: null,
    ignore: true,
  },
  {
    id: 14,
    name: "Settings",
    pageTitle: "your settings",
    decorator: "SETTINGS",
    children: null,
    ignore: true,
  },
  {
    id: 15,
    name: null,
    pageTitle: "files",
    decorator: "FILE",
    children: null,
    ignore: true,
  },
];
