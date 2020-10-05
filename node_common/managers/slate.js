import * as Data from "~/node_common/data";

export const getRandomSlateElementURL = async ({ id, fallback }) => {
  if (!{ id }) {
    return { fallback };
  }

  const query = await Data.getSlateById({ id });

  if (!query || query.error) {
    return { fallback };
  }

  return query.data.objects[Math.floor(Math.random() * query.data.objects.length)].url;
};
