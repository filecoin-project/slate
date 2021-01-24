import * as Data from "~/node_common/data";

export default async (req, res) => {
  const responseMultiple = await Data.getSlatesByIds({ ids: req.body.data.ids });
  if (!responseMultiple) {
    return res.status(404).send({ decorator: "SERVER_GET_SLATES_NOT_FOUND", error: true });
  }

  if (responseMultiple.error) {
    return res.status(500).send({ decorator: "SERVER_GET_SLATES_NOT_FOUND", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_GET_SLATES", slates: responseMultiple });
};
