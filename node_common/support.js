import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";

import { IncomingWebhook } from "@slack/webhook";

const url = `https://hooks.slack.com/services/${Environment.SUPPORT_SLACK_WEBHOOK_KEY}`;
const webhook = new IncomingWebhook(url);

export const sendSlackMessage = ({
  username,
  name,
  email,
  twitter,
  message,
  stored,
}) => {
  if (Strings.isEmpty(Environment.SUPPORT_SLACK_WEBHOOK_KEY)) {
    return false;
  }

  const userProfileURL = `https://slate.host/${username}`;
  const userURL = `<${userProfileURL}|${username}>`;
  let twitterURL = "";
  if (twitter) {
    const twitterProfileURL = `https://twitter.com/${twitter.replace("@", "")}`;
    twitterURL = `<${twitterProfileURL}|${twitter}>`;
  }
  try {
    webhook.send({
      text: `\n*Username:* ${userURL} (${stored} stored)\n*Name:* ${name}\n*Email:* ${email}\n*Twitter:* ${twitterURL}\n*Message:* ${message}`,
    });
    return true;
  } catch (e) {
    return false;
  }
};
