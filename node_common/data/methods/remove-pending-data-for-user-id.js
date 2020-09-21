import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";

import { runQuery } from "~/node_common/data/utilities";

export default async ({ owner_user_id }) => {
  return await runQuery({
    label: "REMOVE_PENDING_DATA_FOR_USER",
    queryFn: async (DB) => {
      const user = await Data.getUserById({
        id: owner_user_id,
      });
      const pending = await DB.from("pending")
        .where({ owner_user_id })
        .returning("*")
        .del();
      let cids = [];
      let noRepeats = [];
      for (let entry of pending) {
        if (cids.includes(entry.data.ipfs)) continue;
        cids.push(entry.data.ipfs);
        noRepeats.push(entry.data);
      }

      const { updatedUserDataFields, added, skipped } = LibraryManager.addData({
        user,
        files: noRepeats,
      });

      await Data.updateUserById({
        id: user.id,
        data: updatedUserDataFields,
      });

      return { added, skipped };
    },
    errorFn: async (e) => {
      return {
        decorator: "REMOVE_PENDING_DATA_FOR_USER",
        error: true,
      };
    },
  });
};
