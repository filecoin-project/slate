import { runQuery } from "~/node_common/data/utilities";

export default async ({ ids }) => {
  return await runQuery({
    label: "GET_SLATES_BY_IDS",
    queryFn: async (DB) => {
      const query = await DB.select("*").from("slates").whereIn("id", ids);
      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_SLATES_BY_IDS",
      };
    },
  });
};
