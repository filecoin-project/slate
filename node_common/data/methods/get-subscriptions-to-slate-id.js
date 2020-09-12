import { runQuery } from "~/node_common/data/utilities";

export default async ({ slateId }) => {
  return await runQuery({
    label: "GET_SUBSCRIPTIONS_TO_SLATE_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("subscriptions")
        .where({ target_slate_id: slateId });

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_SUBSCRIPTIONS_TO_SLATE_ID",
      });

      return [];
    },
  });
};
