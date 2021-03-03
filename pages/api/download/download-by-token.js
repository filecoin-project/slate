import archiver from "archiver";
import Request from "request";
import storage from "node-persist";

const request = (link) => Request.get(link);
export default async (req, res) => {
  const downloadId = req.query.downloadId;
  const files = JSON.parse(await storage.getItem(downloadId));

  const archive = archiver("zip");

  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(res);
  files.forEach((file) => archive.append(request(file.url), { name: file.name }));
  archive.finalize();
  storage.removeItem(downloadId);
};
