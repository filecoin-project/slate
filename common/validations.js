import * as Strings from "~/common/strings";

const USERNAME_REGEX = new RegExp("^[a-zA-Z0-9_]{0,}[a-zA-Z]+[0-9]*$");
const MIN_PASSWORD_LENGTH = 8;

export const username = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (!USERNAME_REGEX.test(text)) {
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
