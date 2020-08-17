import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Powergate from "~/node_common/powergate";
import * as Constants from "~/node_common/constants";

export const get = async () => {
  // Current endpoints available for consumption
  // Endpoints: blocks, blockParents, blockRewards, blockMessages, receipts, messages
  const endpoint = "blocks";
  const response = await fetch(Constants.ANALYTICS_URL + endpoint);
  const analytics = response.json();
  // TODO(colin): We can bind Analytics here on the server.
  return analytics;
};
