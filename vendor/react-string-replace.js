const getType = (value) =>
  Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/)[1];

const isRegExp = (value) => getType(value) === "RegExp";

const isString = (value) => getType(value) === "String";

const escapeRegExp = (regex) => {
  return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const flatten = (source) => {
  const length = source.length;
  let i = 0;
  let flattened = [];

  for (; i < length; i++) {
    flattened = flattened.concat(
      !Array.isArray(source[i]) ? source[i] : flatten(source[i])
    );
  }
  return flattened;
};

function replaceString(str, match, fn) {
  var curCharStart = 0;
  var curCharLen = 0;

  if (str === "") {
    return str;
  } else if (!str || !isString(str)) {
    throw new TypeError(
      "First argument to react-string-replace#replaceString must be a string"
    );
  }

  var re = match;

  if (!isRegExp(re)) {
    re = new RegExp("(" + escapeRegExp(re) + ")", "gi");
  }

  var result = str.split(re);

  for (var i = 1, length = result.length; i < length; i += 2) {
    curCharLen = result[i].length;
    curCharStart += result[i - 1].length;
    result[i] = fn(result[i], i, curCharStart);
    curCharStart += curCharLen;
  }

  return result;
}

module.exports = function reactStringReplace(source, match, fn) {
  if (!Array.isArray(source)) source = [source];

  return flatten(
    source.map(function(x) {
      return isString(x) ? replaceString(x, match, fn) : x;
    })
  );
};
