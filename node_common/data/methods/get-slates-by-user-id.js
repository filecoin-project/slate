import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId, publicOnly = false }) => {
  return await runQuery({
    label: "GET_SLATES_BY_USER_ID",
    queryFn: async (DB) => {
      const hasUser = (id) =>
        DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ ownerId: id })]);
      const isPublic = () =>
        DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ public: true })]);

      let query;
      if (publicOnly) {
        query = await DB.select("*")
          .from("slates")
          .where(hasUser(userId))
          .where(isPublic())
          .orderBy("updated_at", "desc");
      } else {
        query = await DB.select("*")
          .from("slates")
          .where(hasUser(userId))
          .orderBy("updated_at", "desc");
      }

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      console.log({
        error: true,
        decorator: "GET_SLATES_BY_USER_ID",
      });

      return [];
    },
  });
};
