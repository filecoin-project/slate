import * as Serializers from "~/node_common/serializers";

import { runQuery } from "~/node_common/data/utilities";

export default async (sanitize = true) => {
  return await runQuery({
    label: "GET_EVERY_SLATE",
    queryFn: async (DB) => {
      const r = await DB.select("id", "slatename", "data").from("slates");

      if (!r || r.error) {
        return [];
      }

      if (sanitize) {
        const sanitized = r
          .filter((each) => !each.data.public)
          .map((each) => Serializers.slate(each));
        return JSON.parse(JSON.stringify(sanitized));
      }

      return JSON.parse(JSON.stringify(r));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_EVERY_SLATE",
      });

      return [];
    },
  });
};
