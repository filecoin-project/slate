import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Powergate from "~/node_common/powergate";

export default async (req, res) => {
  const response = await Data.getAllDeals();

  let totals = {
    size: 0,
    deals: 0,
    cost: 0,
  };

  let slingshot = {
    root: "",
    total: 0,
    addresses: [],
  };

  response.forEach((each) => {
    total.deals += 1;
    total.size += each.data.size;
    total.cost += each.data.totalCostAttoFIL;

    if (!slingshot.addresses.includes(each.data.addr)) {
      slingshot.total += 1;
      slingshot.addresses.push(each.data.addr);
    }
  });

  totals.costFormatted = Strings.formatAsFilecoinConversion(total.cost);
  totals.sizeFormatted = Strings.bytesToSize(each.data.size);

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
    .send(
      JSON.stringify({ decorator: "V1_GET_ALL_DEALS", totals, slingshot, deals: response }, null, 4)
    );
};
