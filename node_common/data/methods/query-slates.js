import * as Serializers from "~/node_common/serializers";

import { runQuery } from "~/node_common/data/utilities";

export default async ({ query }) => {
  return await runQuery({
    label: "QUERY_SLATES",
    queryFn: async (DB) => {
      const r = await DB.select("id", "slatename", "data")
        .from("slates")
        .where("slatename", "like", `%${query}%`)
        .limit(24);

      if (!r || r.error) {
        return [];
      }

      const sanitized = r
        .filter((each) => each.data.public)
        .map((each) => Serializers.slate(each));
      return JSON.parse(JSON.stringify(sanitized));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "QUERY_SLATES",
      });

      return [];
    },
  });
};
