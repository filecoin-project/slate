import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId }) => {
  return await runQuery({
    label: "DELETE_API_KEYS_FOR_USER_ID",
    queryFn: async (DB) => {
      const data = await DB.from("keys").where({ owner_id: userId }).del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_API_KEYS_FOR_USER_ID",
      };
    },
  });
};
