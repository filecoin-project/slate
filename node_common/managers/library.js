import { v4 as uuid } from "uuid";

// NOTE(jim):
// There is some Navigation specific data here for folders.
export const createBucket = ({ id, name }) => {
  return {
    id,
    decorator: "FOLDER",
    icon: "FOLDER",
    name: name,
    pageTitle: `Exploring ${name}`,
    date: new Date(),
    size: null,
    children: [],
  };
};

// NOTE(jim):
// Every root level user gets a bucket.
export const init = ({ bucketName, readableName }) => [
  createBucket({ id: bucketName, name: readableName }),
];

export const createLocalDataIncomplete = ({ type, size, name }) => {
  return {
    id: `data-${uuid()}`,
    decorator: "FILE",
    icon: type,
    size: size,
    name: `data-${uuid()}`,
    file: name,
    type: type,
    date: new Date(),
    networks: [],
    job: null,
    ipfs: null,
    storage: 0,
    retrieval: 0,
  };
};

export const updateDataIPFS = (d, { ipfs }) => {
  // TODO(jim): DELETE_THIS_GUARD_CODE
  if (!d.networks) {
    d.networks = [];
    delete d.network;
  }

  if (!d.networks.includes("IPFS")) {
    d.networks.push("IPFS");
  }

  return { ...d, ipfs };
};

export const updateDataFilecoin = (d, { job, storage, retrieval }) => {
  // TODO(jim): DELETE_THIS_GUARD_CODE
  if (!d.networks) {
    d.networks = ["IPFS"];
    delete d.network;
  }

  // TODO(jim): FILECOIN
  if (!d.networks.includes("FILECOIN")) {
    d.networks.push("FILECOIN");
  }

  return { ...d, job, storage, retrieval };
};

export const updateDataById = ({ user, id, data }) => {
  const { library } = user.data;

  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      if (library[i].children[j].id === id) {
        library[i].children[j] = data;
        break;
      }
    }
  }

  return { ...user.data, library };
};

export const getDataByIPFS = (user, ipfs) => {
  const { library } = user.data;

  // TODO(jim): Totally purges the ID.
  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      if (library[i].children[j].ipfs === ipfs) {
        return library[i].children[j];
      }
    }
  }

  return null;
};

export const addData = ({ user, data }) => {
  const { library } = user.data;

  // TODO(jim): Since we don't support bucket organization... yet.
  // Add just pushes to the first set. But we can change this easily later.
  for (let i = 0; i < library.length; i++) {
    library[i].children = [data, ...library[i].children];
    break;
  }

  return { ...user.data, library };
};
