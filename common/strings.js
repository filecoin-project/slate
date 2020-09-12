import * as Constants from "~/common/constants";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = (DAY * 365) / 12;
const YEAR = DAY * 365;

export const copyText = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  el.style.visibility = "hidden";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  return true;
};

export const getKey = (text) => {
  if (isEmpty(text)) {
    return null;
  }

  return text.replace("Basic ", "");
};

export const getPresentationSlateName = (slate) => {
  if (!isEmpty(slate.data.name)) {
    return slate.data.name;
  }

  return slate.slatename;
};

export const getPresentationName = (user) => {
  if (!isEmpty(user.data.name)) {
    return user.data.name;
  }

  return user.username;
};

export const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const getCIDGatewayURL = (cid) => {
  return `${Constants.gateways.ipfs}/${cid}`;
};

// SOURCE(jim):
// https://gist.github.com/mathewbyrne/1280286
// modified to support chinese characters, base case, and german.
export const createSlug = (text, base = "untitled") => {
  if (isEmpty(text)) {
    return base;
  }

  text = text
    .toString()
    .toLowerCase()
    .trim();

  const sets = [
    { to: "a", from: "[ÀÁÂÃÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]" },
    { to: "ae", from: "[Ä]" },
    { to: "c", from: "[ÇĆĈČ]" },
    { to: "d", from: "[ÐĎĐÞ]" },
    { to: "e", from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]" },
    { to: "g", from: "[ĜĞĢǴ]" },
    { to: "h", from: "[ĤḦ]" },
    { to: "i", from: "[ÌÍÎÏĨĪĮİỈỊ]" },
    { to: "j", from: "[Ĵ]" },
    { to: "ij", from: "[Ĳ]" },
    { to: "k", from: "[Ķ]" },
    { to: "l", from: "[ĹĻĽŁ]" },
    { to: "m", from: "[Ḿ]" },
    { to: "n", from: "[ÑŃŅŇ]" },
    { to: "o", from: "[ÒÓÔÕØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]" },
    { to: "oe", from: "[ŒÖ]" },
    { to: "p", from: "[ṕ]" },
    { to: "r", from: "[ŔŖŘ]" },
    { to: "s", from: "[ŚŜŞŠ]" },
    { to: "ss", from: "[ß]" },
    { to: "t", from: "[ŢŤ]" },
    { to: "u", from: "[ÙÚÛŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]" },
    { to: "ue", from: "[Ü]" },
    { to: "w", from: "[ẂŴẀẄ]" },
    { to: "x", from: "[ẍ]" },
    { to: "y", from: "[ÝŶŸỲỴỶỸ]" },
    { to: "z", from: "[ŹŻŽ]" },
    { to: "-", from: "[·/_,:;']" },
  ];

  sets.forEach((set) => {
    text = text.replace(new RegExp(set.from, "gi"), set.to);
  });

  text = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^a-zA-Z0-9_\u3400-\u9FBF\s-]/g, "") // Remove all non-word chars
    .replace(/\--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

  return text;
};

/*
export const createSlug = (text, base = "untitled") => {
  if (isEmpty(text)) {
    return base;
  }

  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};
*/

/*
export const createSlug = (text, base = "untitled") => {
  if (isEmpty(text)) {
    return base;
  }

  const a = "æøåàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aoaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
*/

export const hexToRGBA = (hex, alpha = 1) => {
  hex = hex.replace("#", "");
  var r = parseInt(
    hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
    16
  );
  var g = parseInt(
    hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
    16
  );
  var b = parseInt(
    hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
    16
  );
  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)}  ${sizes[i]}`;
};

export const getRemainingTime = (seconds) => {
  seconds = seconds > 0 ? seconds : 1;

  let [value, unit] =
    seconds < MINUTE
      ? [Math.round(seconds), "second"]
      : seconds < HOUR
      ? [Math.round(seconds / MINUTE), "minute"]
      : seconds < DAY
      ? [Math.round(seconds / HOUR), "hour"]
      : seconds < WEEK
      ? [Math.round(seconds / DAY), "day"]
      : seconds < MONTH
      ? [Math.round(seconds / WEEK), "week"]
      : seconds < YEAR
      ? [Math.round(seconds / MONTH), "month"]
      : [Math.round(seconds / YEAR), "year"];

  unit = pluralize(unit, value);

  return `${value} ${unit} remaining`;
};

export const formatAsFilecoin = (number) => {
  return `${number} FIL`;
};

export const isEmpty = (string) => {
  return !string || !string.toString().trim();
};

export const pluralize = (text, count) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export const elide = (string, length = 140, emptyState = "...") => {
  if (isEmpty(string)) {
    return emptyState;
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
};

export const toDate = (data) => {
  const date = new Date(data);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const formatNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
