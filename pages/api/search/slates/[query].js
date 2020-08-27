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
  const slates = await Data.querySlates({ query });

  if (req.body.data.deeplink) {
    if (slates.length) {
      const slate = { ...slates[0] };
      const user = await Data.getUserById({ id: slate.data.ownerId });

      // NOTE(jim): I need to make sure that serializing user data is more
      // straightforward, because there is sensitive data that comes back
      // from this query.
      slate.user = {
        username: user.username,
        id: user.id,
        data: {
          name: user.data.name,
          body: user.data.body,
          photo: user.data.photo,
        },
      };

      return res.status(200).send({
        decorator: "SERVER_FIND_CLOSEST_LINK",
        data: { slate },
      });
    }

    return res.status(500).send({
      decorator: "SERVER_FIND_CLOSEST_LINK_ERROR",
      error: true,
    });
  }

  let results = [...slates];

  return res.status(200).send({
    decorator: "SERVER_SEARCH_QUERY",
    data: { query, results },
  });
};
