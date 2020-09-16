const { performance } = require("perf_hooks");

const TIME_START = performance.now();

const timeDifference = (current, previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
};

const setTime = () => {
  return `[ \x1b[33m\x1b[5m${timeDifference(performance.now(), TIME_START)}\x1b[0m ]`;
};

export const error = (message, name = "ERROR ") => {
  console.log(`\x1b[1m[ \x1b[31m${name}\x1b[0m\x1b[1m ]\x1b[0m ${setTime()} ${message}`);
};

export const task = (message, name = "SCRIPT") => {
  console.log(`\x1b[1m[ \x1b[32m${name}\x1b[0m\x1b[1m ]\x1b[0m ${setTime()} ${message}`);
};

export const taskTimeless = (message, name = "SCRIPT") => {
  console.log(`\x1b[1m[ \x1b[32m${name}\x1b[0m\x1b[1m ]\x1b[0m ${message}`);
};

export const note = (message, name = "NOOP  ") => {
  console.log(`\x1b[1m[ \x1b[33m${name}\x1b[0m\x1b[1m ]\x1b[0m ${setTime()} ${message}`);
};
