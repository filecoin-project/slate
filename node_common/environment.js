export const NODE = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE === "production";
export const PORT = process.env.PORT || 1337;

// NOTE(jim):
// In production we don't use .env and manage secrets another way.
if (!IS_PRODUCTION) {
  require("dotenv").config();
}

export const POSTGRES_ADMIN_PASSWORD = process.env.POSTGRES_ADMIN_PASSWORD;
export const POSTGRES_ADMIN_USERNAME = process.env.POSTGRES_ADMIN_USERNAME;
export const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const LOCAL_PASSWORD_ROUNDS_MANUAL =
  process.env.LOCAL_PASSWORD_ROUNDS_MANUAL;
export const LOCAL_PASSWORD_ROUNDS = process.env.LOCAL_PASSWORD_ROUNDS;

// TODO(jim):
// Brittle, don't let people know the number of times something is salted.
// Not a big deal for testing at the moment.
export const LOCAL_PASSWORD_SECRET = `$2b$${LOCAL_PASSWORD_ROUNDS}$${
  process.env.LOCAL_PASSWORD_SECRET
}`;

export const TEXTILE_HUB_KEY = process.env.TEXTILE_HUB_KEY;
export const TEXTILE_HUB_SECRET = process.env.TEXTILE_HUB_SECRET;
export const TEXTILE_HUB_STAGING_HOST = process.env.TEXTILE_HUB_STAGING_HOST;

export const SOCIAL_SLACK_WEBHOOK_KEY = process.env.SOCIAL_SLACK_WEBHOOK_KEY;
export const SUPPORT_SLACK_WEBHOOK_KEY = process.env.SUPPORT_SLACK_WEBHOOK_KEY;
