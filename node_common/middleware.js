import JWT from "jsonwebtoken";

import * as Environment from "~/node_common/environment";
import * as Credentials from "~/common/credentials";
import * as Strings from "~/common/strings";
import * as Data from "~/node_common/data";

export const init = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export const CORS = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
};

export const RequireCookieAuthentication = async (req, res, next) => {
  if (Strings.isEmpty(req.headers.cookie)) {
    return res
      .status(403)
      .json({ decorator: "SERVER_AUTH_USER_NO_TOKEN", error: true });
  }

  const token = req.headers.cookie.replace(
    /(?:(?:^|.*;\s*)WEB_SERVICE_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  try {
    const decoded = JWT.verify(token, Environment.JWT_SECRET);
    const user = await Data.getUserById({
      id: decoded.id,
    });

    if (!user || user.error) {
      return res
        .status(403)
        .json({ decorator: "SERVER_AUTH_USER_NOT_FOUND", error: true });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ decorator: "SERVER_AUTH_USER_ERROR", error: true });
  }

  next();
};
