import * as Environment from "~/node_common/environment";
import * as ScriptLogging from "~/node_common/script-logging";
import * as Strings from "~/common/strings";

import WebSocket from "ws";

let ws;

export const create = () => {
  if (ws) {
    return;
  }

  if (Strings.isEmpty(Environment.RESOURCE_URI_PUBSUB)) {
    return;
  }

  ws = new WebSocket(Environment.RESOURCE_URI_PUBSUB, {
    perMessageDeflate: false,
  });

  ws.on("ping", function() {
    clearTimeout(this.pingTimeout);

    this.pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  });

  ws.on("open", () => {
    ws.send(JSON.stringify({ type: "SUBSCRIBE_HOST", data: {} }));
  });

  ws.on("close", () => {
    console.log("Websocket disconnected");
  });

  return ws;
};

export const get = () => ws;
