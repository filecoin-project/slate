import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Social from "~/node_common/social";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";

const SLATE_LIMIT = 50;

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_FIND_USER_CREATE_SLATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).json({
      decorator: "SERVER_FIND_USER_CREATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).json({
      decorator: "SERVER_FIND_USER_CREATE_SLATE_USER_NOT_FOUND",
      error: true,
    });
  }

  const slatename = Strings.createSlug(req.body.data.name);

  const found = await Data.getSlateByName({
    slatename,
    ownerId: user.id,
  });

  if (found) {
    return res.status(500).send({ decorator: "SERVER_EXISTING_SLATE", error: true });
  }

  let slates = await Data.getSlatesByUserId({ userId: id });
  if (slates.length >= SLATE_LIMIT) {
    return res.status(500).send({ decorator: "SERVER_SLATE_LIMIT", error: true });
  }

  const slate = await Data.createSlate({
    slatename: Strings.createSlug(req.body.data.name),
    data: {
      public: req.body.data.public,
      ownerId: id,
      name: req.body.data.name,
      body: req.body.data.body,
      objects: [],
    },
  });

  if (!slate) {
    return res.status(500).send({ decorator: "SERVER_CREATE_SLATE", error: true });
  }

  if (slate.error) {
    return res.status(500).send({ decorator: "SERVER_CREATE_SLATE", error: true });
  }

  slates = await Data.getSlatesByUserId({ userId: id });
  if (slates) {
    ViewerManager.hydratePartialSlates(slates, id);
  }

  if (slate.data.public) {
    SearchManager.updateSlate(slate, "ADD");
  }

  const userProfileURL = `https://slate.host/${user.username}`;
  const userURL = `<${userProfileURL}|${user.username}>`;
  Social.sendSlackMessage(
    `*${userURL}* created a slate: https://slate.host/${user.username}/${slate.slatename}`
  );

  return res.status(200).send({ decorator: "SERVER_CREATE_SLATE", slate });
};
