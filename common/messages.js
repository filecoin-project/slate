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

  //Address Send
  SEND_FILECOIN: "That user doesn't seem to exist. Please try another",
  SEND_FILECOIN_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  SEND_FILECOIN_ACTION_FAILURE:
    "There was an error sending the transaction. We're looking into it",

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

  //Users Delete
  USER_DELETE: "That user doesn't seem to exist. Please try another",
  USER_DELETE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",

  //Users Update
  USER_UPDATE: "That user doesn't seem to exist. Please try another",
  USER_UPDATE_USER_NOT_FOUND: "Sorry, we couldn't find that user!",
  INVALID_PASSWORD:
    "Short passwords are too easy to guess. Try one with more than 8 characters",
  USER_UPDATE_SETTINGS_CONFIG: "Error when updating user settings",
  CREATE_FILECOIN_ADDRESS:
    "There was an error when creating the Filecoin address.",

  //Hydrate
  HYDRATE_FAILURE: "That user doesn't seem to exist. Please try another",

  //Sign-in
  SIGN_IN: "Your username/password can't be blank",
  SIGN_IN_USER_NOT_FOUND: "Sorry, that user doesn't exist!",
  SIGN_IN_AUTH: "Incorrect password",
};
