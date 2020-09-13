import { runQuery } from "~/node_common/data/utilities";

export default async ({ slateId }) => {
  return await runQuery({
    label: "GET_ACTIVITY_FOR_SLATE_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("activity")
        .where({ owner_slate_id: slateId });

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_ACTIVITY_FOR_SLATE_ID",
      });

      return [];
    },
  });
};
