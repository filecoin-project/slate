export const error = {
  //Slate Create
  SERVER_FIND_USER_CREATE_SLATE: "There seems to be an issue with your account",
  SERVER_FIND_USER_CREATE_SLATE_USER_NOT_FOUND: "Login to create a Slate!",
  SERVER_EXISTING_SLATE: "You already have a slate with that name. Please choose another",
  SERVER_CREATE_SLATE: "There was an error when creating the Slate",
  FIND_USER_CREATE_SLATE: "There seems to be an issue with your account",
  FIND_USER_CREATE_SLATE_USER_NOT_FOUND: "Login to create a Slate!",
  EXISTING_SLATE: "A Slate with that name already exists. Please try another",
  CREATE_SLATE: "There was an error when creating the Slate",
  SERVER_SLATE_LIMIT: "You've reached the limit for number of slates!",

  //Slate Add URL
  ADD_TO_SLATE_USER_NOT_FOUND: "Login to add a Slate URL",
  ADD_TO_SLATE_SLATE_NOT_FOUND: "Sorry, we couldn't find that Slate! Please try another",
  ADD_TO_SLATE_ERROR: "There was an error retriving this Slate",

  //Slate remove file
  SERVER_REMOVE_FROM_SLATE_USER_NOT_FOUND: "Login to manage your slates",
  SERVER_REMOVE_FROM_SLATE_NO_ID_PROVIDED: "Please specify which item you would like to remove",
  SERVER_REMOVE_FROM_SLATE_SLATE_NOT_FOUND: "We're having trouble locating that slate",
  SERVER_REMOVE_FROM_SLATE_ERROR: "We're having trouble removing from this slate right now",

  //Slate Delete
  DELETE_SLATE_BY_ID:
    "Sorry, there was an error while trying to delete that slate. Please try again",
  DELETE_SLATES_FOR_USER_ID:
    "Sorry, we're having trouble deleting all your slates. Please try again later",
  SERVER_DELETE_SLATE: "We're having trouble deleting that at the moment. Please try again later",
  SERVER_DELETE_SLATE_USER_NOT_FOUND: "Login to manage your slates!",
  SERVER_DELETE_SLATE_SLATE_NOT_FOUND:
    "We're having trouble deleting that at the moment. Please try again later",
  SERVER_DELETE_SLATE: "We're having trouble deleting that at the moment. Please try again later",

  //Slate Get
  GET_SLATE_BY_ID:
    "We're having trouble retrieving information on that slate right now. Please try again later",
  GET_SLATE_BY_NAME:
    "We're having trouble retrieving information on that slate right now. Please try again later",
  GET_SLATES_BY_USER_ID:
    "We're having trouble retrieving that user's information. Please try again later",
  SLATE_NOT_FOUND: "That slate could not be found. It may have been deleted",
  SLATE_OWNER_NOT_FOUND:
    "We're having trouble retrieving that slate's owner right now. Please try again",
  SERVER_GET_SLATE_USER_NOT_FOUND:
    "We're having trouble retrieving that slate's owner right now. Please try again",
  SERVER_GET_SLATE:
    "We're having trouble retrieving information on that slate right now. Please try again later",
  SERVER_GET_SLATE_NOT_FOUND:
    "We're having trouble retrieving information on that slate right now. Please try again later",

  //Slate Update
  UPDATE_SLATE_BY_ID: "We ran into an issue while saving your slate. Please try again",
  SERVER_ADD_TO_SLATE_USER_NOT_FOUND: "Login to upload files!",
  SERVER_FIND_USER_UPDATE_SLATE_USER_NOT_FOUND: "Login to upload files!",
  SERVER_ADD_TO_SLATE_SLATE_NOT_FOUND:
    "We ran into issues while uploading that file. Please try again",
  SERVER_ADD_TO_SLATE_ERROR: "We ran into issues while uploading that file. Please try again",
  SERVER_FIND_USER_UPDATE_SLATE: "We ran into issues while uploading that file. Please try again",
  SERVER_UPDATE_SLATE_NOT_FOUND: "We ran into issues while locating that slate. Please try again",
  SERVER_UPDATE_SLATE_MUST_PROVIDE_DATA: "The input cannot be blank. Please check your input",
  SERVER_UPDATE_SLATE_MUST_PROVIDE_NAME: "Please provide a slate name",
  SERVER_UPDATE_SLATE: "We're having trouble updating that slate right now. Please try again later",
  SERVER_UPDATE_SLATE_NAME_TAKEN: "You already have a slate with that name. Please choose another",
  V1_SERVER_UPLOAD_SLATE_NOT_FOUND:
    "We're having trouble locating that slate right now. Please try again later",
  V1_SERVER_API_KEY_NOT_FOUND:
    "We can't seem to find your API key right now. Please try again later",
  V1_SERVER_API_UPLOAD_ERROR:
    "We're having trouble uploading that right now. Please try again later",
  V1_SERVER_UPLOAD_SLATE_NOT_FOUND: "We're having trouble locating that slate right now",
  V1_SERVER_UPLOAD_TO_SLATE_ERROR:
    "We're ran into issues while adding that to the slate. Please try again",
  V1_GET_SLATE_NOT_FOUND:
    "We're having trouble locating that slate right now. Please try again later",
  V1_GET_SLATE_USER_NOT_FOUND:
    "We're having trouble locating the owner of that slate right now. Please try again later",
  V1_GET_SLATE_SLATE_NOT_FOUND:
    "We're having trouble locating that slate right now. Please try again later",
  V1_GET_SLATES_NOT_FOUND:
    "We're having trouble locating those slates right now. Please try again later",

  //Address Send
  SERVER_SEND_FILECOIN_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  SERVER_SEND_FILECOIN_NO_ID: "That user doesn't seem to exist. Please try another",
  SERVER_SEND_FILECOIN_ACTION_FAILURE:
    "There was an error sending the transaction. We're looking into it",
  SEND_FILECOIN_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  SEND_FILECOIN: "There was an error sending the transaction. We're looking into it",
  SEND_FILECOIN_ACTION_FAILURE: "There was an error sending the transaction. We're looking into it",

  //Address Create
  CREATE_FILECOIN_ADDRESS: "There was an error when creating the Filecoin address.",

  //Data Upload
  UPLOAD_PARSE_FAILURE: "There was an error when parsing the upload. Please try again",
  UPLOAD_NOT_IMAGE_TYPE:
    "We are only accepting JPG and PNG files at this time. Try uploading a different file type!",
  BUCKETS_PUSH_ISSUE: "There was an error uploading the data",
  SERVER_UPLOAD_ERROR: "We're having issues uploading that file right now",
  SERVER_API_KEY_MISSING: "We can't seem to find your API key right now. Please try again later",
  CREATE_PENDING_DATA: "We ran into issues while uploading your data, please try again later",
  CREATE_PENDING_ERROR: "We ran into issues while uploading your data, please try again later",
  PROCESS_PENDING_ERROR:
    "We ran into an error while updating your uploaded data. Please try again later",
  PROCESS_PENDING_USER_NOT_FOUND: "Please log in to upload files",

  //Data CID Status
  NO_CIDS_TO_CHECK: "There are no CIDs to check",

  //Data Get
  SERVER_GET_BUCKET_DATA: "We ran into an issue fetching that data. Please try again later",

  //Data Remove
  SERVER_REMOVE_DATA_NO_CID:
    "Slate is having trouble deleting some files right now. We're working on fixing this soon!",
  SERVER_REMOVE_DATA_NOT_ALLOWED: "You aren't authorized to remove that file",
  SERVER_REMOVE_DATA_NO_LINK: "We couldn't remove that data. Please try again later",

  //Data Storage Deals
  SERVER_STORAGE_DEAL_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  SERVER_NO_CID: "IPFS CID is required",
  SERVER_NO_IPFS: "There was a issue retriving data from IPFS",
  SERVER_FILECOIN_STORAGE_DEAL_CID_ERROR: "There was a issue making a storage deal",
  SERVER_NO_JOB: "Sorry, this job doesn't exist!",
  STORAGE_DEAL_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  NO_CID: "IPFS CID is required",
  NO_IPFS: "There was a issue retriving data from IPFS",
  FILECOIN_STORAGE_DEAL_CID_ERROR: "There was a issue making a storage deal",
  NO_JOB: "Sorry, this job doesn't exist!",

  //Archive Deal
  SERVER_REMOVE_DATA_NOT_ALLOWED: "Please login first to archive a deal!",
  SERVER_BUCKET_ARCHIVE_DEAL_USER_NOT_FOUND: "Please login first to archive a deal!",
  SERVER_BUCKET_INIT_FAILURE: "Something went wrong while locating your storage bucket",
  STORAGE_DEAL_MAKING_NO_BUCKET: "We could not locate your storage bucket",
  STORAGE_DEAL_MAKING_NO_FILES: "No file selected. Please select a file to archive then try again",
  STORAGE_BUCKET_TOO_SMALL: "Deal size too small. Deals must be 100MB or larger",
  BUCKET_SPAWN_VERIFICATION_FAILED_FOR_BUCKET_COUNT:
    "We ran into an issue while verifying how much storage space you have",
  TOO_MANY_BUCKETS: "You've reached the maximum number of storage buckets for an account",
  FORCED_ENCRYPTION_FAILED_FOR_DATA: "We ran into an issue while encrypting your data",
  BUCKET_CLONING_FAILED: "We ran into an issue while creating a storage bucket for you",
  STORAGE_DEAL_MAKING_NOT_SANITARY: "We ran into an issue while creating that storage deal",

  //CID Status
  SERVER_NO_CIDS_TO_CHECK: "No CIDs were entered, please check your input",

  //Users Create
  SIGN_UP_RATE_LIMITED: "Too many sign up attempts. Please try again in 10 minutes",
  SERVER_EXISTING_USER_ALREADY: "That username is taken. Please try another one",
  EXISTING_USER_ALREADY: "That username is taken. Please try another one",
  INVALID_USERNAME: "Invalid username. Please include only letters and numbers",
  SERVER_INVALID_USERNAME: "Invalid username. Please include only letters and numbers",
  INVALID_PASSWORD: "Password length must be more than 8 characters",
  SERVER_INVALID_PASSWORD: "Password length must be more than 8 characters",
  USER_CREATE_USER_NOT_FOUND: "Sorry we weren't able to create your account. Please try again",
  SERVER_USER_CREATE_USER_NOT_FOUND:
    "Sorry we weren't able to create your account. Please try again",
  CREATE_USER: "Sorry we weren't able to create your account. Please try again",

  //Users Delete
  USER_DELETE: "That user doesn't seem to exist. Please try another",
  SERVER_USER_DELETE: "That user doesn't seem to exist. Please try another",
  USER_DELETE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  SERVER_USER_DELETE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  DELETE_USER_BY_USERNAME: "We're having trouble deleting your account right now",
  SERVER_USER_DELETE: "We're having trouble deleting your account right now",
  USER_NOT_FOUND: "We're having trouble connecting right now",
  SLATES_NOT_FOUND: "We weren't able to locate the slates for that user",

  //Users Update
  USER_UPDATE: "That user doesn't seem to exist. Please try another",
  USER_UPDATE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  UPDATE_USER_BY_ID: "We ran into an issue while updating your information. Please try again",
  USER_UPDATE_SETTINGS_CONFIG: "Error when updating user settings",
  SERVER_USER_UPDATE: "Please make sure you are signed in first",
  SERVER_USER_UPDATE_USER_NOT_FOUND:
    "We're having trouble locating your information. Please try again",
  SERVER_STATUS_UPDATE: "Please log in first to access this page",
  SERVER_STATUS_UPDATE_USER_NOT_FOUND: "We're having trouble locating your information right now",
  SERVER_STATUS_UPDATE_MUST_PROVIDE_UPDATE:
    "We're having trouble updating your information right now",
  SERVER_USERNAME_IS_TAKEN: "That username is taken",

  //Users Get
  GET_USER_BY_ID: "We weren't able to fetch information on that user. Please try again later",
  GET_USER_BY_USERNAME:
    "We weren't able to fetch information on that user. Please check your input",
  USER_NOT_FOUND: "We aren't able to locate that user at the moment. Please try again",
  SERVER_USER_SUBSCRIPTIONS_NOT_FOUND:
    "We weren't able to fetch information on that user. Please try again later",
  SERVER_USER_SUBSCRIBERS_NOT_FOUND:
    "We weren't able to fetch information on that user. Please try again later",

  //Hydrate
  HYDRATE_FAILURE: "Please make sure you're logged in",
  SERVER_HYDRATE_FAILURE: "Please make sure you're logged in",
  SERVER_VIEWER_DATA_ERROR:
    "We're havign trouble fetching your information right now. Please try again",

  //Sign-in
  SIGN_IN_RATE_LIMITED: "Too many sign in attempts. Please try again in 10 minutes",
  SIGN_IN: "Your username/password can't be blank",
  SERVER_SIGN_IN: "Your username/password can't be blank",
  SIGN_IN_USER_NOT_FOUND: "We're having trouble logging you in right now, please try again later",
  SERVER_SIGN_IN_USER_NOT_FOUND: "That username and password do not match", //no one with that username
  SERVER_SIGN_IN_ERROR: "We're having trouble connecting right now. Please try again later",
  SERVER_SIGN_IN_AUTH: "That username and password do not match", //incorrect password

  //Activity
  CREATE_ACTIVITY: "We're having issues posting that right now. Please try again",
  DELETE_ACTIVITY_BY_ID: "We weren't able to delete that. Please try again",
  GET_ACTIVITY_BY_ID: "We weren't able to fetch that information. Please try again",
  GET_ACTIVITY_FOR_SLATE_ID: "We weren't able to fetch that information. Please try again",
  GET_ACTIVITY_FOR_USER_ID: "We weren't able to fetch that user's information. Please try again",
  SERVER_GET_ACTIVITY_NOT_FOUND: "We're having trouble fetching your feed right now",
  SERVER_GET_ACTIVITY_USER_NOT_FOUND: "Please login to view your feed",

  //Subscription Create
  CREATE_SUBSCRIPTION: "We weren't able to subscribe you. Please try again later",
  SERVER_SUBSCRIBE: "Please login to subscribe",
  SERVER_SUBSCRIBE_USER_NOT_FOUND:
    "We're having trouble fetching your information. Please try again later",
  SERVER_SUBSCRIBE_MUST_PROVIDE_SLATE_OR_USER:
    "No user or slate was provided. Please check your input",
  SERVER_SUBSCRIBE_CAN_NOT_SUBSCRIBE_TO_YOURSELF: "You cannot subscribe to yourself",
  SERVER_SUBSCRIBE_TARGET_USER_NOT_FOUND: "That user could not be found",
  SERVER_SUBSCRIBE_TARGET_SLATE_NOT_FOUND: "That slate could not be found",
  SERVER_SUBSCRIBE_SUBSCRIPTION_CHECK_ERROR:
    "We weren't able to subscribe you. Please try again later",
  SERVER_UNSUBSCRIBE_NOT_FOUND: "We weren't able to unsubscribe you. Please try again",
  SERVER_UNSUBSCRIBE_ERROR: "We weren't able to unsubscribe you. Please try again",
  SERVER_SUBSCRIBE_NOT_FOUND: "We weren't able to subscribe you. Please try again",
  SERVER_SUBSCRIBE_ERROR: "We weren't able to subscribe you. Please try again",

  //Subscription Delete
  DELETE_SUBSCRIPTION_BY_ID: "We weren't able to unsubscribe you. Please try again later",

  //Subscription Get
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

  //Trusted Create
  CREATE_TRUSTED_RELATIONSHIP:
    "We weren't able to add this user as trusted. Please try again later",
  SERVER_TRUST: "Please make sure you are logged in",
  SERVER_TRUSTED_RELATIONSHIP_USER_NOT_FOUND:
    "We are having trouble retrieving your information right now",
  SERVER_TRUSTED_RELATIONSHIP_MUST_PROVIDE_SOMEONE_TO_TRUST: "No user was specified",
  SERVER_TRUSTED_RELATIONSHIP_CAN_NOT_TRUST_YOURSELF: "You cannot add yourself as trusted",
  SERVER_TRUSTED_RELATIONSHIP_TARGET_USER_NOT_FOUND:
    "We could not locate that user. Please try again later",
  SERVER_TRUSTED_RELATIONSHIP_CHECK_ERROR:
    "We're having trouble adding this person as your trusted right now",
  SERVER_TRUSTED_RELATIONSHIP_INVERTED_CHECK_ERROR:
    "You have already received a trust request from this person. Please accept it instead",
  SERVER_DELETE_TRUSTED_RELATIONSHIP_NOT_FOUND: "There is no trust relationshp to delete",
  SERVER_DELETE_TRUSTED_RELATIONSHIP_ERROR:
    "We're having trouble deleting this trust relationship right now",
  SERVER_TRUSTED_RELATIONSHIP_NOT_FOUND:
    "We're having trouble creating this trust relationship right now",
  SERVER_TRUSTED_RELATIONSHIP_ERROR:
    "We're having trouble creating this trust relationship right now",

  //Trusted Delete
  DELETE_TRUSTED_RELATIONSHIP_BY_ID:
    "We weren't able to remove this user from your trusted. Please try again later",
  SERVER_TRUST_DELETE: "Please login to manage your trusted",
  SERVER_TRUST_DELETE_USER_NOT_FOUND: "We weren't able to locate this user. Please try again later",
  SERVER_TRUST_DELETE_MUST_PROVIDE_ID: "Please check your input",

  //Trusted Get
  GET_TRUSTED_RELATIONSHIP_BY_ID:
    "We're having trouble retrieving that information right now. Please try again later",
  GET_TRUSTED_RELATIONSHIP_BY_IDS:
    "We're having trouble retrieving that information right now. Please try again later",
  GET_TRUSTED_RELATIONSHIPS_BY_USER_ID:
    "We're having trouble retrieving that information right now. Please try again later",

  //Trusted Update
  UPDATE_TRUSTED_RELATIONSHIP_BY_ID:
    "We ran into an issue while updating that information. Please try again later",
  SERVER_TRUST_UPDATE: "Please login to mange your trusted",
  SERVER_TRUST_UPDATE_USER_NOT_FOUND:
    "We weren't able to locate your information. Please try again later",
  SERVER_TRUST_UPDATE_MUST_PROVIDE_SOMEONE_TO_TRUST:
    "Please check your input. No user was provided",
  SERVER_TRUST_UPDATE_CAN_NOT_TRUST_YOURSELF: "You cannot add yourself as a trusted peer",
  SERVER_TRUST_UPDATE_TARGET_USER_NOT_FOUND:
    "We weren't able to locate that user. Please try again later",
  SERVER_TRUST_UPDATE_CHECK_ERROR: "This person is already among your trusted peers",

  //API Key Create
  CREATE_API_KEY_FOR_USER_ID:
    "We're having trouble creating your API keys right now. Please try again",
  SERVER_GENERATE_API_KEY_AUTH: "You aren't authorized to create that API key",
  SERVER_GENERATE_API_KEY_USER_NOT_FOUND:
    "We ran into issues finding your information while trying to generate that API key",
  SERVER_GENERATE_API_KEY_TOO_MANY_KEYS: "You have reached the limit for number of API keys",
  SERVER_GENERATE_API_KEY_ERROR: "We ran into issues while trying to generate that API key",

  //API Key Delete
  DELETE_API_KEY_BY_ID:
    "We're having trouble deleting that API key right now. Please try again later",
  DELETE_API_KEYS_FOR_USER_ID:
    "We're having trouble deleting your API keys right now. Please try again later",
  SERVER_DELETE_API_KEY_AUTH: "You aren't authorized to delete that API key",
  SERVER_DELETE_API_KEY_USER_NOT_FOUND: "No matching API key was found for that user",
  SERVER_DELETE_API_KEY_NOT_FOUND: "No matching API key was found for that user",
  SERVER_DELETE_API_KEY_ERROR:
    "We ran into an issue while trying to delete that API key. Please try again",

  //API Key Get
  GET_API_KEY_BY_KEY: "We weren't able to fetch that API key. Please try again later",
  GET_API_KEY: "We weren't able to fetch that API key. Please try again later",
  GET_API_KEYS_BY_USER_ID:
    "We're having trouble retrieving your API keys right now. Please try again",

  //Query
  SERVER_DEEPLINK: "This slate or profile does not exist",
  SERVER_DEEPLINK_ERROR: "This slate or profile does not exist",
  SERVER_SEARCH_NO_QUERY: "No query was entered. Please enter a query and try again",

  // Storage Deals
  SERVER_BUCKET_INIT_FAILURE: "Something went wrong with our infrastructure. Check in later.",
  STORAGE_DEAL_MAKING_NO_BUCKET: "Something went wrong with our infrastructure. Check in later.",
  STORAGE_DEAL_MAKING_NO_FILES: "You must provide files before you make a deal.",

  //Support
  SERVER_SUPPORT: "You must be logged in to send a support message. Please try logging in again",
  SERVER_SUPPORT_USER_NOT_FOUND: "We're having difficulty locating your information right now",
  SERVER_SUPPORT_NO_DATA_PROVIDED: "We're having trouble transmitting your message right now",
  SERVER_SUPPORT_MUST_PROVIDE_EMAIL: "Please provide an email where we can contact you",
  SERVER_SUPPORT_MUST_PROVIDE_MESSAGE: "Please provide a message to send",
  SERVER_SUPPORT: "We're having trouble sending your support message to the team right now",

  // Unity game download
  UNITY_ZIP_DOWNLOAD_FAILED:
    "We're having trouble downloading you Unity game file. Please try again",
};
