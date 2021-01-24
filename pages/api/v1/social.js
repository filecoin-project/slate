import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";

export default async (req, res) => {
  const subscriptions = await Data.getSubscriptionsByUserId({ userId: req.body.data.userId });
  const subscribers = await Data.getSubscribersByUserId({ userId: req.body.data.userId });

  let serializedUsersMap = { [req.body.data.userId]: req.body.data };
  let serializedSlatesMap = {};

  const r1 = await Serializers.doSubscriptions({
    users: [],
    slates: [],
    subscriptions,
    serializedUsersMap,
    serializedSlatesMap,
  });

  const r2 = await Serializers.doSubscribers({
    users: [],
    slates: [],
    subscribers,
    serializedUsersMap: r1.serializedUsersMap,
    serializedSlatesMap: r1.serializedSlatesMap,
  });

  if (!subscriptions) {
    return res.status(404).send({ decorator: "SERVER_GET_SUBSCRIBERS_NOT_FOUND", error: true });
  }

  if (subscriptions.error) {
    return res.status(500).send({ decorator: "SERVER_GET_SUBSCRIBERS_NOT_FOUND", error: true });
  }

  if (!subscribers) {
    return res.status(404).send({ decorator: "SERVER_GET_SUBSCRIBERS_NOT_FOUND", error: true });
  }

  if (subscribers.error) {
    return res.status(500).send({ decorator: "SERVER_GET_SUBSCRIBERS_NOT_FOUND", error: true });
  }

  return res.status(200).send({
    decorator: "SERVER_GET_SOCIAL",
    subscriptions: r1.serializedSubscriptions,
    subscribers: r2.serializedSubscribers,
  });
};
