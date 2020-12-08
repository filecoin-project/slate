import configs from "~/knexfile";
import knex from "knex";

import * as Data from "~/node_common/data";

import { deleteUser } from "~/pages/api/users/delete";

const envConfig = configs["development"];

const db = knex(envConfig);

console.log(`RUNNING:  delete-user.js`);

const run = async () => {
  const user = await Data.getUserByUsername({
    username: process.argv[3],
  });

  console.log(user);

  if (user) {
    console.log(`deleting ${user.username}`);
    await deleteUser(user);
  }

  console.log(`FINISHED: delete-user.js`);
  console.log(`          CTRL +C to return to terminal.`);
};

run();
