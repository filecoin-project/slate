import { runQuery } from "~/node_common/data/utilities";

export default async ({ cid, ownerId }) => {
  return await runQuery({
    label: "DELETE_SLATES_FOR_USER_ID", //change this
    queryFn: async (DB) => {
      const hasCid = (cidValue) =>
        DB.raw(`(?? -> ??) @> ?::jsonb`, ["data", "objects", JSON.stringify({ cid: cidValue })]);
      //NOTE(martina): this is WIP. Do not use yet
      const slates = await DB.select("*").from("slates").where(hasCid(cid));

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
