import { runQuery } from "~/node_common/data/utilities";

export default async ({ query }) => {
  return await runQuery({
    label: "QUERY_USERS",
    queryFn: async (DB) => {
      const r = await DB.select("id", "username", "data")
        .from("users")
        .where("username", "like", `%${query}%`)
        .limit(24);

      if (!r || r.error) {
        return [];
      }

      // TODO(jim): Not a fan of this. Need something more secure.
      const sanitized = r.map((each) => {
        return {
          type: "USER",
          id: each.id,
          username: each.username,
          data: {
            name: each.data.name,
            photo: each.data.photo,
            body: each.data.body,
          },
        };
      });

      return JSON.parse(JSON.stringify(sanitized));
    },
    errorFn: async (e) => {
      return {
        error: "QUERY_USERS",
        source: e,
      };
    },
  });
};
