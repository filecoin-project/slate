import * as Websockets from "~/common/browser-websockets";
import * as Credentials from "~/common/credentials";
import * as Actions from "~/common/actions";
import * as Store from "~/common/store";
import * as FileUtilities from "~/common/file-utilities";

import Cookies from "universal-cookie";

import { dispatchCustomEvent } from "~/common/custom-events";

const cookies = new Cookies();

// NOTE(martina): Creates a new user, then authenticates them
export const createUser = async (state) => {
  let response = await Actions.createUser(state);
  console.log("CREATE_USER", response);

  if (!response || response.error) {
    return response;
  }

  return this._handleAuthenticate(state, true);
};

export const authenticate = async (state, newAccount) => {
  // NOTE(jim): Kills existing session cookie if there is one.
  const jwt = cookies.get(Credentials.session.key);

  if (jwt) {
    cookies.remove(Credentials.session.key);
  }

  let response = await Actions.signIn(state);
  if (!response || response.error) {
    return response;
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

  if (!response || response.error) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message: "We're having trouble connecting right now. Please try again later",
        },
      },
    });
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

  if (!response || response.error) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message: "We encountered issues while refreshing. Please try again",
        },
      },
    });
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

  // if (!files.length) {
  //   dispatchCustomEvent({
  //     name: "create-alert",
  //     detail: {
  //       alert: {
  //         message: "File type not supported. Please try a different file",
  //       },
  //     },
  //   });
  // }

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

  // if (!toUpload.length) {
  //   dispatchCustomEvent({
  //     name: "create-alert",
  //     detail: {
  //       alert: { message: "We could not find any files to upload." },
  //     },
  //   });
  //   return false;
  // }

  return { toUpload, fileLoading, numFailed: files.length - toUpload.length };
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
