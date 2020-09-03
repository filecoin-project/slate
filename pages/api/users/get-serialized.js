import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  let user = await Data.getUserById({ id: req.body.data.id });
  if (!user) {
    return res.status(404).send({
      decorator: "USER_NOT_FOUND",
      error: true,
    });
  }
  user = Serializers.user(user);

  let slates = await Data.getSlatesByUserId({
    userId: req.body.data.id,
    publicOnly: true,
  });
  user.slates = [];
  for (let slate of slates) {
    user.slates.push(Serializers.slate(slate));
  }

  return res.status(200).send({
    decorator: "SERIALIZED_USER",
    data: user,
  });
};
