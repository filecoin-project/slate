import { v4 } from "uuid";
import storage from "node-persist";

export default async (req, res) => {
  if (!(req.body.files && req.body.files.length > 0)) {
    return res.status(500).send({ decorator: "SERVER_CREATE_ZIP_TOKEN_INVALID_INPUT" });
  }

  const token = v4();
  const files = req.body.files;
  await storage.init();

  await storage.setItem(token, JSON.stringify(files));
  setTimeout(() => {
    storage.removeItem(token);
  }, 10 * 60 * 1000);

  res.status(200).json({
    decorator: "SERVER_CREATE_ZIP_TOKEN_SUCCESS",
    data: { token },
  });
};
