import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerUserId, targetUserId }) => {
  return await runQuery({
    label: "CREATE_TRUSTED_RELATIONSHIP",
    queryFn: async (DB) => {
      const query = await DB.insert({
        owner_user_id: ownerUserId,
        target_user_id: targetUserId,
      })
        .into("trusted")
        .returning("*");

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_TRUSTED_RELATIONSHIP",
        source: e,
      };
    },
  });
};
