import { runQuery } from "~/node_common/data/utilities";

export default async ({ slateId, userId, data }) => {
  return await runQuery({
    label: "CREATE_ACTIVITY",
    queryFn: async (DB) => {
      const query = await DB.insert({
        owner_slate_id: slateId,
        owner_user_id: userId,
        data,
      })
        .into("activity")
        .returning("*");

      const index = query ? query.pop() : null;
      index.type = "ACTIVITY";
      return JSON.parse(JSON.stringify(index));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_ACTIVITY",
      };
    },
  });
};
