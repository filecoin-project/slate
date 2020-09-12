import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerUserId, targetUserId }) => {
  return await runQuery({
    label: "GET_TRUSTED_RELATIONSHIP_BY_IDS",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("trusted")
        .where({ owner_user_id: ownerUserId, target_user_id: targetUserId })
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
        decorator: "GET_TRUSTED_RELATIONSHIP_BY_IDS",
      };
    },
  });
};
