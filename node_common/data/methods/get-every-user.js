import * as Serializers from "~/node_common/serializers";

import { runQuery } from "~/node_common/data/utilities";

export default async (sanitize = true) => {
  return await runQuery({
    label: "GET_EVERY_USER",
    queryFn: async (DB) => {
      const r = await DB.select("id", "username", "data").from("users");

      if (!r || r.error) {
        return [];
      }

      if (sanitize) {
        const sanitized = r.map((each) => Serializers.user(each));
        return JSON.parse(JSON.stringify(sanitized));
      }

      return JSON.parse(JSON.stringify(r));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_EVERY_USER",
      });

      return [];
    },
  });
};
