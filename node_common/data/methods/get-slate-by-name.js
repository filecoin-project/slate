import { runQuery } from "~/node_common/data/utilities";

export default async ({ slatename, ownerId, username }) => {
  return await runQuery({
    label: "GET_SLATE_BY_NAME",
    queryFn: async (DB) => {
      let id = ownerId;
      if (username && !ownerId) {
        const user = await DB.select("*")
          .from("users")
          .where({ username })
          .first();

        if (!user || user.error) {
          return null;
        }

        id = user.id;
      }

      const query = await DB.select("*").from("slates").where({ slatename });

      if (!query || query.error) {
        return null;
      }

      let foundSlate;
      for (let slate of query) {
        if (slate.data.ownerId && slate.data.ownerId === id) {
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
