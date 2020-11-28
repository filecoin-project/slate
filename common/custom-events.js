export const dispatchCustomEvent = ({ name, detail }) => {
  let event = new CustomEvent(name, { detail });
  window.dispatchEvent(event);
};

export const hasError = (response) => {
  if (!response) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message: "We're having trouble connecting right now. Please try again later",
        },
      },
    });
    return true;
  } else if (response.error) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          decorator: response.decorator,
        },
      },
    });
    return true;
  }
  return false;
};

export const dispatchMessage = ({ message, decorator, status }) => {
  if (decorator) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          decorator,
          status,
        },
      },
    });
  } else if (message) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message,
          status,
        },
      },
    });
  }
};
