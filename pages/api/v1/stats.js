import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

export default async (req, res) => {
  const users = await Data.getEveryUser(false);
  const slates = await Data.getEverySlate(false);
  const activity = await Data.getAllActivity();

  let userCount = 0;
  let slateCount = 0;
  let slateObjectCount = 0;
  let bytes = 0;
  let userMap = {};
  let slateMap = {};

  users.forEach((user) => {
    userCount = userCount + 1;

    let userBytes = 0;
    user.data.library[0].children.forEach((each) => {
      userBytes = each.size + userBytes;
      bytes = each.size + bytes;
    });

    userMap[user.id] = {
      userBytes,
      username: user.username,
      userBytesFormatted: Strings.bytesToSize(userBytes),
    };
  });

  slates.forEach((slate) => {
    slateCount = slateCount + 1;
    slateObjectCount = slateObjectCount + slate.data.objects.length;

    slateMap[slate.slatename] = {
      count: slate.data.objects.length,
      owner: userMap[slate.data.ownerId],
    };
  });

  return res.status(200).send({
    decorator: "STATS",
    data: {
      userCount,
      slateCount,
      slateObjectCount,
      userMap,
      slateMap,
      bytes,
      bytesConverted: Strings.bytesToSize(bytes),
      activity,
    },
  });
};
