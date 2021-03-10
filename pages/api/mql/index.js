import * as Environment from "~/node_common/environment";
import mql from "@microlink/mql";
import { promisify } from "util";
import stream from "stream";
import createCors from "cors";

// wrapper can be removed when upgraded to node v15
const pipeline = promisify(stream.pipeline);

const REQUIRED_ENVS = ["MQL_CORS_ALLOW", "MQL_API_KEY"];
const missing = REQUIRED_ENVS.filter((key) => Environment[key] == null);

if (missing.length > 0) {
  throw new Error(`Missing required environment variable(s): ${missing.join(", ")}`);
}

const { MQL_API_KEY, MQL_CORS_ALLOW } = Environment;

const allowedDomains = MQL_CORS_ALLOW.split(",").map((n) => n.trim());
const toSearchParams = (req) => new URL(req.url, "http://localhost").searchParams;

const proxy = (req, res) => {
  const stream = mql.stream(`https://${MQL_API_KEY ? "pro" : "api"}.microlink.io`, {
    searchParams: toSearchParams(req),
    headers: {
      "x-api-key": MQL_API_KEY || undefined,
      accept: req.headers.accept,
    },
  });

  pipeline(stream, res);
};

const cors = createCors({ origin: allowedDomains });

export default (req, res) => cors(req, res, () => proxy(req, res));
