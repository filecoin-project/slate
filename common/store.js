const cancelledUploads = {};

export const checkCancelled = (val) => {
  return cancelledUploads[val];
};

export const setCancelled = (val) => {
  cancelledUploads[val] = true;
};
