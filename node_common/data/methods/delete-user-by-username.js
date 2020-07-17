import { runQuery } from "~/node_common/data/utilities";

export default async ({ username }) => {
  return await runQuery({
    label: "DELETE_USER_BY_USERNAME",
    queryFn: async (DB) => {
      const data = await DB.from("users")
        .where({ username })
        .del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: "DELETE_USER_BY_USERNAME",
        source: e,
      };
    },
  });
};
