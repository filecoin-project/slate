import * as Serializers from "~/node_common/serializers";

import { runQuery } from "~/node_common/data/utilities";

export default async () => {
  return await runQuery({
    label: "GET_EVERY_USER",
    queryFn: async (DB) => {
      const r = await DB.select("id", "username", "data").from("users");

      if (!r || r.error) {
        return [];
      }

      const sanitized = r.map((each) => Serializers.user(each));
      return JSON.parse(JSON.stringify(sanitized));
    },
    errorFn: async (e) => {
      console.log({
        error: "GET_EVERY_USER",
        source: e,
      });

      return [];
    },
  });
};
