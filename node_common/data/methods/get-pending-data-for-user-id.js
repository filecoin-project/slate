import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId }) => {
  return await runQuery({
    label: "GET_PENDING_DATA_BY_USER_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("pending")
        .where({ owner_user_id: userId });

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_PENDING_DATA_BY_USER_ID",
      });

      return [];
    },
  });
};
