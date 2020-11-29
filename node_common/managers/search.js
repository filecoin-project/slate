import * as Environment from "~/node_common/environment";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Constants from "~/node_common/constants";
import * as Serializers from "~/node_common/serializers";
import * as Strings from "~/common/strings";
import * as Websocket from "~/node_common/nodejs-websocket";
import * as NodeLogging from "~/node_common/node-logging";

const websocketSend = async (type, data) => {
  if (Strings.isEmpty(Environment.PUBSUB_SECRET)) {
    return;
  }

  const ws = Websocket.get();
  if (!ws) {
    NodeLogging.error(`Can not find websocket ...`);
    return;
  }

  const encryptedData = await Utilities.encryptWithSecret(
    JSON.stringify(data),
    Environment.PUBSUB_SECRET
  );

  // NOTE(jim): Only allow this to be passed around encrypted.
  ws.send(
    JSON.stringify({
      type,
      iv: encryptedData.iv,
      data: encryptedData.hex,
    })
  );
};

export const updateUser = async (user, action) => {
  console.log("UPDATE SEARCH for user");
  if (!user || !action) return;

  NodeLogging.log(`Search is updating user ...`);

  const data = {
    data: { type: action, data: { ...Serializers.user(user), type: "USER" } },
    id: "LENS",
  };
  websocketSend("UPDATE", data);
};

export const updateSlate = async (slate, action) => {
  console.log("UPDATE SEARCH for slate / files in slate");
  if (!slate || !action) return;

  NodeLogging.log(`Search is updating slate ...`);

  const data = {
    id: "LENS",
    data: { type: action, data: { ...Serializers.slate(slate), type: "SLATE" } },
  };
  websocketSend("UPDATE", data);
};
