if (process.env.NODE_ENV !== "www") {
  require("dotenv").config();
}

import * as Strings from "./common/strings";
import * as Middleware from "./node_common/middleware";
import * as Utilities from "./node_common/utilities";
import * as Constants from "./node_common/constants";

import express from "express";
import next from "next";
import compression from "compression";

const production =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "www";
const productionWeb = process.env.NODE_ENV === "www";
const port = process.env.PORT || 1337;
const app = next({ dev: !production, dir: __dirname, quiet: false });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  if (productionWeb) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));

  server.get("/application", async (req, res) => {
    return app.render(req, res, "/application", {
      wsPort: null,
      production: productionWeb,
    });
  });

  server.get("/", async (req, res) => {
    return app.render(req, res, "/");
  });

  server.all("*", async (req, res) => {
    return handler(req, res, req.url);
  });

  server.listen(port, async (e) => {
    if (e) throw e;

    console.log(`[ slate ] client: http://localhost:${port}`);
  });
});
