import * as MW from "~/node_common/middleware";
import * as Strings from "~/common/strings";
import * as Data from "~/node_common/data";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  if (Strings.isEmpty(req.query.query)) {
    return {
      decorator: "SERVER_SEARCH_NO_QUERY",
      data: { results: [] },
    };
  }

  const { query } = req.query;
  const users = await Data.queryUsers({ query });
  const slates = await Data.querySlates({ query });

  console.log(users);
  console.log(slates);

  let results = [...users, ...slates];

  return res.status(200).send({
    decorator: "SERVER_SEARCH_QUERY",
    data: { query, results },
  });
};
