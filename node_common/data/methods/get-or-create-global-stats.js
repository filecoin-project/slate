import { runQuery } from "~/node_common/data/utilities";

export default async (date, generateDataFn) => {
  return await runQuery({
    label: "GET_OR_CREATE_GLOBAL_STATS",
    queryFn: async (DB) => {
      date.setHours(0, 0, 0, 0);

      let end = new Date();
      end.setHours(23, 59, 59, 999);

      const query = await DB.select("*")
        .from("global")
        .where("created_at", ">=", date)
        .where("created_at", "<", end)
        .first();

      if (query && query.id) {
        return query;
      }

      const insert = await DB.insert({
        created_at: date,
        data: await generateDataFn(),
      })
        .into("global")
        .returning("*");

      const index = insert ? insert.pop() : null;

      if (!index) {
        return null;
      }

      return JSON.parse(JSON.stringify(index));
    },
    errorFn: async (e) => {
      console.log(e);
      return {
        error: true,
        decorator: "GET_OR_CREATE_GLOBAL_STATS",
      };
    },
  });
};
