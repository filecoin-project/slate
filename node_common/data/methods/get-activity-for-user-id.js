import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId, earliestTimestamp, latestTimestamp }) => {
  return await runQuery({
    label: "GET_ACTIVITY_FOR_USER_ID",
    queryFn: async (DB) => {
      let query;
      if (earliestTimestamp) {
        //NOTE(martina): for pagination, fetching the "next 100" results
        let date = new Date(earliestTimestamp);
        let s = date.getSeconds();
        if (s < 0) {
          s = 60 + s;
        }
        date.setSeconds(s - 1);
        query = await DB.select("*")
          .from("activity")
          .where({ owner_user_id: userId })
          .where("created_at", "<", date.toISOString())
          .orderBy("created_at", "desc")
          .limit(100);
      } else if (latestTimestamp) {
        //NOTE(martina): for fetching new updates since the last time they loaded
        let date = new Date(latestTimestamp);
        date.setSeconds(date.getSeconds() + 1);
        query = await DB.select("*")
          .from("activity")
          .where({ owner_user_id: userId })
          .where("created_at", ">", date.toISOString())
          .orderBy("created_at", "desc")
          .limit(100);
      } else {
        //NOTE(martina): for the first fetch they make, when they have not loaded any explore events yet
        query = await DB.select("*")
          .from("activity")
          .where({ owner_user_id: userId })
          .orderBy("created_at", "desc")
          .limit(100);
      }

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_ACTIVITY_FOR_USER_ID",
      });

      return [];
    },
  });
};
