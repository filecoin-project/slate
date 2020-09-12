import { runQuery } from "~/node_common/data/utilities";

export default async ({ id, data }) => {
  return await runQuery({
    label: "UPDATE_TRUSTED_RELATIONSHIP_BY_ID",
    queryFn: async (DB) => {
      const response = await DB.from("trusted")
        .where("id", id)
        .update({ data })
        .returning("*");

      const index = response ? response.pop() : null;
      return JSON.parse(JSON.stringify(index));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "UPDATE_TRUSTED_RELATIONSHIP_BY_ID",
      };
    },
  });
};
