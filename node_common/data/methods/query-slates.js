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

      return JSON.parse(JSON.stringify(r));
    },
    errorFn: async (e) => {
      return {
        error: "QUERY_SLATES",
        source: e,
      };
    },
  });
};
