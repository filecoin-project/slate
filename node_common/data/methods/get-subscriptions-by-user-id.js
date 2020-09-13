import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId }) => {
  return await runQuery({
    label: "GET_SUBSCRIPTIONS_BY_USER_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("subscriptions")
        .where({ owner_user_id: userId });

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_SUBSCRIPTIONS_BY_USER_ID",
      });

      return [];
    },
  });
};
