const iselement = (el) => el instanceof HTMLElement && el.nodeType === 1;
const isobject = (ob) => ob !== null && typeof ob === "object";
const isstring = (st) => typeof st === "string" || st instanceof String;

// (NOTE: daniel) helper function to create dom elements with classnames
const g = (attrArg = {}, tagArg = "div") => (...cttArr) => {
  let el = document.createElement(tagArg);
  let attrObj = isobject(attrArg) ? attrArg : { class: attrArg };
  Object.keys(attrObj).forEach((key) => {
    const val = attrObj[key];
    if (!val) return;
    if (/^\$/.test(key)) el.setAttribute("data-" + key.slice(1), val);
    else if (/^_/.test(key)) el.addEventListener(key.slice(1), val);
    else if (key === "style" && isobject(val)) {
      el.setAttribute(
        "style",
        Object.keys(val)
          .map((i) => `${i}:${val[i]}`)
          .join(";")
      );
    } else el.setAttribute(key, val);
  });
  cttArr.forEach((cttItem) => {
    if (iselement(cttItem)) el.appendChild(cttItem);
    else if (tagArg.toLowerCase() === "img" && isstring(cttItem))
      el.setAttribute("src", cttItem);
    else if (cttItem !== undefined) el.innerHTML += cttItem;
  });
  return el;
};

// (NOTE: daniel) check maximum length of string
const maxLenNum = (aNum, bNum) => (aNum > bNum ? aNum : bNum).toString().length;

// (NOTE: daniel) reverse and convert string to number
const num2PadNumArr = (num, len, chars) => {
  const charsArr = chars.map(String);
  const padLeftStr = (rawStr, lenNum) =>
    rawStr.length < lenNum ? padLeftStr("0" + rawStr, lenNum) : rawStr;
  const str2NumArr = (rawStr) =>
    rawStr.split("").map((i) => Number(charsArr.indexOf(i)));

  return str2NumArr(padLeftStr(num.toString(), len)).reverse();
};

// (NOTE: daniel) helper function to generate numbers in a range
function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

const alphabets = range("a".charCodeAt(0), "z".charCodeAt(0), 1).map((x) =>
  String.fromCharCode(x)
);

// (NOTE: daniel) odometer class
export default class Odometer {
  constructor({
    node,
    from = 0,
    to = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    duration = 0.5,
    delay,
    easeFn = (pos) =>
      (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 3)
        : 0.5 * (Math.pow(pos - 2, 3) + 2),
    systemArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...alphabets],
    direct = true,
    separator = "-",
    seperateOnly = 0,
    separateEvery = 3,
  }) {
    this.beforeArr = [];
    this.afterArr = [];
    this.ctnrArr = [];
    this.duration = duration * 1000;
    this.systemArr = systemArr;
    this.easeFn = easeFn;
    this.from = from;
    this.to = to || 0;
    this.node = node;
    this.direct = direct;
    this.separator = separator;
    this.seperateOnly = seperateOnly;
    this.separateEvery = seperateOnly ? 0 : separateEvery;
    this.format = [8, 13, 18, 23];
    this.init(maxLenNum(this.from, this.to));
    if (to === undefined) return;
    if (delay) setTimeout(() => this.start({ to: this.to }), delay * 1000);
    else this.start({ to: this.to });
  }

  init(digits) {
    this.node.classList.add("odometer");
    this.node.style.position = "relative";
    this.node.style.overflow = "hidden";
    this.node.style.userSelect = "none";
    this.node.style.cursor = "pointer";

    for (let i = 0; i < digits; i++) {
      const ctnr = g(`digits`)(
        ...this.systemArr.map((i) => g("digit")(i)),
        g("digit")(this.systemArr[0])
      );

      ctnr.style.position = "relative";
      ctnr.style.display = "inline-block";
      ctnr.style.verticalAlign = "top";
      ctnr.style.textAlign = "center";
      this.ctnrArr.unshift(ctnr);
      this.node.appendChild(ctnr);
      this.beforeArr.push(0);
    }

    const format = () => {
      for (let i = 0; i < this.format.length; i++) {
        const sprtr = g("separator")("-");
        sprtr.style.display = "inline-block";

        this.node.insertBefore(sprtr, this.node.childNodes[this.format[i]]);
      }
    };

    format();

    const resize = () => {
      this.height = this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
      this.node.style.height = this.height + "px";

      if (this.afterArr.length) {
        this.frame(1);
      } else {
        for (let d = 0; d < this.ctnrArr.length; d++) {
          this._draw({
            digit: d,
            per: 1,
            alter: ~~(this.from / Math.pow(10, d)),
          });
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
  }

  _draw({ per, alter, digit }) {
    const newHeight =
      this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
    if (newHeight && this.height !== newHeight) this.height = newHeight;
    const from = this.beforeArr[digit];
    const modNum = (((per * alter + from) % 36) + 36) % 36;
    const translateY = `translateY(${-modNum * this.height}px)`;
    this.ctnrArr[digit].style.webkitTransform = translateY;
    this.ctnrArr[digit].style.transform = translateY;
  }

  frame(per) {
    let temp = 0;
    for (let d = this.ctnrArr.length - 1; d >= 0; d--) {
      let alter = this.afterArr[d] - this.beforeArr[d];
      temp += alter;
      this._draw({
        digit: d,
        per: this.easeFn(per),
        alter: this.direct ? alter : temp,
      });
      temp *= 10;
    }
  }

  start({ to, duration, easeFn, direct }) {
    if (easeFn) this.easeFn = easeFn;
    if (direct !== undefined) this.direct = direct;
    const len = this.ctnrArr.length;
    this.beforeArr = num2PadNumArr(this.from, len, this.systemArr);
    this.afterArr = num2PadNumArr(to, len, this.systemArr);
    const start = Date.now();
    const dur = duration * 1000 || this.duration;

    const tick = () => {
      let elapsed = Date.now() - start;
      this.frame(elapsed / dur);
      if (elapsed < dur) requestAnimationFrame(tick);
      else {
        this.from = to;
        this.frame(1);
      }
    };
    requestAnimationFrame(tick);
  }
}
