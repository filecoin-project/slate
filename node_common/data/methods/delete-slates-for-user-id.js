import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId }) => {
  return await runQuery({
    label: "DELETE_SLATES_FOR_USER_ID",
    queryFn: async (DB) => {
      const hasUser = (id) =>
        DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ ownerId: id })]);

      const slates = await DB.select("id")
        .from("slates")
        .where(hasUser(userId));

      if (!slates || slates.error) {
        return false;
      }

      let slateIds = slates.map((slate) => slate.id);

      const subscriptions = await DB.from("subscriptions")
        .whereIn("target_slate_id", slateIds)
        .del();

      const data = await DB.from("slates").where(hasUser(userId)).del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_SLATES_FOR_USER_ID",
      };
    },
  });
};
