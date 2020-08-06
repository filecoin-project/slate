import * as Strings from "~/common/strings";

const USERNAME_REGEX = new RegExp("^[a-zA-Z0-9_]{0,}[a-zA-Z]+[0-9]*$");
const MIN_PASSWORD_LENGTH = 8;

export const REJECT_LIST = [
  "..",
  "webpack",
  "_",
  "root",
  "www",
  "website",
  "index",
  "api",
  "public",
  "static",
  "admin",
  "administrator",
  "webmaster",
  "403",
  "404",
  "500",
  "login",
  "authenticate",
  "sign-in",
  "sign_in",
  "signin",
  "log-in",
  "log_in",
  "logout",
];

export const username = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (!USERNAME_REGEX.test(text)) {
    return false;
  }

  if (REJECT_LIST.includes(text)) {
    return false;
  }

  return true;
};

export const password = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length < MIN_PASSWORD_LENGTH) {
    return false;
  }

  return true;
};

export const isFileTypeAllowed = (type = "") => {
  if (type.startsWith("application/pdf")) {
    return true;
  }

  if (type.startsWith("audio/")) {
    return true;
  }

  if (type.startsWith("image/")) {
    return true;
  }

  if (type.startsWith("video/")) {
    return true;
  }

  return false;
};
