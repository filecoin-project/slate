import { runQuery } from "~/node_common/data/utilities";

export default async ({ id, slatename, updated_at, data }) => {
  const updateObject = { data, updated_at };

  if (slatename) {
    updateObject.slatename = slatename;
  }

  return await runQuery({
    label: "UPDATE_SLATE_BY_ID",
    queryFn: async (DB) => {
      const response = await DB.from("slates")
        .where("id", id)
        .update(updateObject)
        .returning("*");

      const index = response ? response.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "UPDATE_SLATE_BY_ID",
      };
    },
  });
};
