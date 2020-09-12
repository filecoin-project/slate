import { runQuery } from "~/node_common/data/utilities";

export default async ({ subscriberUserId, slateId, userId }) => {
  const whereQuery = { owner_user_id: subscriberUserId };

  if (slateId) {
    whereQuery.target_slate_id = slateId;
  }

  if (userId) {
    whereQuery.target_user_id = userId;
  }

  return await runQuery({
    label: "GET_SUBSCRIPTION_BY_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("subscriptions")
        .where(whereQuery)
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
        decorator: "GET_SUBSCRIPTION_BY_ID",
      };
    },
  });
};
