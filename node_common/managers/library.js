import { v4 as uuid } from "uuid";
import { getFileExtension } from "../../common/strings";

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

export const createLocalDataIncomplete = ({ type, size, name }, id = null) => {
  return {
    id: !id ? `data-${uuid()}` : id,
    name: name,
    decorator: "FILE",
    icon: type,
    size: size,
    file: name,
    type: type,
    date: new Date(),
    networks: [],
    job: null,
    cid: null,
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

  return { ...d, cid: ipfs.replace("/ipfs/", ""), ipfs };
};

export const updateDataById = ({ user, id, data }) => {
  const { library } = user.data;

  for (let i = 0; i < library.length; i++) {
    for (let j = 0; j < library[i].children.length; j++) {
      if (library[i].children[j].id === id) {
        library[i].children[j] = data;
        return { ...user.data, library };
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
      if (library[i].children[j].ipfs === ipfs || library[i].children[j].cid === ipfs) {
        return library[i].children[j];
      }
    }
  }

  return null;
};

export const addData = ({ user, files }) => {
  const { library } = user.data;

  // TODO(jim): Since we don't support bucket organization... yet.
  // Add just pushes to the first set. But we can change this easily later.
  let noRepeats = [];
  for (let file of files) {
    file.cid = file.cid || file.ipfs.replace("/ipfs/", "");
    delete file.ipfs;
    noRepeats.push(file);
  }

  let newCids = [];
  for (let i = 0; i < library.length; i++) {
    let cids = library[i].children.map((file) => file.cid || file.ipfs.replace("/ipfs/", "")) || [];
    noRepeats = noRepeats.filter((item) => {
      let isNotRepeat = !cids.includes(item.cid) && !newCids.includes(item.cid);
      newCids.push(item.cid);
      return isNotRepeat;
    });
  }

  for (let i = 0; i < library.length; i++) {
    library[i].children = [...noRepeats, ...library[i].children];
    break;
  }

  return {
    updatedUserDataFields: { ...user.data, library },
    added: noRepeats.length,
    skipped: files.length - noRepeats.length,
  };
};

export const editItem = ({ user, update }) => {
  const { library } = user.data;
  const previewImage = update.data.previewImage;
  for (let i = 0; i < library[0].children.length; i++) {
    if (library[0].children[i].id === update.data.id) {
      library[0].children[i] = { ...library[0].children[i], ...{ previewImage } };
      break;
    }
  }
  return user.data;
};
