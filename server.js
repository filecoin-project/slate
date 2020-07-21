import * as Environment from "~/node_common/environment";
import * as Strings from "./common/strings";
import * as Constants from "./node_common/constants";
import * as Models from "./node_common/models";

import express from "express";
import next from "next";
import compression from "compression";
import JWT from "jsonwebtoken";

const port = process.env.PORT || 1337;
const app = next({
  dev: !Environment.IS_PRODUCTION,
  dir: __dirname,
  quiet: false,
});
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  if (Environment.IS_PRODUCTION_WEB) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));

  server.get("/application", async (req, res) => {
    let viewer = null;

    if (!Strings.isEmpty(req.headers.cookie)) {
      const token = req.headers.cookie.replace(
        /(?:(?:^|.*;\s*)WEB_SERVICE_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (!Strings.isEmpty(token)) {
        try {
          const decoded = JWT.verify(token, Environment.JWT_SECRET);

          if (decoded.username) {
            viewer = await Models.getViewer({ username: decoded.username });
          }
        } catch (e) {}
      }
    }

    return app.render(req, res, "/application", {
      wsPort: null,
      production: Environment.IS_PRODUCTION_WEB,
      viewer,
    });
  });

  server.all("*", async (req, res) => {
    return handler(req, res, req.url);
  });

  server.listen(port, async (e) => {
    if (e) throw e;

    console.log(`[ slate ] client: http://localhost:${port}`);
  });
});
