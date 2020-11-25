import * as Window from "~/common/window";
import * as Strings from "~/common/strings";

let pingTimeout = null;
let client = null;

export const init = ({ resource = "", viewer, onUpdate }) => {
  if (!process.browser) {
    return null;
  }

  console.log(`${resource}: init`);

  if (client) {
    console.log("ERROR: Already have client !?");
    return client;
  }

  client = new WebSocket(resource);

  client.addEventListener("open", (e) => {
    if (!client) {
      return null;
    }

    const payload = { type: "SUBSCRIBE_VIEWER", data: viewer };

    client.send(JSON.stringify(payload));
  });

  client.addEventListener("ping", (e) => {
    if (!client) {
      return null;
    }

    console.log(`${resource}: ping`);
    clearTimeout(pingTimeout);

    pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  });

  client.addEventListener("message", function(event) {
    if (!client) {
      return null;
    }

    if (Strings.isEmpty(event.data)) {
      return null;
    }

    let type;
    let data;
    try {
      const response = JSON.parse(event.data);
      type = response.type;
      data = response.data;
    } catch (e) {
      console.log(e);
    }

    if (!data) {
      return null;
    }

    if (!type) {
      return null;
    }

    if (type === "UPDATE" && onUpdate) {
      onUpdate(data);
    }
  });

  client.addEventListener("close", (e) => {
    if (!client) {
      return null;
    }

    console.log(`${resource}: closed`);
    clearTimeout(pingTimeout);
  });

  return client;
};

export const getClient = () => {
  if (!process.browser) {
    return null;
  }

  return client;
};

export const deleteClient = async () => {
  if (!process.browser) {
    return null;
  }

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
