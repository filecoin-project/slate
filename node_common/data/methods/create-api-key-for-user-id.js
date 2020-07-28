import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId, key, level = 1 }) => {
  return await runQuery({
    label: "CREATE_API_KEY_FOR_USER_ID",
    queryFn: async (DB) => {
      const query = await DB.insert({
        owner_id: userId,
        level,
        key,
      })
        .into("keys")
        .returning("*");

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_API_KEY_FOR_USER_ID",
        source: e,
      };
    },
  });
};
