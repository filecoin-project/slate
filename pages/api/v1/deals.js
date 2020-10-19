import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Powergate from "~/node_common/powergate";

export default async (req, res) => {
  const response = await Data.getAllDeals();

  if (!response) {
    return res.status(500).send({
      decorator: "V1_GET_ALL_DEALS_ERROR",
      error: true,
    });
  }

  if (response.error) {
    return res.status(500).send({
      decorator: "V1_GET_ALL_DEALS_ERROR",
      error: true,
    });
  }

  return res
    .status(200)
    .send(JSON.stringify({ decorator: "V1_GET_ALL_DEALS", deals: response }, null, 4));
};
