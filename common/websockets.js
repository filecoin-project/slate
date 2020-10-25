import { w3cwebsocket as W3CWebSocket } from "websocket";

let client = null;

export const init = ({ resource = "" }) => {
  client = new W3CWebSocket(resource);

  client.onopen = () => {
    console.log("WebSocket Client Connected");
  };

  client.onmessage = (message) => {
    console.log(message);
  };

  return client;
};

export const getClient = () => {
  return client;
};
