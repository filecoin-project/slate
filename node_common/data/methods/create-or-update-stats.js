import { runQuery } from "~/node_common/data/utilities";

export default async (date, data) => {
  return await runQuery({
    label: "CREATE_OR_UPDATE_STATS",
    queryFn: async (DB) => {
      date.setHours(0, 0, 0, 0);

      let end = new Date();
      end.setHours(23, 59, 59, 999);

      const query = await DB.select("*")
        .from("stats")
        .where("created_at", ">=", date)
        .where("created_at", "<", end)
        .first();

      if (query && query.id) {
        let updates = { ...query.data };

        if (data.deals) {
          updates.deals = updates.deals + data.deals;
        }

        if (data.users) {
          updates.users = updates.users + data.users;
        }

        if (data.slates) {
          updates.slates = updates.slates + data.slates;
        }

        if (data.objects) {
          updates.objects = updates.objects + data.objects;
        }

        if (data.subscribeUser) {
          updates.subscribeUsers = updates.subscribeUsers + data.subscribeUser;
        }

        if (data.subscribeSlate) {
          updates.subscribeSlates = updates.subscribeSlates + data.subscribeSlate;
        }

        const changes = await DB.from("stats")
          .where("id", query.id)
          .update({ data: updates })
          .returning("*");

        if (!changes || changes.error) {
          return null;
        }

        const updateIndex = changes ? changes.pop() : null;
        return updateIndex;
      }

      const insert = await DB.insert({
        created_at: date,
        data: {
          deals: 0,
          users: 0,
          slates: 0,
          objects: 0,
          subscribeUsers: 0,
          subscribeSlates: 0,
          ...data,
        },
      })
        .into("stats")
        .returning("*");
      const index = insert ? insert.pop() : null;

      if (!index) {
        return null;
      }

      return JSON.parse(JSON.stringify(index));
    },
    errorFn: async (e) => {
      console.log(e);
      return {
        error: true,
        decorator: "CREATE_OR_UPDATE_STATS",
      };
    },
  });
};
