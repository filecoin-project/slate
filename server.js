import * as Environment from "~/node_common/environment";
import * as Strings from "./common/strings";
import * as Constants from "./node_common/constants";
import * as Data from "~/node_common/data";
import * as Models from "~/node_common/models";
import * as Utilities from "~/node_common/utilities";

import express from "express";
import next from "next";
import compression from "compression";
import JWT from "jsonwebtoken";

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
    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await Models.getViewer({
        id,
      });
    }

    return app.render(req, res, "/application", {
      wsPort: null,
      production: Environment.IS_PRODUCTION_WEB,
      viewer,
    });
  });

  server.get("/@:username", async (req, res) => {
    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await Models.getViewer({
        id,
      });
    }

    const creator = await Data.getUserByUsername({
      username: req.params.username,
    });

    return app.render(req, res, "/profile", {
      viewer,
      creator: {
        username: creator.username,
        data: { photo: creator.data.photo },
      },
    });
  });

  server.all("*", async (req, res) => {
    return handler(req, res, req.url);
  });

  server.listen(Environment.PORT, async (e) => {
    if (e) throw e;

    console.log(`[ slate ] client: http://localhost:${Environment.PORT}`);
  });
});
