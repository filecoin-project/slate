import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

export default async (req, res) => {
  const users = await Data.getEveryUser(false);
  for (let user of users) {
    if (
      user.data &&
      user.data.library &&
      user.data.library.length &&
      user.data.library[0].children
    ) {
      let library = user.data.library[0].children;
      for (let file of library) {
        delete file.icon;
        if (!file.ipfs) {
          if (file.cid) {
            //do nothing
          }
        } else if (file.ipfs.includes("/ipfs/")) {
          file.cid = Strings.getCIDFromIPFS(file.ipfs);
        } else {
          file.cid = file.ipfs;
        }
        if (file.file) {
          file.name = file.file;
        }
        delete file.error;
        delete file.ipfs;
        if (file.ipfs || !file.cid || file.icon) {
          console.log("FAILED! error: missing cid or has ipfs or has icon");
          console.log(file);
        }
      }
      // console.log(user.data.library[0].children);
      let response = Data.updateUserById({ id: user.id, data: user.data });
      if (!response || response.error) {
        console.log(`UPDATE FAILED for user with id ${user.id}`);
      }

      //NOTE(martina): uncomment to test
      // for (let file of user.data.library[0].children) {
      //   if (file.ipfs || !file.cid || file.icon) {
      //     console.log("FAILED! error: missing cid or has ipfs or has icon");
      //     console.log(file);
      //   }
      // }
    }
  }
  console.log("finished updating");
  return res.status(200).send({ decorator: "SERVER_CLEAN_USER", data: true });
};
