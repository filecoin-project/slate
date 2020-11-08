import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as ViewerManager from "~/node_common/managers/viewer";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);

  if (!id) {
    return res.status(500).send({ decorator: "PROCESS_PENDING_ERROR", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "PROCESS_PENDING_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "PROCESS_PENDING_USER_NOT_FOUND",
      error: true,
    });
  }

  const pending = await Data.deletePendingDataByUserId({ owner_user_id: id });

  if (!pending) {
    return res.status(404).send({ decorator: "PROCESS_PENDING_ERROR", error: true });
  }

  if (pending.error) {
    return res.status(500).send({ decorator: response.decorator, error: response.error });
  }

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
    id,
    data: updatedUserDataFields,
  });

  if (added && updatedUserDataFields && updatedUserDataFields.library) {
    ViewerManager.hydratePartialLibrary(updatedUserDataFields.library, id);
  }

  return res.status(200).send({
    decorator: "PROCESS_PENDING_DATA",
    data: { added, skipped: skipped + pending.length - noRepeats.length },
  });
};
