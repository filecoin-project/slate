import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";

export default async (req, res) => {
  const subscriptions = await Data.getSubscriptionsByUserId({ userId: req.body.data.userId });

  if (!subscriptions) {
    return res.status(404).send({ decorator: "SERVER_USER_SUBSCRIPTIONS_NOT_FOUND", error: true });
  }

  if (subscriptions.error) {
    return res.status(500).send({ decorator: "SERVER_USER_SUBSCRIPTIONS_NOT_FOUND", error: true });
  }

  const subscribers = await Data.getSubscribersByUserId({ userId: req.body.data.userId });

  if (!subscribers) {
    return res.status(404).send({ decorator: "SERVER_USER_SUBSCRIBERS_NOT_FOUND", error: true });
  }

  if (subscribers.error) {
    return res.status(500).send({ decorator: "SERVER_USER_SUBSCRIBERS_NOT_FOUND", error: true });
  }

  let serializedUsersMap = { [req.body.data.userId]: req.body.data };
  let serializedSlatesMap = {};

  const serializedSubscriptions = await Serializers.doSubscriptions({
    users: [],
    slates: [],
    subscriptions,
    serializedUsersMap,
    serializedSlatesMap,
  });

  const serializedSubscribers = await Serializers.doSubscribers({
    users: [],
    slates: [],
    subscribers,
    serializedUsersMap: serializedSubscriptions.serializedUsersMap,
    serializedSlatesMap: serializedSubscriptions.serializedSlatesMap,
  });

  return res.status(200).send({
    decorator: "SERVER_USER_SOCIAL",
    subscriptions: serializedSubscriptions.serializedSubscriptions,
    subscribers: serializedSubscribers.serializedSubscribers,
  });
};
