import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  let user;
  if (req.body.data.id) {
    user = await Data.getUserById({ id: req.body.data.id });
  } else if (req.body.data.username) {
    user = await Data.getUserByUsername({ username: req.body.data.username });
  }
  if (!user || user.error) {
    return res.status(404).send({
      decorator: "USER_NOT_FOUND",
      error: true,
    });
  }

  user = Serializers.user(user);

  return res.status(200).send({
    decorator: "GET_USER",
    data: user,
  });
};
