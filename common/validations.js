import * as Strings from "~/common/strings";

const USERNAME_REGEX = new RegExp("^[a-zA-Z0-9_]{0,}[a-zA-Z]+[0-9]*$");
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[\w-]+@[a-zA-Z0-9_]+?\.[a-zA-Z]{2,50}$/;

// TODO(jim): Regex should cover some of this.
const REJECT_LIST = [
  "..",
  "_",
  "_next",
  "next",
  "webpack",
  "system",
  "experience",
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
  "download",
  "downloads",
  "403",
  "404",
  "500",
  "maintenance",
  "guidelines",
  "updates",
  "login",
  "authenticate",
  "sign-in",
  "sign_in",
  "signin",
  "log-in",
  "log_in",
  "logout",
  "terms",
  "terms-of-service",
  "community",
  "privacy",
  "reset-password",
  "reset",
  "logout",
  "dashboard",
  "analytics",
  "data",
  "timeout",
  "please-dont-use-timeout",
];

export const userRoute = (text) => {
  if (!USERNAME_REGEX.test(text)) {
    return false;
  }

  if (REJECT_LIST.includes(text)) {
    return false;
  }

  return true;
};

export const slatename = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length > 48) {
    return false;
  }

  return true;
};

export const username = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length > 48 || text.length < 1) {
    return false;
  }

  if (!userRoute(text)) {
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
  console.log({ type });

  if (type.startsWith("text/")) {
    return true;
  }

  if (type.startsWith("model/")) {
    return true;
  }

  if (type.startsWith("font/")) {
    return true;
  }

  if (type.startsWith("application/")) {
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
