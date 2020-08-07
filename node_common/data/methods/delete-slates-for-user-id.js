import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId }) => {
  return await runQuery({
    label: "DELETE_SLATES_FOR_USER_ID",
    queryFn: async (DB) => {
      const hasUser = (id) =>
        DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ ownerId: id })]);
      const data = await DB.select("*")
        .from("slates")
        .where(hasUser(userId))
        .del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: "DELETE_SLATES_FOR_USER_ID",
        source: e,
      };
    },
  });
};
