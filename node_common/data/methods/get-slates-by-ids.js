import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "GET_SLATES_BY_IDS",
    queryFn: async (DB) => {
      const query = await DB.select("*").from("slates").whereIn("id", [
        //NOTE(tara): slates in localhost for testing
        "857ad84d-7eff-4861-a988-65c84b62fc23",
        "81fa0b39-0e96-4c7f-8587-38468bb67cb3",
        "c4e8dad7-4ba0-4f25-a92a-c73ef5522d29",
        "df05cb1f-2ecf-4872-b111-c4b8493d08f8",
        "435035e6-dee4-4bbf-9521-64c219a527e7",
        "ac907aa3-2fb2-46fd-8eba-ec8ceb87b5eb",

        //NOTE(tara): slates in prod
        "d2861ac4-fc41-4c07-8f21-d0bf06be364c",
        "9c2c458c-d92a-4e81-a4b6-bf6ab4607470",
        "7f461144-0647-43d7-8294-788b37ae5979",
        "f72c2594-b8ac-41f6-91e0-b2da6788ae23",
        "a0d6e2f2-564d-47ed-bf56-13c42634703d",
        "0ba92c73-92e7-4b00-900e-afae4856c9ea",
      ]);

      if (!query || query.error) {
        return [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_SLATES_BY_IDS",
      };
    },
  });
};
