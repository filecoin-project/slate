import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId }) => {
  return await runQuery({
    label: "GET_PENDING_TRUSTED_RELATIONSHIPS_BY_USER_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("trusted")
        .where({ target_user_id: userId });

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        error: "GET_PENDING_TRUSTED_RELATIONSHIPS_BY_USER_ID",
        source: e,
      };
    },
  });
};
