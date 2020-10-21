import { runQuery } from "~/node_common/data/utilities";

export default async ({ cid, ownerId }) => {
  return await runQuery({
    label: "DELETE_SLATES_FOR_USER_ID", //chngae this
    queryFn: async (DB) => {
      const hasCid = (cid) =>
        DB.raw(`(?? -> ??) @> ?::jsonb`, [
          "data",
          "objects",
          JSON.stringify({ cid: cid }),
        ]);

      const slates = await DB.select("slatename")
        .from("slates")
        .where(hasCid(cid));

      console.log(slates);
      return true;

      //   if (!slates || slates.error) {
      //     return false;
      //   }

      //   let slateIds = slates.map((slate) => slate.id);

      //   const subscriptions = await DB.from("subscriptions")
      //     .whereIn("target_slate_id", slateIds)
      //     .del();

      //   const data = await DB.from("slates").where(hasUser(userId)).del();

      //   return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_SLATES_FOR_USER_ID", //chngae this
      };
    },
  });
};
