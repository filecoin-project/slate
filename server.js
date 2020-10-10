import * as Environment from "~/node_common/environment";
import * as Validations from "~/common/validations";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";

import * as ViewerManager from "~/node_common/managers/viewer";
import * as AnalyticsManager from "~/node_common/managers/analytics";

import express from "express";
import next from "next";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";

const app = next({
  dev: !Environment.IS_PRODUCTION,
  dir: __dirname,
  quiet: false,
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.use(cors());
  server.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  server.use("/public", express.static("public"));
  server.get("/system", async (r, s) => s.redirect("/_/system"));
  server.get("/experiences", async (r, s) => s.redirect("/_/system"));
  server.get("/_/experiences", async (r, s) => s.redirect("/_/system"));
  server.get("/system/:c", async (r, s) =>
    s.redirect(`/_/system/${r.params.c}`)
  );

  server.get("/experiences/:m", async (r, s) =>
    s.redirect(`/_/experiences/${r.params.m}`)
  );

  server.all("/api/:a", async (r, s, next) => {
    return handler(r, s, r.url);
  });

  // NOTE(jim): Upload data
  server.post("/api/data/:b", async (req, res) => {
    // NOTE(jim): Let this request take as long as it needs to.
    req.setTimeout(0);

    return await handler(req, res, req.url);
  });

  // NOTE(jim): Upload data for deal
  server.post("/api/data/deal/:b", async (req, res) => {
    // NOTE(jim): Let this request take as long as it needs to.
    req.setTimeout(0);

    return await handler(req, res, req.url);
  });

  server.all("/api/:a/:b", async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.get("/", async (req, res) => {
    return app.render(req, res, "/", {});
  });

  server.get("/_", async (req, res) => {
    const isBucketsAvailable = await Utilities.checkTextile();

    if (!isBucketsAvailable) {
      return res.redirect("/maintenance");
    }

    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    let analytics = await AnalyticsManager.get();
    return app.render(req, res, "/_", {
      viewer,
      analytics,
    });
  });

  server.get("/_/integration-page", async (req, res) => {
    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    return app.render(req, res, "/_/integration-page", {
      viewer,
    });
  });

  server.all("/_/:a", async (r, s) => handler(r, s, r.url));
  server.all("/_/:a/:b", async (r, s) => handler(r, s, r.url));

  server.get("/:username", async (req, res) => {
    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(req.params.username)) {
      return handler(req, res, req.url);
    }

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

    const slates = await Data.getSlatesByUserId({
      userId: creator.id,
      publicOnly: true,
    });

    return app.render(req, res, "/_/profile", {
      viewer,
      creator: Serializers.user({ ...creator, slates }),
    });
  });

  server.get("/:username/:slatename", async (req, res) => {
    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(req.params.username)) {
      return handler(req, res, req.url);
    }

    const slate = await Data.getSlateByName({
      slatename: req.params.slatename,
      username: req.params.username,
    });

    if (!slate) {
      return res.redirect("/404");
    }

    if (slate.error) {
      return res.redirect("/404");
    }

    if (!slate.data.public) {
      return res.redirect("/403");
    }

    const creator = await Data.getUserById({ id: slate.data.ownerId });

    if (!creator) {
      return res.redirect("/404");
    }

    if (creator.error) {
      return res.redirect("/404");
    }

    if (req.params.username !== creator.username) {
      return res.redirect("/403");
    }

    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    return app.render(req, res, "/_/slate", {
      viewer,
      creator: Serializers.user(creator),
      slate,
    });
  });

  server.get("/:username/:slatename/cid::cid", async (req, res) => {
    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(req.params.username)) {
      return handler(req, res, req.url);
    }

    const slate = await Data.getSlateByName({
      slatename: req.params.slatename,
      username: req.params.username,
    });

    if (!slate) {
      return res.redirect("/404");
    }

    if (slate.error) {
      return res.redirect("/404");
    }

    if (!slate.data.public) {
      return res.redirect("/403");
    }

    const creator = await Data.getUserById({ id: slate.data.ownerId });

    if (!creator) {
      return res.redirect("/404");
    }

    if (creator.error) {
      return res.redirect("/404");
    }

    if (req.params.username !== creator.username) {
      return res.redirect("/403");
    }

    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    return app.render(req, res, "/_/slate", {
      viewer,
      creator: Serializers.user(creator),
      slate,
      cid: req.params.cid,
    });
  });

  server.all("*", async (r, s) => handler(r, s, r.url));

  const listenServer = server.listen(Environment.PORT, (e) => {
    if (e) throw e;

    console.log(`[ slate ] client: http://localhost:${Environment.PORT}`);
  });

  // NOTE(jim): Node 14 quirk where you have to set this 0, you can't actually
  //            Have a long timeout, If you set it to 0 you just disable it.
  listenServer.headersTimeout = 0;
});
