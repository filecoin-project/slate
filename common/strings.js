export const isEmpty = string => {
  return !string || !string.toString().trim();
};

export const pluralize = (text, count) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export const elide = (string, length = 140, emptyState = '...') => {
  if (isEmpty(string)) {
    return emptyState;
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
};

export const toDate = data => {
  const date = new Date(data);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};
