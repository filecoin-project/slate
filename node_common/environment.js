export const NODE = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE === "production";
export const PORT = process.env.PORT || 1337;
export const SOURCE = process.env.SOURCE;

// NOTE(jim):
// In production we don't use .env and manage secrets another way.
if (!IS_PRODUCTION) {
  require("dotenv").config();
}

// NOTE(jim):
// Slate
export const POSTGRES_ADMIN_PASSWORD = process.env.POSTGRES_ADMIN_PASSWORD;
export const POSTGRES_ADMIN_USERNAME = process.env.POSTGRES_ADMIN_USERNAME;
export const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PUBSUB_SECRET = process.env.PUBSUB_SECRET;
export const ALLOWED_HOST = process.env.ALLOWED_HOST;
export const LOCAL_PASSWORD_ROUNDS_MANUAL = process.env.LOCAL_PASSWORD_ROUNDS_MANUAL;
export const LOCAL_PASSWORD_ROUNDS = process.env.LOCAL_PASSWORD_ROUNDS;
export const LOCAL_PASSWORD_SECRET = `$2b$${LOCAL_PASSWORD_ROUNDS}$${
  process.env.LOCAL_PASSWORD_SECRET
}`;

// NOTE(jim): Custom avatars
export const AVATAR_SLATE_ID = process.env.AVATAR_SLATE_ID;

// NOTE(jim): Textile secrets
export const TEXTILE_HUB_KEY = process.env.TEXTILE_HUB_KEY;
export const TEXTILE_HUB_SECRET = process.env.TEXTILE_HUB_SECRET;
export const TEXTILE_HUB_STAGING_HOST = process.env.TEXTILE_HUB_STAGING_HOST;

// NOTE(jim): Slack updates
export const SOCIAL_SLACK_WEBHOOK_KEY = process.env.SOCIAL_SLACK_WEBHOOK_KEY;
export const SUPPORT_SLACK_WEBHOOK_KEY = process.env.SUPPORT_SLACK_WEBHOOK_KEY;
export const TEXTILE_SLACK_WEBHOOK_KEY = process.env.TEXTILE_SLACK_WEBHOOK_KEY;

// NOTE(jim): External servers
export const RESOURCE_URI_UPLOAD = process.env.RESOURCE_URI_UPLOAD;
export const RESOURCE_URI_STORAGE_UPLOAD = process.env.RESOURCE_URI_STORAGE_UPLOAD;
export const RESOURCE_URI_PUBSUB = process.env.RESOURCE_URI_PUBSUB;
export const RESOURCE_URI_SEARCH = process.env.RESOURCE_URI_SEARCH;

// NOTE(cw): microlink api config
export const MQL_API_KEY = process.env.MQL_API_KEY;
export const MQL_CORS_ALLOW = process.env.MQL_CORS_ALLOW