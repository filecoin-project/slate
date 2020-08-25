import { runQuery } from "~/node_common/data/utilities";

export default async ({ slatename }) => {
  return await runQuery({
    label: "GET_SLATE_BY_NAME",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("slates")
        .where({ slatename })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return JSON.parse(JSON.stringify(query));
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: "GET_SLATE_BY_NAME",
        source: e,
      };
    },
  });
};
