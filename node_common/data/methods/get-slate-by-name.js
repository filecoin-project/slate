import { runQuery } from "~/node_common/data/utilities";

export default async ({ slatename, ownerId }) => {
  return await runQuery({
    label: "GET_SLATE_BY_NAME",
    queryFn: async (DB) => {
      const query = await DB.select("*").from("slates").where({ slatename });

      if (!query || query.error) {
        return null;
      }

      let foundSlate;
      for (let slate of query) {
        if (slate.data.ownerId && slate.data.ownerId === ownerId) {
          foundSlate = slate;
        }
      }

      if (foundSlate && foundSlate.id) {
        return JSON.parse(JSON.stringify(foundSlate));
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_SLATE_BY_NAME",
      };
    },
  });
};
