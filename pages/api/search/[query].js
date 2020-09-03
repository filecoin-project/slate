import * as MW from "~/node_common/middleware";
import * as Strings from "~/common/strings";
import * as Data from "~/node_common/data";

export default async (req, res) => {
  if (Strings.isEmpty(req.query.query)) {
    return {
      decorator: "SERVER_SEARCH_NO_QUERY",
      data: { results: [] },
    };
  }

  const { query } = req.query;
  const users = await Data.queryUsers({ query });
  const slates = await Data.querySlates({ query });

  let results = [...users, ...slates];

  return res.status(200).send({
    decorator: "SERVER_SEARCH_QUERY",
    data: { query, results },
  });
};
