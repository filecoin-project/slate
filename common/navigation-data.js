const constructFilesTreeForNavigation = (library) => {
  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      let e = library[i].children[j];
      if (e.decorator === "FILE") {
        library[i].children[j].pageTitle = "Viewing file";
        library[i].children[j].ignore = true;
      }
    }
  }

  return library;
};

export const generate = (library) => [
  {
    id: 1,
    name: "Home",
    pageTitle: "Welcome back!",
    decorator: "HOME",
    children: null,
  },
  {
    id: 2,
    name: "Wallet",
    pageTitle: "Your wallet and addresses",
    decorator: "WALLET",
  },
  ...constructFilesTreeForNavigation(library),
  {
    id: 3,
    name: "Slates",
    pageTitle: "Your slates",
    decorator: "SLATES",
    children: [],
  },
  {
    id: 4,
    name: "Local",
    pageTitle: "Your local data",
    decorator: "LOCAL_DATA",
    children: [],
  },
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
    name: "Filecoin Settings",
    pageTitle: "Your hot and cold deal settings.",
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
  {
    id: 16,
    name: "API Key & Tokens",
    pageTitle: "you",
    decorator: "SETTINGS_DEVELOPER",
    children: null,
    ignore: true,
  },
];
