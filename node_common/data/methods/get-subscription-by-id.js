import { runQuery } from "~/node_common/data/utilities";

export default async ({ subscriberUserId, slateId, userId }) => {
  return await runQuery({
    label: "GET_SUBSCRIPTION_BY_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("subscriptions")
        .where({
          owner_user_id: subscriberUserId,
          target_slate_id: slateId,
          target_user_id: userId,
        })
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
        error: "GET_SUBSCRIPTION_BY_ID",
        source: e,
      };
    },
  });
};
