import { runQuery } from "~/node_common/data/utilities";

export default async ({ username }) => {
  return await runQuery({
    label: "DELETE_USER_BY_USERNAME",
    queryFn: async (DB) => {
      const query = await DB.select("id")
        .from("users")
        .where({ username })
        .first();

      if (!query || query.error || !query.id) {
        return false;
      }

      const id = query.id;

      const deletedSubscriptions = await DB.from("subscriptions")
        .where({ owner_user_id: id })
        .orWhere({ target_user_id: id })
        .del();
      const deletedTrusted = await DB.from("trusted")
        .where({ owner_user_id: id })
        .orWhere({ target_user_id: id })
        .del();

      const data = await DB.from("users").where({ username }).del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_USER_BY_USERNAME",
      };
    },
  });
};
