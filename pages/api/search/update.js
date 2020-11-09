import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";
import * as SearchManager from "~/node_common/managers/search";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  console.log(req.body);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_SEARCH_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_SEARCH_UPDATE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_SEARCH_UPDATE_USER_NOT_FOUND", error: true });
  }

  let action;
  if (req.body.data === "create-user") {
    action = "ADD";
  } else if (req.body.data === "delete-user") {
    action = "REMOVE";
  }
  if (action) {
    SearchManager.updateUser(user, action);
  }

  return res.status(200).send({ decorator: "SERVER_SEARCH_UPDATE", updated: true });
};
