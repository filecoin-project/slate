import * as Websockets from "~/common/browser-websockets";
import * as Credentials from "~/common/credentials";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";
import * as Store from "~/common/store";
import * as FileUtilities from "~/common/file-utilities";
import * as Events from "~/common/custom-events";

import Cookies from "universal-cookie";
import JSZip from "jszip";

import { saveAs } from "file-saver";

//NOTE(martina): this file is for utility *API-calling* functions
//For non API related utility functions, see common/utilities.js
//And for uploading related utility functions, see common/file-utilities.js

const cookies = new Cookies();

export const authenticate = async (state) => {
  // NOTE(jim): Kills existing session cookie if there is one.
  const jwt = cookies.get(Credentials.session.key);

  if (jwt) {
    cookies.remove(Credentials.session.key);
  }

  let response = await Actions.signIn(state);
  if (Events.hasError(response)) {
    return false;
  }

  if (response.token) {
    // NOTE(jim):
    // + One week.
    // + Only requests to the same site.
    // + Not using sessionStorage so the cookie doesn't leave when the browser dies.
    cookies.set(Credentials.session.key, response.token, true, {
      path: "/",
      maxAge: 3600 * 24 * 7,
      sameSite: "strict",
    });
  }

  return response;
};

// NOTE(jim): Signs a user out and redirects to the sign in screen.
export const signOut = async () => {
  let wsclient = Websockets.getClient();
  if (wsclient) {
    await Websockets.deleteClient();
    wsclient = null;
  }

  const jwt = cookies.get(Credentials.session.key);
  if (jwt) {
    cookies.remove(Credentials.session.key);
  }

  window.location.replace("/_");
  return;
};

// NOTE(jim): Permanently deletes you, forever.
export const deleteMe = async () => {
  const message = "Do you really want to delete your account? It will be permanently removed";
  if (!window.confirm(message)) {
    return false;
  }

  await Actions.updateSearch("delete-user");

  let response = await Actions.deleteViewer();

  if (Events.hasError(response)) {
    return response;
  }

  await signOut();

  let wsclient = Websockets.getClient();
  if (wsclient) {
    await Websockets.deleteClient();
    wsclient = null;
  }

  return response;
};

export const hydrate = async () => {
  const response = await Actions.hydrateAuthenticatedUser();

  if (Events.hasError(response)) {
    return null;
  }

  return JSON.parse(JSON.stringify(response.data));
};

export const formatDroppedFiles = ({ dataTransfer }) => {
  // NOTE(jim): If this is true, then drag and drop came from a slate object.
  const data = dataTransfer.getData("slate-object-drag-data");
  if (data) {
    return;
  }

  const files = [];
  let fileLoading = {};
  if (dataTransfer.items && dataTransfer.items.length) {
    for (var i = 0; i < dataTransfer.items.length; i++) {
      if (dataTransfer.items[i].kind === "file") {
        var file = dataTransfer.items[i].getAsFile();
        files.push(file);
        fileLoading[`${file.lastModified}-${file.name}`] = {
          name: file.name,
          loaded: 0,
          total: file.size,
        };
      }
    }
  }

  if (!files.length) {
    Events.dispatchMessage({ message: "File type not supported. Please try a different file" });
  }

  return { fileLoading, files, numFailed: dataTransfer.items.length - files.length };
};

export const formatUploadedFiles = ({ files }) => {
  let toUpload = [];
  let fileLoading = {};
  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    if (!file) {
      continue;
    }

    toUpload.push(file);
    fileLoading[`${file.lastModified}-${file.name}`] = {
      name: file.name,
      loaded: 0,
      total: file.size,
    };
  }

  if (!toUpload.length) {
    Events.dispatchMessage({ message: "We could not find any files to upload." });
    return false;
  }

  return { toUpload, fileLoading, numFailed: files.length - toUpload.length };
};

export const uploadImage = async (file, resources, excludeFromLibrary) => {
  if (!file) {
    Events.dispatchMessage({ message: "Something went wrong with the upload. Please try again" });
    return;
  }

  if (!Validations.isPreviewableImage(file.type)) {
    Events.dispatchMessage({ message: "Upload failed. Only images and gifs are allowed" });
    return;
  }

  const response = await FileUtilities.upload({ file, routes: resources, excludeFromLibrary });

  if (Events.hasError(response)) {
    return false;
  }

  delete response.json.data.icon;
  delete response.json.data.ipfs;

  return response.json;
};

export const deleteFiles = async (fileCids, fileIds = [], noAlert) => {
  let cids = Array.isArray(fileCids) ? fileCids : [fileCids];
  let ids = Array.isArray(fileIds) ? fileIds : [fileIds];

  const response = await Actions.deleteBucketItems({ cids, ids });

  if (!noAlert) {
    if (Events.hasError(response)) {
      return false;
    }

    // Events.dispatchMessage({ message: "Files successfully deleted!", status: "INFO" });

    return response;
  }
};

export const removeFromSlate = async ({ slate, ids }) => {
  const response = await Actions.removeFileFromSlate({
    slateId: slate.id,
    ids,
  });

  if (Events.hasError(response)) {
    return false;
  }

  return response;
};

export const addToSlate = async ({ slate, files, fromSlate }) => {
  let data = files.map((file) => {
    return {
      title: file.name || file.title || file.file,
      ...file,
    };
  });

  const addResponse = await Actions.addFileToSlate({
    slate,
    data,
    fromSlate,
  });

  if (Events.hasError(addResponse)) {
    return false;
  }

  const { added, skipped } = addResponse;
  let message = Strings.formatAsUploadMessage(added, skipped, true);
  Events.dispatchMessage({ message, status: !added ? null : "INFO" });
  return true;
};

export const addToDataFromSlate = async ({ files }) => {
  let items = files.map((file) => {
    return {
      ownerId: file.ownerId,
      cid: file.cid,
    };
  });
  let response = await Actions.addCIDToData({ items });
  if (Events.hasError(response)) {
    return false;
  }
  let message = Strings.formatAsUploadMessage(response.data.added, response.data.skipped);
  Events.dispatchMessage({ message, status: !response.data.added ? null : "INFO" });
  return response;
};

export const download = (file) => {
  const filename = file.file || file.name || file.title;
  let uri;
  if (file.url) {
    uri = file.url;
  } else {
    uri = Strings.getCIDGatewayURL(file.cid);
  }
  Window.saveAs(uri, filename);
};

export const downloadZip = async (file) => {
  try {
    const { data } = await Actions.getZipFilePaths(file);
    const filesPaths = data.filesPaths.map((item) => item.replace(`/${file.id}/`, ""));
    const baseUrl = file.url;
    const zipFileName = file.file;

    let zip = new JSZip();

    for (let filePath of filesPaths) {
      let url = `${baseUrl}/${filePath}`;
      const blob = await Window.getBlobFromUrl(url);

      zip.file(filePath, blob);
    }

    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, zipFileName);
    });

    return {
      decorator: "UNITY_ZIP_DOWNLOAD_SUCCESS",
      error: false,
    };
  } catch (e) {
    return {
      decorator: "UNITY_ZIP_DOWNLOAD_FAILED",
      error: true,
    };
  }
};

// export const createSlate = async (data) => {
//   let response = await Actions.createSlate({
//     name: data.name,
//     public: data.public,
//     body: data.body,
//   });
//   return response;
// }

// export const createWalletAddress = async (data) => {
//   let response = await Actions.updateViewer({
//     type: "CREATE_FILECOIN_ADDRESS",
//     address: {
//       name: data.name,
//       type: data.wallet_type,
//       makeDefault: data.makeDefault,
//     },
//   });
//   return response;
// }

// export const sendWalletAddressFilecoin = (data) => {
//   let response = await Actions.sendFilecoin({
//     source: data.source,
//     target: data.target,
//     amount: data.amount,
//   });
//   return response;
// }
