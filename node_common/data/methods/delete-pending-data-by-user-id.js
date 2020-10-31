import * as Data from "~/node_common/data";

import { runQuery } from "~/node_common/data/utilities";

export default async ({ owner_user_id }) => {
  return await runQuery({
    label: "REMOVE_PENDING_DATA_FOR_USER",
    queryFn: async (DB) => {
      const pending = await DB.from("pending").where({ owner_user_id }).returning("*").del();

      return pending;
    },
    errorFn: async (e) => {
      return {
        decorator: "REMOVE_PENDING_DATA_FOR_USER",
        error: true,
      };
    },
  });
};
