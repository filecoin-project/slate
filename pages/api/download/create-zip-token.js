import { v4 } from "uuid";
import storage from "node-persist";

export default async (req, res) => {
  const id = v4();
  const files = req.body.files;
  await storage.init();
  await storage.setItem(id, JSON.stringify(files));
  setTimeout(() => {
    storage.removeItem(id);
  }, 10 * 60 * 1000);

  res.status(200).json({ token: id });
};
