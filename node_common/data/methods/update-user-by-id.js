import { runQuery } from "~/node_common/data/utilities";

export default async ({ id, data, username, salt, password }) => {
  const updateObject = {};

  if (data) {
    updateObject.data = data;
  }

  if (username) {
    updateObject.username = username.toLowerCase();
  }

  if (salt) {
    updateObject.salt = salt;
  }

  if (password) {
    updateObject.password = password;
  }

  return await runQuery({
    label: "UPDATE_USER_BY_ID",
    queryFn: async (DB) => {
      const response = await DB.from("users")
        .where("id", id)
        .update(updateObject)
        .returning("*");

      const index = response ? response.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "UPDATE_USER_BY_ID",
      };
    },
  });
};
