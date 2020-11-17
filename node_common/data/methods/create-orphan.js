import { runQuery } from "~/node_common/data/utilities";

export default async ({ data }) => {
  return await runQuery({
    label: "CREATE_ORPHAN",
    queryFn: async (DB) => {
      const query = await DB.insert({
        created_at: new Date(),
        data,
      })
        .into("orphans")
        .returning("*");

      const index = query ? query.pop() : null;
      return JSON.parse(JSON.stringify(index));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_ORPHAN",
      };
    },
  });
};
