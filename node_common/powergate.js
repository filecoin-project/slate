import * as Constants from "~/node_common/constants";

import { createPow } from "@textile/powergate-client";

// NOTE(jim):
// https://github.com/textileio/js-powergate-client
const Powergate = createPow({ host: Constants.POWERGATE_HOST });

export default Powergate;
