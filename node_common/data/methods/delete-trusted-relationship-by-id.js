import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "DELETE_TRUSTED_RELATIONSHIP_BY_ID",
    queryFn: async (DB) => {
      const data = await DB.from("trusted")
        .where({ id })
        .del();

      return 1 === data;
    },
    errorFn: async (e) => {
      return {
        error: "DELETE_TRUSTED_RELATIONSHIP_BY_ID",
        source: e,
      };
    },
  });
};
