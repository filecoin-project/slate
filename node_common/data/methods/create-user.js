import { runQuery } from "~/node_common/data/utilities";

export default async ({ password, username, salt, data = {} }) => {
  return await runQuery({
    label: "CREATE_USER",
    queryFn: async (DB) => {
      const query = await DB.insert({
        password,
        salt,
        data,
        username,
      })
        .into("users")
        .returning("*");

      const index = query ? query.pop() : null;
      index.type = "USER";
      return index;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_USER",
      };
    },
  });
};
