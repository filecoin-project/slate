import * as Environment from "~/node_common/environment";
import * as MW from "~/node_common/middleware";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Validations from "~/common/validations";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).json({ decorator: "SERVER_SUBSCRIBE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .json({ decorator: "SERVER_SUBSCRIBE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_SUBSCRIBE_USER_NOT_FOUND", error: true });
  }

  const existingResponse = await Data.getSubscriptionById({
    subscriberUserId: user.id,
    slateId: req.body.data.slateId,
    userId: req.body.data.userId,
  });

  if (existingResponse && existingResponse.error) {
    console.log(existingResponse);
    return res.status(500).json({
      decorator: "SERVER_SUBSCRIBE_SUBSCRIPTION_CHECK_ERROR",
      error: true,
    });
  }

  // NOTE(jim): If it exists, we unsubscribe instead.
  if (existingResponse) {
    const unsubscribeResponse = await Data.deleteSubscriptionById({
      id: existingResponse.id,
    });

    if (!unsubscribeResponse) {
      return res
        .status(404)
        .json({ decorator: "SERVER_UNSUBSCRIBE_NOT_FOUND", error: true });
    }

    if (unsubscribeResponse.error) {
      return res
        .status(500)
        .json({ decorator: "SERVER_UNSUBSCRIBE_ERROR", error: true });
    }

    return res
      .status(200)
      .json({ decorator: "SERVER_UNSUBSCRIBE", data: unsubscribeResponse });
  }

  const subscribeResponse = await Data.createSubscription({
    subscriberUserId: user.id,
    slateId: req.body.data.slateId,
    userId: req.body.data.userId,
  });

  if (!subscribeResponse) {
    return res
      .status(404)
      .json({ decorator: "SERVER_SUBSCRIBE_NOT_FOUND", error: true });
  }

  if (subscribeResponse.error) {
    return res
      .status(500)
      .json({ decorator: "SERVER_SUBSCRIBE_ERROR", error: true });
  }

  return res
    .status(200)
    .json({ decorator: "SERVER_SUBSCRIBE", data: subscribeResponse });
};
