import * as Actions from "~/common/actions";
import * as Store from "~/common/store";
import * as Constants from "~/common/constants";
import * as Credentials from "~/common/credentials";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";

import { dispatchCustomEvent } from "~/common/custom-events";
import { encode } from "blurhash";

const STAGING_DEAL_BUCKET = "stage-deal";

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

// NOTE(jim): We're speaking to a different server now.
const getCookie = (name) => {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
};

export const upload = async ({ file, context, bucketName, routes }) => {
  let formData = new FormData();
  const HEIC2ANY = require("heic2any");

  // NOTE(jim): You must provide a file from an type="file" input field.
  if (!file) {
    return null;
  }

  const isZipFile =
    file.type.startsWith("application/zip") || file.type.startsWith("application/x-zip-compressed");
  const isUnityFile = await Validations.isUnityFile(file);

  // TODO(jim): Put this somewhere else to handle conversion cases.
  if (file.type.startsWith("image/heic")) {
    const converted = await HEIC2ANY({
      blob: file,
      toType: "image/png",
      quality: 1,
    }); //TODO(martina): figure out how to cancel an await if upload has been cancelled

    formData.append("data", converted);
  } else {
    formData.append("data", file);
  }

  if (Store.checkCancelled(`${file.lastModified}-${file.name}`)) {
    return;
  }

  const _privateUploadMethod = (path, file) =>
    new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();

      window.addEventListener(`cancel-${file.lastModified}-${file.name}`, () => {
        XHR.abort();
      });

      XHR.open("post", path, true);
      XHR.setRequestHeader("authorization", getCookie(Credentials.session.key));
      XHR.onerror = (event) => {
        console.log(event);
        XHR.abort();
      };

      // NOTE(jim): UPLOADS ONLY.
      XHR.upload.addEventListener(
        "progress",
        (event) => {
          if (!context) {
            return;
          }

          if (event.lengthComputable) {
            console.log("FILE UPLOAD PROGRESS", event);
            context.setState({
              fileLoading: {
                ...context.state.fileLoading,
                [`${file.lastModified}-${file.name}`]: {
                  name: file.name,
                  loaded: event.loaded,
                  total: event.total,
                },
              },
            });
          }
        },
        false
      );

      window.removeEventListener(`cancel-${file.lastModified}-${file.name}`, () => XHR.abort());

      XHR.onloadend = (event) => {
        console.log("FILE UPLOAD END", event);
        try {
          return resolve(JSON.parse(event.target.response));
        } catch (e) {
          return resolve({
            error: "SERVER_UPLOAD_ERROR",
          });
        }
      };
      XHR.send(formData);
    });

  const storageDealRoute =
    routes && routes.storageDealUpload ? `${routes.storageDealUpload}/api/deal/` : null;
  const generalRoute = routes && routes.upload ? `${routes.upload}/api/data/` : null;
  const zipUploadRoute = routes && routes.uploadZip ? `${routes.uploadZip}/api/data/zip/` : null;

  if (!storageDealRoute || !generalRoute || !zipUploadRoute) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "We could not find our upload server." },
      },
    });

    return {
      decorator: "NO_UPLOAD_RESOURCE_URI_ATTACHED",
      error: true,
    };
  }

  let res;
  if (isZipFile && isUnityFile) {
    res = await _privateUploadMethod(`${zipUploadRoute}${file.name}`, file);
  } else if (bucketName && bucketName === STAGING_DEAL_BUCKET) {
    res = await _privateUploadMethod(`${storageDealRoute}${file.name}`, file);
  } else {
    res = await _privateUploadMethod(`${generalRoute}${file.name}`, file);
  }

  if (!res || res.error || !res.data) {
    if (context) {
      context.setState({
        fileLoading: {
          ...context.state.fileLoading,
          [`${file.lastModified}-${file.name}`]: {
            name: file.name,
            failed: true,
          },
        },
      });
    }
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Some of your files could not be uploaded" },
      },
    });
    console.log(res);

    return !res ? { decorator: "NO_RESPONSE_FROM_SERVER", error: true } : res;
  }

  if (res.data.data.type.startsWith("image/")) {
    let url = `${Constants.gateways.ipfs}/${res.data.data.cid}`;
    try {
      let blurhash = await encodeImageToBlurhash(url);
      res.data.data.blurhash = blurhash;
    } catch (e) {
      console.log(e);
    }
  }

  await Actions.createPendingFiles({ data: res.data });

  res.data = res.data.data;

  return { file, json: res };
};

export const uploadToSlate = async ({ responses, slate }) => {
  let added;
  let skipped;
  if (responses && responses.length) {
    const addResponse = await Actions.addFileToSlate({
      slate,
      data: responses.map((res) => {
        return { title: res.file.name, ...res.json.data };
      }),
    });

    if (!addResponse) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return;
    } else if (addResponse.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: addResponse.decorator } },
      });
      return;
    } else {
      added = addResponse.added;
      skipped = addResponse.skipped;
    }
  }
  let message = Strings.formatAsUploadMessage(added, skipped, true);
  dispatchCustomEvent({
    name: "create-alert",
    detail: {
      alert: { message, status: !added ? null : "INFO" },
    },
  });
};
