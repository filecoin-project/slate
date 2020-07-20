import { runQuery } from "~/node_common/data/utilities";

export default async ({ username }) => {
  return await runQuery({
    label: "GET_USER_BY_USERNAME",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("users")
        .where({ username })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: "GET_USER_BY_USERNAME",
        source: e,
      };
    },
  });
};
