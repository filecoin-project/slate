export const error = {
  //Slate Create
  FIND_USER_CREATE_SLATE: "There seems to be an issue with your account",
  FIND_USER_CREATE_SLATE_USER_NOT_FOUND: "Login to create a Slate!",
  EXISTING_SLATE: "A Slate with that name already exists. Please try another",
  CREATE_SLATE: "There was an error when creating the Slate",

  //Slate Add URL
  ADD_TO_SLATE_USER_NOT_FOUND: "Login to add a Slate URL",
  ADD_TO_SLATE_SLATE_NOT_FOUND:
    "Sorry, we couldn't find that Slate! Please try another",
  ADD_TO_SLATE_ERROR: "There was an error retriving this Slate",

  //Slate Delete
  DELETE_SLATE_BY_ID:
    "Sorry, there was an error while trying to delete that slate. Please try again",
  DELETE_SLATES_FOR_USER_ID:
    "Sorry, we're having trouble deleting all your slates. Please try again later",

  //Slate Get
  GET_SLATE_BY_ID:
    "We're having trouble retrieving information on that slate right now. Please try again later",
  GET_SLATE_BY_NAME:
    "We're having trouble retrieving information on that slate right now. Please try again later",
  GET_SLATES_BY_USER_ID:
    "We're having trouble retrieving that user's information. Please try again later",

  //Slate Update
  UPDATE_SLATE_BY_ID:
    "We ran into an issue while saving your slate. Please try again",

  //Address Send
  SEND_FILECOIN: "That user doesn't seem to exist. Please try another",
  SEND_FILECOIN_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  SEND_FILECOIN_ACTION_FAILURE:
    "There was an error sending the transaction. We're looking into it",

  //Address Create
  CREATE_FILECOIN_ADDRESS:
    "There was an error when creating the Filecoin address.",

  //Data Upload
  UPLOAD_PARSE_FAILURE:
    "There was an error when parsing the upload. Please try again",
  UPLOAD_NOT_IMAGE_TYPE:
    "We are only accepting JPG and PNG files at this time. Try uploading a different file type!",
  BUCKETS_PUSH_ISSUE: "There was an error uploading the data",

  //Data CID Status
  NO_CIDS_TO_CHECK: "There are no CIDs to check",

  //Data Storage Deals
  STORAGE_DEAL_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  NO_CID: "IPFS CID is required",
  NO_IPFS: "There was a issue retriving data from IPFS",
  FILECOIN_STORAGE_DEAL_CID_ERROR: "There was a issue making a storage deal",
  NO_JOB: "Sorry, this job doesn't exist!",

  //Users Create
  EXISTING_USER_ALREADY:
    "This username is already taken! Please try another one",
  INVALID_USERNAME: "Invalid username. Please include only letters and numbers",
  INVALID_PASSWORD: "Password length must be more than 8 characters",
  USER_CREATE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  CREATE_USER: "Sorry we weren't able to create your account. Please try again",

  //Users Delete
  USER_DELETE: "That user doesn't seem to exist. Please try another",
  USER_DELETE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  DELETE_USER_BY_USERNAME:
    "We're having trouble deleting your account right now",

  //Users Update
  USER_UPDATE: "That user doesn't seem to exist. Please try another",
  USER_UPDATE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  UPDATE_USER_BY_ID:
    "We ran into an issue while updating your information. Please try again",
  USER_UPDATE_SETTINGS_CONFIG: "Error when updating user settings",

  //Users Get
  GET_USER_BY_ID:
    "We weren't able to fetch information on that user. Please try again later",
  GET_USER_BY_USERNAME:
    "We weren't able to fetch information on that user. Please try again later",

  //Hydrate
  HYDRATE_FAILURE: "That user doesn't seem to exist. Please try another",

  //Sign-in
  SIGN_IN: "Your username/password can't be blank",
  SIGN_IN_USER_NOT_FOUND: "Sorry, that user doesn't exist!",
  SIGN_IN_AUTH: "Incorrect password",

  //Activity
  CREATE_ACTIVITY:
    "We're having issues posting that right now. Please try again",
  DELETE_ACTIVITY_BY_ID: "We weren't able to delete that. Please try again",
  GET_ACTIVITY_BY_ID:
    "We weren't able to fetch that information. Please try again",
  GET_ACTIVITY_FOR_SLATE_ID:
    "We weren't able to fetch that information. Please try again",
  GET_ACTIVITY_FOR_USER_ID:
    "We weren't able to fetch that user's information. Please try again",

  //Subscription
  CREATE_SUBSCRIPTION:
    "We weren't able to subscribe you. Please try again later",
  DELETE_SUBSCRIPTION_BY_ID:
    "We weren't able to unsubscribe you. Please try again later",
  GET_SUBSCRIBERS_BY_USER_ID:
    "We weren't able to retrieve that information. Please try again later",
  GET_SUBSCRIPTION_BY_ID:
    "We weren't able to retrieve that subscription information. Please try again later",
  GET_SUBSCRIPTIONS_BY_USER_ID:
    "We weren't able to retrieve that information. Please try again later",
  GET_SUBSCRIPTIONS_TO_SLATE_ID:
    "We weren't able to retrieve that information. Please try again later",
  GET_SUBSCRIPTIONS_TO_USER_ID:
    "We weren't able to retrieve that information. Please try again later",

  //Trusted
  CREATE_TRUSTED_RELATIONSHIP:
    "We weren't able to add this user as trusted. Please try again later",
  DELETE_TRUSTED_RELATIONSHIP_BY_ID:
    "We weren't able to remove this user from your trusted. Please try again later",
  GET_TRUSTED_RELATIONSHIP_BY_ID:
    "We're having trouble retrieving that information right now. Please try again later",
  GET_TRUSTED_RELATIONSHIP_BY_IDS:
    "We're having trouble retrieving that information right now. Please try again later",
  GET_TRUSTED_RELATIONSHIPS_BY_USER_ID:
    "We're having trouble retrieving that information right now. Please try again later",
  UPDATE_TRUSTED_RELATIONSHIP_BY_ID:
    "We ran into an issue while updating that information. Please try again later",

  //API
  CREATE_API_KEY_FOR_USER_ID:
    "We're having trouble creating your API keys right now. Please try again",
  DELETE_API_KEY_BY_ID:
    "We're having trouble deleting that API key right now. Please try again later",
  DELETE_API_KEYS_FOR_USER_ID:
    "We're having trouble deleting your API keys right now. Please try again later",
  GET_API_KEY_BY_KEY:
    "We weren't able to fetch that API key. Please try again later",
  GET_API_KEY: "We weren't able to fetch that API key. Please try again later",
  GET_API_KEYS_BY_USER_ID:
    "We're having trouble retrieving your API keys right now. Please try again",
};
