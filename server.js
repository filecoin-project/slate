import * as Environment from "~/node_common/environment";
import * as Constants from "./node_common/constants";
import * as Data from "~/node_common/data";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "./common/strings";

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

  if (Environment.IS_PRODUCTION) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));

  server.get("/application", async (req, res) => {
    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    return app.render(req, res, "/application", {
      viewer,
    });
  });

  server.get("/@:username", async (req, res) => {
    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    const creator = await Data.getUserByUsername({
      username: req.params.username,
    });

    if (!creator) {
      return res.redirect("/404");
    }

    if (creator.error) {
      return res.redirect("/404");
    }

    const slates = await Data.getSlatesByUserId({ userId: creator.id, publicOnly: true });

    return app.render(req, res, "/profile", {
      viewer,
      creator: {
        username: creator.username,
        data: { photo: creator.data.photo },
        slates: JSON.parse(JSON.stringify(slates)),
      },
    });
  });

  server.get("/@:username/:slatename", async (req, res) => {
    const slate = await Data.getSlateByName({
      slatename: req.params.slatename,
    });

    if (!slate) {
      return res.redirect("/404");
    }

    if (!slate.data.public) {
      // TODO(jim): Access denied page.
      return res.redirect("/403");
    }

    return app.render(req, res, "/slate", {
      slate: JSON.parse(JSON.stringify({ ...slate, ownername: req.params.username })),
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
