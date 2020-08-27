import * as MW from "~/node_common/middleware";
import * as Strings from "~/common/strings";
import * as Data from "~/node_common/data";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const users = await Data.getEveryUser();
  const slates = await Data.getEverySlate();

  return res.status(200).send({
    decorator: "SERVER_DIRECTORY",
    data: { users, slates },
  });
};
