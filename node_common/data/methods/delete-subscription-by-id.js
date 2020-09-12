import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "DELETE_SUBSCRIPTION_BY_ID",
    queryFn: async (DB) => {
      const data = await DB.from("subscriptions").where({ id }).del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_SUBSCRIPTION_BY_ID",
      };
    },
  });
};
