import { runQuery } from "~/node_common/data/utilities";

export default async ({ slatename, data = {} }) => {
  return await runQuery({
    label: "CREATE_SLATE",
    queryFn: async (DB) => {
      const query = await DB.insert({
        slatename,
        data,
      })
        .into("slates")
        .returning("*");

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_SLATE",
        source: e,
      };
    },
  });
};
