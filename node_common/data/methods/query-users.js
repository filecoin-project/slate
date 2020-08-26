import { runQuery } from "~/node_common/data/utilities";

export default async ({ query }) => {
  return await runQuery({
    label: "QUERY_USERS",
    queryFn: async (DB) => {
      const r = await DB.select("id", "username", "data")
        .from("users")
        .where("username", "like", `%${query}%`)
        .limit(24);

      if (!r || r.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(r));
    },
    errorFn: async (e) => {
      return {
        error: "QUERY_USERS",
        source: e,
      };
    },
  });
};
