export const getInitialState = (props) => {
  if (!props) {
    return null;
  }

  return { ...props };
};
