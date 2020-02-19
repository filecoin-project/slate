import * as Strings from '~/common/strings';

// TODO(jim): Refactor this Regex so you can bind the string.
export const getToken = req => {
  if (Strings.isEmpty(req.headers.cookie)) {
    return null;
  }

  return req.headers.cookie.replace(
    /(?:(?:^|.*;\s*)WEB_SERVICE_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

export const parseAuthHeader = value => {
  if (typeof value !== 'string') {
    return null;
  }

  var matches = value.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};
