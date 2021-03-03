import * as Websockets from "~/common/browser-websockets";
import * as Credentials from "~/common/credentials";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";
import * as FileUtilities from "~/common/file-utilities";
import * as Events from "~/common/custom-events";

import Cookies from "universal-cookie";
import JSZip from "jszip";

import { mql } from "./microlink";
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

export const formatPastedImages = ({ clipboardItems }) => {
  let files = [];
  let fileLoading = {};
  for (let i = 0; i < clipboardItems.length; i++) {
    // Note(Amine): skip content if it's not an image
    if (clipboardItems[i].type.indexOf("image") === -1) continue;
    const file = clipboardItems[i].getAsFile();
    files.push(file);
    fileLoading[FileUtilities.fileKey(file)] = {
      name: file.name,
      loaded: 0,
      total: file.size,
    };
  }
  return { fileLoading, toUpload: files };
};

export const formatDroppedFiles = async ({ dataTransfer }) => {
  // NOTE(jim): If this is true, then drag and drop came from a slate object.
  const isSlateObject = dataTransfer.getData("slate-object-drag-data");
  if (isSlateObject) {
    return;
  }

  const files = [];
  let fileLoading = {};
  let fileMetadata = {};

  // do we have uris to parse?
  const uriList = dataTransfer.types.includes("text/uri-list");

  if (uriList) {
    // hello url, let's do some magic here
    const uri = dataTransfer.getData("text/uri-list");

    Events.dispatchMessage({ message: "Processing link...", status: "INFO" });

    try {
      // TODO(cw): currently we are processing links via microlink in order
      // to populate the necessary metadata, we may replace this with our
      // own service in the future.
      const { status, response } = await mql(uri, {
        iframe: false,
        screenshot: true,
        video: false,
        palette: true,
        audio: false,
      });

      if (status === "success") {
        const { body: urlJSON } = response;
        const { data } = urlJSON;

        console.log("URL processed: ", urlJSON);

        const file = FileUtilities.createLinkFile(data);

        console.log("File created: ", file);

        // add link to upload queue
        files.push(file);
        fileLoading[FileUtilities.fileKey(file)] = {
          name: file.name,
          loaded: 0,
          total: file.size,
        };

        // add any additional metadata to store
        fileMetadata[FileUtilities.fileKey(file)] = { screenshot: data.screenshot };
        debugger;
      }
    } catch (e) {
      Events.dispatchMessage({ message: `Error processing url ${uri}, try again later` });
    }
  } else {
    for (let item in dataTransfer.items) {
      const data = dataTransfer.items[item];
      if (data.kind === "file") {
        const file = data.getAsFile();
        files.push(file);
        fileLoading[FileUtilities.fileKey(file)] = {
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

  return { fileLoading, files, numFailed: dataTransfer.items.length - files.length, fileMetadata };
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
    fileLoading[FileUtilities.fileKey(file)] = {
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

export const uploadImageFromUrl = async (url, resources, excludeFromLibrary) => {
  // fetch file from url
  const file = await fetch(url).then((response) => response.blob());

  const response = await this.uploadImage({ file, routes: resources, excludeFromLibrary });

  if (Events.hasError(response)) {
    return false;
  }

  return response.json;
};

export const updateCoverImage = async (origData, newData) => {
  let { cid: previousCoverCid, id: previousCoverId } = origData?.coverImage;

  newData.url = Strings.getCIDGatewayURL(newData.cid);

  let updateReponse = await Actions.updateData({
    data: {
      id: previousCoverId,
      coverImage: newData,
    },
  });

  if (previousCoverCid) {
    //fix this
    let libraryCids = this.props.viewer.library[0].children.map((obj) => obj.cid);
    if (!libraryCids.includes(previousCoverCid)) {
      await deleteFiles(previousCoverCid, previousCoverId, true);
    }
  }

  Events.hasError(updateReponse);
  return;
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

    await Promise.all(
      filesPaths.map(async (filePath) => {
        let url = `${baseUrl}/${filePath}`;
        const blob = await Window.getBlobFromUrl(url);

        zip.file(filePath, blob);
      })
    );

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

const _nativeDownload = ({ url, onError }) => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;

  const ERROR_MESSAGE = "SLATE_DOWNLOAD_ERROR";
  const handleIframeErrors = (e) => {
    if (e.data === ERROR_MESSAGE && onError) {
      onError(e.data);
    }
  };
  window.addEventListener("message", handleIframeErrors);
  iframe.onload = (e) => window.removeEventListener("message", handleIframeErrors);

  document.body.appendChild(iframe);
};

export const compressAndDownloadFiles = async ({ files, name = "slate.zip", resourceURI }) => {
  const errorMessage = "Something went wrong with the download. Please try again";
  try {
    if (!(files && files.length > 0)) return;
    Events.dispatchMessage({ message: "We're preparing your files to download", status: "INFO" });
    let downloadFiles = [];
    for (const file of files) {
      if (file.type === "application/unity") {
        const { data } = await Actions.getZipFilePaths(file);
        const unityFiles = data.filesPaths.map((item) => ({
          url: item.replace(`/${file.id}/`, `${file.url || Strings.getCIDGatewayURL(file.cid)}/`),
          name: item.replace(`/${file.id}/`, `/${file.name}/`),
        }));

        downloadFiles = downloadFiles.concat(unityFiles);
        continue;
      }

      downloadFiles.push({
        name: file.file || file.name,
        url: file.url || Strings.getCIDGatewayURL(file.cid),
      });
    }

    const res = await Actions.createZipToken({ files: downloadFiles, resourceURI });
    const downloadLink = Actions.downloadZip({ token: res.data.token, name, resourceURI });
    await _nativeDownload({
      url: downloadLink,
      onError: (err) =>
        Events.dispatchMessage({
          message: errorMessage,
        }),
    });
  } catch (e) {
    console.error(e);
    Events.dispatchMessage({ message: errorMessage });
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
