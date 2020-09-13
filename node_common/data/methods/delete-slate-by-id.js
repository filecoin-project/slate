import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "DELETE_SLATE_BY_ID",
    queryFn: async (DB) => {
      const subscriptions = await DB.from("subscriptions")
        .where({ target_slate_id: id })
        .del();

      const data = await DB.from("slates").where({ id }).del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_SLATE_BY_ID",
      };
    },
  });
};
