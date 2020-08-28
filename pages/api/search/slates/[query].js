import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";
import * as Strings from "~/common/strings";

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
  const slates = await Data.querySlates({ query });

  if (req.body.data.deeplink) {
    if (slates.length) {
      const slate = { ...slates[0] };
      const user = await Data.getUserById({ id: slate.data.ownerId });
      slate.user = Serializers.user(user);

      return res.status(200).send({
        decorator: "SERVER_DEEPLINK",
        data: { slate },
      });
    }

    return res.status(500).send({
      decorator: "SERVER_DEEPLINK_ERROR",
      error: true,
    });
  }

  let results = [...slates];

  return res.status(200).send({
    decorator: "SERVER_SEARCH_QUERY",
    data: { query, results },
  });
};
