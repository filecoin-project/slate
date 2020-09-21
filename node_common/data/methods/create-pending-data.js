import { runQuery } from "~/node_common/data/utilities";

export default async ({ data, owner_user_id }) => {
  return await runQuery({
    label: "CREATE_PENDING_DATA",
    queryFn: async (DB) => {
      const query = await DB.insert({
        data,
        owner_user_id,
      })
        .into("pending")
        .returning("*");

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_PENDING_DATA",
      };
    },
  });
};
