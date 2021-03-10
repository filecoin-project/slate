import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerId, cid, data = {} }) => {
  return await runQuery({
    label: "CREATE_FILE",
    queryFn: async (DB) => {
      const query = await DB.insert({
        ownerId,
        cid,
        data,
      })
        .into("files")
        .returning("*");

      const index = query ? query.pop() : null;
      index.type = "FILE";
      return index;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_FILE",
      };
    },
  });
};
