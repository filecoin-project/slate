import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";

import { IncomingWebhook } from "@slack/webhook";

// NOTE(jim): #fil-slate-social
const url = `https://hooks.slack.com/services/${Environment.SOCIAL_SLACK_WEBHOOK_KEY}`;
const webhook = new IncomingWebhook(url);

// NOTE(jim): #fil-slate-textile-api
const textileURL = `https://hooks.slack.com/services/${Environment.TEXTILE_SLACK_WEBHOOK_KEY}`;
const textileWebhook = new IncomingWebhook(textileURL);

export const sendSlackMessage = (message) => {
  if (Strings.isEmpty(Environment.SOCIAL_SLACK_WEBHOOK_KEY)) {
    return;
  }

  try {
    webhook.send({ text: message });
  } catch (e) {
    console.log({ decorator: "SLACK_MESSAGE_FAILURE", message });
  }
};

export const sendTextileSlackMessage = ({
  user = { username: "UNDEFINED" },
  message,
  functionName,
  code,
  file,
}) => {
  if (Strings.isEmpty(Environment.TEXTILE_SLACK_WEBHOOK_KEY)) {
    return;
  }

  const userProfileURL = `https://slate.host/${user.username}`;
  const userURL = `<${userProfileURL}|${user.username}>`;
  const source = `${Environment.SOURCE}`;
  const fileURL = `https://github.com/filecoin-project/slate/blob/main/${file}`;
  const slackFileURL = `<${fileURL}|${file}>`;

  try {
    textileWebhook.send({
      text: `*Source code —* ${slackFileURL} \n*Source client —* ${source} \n*Callsite —* \`${functionName}\`\n*User —* ${userURL}\n\n> ${message}\n\n*Textile error code —* ${code}`,
    });
  } catch (e) {
    console.log({ decorator: "SLACK_MESSAGE_FAILURE", message });
  }
};
