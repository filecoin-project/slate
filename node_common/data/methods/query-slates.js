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
        .map((each) => {
          return {
            id: each.id,
            slatename: each.slatename,
            data: {
              name: each.data.name,
              body: each.data.body,
              objects: each.data.objects,
            },
            type: "SLATE",
          };
        });

      return JSON.parse(JSON.stringify(sanitized));
    },
    errorFn: async (e) => {
      return {
        error: "QUERY_SLATES",
        source: e,
      };
    },
  });
};
