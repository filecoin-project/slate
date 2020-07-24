import { v4 as uuid } from "uuid";

// NOTE(jim):
// There is some Navigation specific data here for folders.
export const createBucket = ({ id, name }) => {
  return {
    decorator: "FOLDER",
    id,
    folderId: id,
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
const init = ({ bucketName, readableName }) => [
  createBucket({ id: bucketName, name: readableName }),
];

export const createLocalDataIncomplete = ({ type, size, name }) => {
  return {
    id: `data-${uuid()}`,
    decorator: "FILE",
    icon: type,
    size: size,
    name,
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
  if (!d.networks.includes("IPFS")) {
    d.networks.push("IPFS");
  }

  return { ...d, ipfs };
};

export const updateDataFilecoin = (d, { job, storage, retrieval }) => {
  if (!d.networks.includes("FILECOIN-PENDING")) {
    d.networks.push("FILECOIN-PENDING");
  }

  return { ...d, job, storage, retrieval };
};

export const add = (user, data) => {
  const { library } = user.data;

  // TODO(jim): Since we don't support bucket organization... yet.
  // Add just pushes to the first set. But we can change this easily later.
  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].length; j++) {
      library[i].children[j].push(data);
      break;
    }
  }

  return { ...user.data, library };
};

// NOTE(jim): Not sure if we're going to use this?
export const removeById = (user, dataId) => {
  const { library } = user.data;

  // TODO(jim): Totally purges the ID.
  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      library[i].children[j] = library[i].children[j].filter(
        (e) => e.id !== dataId
      );
    }
  }

  return { ...user.data, library };
};
