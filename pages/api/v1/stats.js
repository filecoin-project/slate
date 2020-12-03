import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  const response = await Data.getOrCreateGlobalStats(new Date(), async () => {
    const users = await Data.getEveryUser(false);
    const slates = await Data.getEverySlate(false);
    let stats = await Data.getAllStats();
    const activity = await Data.getAllActivity();

    let userCount = 0;
    let slateCount = 0;
    let slateObjectCount = 0;
    let averageNewUsersDaily = 0;
    let averageNewSlatesDaily = 0;
    let averageNewObjectsDaily = 0;
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

      slateMap[slate.id] = {
        count: slate.data.objects.length,
        slatename: slate.slatename,
        owner: userMap[slate.data.ownerId],
      };
    });

    stats.forEach((stat) => {
      averageNewObjectsDaily = averageNewObjectsDaily + stat.data.objects;
      averageNewSlatesDaily = averageNewSlatesDaily + stat.data.slates;
      averageNewUsersDaily = averageNewUsersDaily + stat.data.users;
    });

    averageNewObjectsDaily = Math.floor(averageNewObjectsDaily / stats.length);
    averageNewSlatesDaily = Math.floor(averageNewSlatesDaily / stats.length);
    averageNewUsersDaily = Math.floor(averageNewUsersDaily / stats.length);

    return {
      userCount,
      slateCount,
      slateObjectCount,
      bytes,
      bytesConverted: Strings.bytesToSize(bytes),
      activityCount: activity.length,
      stats,
      averageNewObjectsDaily,
      averageNewSlatesDaily,
      averageNewUsersDaily,
    };
  });

  return res.status(200).send({
    decorator: "STATS",
    data: response,
  });
};
