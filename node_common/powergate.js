import * as Constants from "~/node_common/constants";

/*
import { createPow } from "@textile/powergate-client";

// NOTE(jim):
// https://github.com/textileio/js-powergate-client
const Powergate = createPow({ host: Constants.POWERGATE_HOST });

export const createNewToken = async () => {
  const FFS = await Powergate.ffs.create();
  return FFS.token ? FFS.token : null;
};

export const get = (user) => {
  Powergate.setToken(user.data.tokens.pg);
  return Powergate;
};
*/

export const createNewToken = async () => {
  return null;
};

export const get = (user) => {
  return {};
};
