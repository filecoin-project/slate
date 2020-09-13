import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerUserId, targetUserId }) => {
  return await runQuery({
    label: "CREATE_TRUSTED_RELATIONSHIP",
    queryFn: async (DB) => {
      const query = await DB.insert({
        owner_user_id: ownerUserId,
        target_user_id: targetUserId,
        data: { verified: false },
      })
        .into("trusted")
        .returning("*");

      const index = query ? query.pop() : null;
      index.type = "TRUSTED_RELATIONSHIP";
      return JSON.parse(JSON.stringify(index));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_TRUSTED_RELATIONSHIP",
      };
    },
  });
};
