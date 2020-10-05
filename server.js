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

const app = next({
  dev: !Environment.IS_PRODUCTION,
  dir: __dirname,
  quiet: false,
});

const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.use(cors());

  if (Environment.IS_PRODUCTION) {
    server.use(compression());
  }

  server.keepAliveTimeout = 440 * 1000;
  server.headersTimeout = 450 * 1000;

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
  server.all("/api/:a", async (r, s) => handler(r, s, r.url));
  server.all("/api/:a/:b", async (r, s) => handler(r, s, r.url));

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

  server.listen(Environment.PORT, async (e) => {
    if (e) throw e;

    console.log(`[ slate ] client: http://localhost:${Environment.PORT}`);
  });
});
