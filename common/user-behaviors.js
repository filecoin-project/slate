import * as Websockets from "~/common/browser-websockets";
import * as Credentials from "~/common/credentials";
import * as Actions from "~/common/actions";

import Cookies from "universal-cookie";

import { dispatchCustomEvent } from "~/common/custom-events";

const cookies = new Cookies();

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
