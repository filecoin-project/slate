import * as Data from "~/node_common/data";
import * as Serializers from "~/node_common/serializers";
import * as Strings from "~/common/strings";

export default async (req, res) => {
  let user;
  if (req.body.data.id) {
    user = await Data.getUserById({ id: req.body.data.id });
  } else if (req.body.data.username) {
    user = await Data.getUserByUsername({ username: req.body.data.username });
  }
  if (!user || user.error) {
    return res.status(404).send({
      decorator: "USER_NOT_FOUND",
      error: true,
    });
  }
  let library = user.data.library;

  user = Serializers.user(user);

  let slates = await Data.getSlatesByUserId({
    userId: user.id,
    publicOnly: true,
  });
  if (slates.error) {
    if (!user || user.error) {
      return res.status(404).send({
        decorator: "SLATES_NOT_FOUND",
        error: true,
      });
    }
  }
  let publicFileIds = [];
  user.slates = [];
  for (let slate of slates) {
    user.slates.push(Serializers.slate(slate));
    if (slate.data.public) {
      publicFileIds.push(...slate.data.objects.map((obj) => obj.id));
    }
  }

  if (library && library.length) {
    library[0].children = library[0].children.filter((file) => {
      return file.public || publicFileIds.includes(file.id);
    });
  }
  user.library = library;

  const subscriptions = await Data.getSubscriptionsByUserId({ userId: req.body.data.id });
  const subscribers = await Data.getSubscribersByUserId({ userId: req.body.data.id });

  let serializedUsersMap = { [user.id]: Serializers.user(user) };
  let serializedSlatesMap = {};

  // NOTE(jim): The most expensive call first.
  const r1 = await Serializers.doSubscriptions({
    users: [],
    slates: [],
    subscriptions,
    serializedUsersMap,
    serializedSlatesMap,
  });

  user.subscriptions = r1.serializedSubscriptions;

  const r2 = await Serializers.doSubscribers({
    users: [],
    slates: [],
    subscribers,
    serializedUsersMap: r1.serializedUsersMap,
    serializedSlatesMap: r1.serializedSlatesMap,
  });

  user.subscribers = r2.serializedSubscribers;

  return res.status(200).send({
    decorator: "SERIALIZED_USER",
    data: user,
  });
};
