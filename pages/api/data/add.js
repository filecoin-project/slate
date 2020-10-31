import * as Upload from "~/node_common/upload";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as ViewerManager from "~/node_common/managers/viewer";

import { Buckets } from "@textile/hub";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);

  const user = await Data.getUserById({
    id,
  });

  if (!user || user.error) {
    return res.status(403).send({ decorator: "SERVER_ADD_TO_SLATE_USER_NOT_FOUND", error: true });
  }

  let { buckets, bucketKey, bucketRoot, bucketName } = await Utilities.getBucketAPIFromUserToken({
    user,
  });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_GET_BUCKET_DATA",
      error: true,
    });
  }

  if (!req.body.data.items) {
    return res.status(500).send({
      decorator: "SERVER_NO_CID",
      error: true,
    });
  }

  let userCIDs = user.data.library[0].children.map((file) => file.ipfs.replace("/ipfs/", ""));
  let newFiles = [];
  for (let item of req.body.data.items) {
    let cid = item.cid;
    if (userCIDs.includes(cid)) {
      continue;
    }
    let response = await Utilities.addExistingCIDToData({
      buckets,
      key: bucketKey,
      path: bucketRoot.path,
      cid,
    });

    if (response && !response.error) {
      let owner = await Data.getUserById({ id: item.ownerId });
      if (owner && !owner.error) {
        for (let file of owner.data.library[0].children) {
          if (file.cid === cid || file.ipfs === `/ipfs/${cid}`) {
            file.date = new Date();
            newFiles.push(file);
            break;
          }
        }
      }
    }
  }

  const { updatedUserDataFields, added, skipped } = LibraryManager.addData({
    user,
    files: newFiles,
  });
  await Data.updateUserById({
    id: user.id,
    data: updatedUserDataFields,
  });
  if (updatedUserDataFields && updatedUserDataFields.library) {
    ViewerManager.hydratePartialLibrary(updatedUserDataFields.library, id);
  }

  return res.status(200).send({
    decorator: "SERVER_ADD_EXISTING_CID_TO_DATA",
    data: { added, skipped: skipped + req.body.data.items.length - newFiles.length },
  });
};
