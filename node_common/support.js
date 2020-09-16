import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";

import { IncomingWebhook } from "@slack/webhook";

const url = `https://hooks.slack.com/services/${Environment.SUPPORT_SLACK_WEBHOOK_KEY}`;
const webhook = new IncomingWebhook(url);

export const sendSlackMessage = ({
  username,
  name,
  email,
  message,
  stored,
}) => {
  if (Strings.isEmpty(Environment.SUPPORT_SLACK_WEBHOOK_KEY)) {
    return false;
  }

  const userProfileURL = `https://slate.host/${username}`;
  const userURL = `<${userProfileURL}|${username}>`;

  try {
    webhook.send({
      text: `\n*Username:* ${userURL} (${stored} stored)\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
    });
    return true;
  } catch (e) {
    return false;
  }
};
