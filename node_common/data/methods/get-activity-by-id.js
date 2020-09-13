import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "GET_ACTIVITY_BY_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*").from("activity").where({ id }).first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        query.type = "ACTIVITY";
        return JSON.parse(JSON.stringify(query));
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_ACTIVITY_BY_ID",
      };
    },
  });
};
