import { dispatchCustomEvent } from "~/common/custom-events";
import * as Actions from "~/common/actions";

export const upload = async ({ file, context, bucketName }) => {
  let formData = new FormData();
  const HEIC2ANY = require("heic2any");

  // NOTE(jim): You must provide a file from an type="file" input field.
  if (!file) {
    return null;
  }

  // TODO(jim): Put this somewhere else to handle conversion cases.
  if (file.type.startsWith("image/heic")) {
    const converted = await HEIC2ANY({
      blob: file,
      toType: "image/png",
      quality: 1,
    });

    formData.append("data", converted);
  } else {
    formData.append("data", file);
  }

  const _privateUploadMethod = (path) =>
    new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();
      XHR.open("post", path, true);
      XHR.onerror = (event) => {
        console.log(event);
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

  let json;
  // TODO(jim): Make this smarter.
  if (bucketName && bucketName === "encrypted-deal") {
    json = await _privateUploadMethod(`/api/data/deal/${file.name}`);
  } else {
    json = await _privateUploadMethod(`/api/data/${file.name}`);
  }

  if (!json || json.error || !json.data) {
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

    return !json ? { error: "NO_RESPONSE" } : json;
  }

  return { file, json };
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
            message:
              "We're having trouble connecting right now. Please try again later",
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
  let message = `${added || 0} file${
    added !== 1 ? "s" : ""
  } uploaded to slate. `;
  if (skipped) {
    message += `${skipped || 0} duplicate / existing file${
      added !== 1 ? "s were" : " was"
    } skipped.`;
  }
  dispatchCustomEvent({
    name: "create-alert",
    detail: {
      alert: { message, status: !added ? null : "INFO" },
    },
  });
};
