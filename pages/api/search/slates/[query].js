import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  if (Strings.isEmpty(req.query.query)) {
    return {
      decorator: "SERVER_SEARCH_NO_QUERY",
      data: { results: [] },
    };
  }

  const { query } = req.query;
  const slates = await Data.querySlates({ query });

  //NOTE(martina): this way of deeplinking no longer works now that slates can have same names (however it is currently unused so I've left it here)
  if (req.body.data.deeplink) {
    if (slates.length) {
      const slate = slates.filter((item) => item.slatename === query)[0];
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
