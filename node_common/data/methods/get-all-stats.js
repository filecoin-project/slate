import * as Serializers from "~/node_common/serializers";

import { runQuery } from "~/node_common/data/utilities";

export default async () => {
  return await runQuery({
    label: "GET_ALL_STATS",
    queryFn: async (DB) => {
      const r = await DB.select("*")
        .from("stats")
        .orderBy("created_at");

      if (!r || r.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(r));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_ALL_STATS",
      });

      return [];
    },
  });
};
