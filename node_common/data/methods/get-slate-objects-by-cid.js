import { runQuery } from "~/node_common/data/utilities";

// NOTE(jim): Passing URL and CID because right now
// the CID only lives in the url property of the object.
export default async ({ cid, url, ownerId }) => {
  return await runQuery({
    label: "GET_SLATE_OBJECT_BY_CID",
    queryFn: async (DB) => {
      const hasObjectURL;
      if (ownerId) {
        hasObjectURL = (textileURL) =>
        DB.raw(`?? @> ?::jsonb`, [
          "data",
          JSON.stringify({ objects: [{ url: textileURL, ownerId }] }),
        ]);
      } else {
        hasObjectURL = (textileURL) =>
        DB.raw(`?? @> ?::jsonb`, [
          "data",
          JSON.stringify({ objects: [{ url: textileURL }] }),
        ]);
      }

      /*
        const hasObjectCID = (id) =>
        DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ objects: [{ cid: id }] })]);

        const query = await DB.select("*")
          .from("slates")
          .where(hasObjectCID(cid));
      */

      const query = await DB.select("*").from("slates").where(hasObjectURL(url));

      if (!query || query.error) {
        return [];
      }

      return query;

      // let solution = [];
      // query.forEach((each) => {
      //   // TODO(martina): Change this when you fix props.
      //   const object = each.data.objects.find((object) => object.url === url);

      //   if (!object) {
      //     return;
      //   }

      //   if (!each.data.public) {
      //     return;
      //   }

      //   object.slate = {
      //     id: each.id,
      //     created_at: each.created_at,
      //     updated_at: each.updated_at,
      //     slatename: each.slatename,
      //     data: {
      //       ownerId: each.data.ownerId,
      //     },
      //   };

      //   solution.push(object);
      // });

      // return solution;
    },
    errorFn: async (e) => {
      console.log(e);
      console.log({
        error: true,
        decorator: "GET_SLATE_OBJECT_BY_CID",
      });

      return [];
    },
  });
};
