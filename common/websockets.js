import * as Window from "~/common/window";

let pingTimeout = null;
let client = null;

export const init = ({ resource = "", viewer }) => {
  console.log(`${resource}: init`);

  if (client) {
    console.log("ERROR: Already have client !?");
    return client;
  }

  client = new WebSocket(resource);

  client.addEventListener("open", (e) => {
    if (!client) {
      return;
    }

    const payload = { type: "SUBSCRIBE_VIEWER", data: viewer };

    client.send(JSON.stringify(payload));
  });

  client.addEventListener("ping", (e) => {
    if (!client) {
      return;
    }

    console.log(`${resource}: ping`);
    clearTimeout(pingTimeout);

    pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  });

  client.addEventListener("message", function(event) {
    if (!client) {
      return;
    }

    console.log(`${resource}: ${event.data}`);
  });

  client.addEventListener("close", (e) => {
    if (!client) {
      return;
    }

    client.send(JSON.stringify({ type: "NOTICE", data: `closing ...` }));

    clearTimeout(pingTimeout);
  });

  return client;
};

export const getClient = () => {
  return client;
};

export const deleteClient = async () => {
  if (!client) {
    console.log("WEBSOCKET: NOTHING TO DELETE");
    return null;
  }

  clearTimeout(pingTimeout);

  client.close();
  client = null;
  await Window.delay(0);

  console.log("WEBSOCKET: TERMINATED");

  return client;
};
