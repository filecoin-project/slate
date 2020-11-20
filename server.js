import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as AnalyticsManager from "~/node_common/managers/analytics";
import * as Websocket from "~/node_common/nodejs-websocket";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as Strings from "~/common/strings";

import ApiV1GetSlateObjects from "~/pages/api/v1/get-slate-objects";

import limit from "express-rate-limit";
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

const createLimiter = limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    decorator: "SIGN_UP_RATE_LIMITED",
    error: true,
    message: "You have made too many requests.",
  },
});

const loginLimiter = limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    decorator: "SIGN_IN_RATE_LIMITED",
    error: true,
    message: "You have made too many requests.",
  },
});

const handler = app.getRequestHandler();

const EXTERNAL_RESOURCES = {
  storageDealUpload: Strings.isEmpty(Environment.RESOURCE_URI_STORAGE_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  upload: Strings.isEmpty(Environment.RESOURCE_URI_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  uploadZip: Strings.isEmpty(Environment.RESOURCE_URI_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  pubsub: Strings.isEmpty(Environment.RESOURCE_URI_PUBSUB) ? null : Environment.RESOURCE_URI_PUBSUB,
  search: Strings.isEmpty(Environment.RESOURCE_URI_SEARCH) ? null : Environment.RESOURCE_URI_SEARCH,
};

app.prepare().then(async () => {
  const server = express();

  server.use(cors());
  server.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

  if (Environment.IS_PRODUCTION) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));
  server.get("/system", async (r, s) => s.redirect("/_/system"));
  server.get("/experiences", async (r, s) => s.redirect("/_/system"));
  server.get("/_/experiences", async (r, s) => s.redirect("/_/system"));
  server.get("/system/:c", async (r, s) => s.redirect(`/_/system/${r.params.c}`));
  server.get("/experiences/:m", async (r, s) => s.redirect(`/_/experiences/${r.params.m}`));

  // NOTE(jim): Example of simple query to query slates by CID.
  server.get("/api/v1/cid::cid", async (r, s) => {
    return await ApiV1GetSlateObjects(r, s);
  });

  server.all("/api/users/create", createLimiter, async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.all("/api/sign-in", loginLimiter, async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.all("/api/:a", async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.all("/api/:a/:b", async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.get("/", async (req, res) => {
    return app.render(req, res, "/", {});
  });

  server.get("/_", async (req, res) => {
    let mobile = Window.isMobileBrowser(req.headers["user-agent"]);

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
      mobile,
      resources: EXTERNAL_RESOURCES,
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

  server.get("/[$]/:id", async (req, res) => {
    let mobile = Window.isMobileBrowser(req.headers["user-agent"]);

    const slate = await Data.getSlateById({
      id: req.params.id,
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
      mobile,
      resources: EXTERNAL_RESOURCES,
    });
  });

  server.get("/:username", async (req, res) => {
    let mobile = Window.isMobileBrowser(req.headers["user-agent"]);

    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(req.params.username)) {
      return handler(req, res, req.url, {
        mobile,
        resources: EXTERNAL_RESOURCES,
      });
    }

    const id = Utilities.getIdFromCookie(req);
    const shouldViewerRedirect = await ViewerManager.shouldRedirect({ id });
    if (shouldViewerRedirect) {
      return res.redirect(
        `/_${Strings.createQueryParams({
          scene: "V1_NAVIGATION_PROFILE",
          user: req.params.username,
        })}`
      );
    }

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

    const exploreSlates;

    if (process.env.NODE_ENV !== "production") {
      exploreSlates = await Data.getSlatesByIds("id", [
        //NOTE(tara): slates in localhost for testing
        "857ad84d-7eff-4861-a988-65c84b62fc23",
        "81fa0b39-0e96-4c7f-8587-38468bb67cb3",
        "c4e8dad7-4ba0-4f25-a92a-c73ef5522d29",
        "df05cb1f-2ecf-4872-b111-c4b8493d08f8",
        "435035e6-dee4-4bbf-9521-64c219a527e7",
        "ac907aa3-2fb2-46fd-8eba-ec8ceb87b5eb",
      ]);
    }

    const exploreSlates = await Data.getSlatesByIds("id", [
      //NOTE(tara): slates in prod
      "d2861ac4-fc41-4c07-8f21-d0bf06be364c",
      "9c2c458c-d92a-4e81-a4b6-bf6ab4607470",
      "7f461144-0647-43d7-8294-788b37ae5979",
      "f72c2594-b8ac-41f6-91e0-b2da6788ae23",
      "a0d6e2f2-564d-47ed-bf56-13c42634703d",
      "0ba92c73-92e7-4b00-900e-afae4856c9ea",
    ]);

    return app.render(req, res, "/_/profile", {
      viewer,
      creator: Serializers.user({ ...creator, slates }),
      mobile,
      resources: EXTERNAL_RESOURCES,
      exploreSlates,
    });
  });

  server.get("/:username/:slatename", async (req, res) => {
    let mobile = Window.isMobileBrowser(req.headers["user-agent"]);

    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(req.params.username)) {
      return handler(req, res, req.url, {
        mobile,
        resources: EXTERNAL_RESOURCES,
      });
    }

    const id = Utilities.getIdFromCookie(req);
    const shouldViewerRedirect = await ViewerManager.shouldRedirect({ id });
    if (shouldViewerRedirect) {
      return res.redirect(
        `/_${Strings.createQueryParams({
          scene: "V1_NAVIGATION_SLATE",
          user: req.params.username,
          slate: req.params.slatename,
        })}`
      );
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
      mobile,
      resources: EXTERNAL_RESOURCES,
    });
  });

  server.get("/:username/:slatename/cid::cid", async (req, res) => {
    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(req.params.username)) {
      return handler(req, res, req.url);
    }

    const id = Utilities.getIdFromCookie(req);

    const shouldViewerRedirect = await ViewerManager.shouldRedirect({ id });
    if (shouldViewerRedirect) {
      return res.redirect(
        `/_${Strings.createQueryParams({
          scene: "V1_NAVIGATION_SLATE",
          user: req.params.username,
          slate: req.params.slatename,
          cid: req.params.cid,
        })}`
      );
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
});
