import { runQuery } from "~/node_common/data/utilities";

export default async ({ key }) => {
  return await runQuery({
    label: "GET_API_KEY_BY_KEY",
    queryFn: async (DB) => {
      const query = await DB.select("*").from("keys").where({ key }).first();

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
        decorator: "GET_API_KEY_BY_KEY",
      };
    },
  });
};
