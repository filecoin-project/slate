import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const users = await Data.getEveryUser();
  const slates = await Data.getEverySlate();

  const { serializedSlates, userToSlatesMap } = await Serializers.doSlates({
    serializedUsers: users,
    slates,
  });

  for (let i = 0; i < users.length; i++) {
    users[i].slates = userToSlatesMap[users[i].id];
  }

  return res.status(200).send({
    decorator: "SERVER_DIRECTORY",
    data: { users, slates: serializedSlates },
  });
};
