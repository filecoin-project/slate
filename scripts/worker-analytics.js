import configs from "~/knexfile";
import knex from "knex";
import fs from "fs";

import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";

const envConfig = configs["development"];
const db = knex(envConfig);

console.log(`RUNNING: worker-analytics.js`);

function sortObject(obj) {
  var arr = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        key: prop,
        value: obj[prop],
      });
    }
  }
  arr.sort(function (a, b) {
    return b.value - a.value;
  });
  //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
  return arr; // returns array
}

const run = async () => {
  const response = await Data.getEveryUser(false);

  let count = 0;
  let bytes = 0;
  let userMap = {};

  response.forEach((user) => {
    count = count + 1;

    let userBytes = 0;
    user.data.library[0].children.forEach((each) => {
      userBytes = each.size + userBytes;
      bytes = each.size + bytes;
    });

    userMap[user.username] = userBytes;
  });

  userMap = sortObject(userMap);
  userMap = userMap.map((each, index) => {
    return { ...each, index, value: Strings.bytesToSize(each.value) };
  });
  console.log(userMap);
  console.log("TOTAL USER COUNT", count);
  console.log("TOTAL BYTES", bytes);
  console.log("TOTAL BYTES (CONVERTED)", Strings.bytesToSize(bytes));

  fs.writeFile("analytics.txt", JSON.stringify({ data: userMap }, null, 2), function (err) {
    if (err) return console.log(err);
  });
};

run();

console.log(`FINISHED: worker-analytics.js`);
console.log(`          CTRL +C to return to terminal.`);
