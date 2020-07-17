import { runQuery } from "~/node_common/data/utilities";

export default async ({ email, password, username, salt, data = {} }) => {
  return await runQuery({
    label: "CREATE_USER",
    queryFn: async (DB) => {
      const query = await DB.insert({
        email,
        password,
        salt,
        data,
        username,
      })
        .into("users")
        .returning("*");

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_USER",
        source: e,
      };
    },
  });
};
