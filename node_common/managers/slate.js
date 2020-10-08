import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Numbers from "~/common/numbers";

export const getRandomSlateElementURL = async ({ id, fallback = "" }) => {
  if (Strings.isEmpty(id)) {
    return fallback;
  }

  const query = await Data.getSlateById({ id });

  if (!query || query.error) {
    return fallback;
  }

  if (!query.data.objects.length) {
    return fallback;
  }

  const index = Numbers.getRandomInt(0, query.data.objects.length - 1);
  return query.data.objects[index].url;
};
