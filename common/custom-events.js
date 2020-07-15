export const dispatchCustomEvent = ({ name, detail }) => {
  let event = new CustomEvent(name, { detail });
  window.dispatchEvent(event);
};
