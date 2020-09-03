import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_SEND_FILECOIN", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .send({ decorator: "SERVER_SEND_FILECOIN_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_SEND_FILECOIN_USER_NOT_FOUND", error: true });
  }

  const PG = Powergate.get(user);

  let data;
  try {
    data = await PG.ffs.sendFil(
      req.body.data.source,
      req.body.data.target,
      req.body.data.amount
    );
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ decorator: "SERVER_SEND_FILECOIN_ACTION_FAILURE", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_SEND_FILECOIN" });
};
