import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";

const initCORS = MW.init(MW.CORS);

export default async (req, res) => {
  initCORS(req, res);

  const deleted = await Data.deleteUserByUsername({
    username: req.body.data.username,
  });

  if (!deleted) {
    return res
      .status(200)
      .json({ decorator: "SERVER_USER_DELETE", error: true });
  }

  return res.status(200).json({ decorator: "SERVER_USER_DELETE", deleted });
};
