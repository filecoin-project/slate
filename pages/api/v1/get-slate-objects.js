import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  // TODO(martina): Get rid of URL after the CID property is available on a
  // Slate object.
  const response = await Data.getSlateObjectsByCID({
    url: `https://slate.textile.io/ipfs/${req.params.cid}`,
    cid: req.params.cid,
  });

  return res.status(200).json({ decorator: "V1_GET_SLATE_OBJECTS", data: response });
};
