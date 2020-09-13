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
        return JSON.parse(JSON.stringify(query));
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_USER_BY_USERNAME",
      };
    },
  });
};
