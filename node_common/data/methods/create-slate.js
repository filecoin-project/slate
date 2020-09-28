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
      index.type = "SLATE";
      return index;
    },
    errorFn: async (e) => {
      console.log(e);
      return {
        error: true,
        decorator: "CREATE_SLATE",
      };
    },
  });
};
