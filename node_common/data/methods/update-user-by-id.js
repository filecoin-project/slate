import { runQuery } from "~/node_common/data/utilities";

export default async ({ id, data }) => {
  return await runQuery({
    label: "UPDATE_USER_BY_ID",
    queryFn: async (DB) => {
      const response = await DB.from("users")
        .where("id", id)
        .update({
          data: {
            ...data,
          },
        })
        .returning("*");

      const index = response ? response.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "UPDATE_USER",
        source: e,
      };
    },
  });
};
