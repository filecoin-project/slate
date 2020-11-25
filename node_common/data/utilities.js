import * as NodeLogging from "~/node_common/node-logging";

import DB from "~/node_common/database";

export const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn(DB);
  } catch (e) {
    NodeLogging.error(`DB:${label}: ${e.message}`);
    response = errorFn(e);
  }

  NodeLogging.log(`DB:${label}`);
  return response;
};
