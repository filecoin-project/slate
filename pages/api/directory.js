import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";

export default async (req, res) => {
  const users = await Data.getEveryUser();
  const slates = await Data.getEverySlate();

  const { serializedSlates, userToSlatesMap } = await Serializers.doSlates({
    serializedUsers: users,
    slates,
  });

  for (let i = 0; i < users.length; i++) {
    users[i].slates = userToSlatesMap[users[i].id];
  }

  return res.status(200).send({
    decorator: "SERVER_DIRECTORY",
    data: { users, slates: serializedSlates },
  });
};
