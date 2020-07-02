'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var react = require('@emotion/react');
var reactDom = _interopDefault(require('react-dom'));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var taggedTemplateLiteral = _taggedTemplateLiteral;

var typescale = {
  lvl1: "1rem",
  lvl2: "1.25rem",
  lvl3: "1.563rem",
  lvl4: "1.953em"
};
var system = {
  white: "#ffffff",
  foreground: "#f7f7f7",
  gray: "#e5e5e5",
  border: "#d8d8d8",
  darkGray: "#b2b2b2",
  black: "#2D2926",
  pitchBlack: "#0c0c0c",
  brand: "#2935ff",
  green: "#28a745",
  yellow: " #FFC940",
  red: "#ff0000",
  lightGreen: "#93d3a2",
  lightYellow: "#ffd76f",
  lightRed: "#ff8080",
  lightBlue: "#949aff"
};

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var inheritsLoose = _inheritsLoose;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};
var removeLabel = function removeLabel(context, content) {
  if (context === 1 && // charcode for l
  content.charCodeAt(0) === 108 && // charcode for b
  content.charCodeAt(2) === 98 // this ignores label
  ) {
      return '';
    }
};

var isBrowser = typeof document !== 'undefined';
var rootServerStylisCache = {};
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  var getCache = weakMemoize(function () {
    return {};
  });
  var prefixTrueCache = {};
  var prefixFalseCache = {};
  return function (prefix) {
    if (prefix === undefined || prefix === true) {
      return prefixTrueCache;
    }

    if (prefix === false) {
      return prefixFalseCache;
    }

    return getCache(prefix);
  };
});

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  if (isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  if (isBrowser) {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if (process.env.NODE_ENV !== 'production' && serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  } else {
    stylis.use(removeLabel);
    var serverStylisCache = rootServerStylisCache;

    if (options.stylisPlugins || options.prefix !== undefined) {
      stylis.use(options.stylisPlugins); // $FlowFixMe

      serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
    }

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(selector, serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
        process.env.NODE_ENV === 'development' && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if (process.env.NODE_ENV !== 'production' && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser$2 = typeof document !== 'undefined';

var EmotionCacheContext = React.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? createCache() : null);
var ThemeContext = React.createContext({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return React.createElement(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return React.forwardRef(render);
};

if (!isBrowser$2) {
  var BasicProvider =
  /*#__PURE__*/
  function (_React$Component) {
    inheritsLoose(BasicProvider, _React$Component);

    function BasicProvider(props, context, updater) {
      var _this;

      _this = _React$Component.call(this, props, context, updater) || this;
      _this.state = {
        value: createCache()
      };
      return _this;
    }

    var _proto = BasicProvider.prototype;

    _proto.render = function render() {
      return React.createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
    };

    return BasicProvider;
  }(React.Component);

  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      return React.createElement(EmotionCacheContext.Consumer, null, function (context) {
        if (context === null) {
          return React.createElement(BasicProvider, null, function (newContext) {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
    };
  };
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles);

  if (process.env.NODE_ENV !== 'production' && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && (process.env.NODE_ENV === 'production' || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = React.createElement(type, newProps);

  if (!isBrowser$2 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return React.createElement(React.Fragment, null, React.createElement("style", (_ref = {}, _ref["data-emotion-" + cache.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
};

var Emotion =
/* #__PURE__ */
withEmotionCache(function (props, cache, ref) {
  // use Context.read for the theme when it's stable
  if (typeof props.css === 'function') {
    return React.createElement(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal';
} // $FlowFixMe


var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return React.createElement.apply(undefined, args);
  }

  if (process.env.NODE_ENV !== 'production' && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (process.env.NODE_ENV !== 'production') {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|)jsx.*\n\s+at ([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  createElementArgArray[1] = newProps;

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return React.createElement.apply(null, createElementArgArray);
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return React.createElement(ThemeContext.Consumer, null, function (theme) {
    var rules = '';
    var serializedHashes = '';
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, context.registered);

      if (isBrowser$2) {
        insertStyles(context, serialized, false);
      } else {
        var res = insertStyles(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!isBrowser$2) {
        serializedHashes += " " + serialized.name;
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    if (!isBrowser$2 && rules.length !== 0) {
      var _ref;

      return React.createElement(React.Fragment, null, React.createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = context.sheet.nonce, _ref)), ele);
    }

    return ele;
  });
});

function _templateObject6() {
  var data = taggedTemplateLiteral(["\n  ", "\n  cursor: not-allowed;\n  background-color: ", ";\n  color: ", ";\n\n  :focus {\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = taggedTemplateLiteral(["\n  ", "\n  cursor: not-allowed;\n  background-color: ", ";\n  color: ", ";\n\n  :focus {\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: ", ";\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: ", ";\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: #003fe3;\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: #003fe3;\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_BUTTON = "\n  border-radius: 4px;\n  outline: 0;\n  border: 0;\n  min-height: 40px;\n  padding: 6px 24px 6px 24px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n  font-family: \"inter-semi-bold\";\n  transition: 200ms ease all;\n";
var STYLES_BUTTON_FULL = "\n  border-radius: 4px;\n  outline: 0;\n  border: 0;\n  min-height: 40px;\n  padding: 6px 24px 6px 24px;\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n  font-family: \"inter-semi-bold\";\n  transition: 200ms ease all;\n";
var STYLES_BUTTON_PRIMARY = react.css(_templateObject(), STYLES_BUTTON, system.brand, system.white, system.brand);
var ButtonPrimary = function ButtonPrimary(props) {
  if (props.type === 'label') {
    return jsx("label", _extends_1({
      css: STYLES_BUTTON_PRIMARY
    }, props));
  }

  return jsx("button", _extends_1({
    css: STYLES_BUTTON_PRIMARY
  }, props));
};
var STYLES_BUTTON_PRIMARY_FULL = react.css(_templateObject2(), STYLES_BUTTON_FULL, system.brand, system.white, system.brand);
var ButtonPrimaryFull = function ButtonPrimaryFull(props) {
  if (props.type === 'label') {
    return jsx("label", _extends_1({
      css: STYLES_BUTTON_PRIMARY_FULL
    }, props));
  }

  return jsx("button", _extends_1({
    css: STYLES_BUTTON_PRIMARY_FULL
  }, props));
};
var STYLES_BUTTON_SECONDARY = react.css(_templateObject3(), STYLES_BUTTON, system.black, system.white, system.pitchBlack, system.black);
var ButtonSecondary = function ButtonSecondary(props) {
  if (props.type === 'label') {
    return jsx("label", _extends_1({
      css: STYLES_BUTTON_SECONDARY
    }, props));
  }

  return jsx("button", _extends_1({
    css: STYLES_BUTTON_SECONDARY
  }, props));
};
var STYLES_BUTTON_SECONDARY_FULL = react.css(_templateObject4(), STYLES_BUTTON_FULL, system.black, system.white, system.pitchBlack, system.black);
var ButtonSecondaryFull = function ButtonSecondaryFull(props) {
  if (props.type === 'label') {
    return jsx("label", _extends_1({
      css: STYLES_BUTTON_SECONDARY_FULL
    }, props));
  }

  return jsx("button", _extends_1({
    css: STYLES_BUTTON_SECONDARY_FULL
  }, props));
};
var STYLES_BUTTON_DISABLED = react.css(_templateObject5(), STYLES_BUTTON, system.gray, system.darkGray);
var ButtonDisabled = function ButtonDisabled(props) {
  return jsx("button", _extends_1({
    css: STYLES_BUTTON_DISABLED
  }, props));
};
var STYLES_BUTTON_DISABLED_FULL = react.css(_templateObject6(), STYLES_BUTTON_FULL, system.gray, system.darkGray);
var ButtonDisabledFull = function ButtonDisabledFull(props) {
  return jsx("button", _extends_1({
    css: STYLES_BUTTON_DISABLED_FULL
  }, props));
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject2$1() {
  var data = taggedTemplateLiteral(["\n  background: #fdfdfd;\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 14px;\n  font-family: 'inter-semi-bold';\n  height: 48px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: 200ms ease all;\n  user-select: none;\n  border-bottom: 2px solid transparent;\n\n  :last-child {\n    box-shadow: none;\n  }\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  box-shadow: 0 -1px 0 0 ", ", 0 1px 0 0 ", ";\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var TAB_GROUP_SIZE_MAP = {
  1: '100%',
  2: '50%',
  3: '33.33%',
  4: '25%'
};
var STYLES_CARD_TAB_GROUP = react.css(_templateObject$1(), system.border, system.border);
var STYLES_CARD_TAB_GROUP_TAB = react.css(_templateObject2$1(), system.brand);
var CardTabGroup = /*#__PURE__*/function (_React$Component) {
  inherits(CardTabGroup, _React$Component);

  var _super = _createSuper(CardTabGroup);

  function CardTabGroup() {
    var _this;

    classCallCheck(this, CardTabGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value
        }
      });
    });

    return _this;
  }

  createClass(CardTabGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return jsx("div", {
        css: STYLES_CARD_TAB_GROUP,
        style: this.props.style
      }, this.props.options.map(function (tab) {
        var selected = tab.value === _this2.props.value;
        return jsx("div", {
          css: STYLES_CARD_TAB_GROUP_TAB,
          key: tab.value,
          style: {
            color: selected ? system.brand : null,
            backgroundColor: selected ? system.white : null,
            borderBottom: selected ? "2px solid ".concat(system.brand) : null,
            width: TAB_GROUP_SIZE_MAP[_this2.props.options.length],
            cursor: !selected ? 'pointer' : null
          },
          onClick: function onClick() {
            return _this2._handleChange(tab.value);
          }
        }, tab.label);
      }));
    }
  }]);

  return CardTabGroup;
}(React.Component);

var __jsx = React__default.createElement;
var FileImage = function FileImage(props) {
  return jsx("svg", {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    height: props.height,
    style: props.style
  }, jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, jsx("path", {
    d: "m21.207 4.5-.00000002-.00000002c.187549.187493.292943.441805.293.707v17.293c0 .552285-.447715 1-1 1h-17-.00000004c-.552285-.00000002-1-.447715-1-1v-21 .00000015c-.00000008-.552285.447715-1 1-1h13.293.00000001c.265195.00005664.519507.105451.707.293z"
  }), jsx("path", {
    d: "m12.826 12.366-2.8-3.74.00000001.00000002c-.165798-.22083-.479221-.265442-.700051-.0996437-.0578698.0434484-.105619.0989405-.139949.162644l-3.276 6.074.00000001-.00000002c-.130892.24315-.0398879.546371.203262.677262.0727636.0391698.154101.0596942.236738.0597376h4.181"
  }), jsx("path", {
    d: "m17.3284 13.1716c1.5621 1.5621 1.5621 4.09476 0 5.65685-1.5621 1.5621-4.09476 1.5621-5.65685 0-1.5621-1.5621-1.5621-4.09476 0-5.65685 1.5621-1.5621 4.09476-1.5621 5.65685 0"
  })));
};
var Information = function Information(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("path", {
    fill: "currentColor",
    d: "m12 0h-.00000052c-6.62742.00000029-12 5.37258-12 12 .00000029 6.62742 5.37258 12 12 12 6.62742-.00000029 12-5.37258 12-12l-.00000013-.00012266c-.00723277-6.62445-5.37568-11.9928-12.0001-11.9999zm0 19h-.00000007c-.828427-.00000004-1.5-.671573-1.5-1.5.00000004-.828427.671573-1.5 1.5-1.5.828427.00000004 1.5.671573 1.5 1.5v-.00000007c0 .828427-.671573 1.5-1.5 1.5zm1.6-6.08h.00000001c-.364588.159119-.600193.519202-.6.917 0 .552285-.447715 1-1 1s-1-.447715-1-1l-.00000003-.00045412c-.00000018-1.19303.706913-2.27268 1.80042-2.74973l.00000001-.00000001c1.01225-.442058 1.47449-1.62101 1.03243-2.63326-.442058-1.01225-1.62101-1.47449-2.63326-1.03243-.728973.318347-1.19999 1.03843-1.19958 1.83388 0 .552285-.447715 1-1 1s-1-.447715-1-1v-.00005995c-.00000033-2.20914 1.79086-4 4-4 2.20914-.00000033 4 1.79086 4 4 .00000024 1.59051-.942318 3.0299-2.40005 3.66609z"
  }));
};
var ChevronDown = function ChevronDown(props) {
  return jsx("svg", _extends_1({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, props), jsx("polyline", {
    points: "6 9 12 15 18 9"
  }));
};
var CheckBox = function CheckBox(props) {
  return jsx("svg", _extends_1({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, props), jsx("polyline", {
    points: "20 6 9 17 4 12"
  }));
};
var CopyAndPaste = function CopyAndPaste(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, jsx("path", {
    d: "m9.5 21.5h-8-.00000004c-.552285-.00000002-1-.447715-1-1v-16 .00000015c-.00000008-.552285.447715-1 1-1h2"
  }), jsx("path", {
    d: "m13.5 3.5h2-.00000004c.552285-.00000002 1 .447715 1 1v3.5"
  }), jsx("path", {
    d: "m9.56066.93834c.585786.585786.585786 1.53553 0 2.12132-.585786.585786-1.53553.585786-2.12132 0-.585786-.585786-.585786-1.53553 0-2.12132.585786-.585786 1.53553-.585786 2.12132 0"
  }), jsx("path", {
    d: "m9.915 2.5h2.585-.00000004c.552285-.00000002 1 .447715 1 1v1c0 .552285-.447715 1-1 1h-8-.00000004c-.552285-.00000002-1-.447715-1-1v-1 .00000015c-.00000008-.552285.447715-1 1-1h2.585"
  }), jsx("path", {
    d: "m22.5 22.5c0 .552285-.447715 1-1 1h-9-.00000004c-.552285-.00000002-1-.447715-1-1v-11.5.00000015c-.00000008-.552285.447715-1 1-1h7.086.00000001c.265195.00005664.519507.105451.707.293l1.914 1.914-.00000002-.00000002c.187549.187493.292943.441805.293.707z"
  }), jsx("path", {
    d: "m14.5 14.5h5"
  }), jsx("path", {
    d: "m14.5 17.5h5"
  })));
};
var BandwidthDown = function BandwidthDown(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("path", {
    d: "m20.25 17.25h-.00000013c1.65685-.00000007 3 1.34315 3 3 .00000007 1.65685-1.34315 3-3 3h-16.5-.00000013c-1.65685-.00000007-3-1.34315-3-3 .00000007-1.65685 1.34315-3 3-3z"
  }), jsx("path", {
    d: "m7.5 6.751h-1.356-.00000002c-1.39991-.00004099-2.61375.968129-2.925 2.333l-2.394 10.499"
  }), jsx("path", {
    d: "m23.175 19.583-2.394-10.5.00000014.0000006c-.311246-1.36487-1.52509-2.33304-2.925-2.333h-1.356"
  }), jsx("path", {
    d: "m19.125 19.875h-.00000002c-.207107.00000001-.375.167893-.375.375.00000001.207107.167893.375.375.375.207107-.00000001.375-.167893.375-.375 0-.207107-.167893-.375-.375-.375"
  }), jsx("path", {
    d: "m9.75 20.25h-5.25"
  }), jsx("path", {
    d: "m9 9.75 3 3 3-3"
  }), jsx("path", {
    d: "m12 12.75v-12"
  })));
};
var BandwidthUp = function BandwidthUp(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("path", {
    d: "m20.25 17.25h-.00000013c1.65685-.00000007 3 1.34315 3 3 .00000007 1.65685-1.34315 3-3 3h-16.5-.00000013c-1.65685-.00000007-3-1.34315-3-3 .00000007-1.65685 1.34315-3 3-3z"
  }), jsx("path", {
    d: "m7.5 6.751h-1.356-.00000002c-1.39991-.00004099-2.61375.968129-2.925 2.333l-2.394 10.499"
  }), jsx("path", {
    d: "m23.175 19.583-2.394-10.5.00000014.0000006c-.311246-1.36487-1.52509-2.33304-2.925-2.333h-1.356"
  }), jsx("path", {
    d: "m19.125 19.875h-.00000002c-.207107.00000001-.375.167893-.375.375.00000001.207107.167893.375.375.375.207107-.00000001.375-.167893.375-.375 0-.207107-.167893-.375-.375-.375"
  }), jsx("path", {
    d: "m9.75 20.25h-5.25"
  }), jsx("path", {
    d: "m15 3.75-3-3-3 3"
  }), jsx("path", {
    d: "m12 .75v12"
  })));
};
var CheckCircle = function CheckCircle(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("path", {
    d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
  }), jsx("path", {
    d: "M16.6666 8.5L10.25 14.9167L7.33331 12"
  })));
};
var InfoCircle = function InfoCircle(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), jsx("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), jsx("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })));
};
var AlertCircle = function AlertCircle(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), jsx("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), jsx("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })));
};
var XCircle = function XCircle(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), jsx("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), jsx("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  })));
};
var X = function X(props) {
  return jsx("svg", _extends_1({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), jsx("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, jsx("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), jsx("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })));
};

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject4$1() {
  var data = taggedTemplateLiteral(["\n  font-size: 14px;\n  min-width: 10%;\n  width: 100%;\n  line-height: 1.5;\n  padding-top: 2px;\n  overflow-wrap: break-word;\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = taggedTemplateLiteral(["\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  height: 1px;\n  width: 1px;\n  position: absolute;\n  top: 0;\n  left: 0;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = taggedTemplateLiteral(["\n  box-shadow: 0 0 0 1px ", ";\n  background-color: ", ";\n  height: 32px;\n  width: 32px;\n  border-radius: 3px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n  margin-right: 16px;\n  flex-shrink: 0;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_CHECKBOX = react.css(_templateObject$2());
var STYLES_CHECKBOX_FIGURE = react.css(_templateObject2$2(), system.darkGray, system.white);
var STYLES_CHECKBOX_INPUT = react.css(_templateObject3$1());
var STYLES_CHECKBOX_LABEL = react.css(_templateObject4$1());
var CheckBox$1 = /*#__PURE__*/function (_React$Component) {
  inherits(CheckBox$1, _React$Component);

  var _super = _createSuper$1(CheckBox$1);

  function CheckBox$1() {
    var _this;

    classCallCheck(this, CheckBox$1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: !_this.props.value
        }
      });
    });

    return _this;
  }

  createClass(CheckBox$1, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return jsx("label", {
        css: STYLES_CHECKBOX,
        style: this.props.style
      }, jsx("figure", {
        css: STYLES_CHECKBOX_FIGURE
      }, this.props.value ? jsx(CheckBox, {
        height: "20px"
      }) : null), jsx("input", {
        css: STYLES_CHECKBOX_INPUT,
        name: this.props.name,
        type: "checkbox",
        checked: this.props.value,
        onChange: function onChange() {
          return _this2._handleChange(_this2.props.value);
        }
      }), jsx("span", {
        css: STYLES_CHECKBOX_LABEL
      }, this.props.children));
    }
  }]);

  return CheckBox$1;
}(React.Component);

function _templateObject$3() {
  var data = taggedTemplateLiteral(["\n  font-family: \"mono\";\n  background-color: ", ";\n  color: ", ";\n  border-radius: 4px;\n  padding: 24px;\n  font-size: 12px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  width: 100%;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_CODE_BLOCK = react.css(_templateObject$3(), system.black, system.white);
var CodeBlock = function CodeBlock(props) {
  return jsx("div", {
    css: STYLES_CODE_BLOCK
  }, jsx("code", props));
};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

var HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
var SIZING_STYLE = ["letter-spacing", "line-height", "font-family", "font-weight", "font-size", "font-style", "tab-size", "text-rendering", "text-transform", "width", "text-indent", "padding-top", "padding-right", "padding-bottom", "padding-left", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "box-sizing"];
var computedStyleCache = {};
var hiddenTextarea = process.browser && document.createElement("textarea");

var forceHiddenStyles = function forceHiddenStyles(node) {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function (key) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
};

if (process.browser) {
  hiddenTextarea.setAttribute("tab-index", "-1");
  hiddenTextarea.setAttribute("aria-hidden", "true");
  forceHiddenStyles(hiddenTextarea);
}

function calculateNodeHeight(uiTextNode, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var minRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var maxRows = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  } // Copy all CSS properties that have an impact on the height of the content in
  // the textbox


  var nodeStyling = calculateNodeStyling(uiTextNode, uid, useCache);

  if (nodeStyling === null) {
    return null;
  }

  var paddingSize = nodeStyling.paddingSize,
      borderSize = nodeStyling.borderSize,
      boxSizing = nodeStyling.boxSizing,
      sizingStyle = nodeStyling.sizingStyle; // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content

  Object.keys(sizingStyle).forEach(function (key) {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles(hiddenTextarea);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "x";
  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var height = hiddenTextarea.scrollHeight;

  if (boxSizing === "border-box") {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    // remove padding, since height = content
    height = height - paddingSize;
  } // measure height of a textarea with a single row


  hiddenTextarea.value = "x";
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize; // Stores the value's rows count rendered in `hiddenTextarea`,
  // regardless if `maxRows` or `minRows` props are passed

  var valueRowCount = Math.floor(height / singleRowHeight);

  if (minRows !== null) {
    minHeight = singleRowHeight * minRows;

    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }

    height = Math.max(minHeight, height);
  }

  if (maxRows !== null) {
    maxHeight = singleRowHeight * maxRows;

    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }

    height = Math.min(maxHeight, height);
  }

  var rowCount = Math.floor(height / singleRowHeight);
  return {
    height: height,
    minHeight: minHeight,
    maxHeight: maxHeight,
    rowCount: rowCount,
    valueRowCount: valueRowCount
  };
}

function calculateNodeStyling(node, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (useCache && computedStyleCache[uid]) {
    return computedStyleCache[uid];
  }

  var style = window.getComputedStyle(node);

  if (style === null) {
    return null;
  }

  var sizingStyle = SIZING_STYLE.reduce(function (obj, name) {
    obj[name] = style.getPropertyValue(name);
    return obj;
  }, {});
  var boxSizing = sizingStyle["box-sizing"]; // probably node is detached from DOM, can't read computed dimensions

  if (boxSizing === "") {
    return null;
  }

  var paddingSize = parseFloat(sizingStyle["padding-bottom"]) + parseFloat(sizingStyle["padding-top"]);
  var borderSize = parseFloat(sizingStyle["border-bottom-width"]) + parseFloat(sizingStyle["border-top-width"]);
  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing
  };

  if (useCache) {
    computedStyleCache[uid] = nodeInfo;
  }

  return nodeInfo;
}

var purgeCache = function purgeCache(uid) {
  delete computedStyleCache[uid];
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var noop = function noop() {};

var uid = 0;

var TextareaAutosize = /*#__PURE__*/function (_React$Component) {
  inherits(TextareaAutosize, _React$Component);

  var _super = _createSuper$2(TextareaAutosize);

  function TextareaAutosize(props) {
    var _this;

    classCallCheck(this, TextareaAutosize);

    _this = _super.call(this, props);

    defineProperty(assertThisInitialized(_this), "_onRef", function (node) {
      _this._ref = node;
      var inputRef = _this.props.inputRef;

      if (typeof inputRef === "function") {
        inputRef(node);
        return;
      }

      inputRef.current = node;
    });

    defineProperty(assertThisInitialized(_this), "_onChange", function (event) {
      if (!_this._controlled) {
        _this._resizeComponent();
      }

      _this.props.onChange(event, assertThisInitialized(_this));
    });

    defineProperty(assertThisInitialized(_this), "_resizeComponent", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      if (!process.env.BROWSER && !_this._ref) {
        callback();
        return;
      }

      var nodeHeight = calculateNodeHeight(_this._ref, _this._uid, _this.props.useCacheForDOMMeasurements, _this.props.minRows, _this.props.maxRows);

      if (nodeHeight === null) {
        callback();
        return;
      }

      var height = nodeHeight.height,
          minHeight = nodeHeight.minHeight,
          maxHeight = nodeHeight.maxHeight,
          rowCount = nodeHeight.rowCount,
          valueRowCount = nodeHeight.valueRowCount;
      _this.rowCount = rowCount;
      _this.valueRowCount = valueRowCount;

      if (_this.state.height !== height || _this.state.minHeight !== minHeight || _this.state.maxHeight !== maxHeight) {
        _this.setState({
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight
        }, callback);

        return;
      }

      callback();
    });

    _this.state = {
      height: props.style && props.style.height || 0,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
    _this._uid = uid++;
    _this._controlled = props.value !== undefined;
    _this._resizeLock = false;
    return _this;
  }

  createClass(TextareaAutosize, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          inputRef = _this$props.inputRef,
          maxRows = _this$props.maxRows,
          minRows = _this$props.minRows,
          onHeightChange = _this$props.onHeightChange,
          useCacheForDOMMeasurements = _this$props.useCacheForDOMMeasurements,
          props = objectWithoutProperties(_this$props, ["inputRef", "maxRows", "minRows", "onHeightChange", "useCacheForDOMMeasurements"]);

      props.style = _objectSpread(_objectSpread({}, props.style), {}, {
        height: this.state.height
      });
      var maxHeight = Math.max(props.style.maxHeight || Infinity, this.state.maxHeight);

      if (maxHeight < this.state.height) {
        props.style.overflow = "hidden";
      }

      return jsx("textarea", _extends_1({}, props, {
        onChange: this._onChange,
        ref: this._onRef
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this._resizeComponent(); // Working around Firefox bug which runs resize listeners even when other JS is running at the same moment
      // causing competing rerenders (due to setState in the listener) in React.
      // More can be found here - facebook/react#6324


      this._resizeListener = function () {
        if (_this2._resizeLock) {
          return;
        }

        _this2._resizeLock = true;

        _this2._resizeComponent(function () {
          _this2._resizeLock = false;
        });
      };

      window.addEventListener("resize", this._resizeListener);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) {
        this._resizeComponent();
      }

      if (this.state.height !== prevState.height) {
        this.props.onHeightChange(this.state.height, this);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this._resizeListener);
      purgeCache(this._uid);
    }
  }]);

  return TextareaAutosize;
}(React.Component);

defineProperty(TextareaAutosize, "defaultProps", {
  inputRef: noop,
  onChange: noop,
  onHeightChange: noop,
  useCacheForDOMMeasurements: false
});

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject$4() {
  var data = taggedTemplateLiteral(["\n  font-family: 'mono';\n  display: block;\n  max-width: 480px;\n  border-radius: 4px;\n  width: 100%;\n  background: ", ";\n  min-height: 288px;\n  padding: 24px;\n  color: ", ";\n  resize: none;\n  font-size: 14px;\n  box-sizing: border-box;\n  outline: 0;\n  border: 0;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  scrollbar-width: none;\n  white-space: pre-wrap;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_CODE_TEXTAREA = react.css(_templateObject$4(), system.pitchBlack, system.white);
var CodeTextarea = /*#__PURE__*/function (_React$Component) {
  inherits(CodeTextarea, _React$Component);

  var _super = _createSuper$3(CodeTextarea);

  function CodeTextarea() {
    classCallCheck(this, CodeTextarea);

    return _super.apply(this, arguments);
  }

  createClass(CodeTextarea, [{
    key: "render",
    value: function render() {
      return jsx(TextareaAutosize, {
        value: this.props.value,
        name: this.props.name,
        onChange: this.props.onChange,
        css: STYLES_CODE_TEXTAREA
      });
    }
  }]);

  return CodeTextarea;
}(React.Component);

var bytesToSize = function bytesToSize(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return "0 Bytes";
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
var isEmpty = function isEmpty(string) {
  return !string || !string.toString().trim();
};
var pluralize = function pluralize(text, count) {
  return count > 1 || count === 0 ? "".concat(text, "s") : text;
};
var toDate = function toDate(data) {
  var date = new Date(data);
  return "".concat(date.getMonth() + 1, "-").concat(date.getDate(), "-").concat(date.getFullYear());
};

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser$3 = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser$3 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser$3 && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser$3 && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser$3 && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck$1 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty$1 = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser$3 && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty$1({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty$1({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty$1({}, side, reference[side]),
      end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck$1(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass$1(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var reactTippy = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory(React__default, Popper, reactDom);
})(commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Browser = exports.Browser = {};

if (typeof window !== 'undefined') {
  Browser.SUPPORTED = 'requestAnimationFrame' in window;
  Browser.SUPPORTS_TOUCH = 'ontouchstart' in window;
  Browser.touch = false;
  Browser.dynamicInputDetection = true;
  // Chrome device/touch emulation can make this dynamic
  Browser.iOS = function () {
    return (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream
    );
  };
}

/**
* The global storage array which holds all data reference objects
* from every instance
* This allows us to hide tooltips from all instances, finding the ref when
* clicking on the body, and for followCursor
*/
var Store = exports.Store = [];

/**
* Selector constants used for grabbing elements
*/
var Selectors = exports.Selectors = {
  POPPER: '.tippy-popper',
  TOOLTIP: '.tippy-tooltip',
  CONTENT: '.tippy-tooltip-content',
  CIRCLE: '[x-circle]',
  ARROW: '[x-arrow]',
  TOOLTIPPED_EL: '[data-tooltipped]',
  CONTROLLER: '[data-tippy-controller]'
};

/**
* The default settings applied to each instance
*/
var Defaults = exports.Defaults = {
  html: false,
  position: 'top',
  animation: 'shift',
  animateFill: true,
  arrow: false,
  arrowSize: 'regular',
  delay: 0,
  trigger: 'mouseenter focus',
  duration: 350,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  size: 'regular',
  distance: 10,
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  flipDuration: 350,
  sticky: false,
  stickyDuration: 200,
  appendTo: function appendTo() {
    return document.body;
  },
  zIndex: 9999,
  touchHold: false,
  performance: false,
  dynamicTitle: false,
  useContext: false,
  reactInstance: undefined,
  popperOptions: {},
  open: undefined,
  onRequestClose: function onRequestClose() {}
};

/**
* The keys of the defaults object for reducing down into a new object
* Used in `getIndividualSettings()`
*/
var DefaultsKeys = exports.DefaultsKeys = Browser.SUPPORTED && Object.keys(Defaults);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefix;
/**
* Returns the supported prefixed property - only `webkit` is needed, `moz`, `ms` and `o` are obsolete
* @param {String} property
* @return {String} - browser supported prefixed property
*/
function prefix(property) {
  var prefixes = [false, 'webkit'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var _prefix = prefixes[i];
    var prefixedProp = _prefix ? '' + _prefix + upperProp : property;
    if (typeof window.document.body.style[prefixedProp] !== 'undefined') {
      return prefixedProp;
    }
  }

  return null;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;
/**
* Ponyfill for Array.prototype.find
* @param {Array} arr
* @param {Function} checkFn
* @return item in the array
*/
function find(arr, checkFn) {
  if (Array.prototype.find) {
    return arr.find(checkFn);
  }

  // use `filter` as fallback
  return arr.filter(checkFn)[0];
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCorePlacement;
/**
* Returns the non-shifted placement (e.g., 'bottom-start' => 'bottom')
* @param {String} placement
* @return {String}
*/
function getCorePlacement(placement) {
  return placement.replace(/-.+/, '');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = __webpack_require__(8);

/**
* Ponyfill to get the closest parent element
* @param {Element} element - child of parent to be returned
* @param {String} parentSelector - selector to match the parent if found
* @return {Element}
*/
function closest(element, parentSelector) {
  var _closest = Element.prototype.closest || function (selector) {
    var el = this;
    while (el) {
      if (_matches.matches.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
  };

  return _closest.call(element, parentSelector);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defer;
/**
* Waits until next repaint to execute a fn
* @param {Function} fn
*/
function defer(fn) {
  window.requestAnimationFrame(function () {
    setTimeout(fn, 0);
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInnerElements;

var _globals = __webpack_require__(0);

/**
* Returns inner elements of the popper element
* @param {Element} popper
* @return {Object}
*/
function getInnerElements(popper) {
  return {
    tooltip: popper.querySelector(_globals.Selectors.TOOLTIP),
    circle: popper.querySelector(_globals.Selectors.CIRCLE),
    content: popper.querySelector(_globals.Selectors.CONTENT)
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVisible;
/**
* Determines if a popper is currently visible
* @param {Element} popper
* @return {Boolean}
*/
function isVisible(popper) {
  return popper.style.visibility === 'visible';
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
function defaultMatchSelector(s) {
  var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i = matches.length;
  while (--i >= 0 && matches.item(i) !== this) {}
  return i > -1;
}

var matches = exports.matches = typeof window === 'undefined' ? defaultMatchSelector : Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || defaultMatchSelector;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _tippy = __webpack_require__(30);

var _tippy2 = _interopRequireDefault(_tippy);

var _globals = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stopPortalEvent = function stopPortalEvent(e) {
  return e.stopPropagation();
};

var defaultProps = {
  html: null,
  position: 'top',
  animation: 'shift',
  animateFill: true,
  arrow: false,
  delay: 0,
  hideDelay: 0,
  trigger: 'mouseenter focus',
  duration: 375,
  hideDuration: 375,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  popperOptions: {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onHide: function onHide() {},
  onHidden: function onHidden() {},
  disabled: false,
  arrowSize: 'regular',
  size: 'regular',
  className: '',
  style: {},
  distance: 10,
  onRequestClose: function onRequestClose() {},
  sticky: false,
  stickyDuration: 200,
  tag: 'div',
  touchHold: false,
  unmountHTMLWhenHide: false,
  zIndex: 9999
};

var propKeys = Object.keys(defaultProps);

var detectPropsChanged = function detectPropsChanged(props, prevProps) {
  var result = [];
  propKeys.forEach(function (key) {
    if (props[key] !== prevProps[key]) {
      result.push(key);
    }
  });
  return result;
};

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.initTippy = _this._initTippy.bind(_this);
    _this.destroyTippy = _this._destroyTippy.bind(_this);
    _this.updateTippy = _this._updateTippy.bind(_this);
    _this.updateReactDom = _this._updateReactDom.bind(_this);
    _this.showTooltip = _this._showTooltip.bind(_this);
    _this.hideTooltip = _this._hideTooltip.bind(_this);
    _this.updateSettings = _this._updateSettings.bind(_this);

    _this.state = {
      reactDOMValue: null
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      this.initTippy();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      this.destroyTippy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      // enable and disabled
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.props.disabled === false && prevProps.disabled === true) {
        this.updateSettings('disabled', false);
        this.destroyTippy();
        this.initTippy();
        return;
      }

      if (this.props.disabled === true && prevProps.disabled === false) {
        this.updateSettings('disabled', true);
        this.destroyTippy();
        return;
      }

      // open
      if (this.props.open === true && !prevProps.open) {
        this.updateSettings('open', true);
        setTimeout(function () {
          _this2.showTooltip();
        }, 0);
      }
      if (this.props.open === false && prevProps.open === true) {
        this.updateSettings('open', false);
        this.hideTooltip();
      }

      if (this.props.html !== prevProps.html) {
        this.updateReactDom();
      }

      // Update content
      if (this.props.title !== prevProps.title) {
        this.updateTippy();
      }

      // update otherProps
      var propChanges = detectPropsChanged(this.props, prevProps);
      propChanges.forEach(function (key) {
        _this2.updateSettings(key, _this2.props[key]);
      });
    }
  }, {
    key: '_showTooltip',
    value: function _showTooltip() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.show(popper, this.props.duration);
      }
    }
  }, {
    key: '_hideTooltip',
    value: function _hideTooltip() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.hide(popper, this.props.hideDuration);
      }
    }
  }, {
    key: '_updateSettings',
    value: function _updateSettings(name, value) {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.updateSettings(popper, name, value);
      }
    }
  }, {
    key: '_updateReactDom',
    value: function _updateReactDom() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        this.updateSettings('reactDOM', this.props.html);
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        var isVisible = popper.style.visibility === 'visible' || this.props.open;
        if (isVisible) {
          this.tippy.updateForReact(popper, this.props.html);
        }
      }
    }
  }, {
    key: '_updateTippy',
    value: function _updateTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.update(popper);
      }
    }
  }, {
    key: '_initTippy',
    value: function _initTippy() {
      var _this3 = this;

      if (typeof window === 'undefined' || typeof document === 'undefined' || !_globals.Browser.SUPPORTED) {
        return;
      }
      if (!this.props.disabled) {
        if (this.props.title) {
          this.tooltipDOM.setAttribute('title', this.props.title);
        }

        this.tippy = (0, _tippy2.default)(this.tooltipDOM, {
          disabled: this.props.disabled,
          position: this.props.position,
          animation: this.props.animation,
          animateFill: this.props.animateFill,
          arrow: this.props.arrow,
          arrowSize: this.props.arrowSize,
          delay: this.props.delay,
          hideDelay: this.props.hideDelay,
          trigger: this.props.trigger,
          duration: this.props.duration,
          hideDuration: this.props.hideDuration,
          interactive: this.props.interactive,
          interactiveBorder: this.props.interactiveBorder,
          theme: this.props.theme,
          offset: this.props.offset,
          hideOnClick: this.props.hideOnClick,
          multiple: this.props.multiple,
          size: this.props.size,
          followCursor: this.props.followCursor,
          inertia: this.props.inertia,
          popperOptions: this.props.popperOptions,
          onShow: this.props.onShow,
          onShown: this.props.onShown,
          onHide: this.props.onHide,
          onHidden: this.props.onHidden,
          distance: this.props.distance,
          reactDOM: this.props.html,
          setReactDOMValue: function setReactDOMValue(newReactDOM) {
            return _this3.setState({ reactDOMValue: newReactDOM });
          },
          unmountHTMLWhenHide: this.props.unmountHTMLWhenHide,
          open: this.props.open,
          sticky: this.props.sticky,
          stickyDuration: this.props.stickyDuration,
          tag: this.props.tag,
          touchHold: this.props.touchHold,
          onRequestClose: this.props.onRequestClose,
          useContext: this.props.useContext,
          reactInstance: this.props.useContext ? this : undefined,
          performance: true,
          html: this.props.rawTemplate ? this.props.rawTemplate : undefined,
          zIndex: this.props.zIndex
        });
        if (this.props.open) {
          this.showTooltip();
        }
      } else {
        this.tippy = null;
      }
    }
  }, {
    key: '_destroyTippy',
    value: function _destroyTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.updateSettings('open', false);
        this.tippy.hide(popper, 0);
        this.tippy.destroy(popper);
        this.tippy = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var Tag = this.props.tag;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          Tag,
          {
            ref: function ref(tooltip) {
              _this4.tooltipDOM = tooltip;
            },
            title: this.props.title,
            className: this.props.className,
            tabIndex: this.props.tabIndex,
            style: _extends({
              display: 'inline'
            }, this.props.style)
          },
          this.props.children
        ),
        this.state.reactDOMValue && _react2.default.createElement(
          'div',
          {
            onClick: stopPortalEvent,
            onContextMenu: stopPortalEvent,
            onDoubleClick: stopPortalEvent,
            onDrag: stopPortalEvent,
            onDragEnd: stopPortalEvent,
            onDragEnter: stopPortalEvent,
            onDragExit: stopPortalEvent,
            onDragLeave: stopPortalEvent,
            onDragOver: stopPortalEvent,
            onDragStart: stopPortalEvent,
            onDrop: stopPortalEvent,
            onMouseDown: stopPortalEvent,
            onMouseEnter: stopPortalEvent,
            onMouseLeave: stopPortalEvent,
            onMouseMove: stopPortalEvent,
            onMouseOver: stopPortalEvent,
            onMouseOut: stopPortalEvent,
            onMouseUp: stopPortalEvent,

            onKeyDown: stopPortalEvent,
            onKeyPress: stopPortalEvent,
            onKeyUp: stopPortalEvent,

            onFocus: stopPortalEvent,
            onBlur: stopPortalEvent,

            onChange: stopPortalEvent,
            onInput: stopPortalEvent,
            onInvalid: stopPortalEvent,
            onSubmit: stopPortalEvent
          },
          this.state.reactDOMValue
        )
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = followCursorHandler;

var _globals = __webpack_require__(0);

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _closest = __webpack_require__(4);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Mousemove event listener callback method for follow cursor setting
* @param {MouseEvent} e
*/
function followCursorHandler(e) {
  var _this = this;

  var refData = (0, _find2.default)(_globals.Store, function (refData) {
    return refData.el === _this;
  });
  if (!refData) return;

  var popper = refData.popper,
      offset = refData.settings.offset;


  var position = (0, _getCorePlacement2.default)(popper.getAttribute('x-placement'));
  var halfPopperWidth = Math.round(popper.offsetWidth / 2);
  var halfPopperHeight = Math.round(popper.offsetHeight / 2);
  var viewportPadding = 5;
  var pageWidth = document.documentElement.offsetWidth || document.body.offsetWidth;

  var pageX = e.pageX,
      pageY = e.pageY;


  var x = void 0,
      y = void 0;

  switch (position) {
    case 'top':
      x = pageX - halfPopperWidth + offset;
      y = pageY - 2.25 * halfPopperHeight;
      break;
    case 'left':
      x = pageX - 2 * halfPopperWidth - 10;
      y = pageY - halfPopperHeight + offset;
      break;
    case 'right':
      x = pageX + halfPopperHeight;
      y = pageY - halfPopperHeight + offset;
      break;
    case 'bottom':
      x = pageX - halfPopperWidth + offset;
      y = pageY + halfPopperHeight / 1.5;
      break;
  }

  var isRightOverflowing = pageX + viewportPadding + halfPopperWidth + offset > pageWidth;
  var isLeftOverflowing = pageX - viewportPadding - halfPopperWidth + offset < 0;

  // Prevent left/right overflow
  if (position === 'top' || position === 'bottom') {
    if (isRightOverflowing) {
      x = pageWidth - viewportPadding - 2 * halfPopperWidth;
    }

    if (isLeftOverflowing) {
      x = viewportPadding;
    }
  }

  popper.style[(0, _prefix2.default)('transform')] = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetDistanceInPx;

var _globals = __webpack_require__(0);

/**
* Returns the distance taking into account the default distance due to
* the transform: translate setting in CSS
* @param {Number} distance
* @return {String}
*/
function getOffsetDistanceInPx(distance) {
  return -(distance - _globals.Defaults.distance) + 'px';
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeTitle;
/**
* Removes the title from the tooltipped element, setting `data-original-title`
* appropriately
* @param {Element} el
*/
function removeTitle(el) {
  var title = el.getAttribute('title');

  // Only set `data-original-title` attr if there is a title
  if (title) {
    el.setAttribute('data-original-title', title);
  }

  el.removeAttribute('title');
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var withTooltip = function withTooltip(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (_ref) {
    var props = _objectWithoutProperties(_ref, []);

    return _react2.default.createElement(
      _component2.default,
      options,
      _react2.default.createElement(Component, props)
    );
  };
};

exports.default = withTooltip;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTooltip = exports.Tooltip = undefined;

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

var _hoc = __webpack_require__(14);

var _hoc2 = _interopRequireDefault(_hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tooltip = _component2.default;
exports.withTooltip = _hoc2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bindEventListeners;

var _globals = __webpack_require__(0);

var _hideAllPoppers = __webpack_require__(25);

var _hideAllPoppers2 = _interopRequireDefault(_hideAllPoppers);

var _closest = __webpack_require__(4);

var _closest2 = _interopRequireDefault(_closest);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _matches = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Adds the needed event listeners
*/
function bindEventListeners() {
  var touchHandler = function touchHandler() {
    _globals.Browser.touch = true;

    if (_globals.Browser.iOS()) {
      document.body.classList.add('tippy-touch');
    }

    if (_globals.Browser.dynamicInputDetection && window.performance) {
      document.addEventListener('mousemove', mousemoveHandler);
    }
  };

  var mousemoveHandler = function () {
    var time = void 0;

    return function () {
      var now = performance.now();

      // Chrome 60+ is 1 mousemove per rAF, use 20ms time difference
      if (now - time < 20) {
        _globals.Browser.touch = false;
        document.removeEventListener('mousemove', mousemoveHandler);
        if (!_globals.Browser.iOS()) {
          document.body.classList.remove('tippy-touch');
        }
      }

      time = now;
    };
  }();

  var clickHandler = function clickHandler(event) {
    // Simulated events dispatched on the document
    if (!(event.target instanceof Element)) {
      return (0, _hideAllPoppers2.default)();
    }

    var el = (0, _closest2.default)(event.target, _globals.Selectors.TOOLTIPPED_EL);
    var popper = (0, _closest2.default)(event.target, _globals.Selectors.POPPER);

    if (popper) {
      var ref = (0, _find2.default)(_globals.Store, function (ref) {
        return ref.popper === popper;
      });
      if (!ref) return;

      var interactive = ref.settings.interactive;

      if (interactive) return;
    }

    if (el) {
      var _ref = (0, _find2.default)(_globals.Store, function (ref) {
        return ref.el === el;
      });
      if (!_ref) return;

      var _ref$settings = _ref.settings,
          hideOnClick = _ref$settings.hideOnClick,
          multiple = _ref$settings.multiple,
          trigger = _ref$settings.trigger;

      // Hide all poppers except the one belonging to the element that was clicked IF
      // `multiple` is false AND they are a touch user, OR
      // `multiple` is false AND it's triggered by a click

      if (!multiple && _globals.Browser.touch || !multiple && trigger.indexOf('click') !== -1) {
        return (0, _hideAllPoppers2.default)(_ref);
      }

      // If hideOnClick is not strictly true or triggered by a click don't hide poppers
      if (hideOnClick !== true || trigger.indexOf('click') !== -1) return;
    }

    // Don't trigger a hide for tippy controllers, and don't needlessly run loop
    if ((0, _closest2.default)(event.target, _globals.Selectors.CONTROLLER) || !document.querySelector(_globals.Selectors.POPPER)) return;

    (0, _hideAllPoppers2.default)();
  };

  var blurHandler = function blurHandler(event) {
    var _document = document,
        el = _document.activeElement;

    if (el && el.blur && _matches.matches.call(el, _globals.Selectors.TOOLTIPPED_EL)) {
      el.blur();
    }
  };

  // Hook events
  document.addEventListener('click', clickHandler);
  document.addEventListener('touchstart', touchHandler);
  window.addEventListener('blur', blurHandler);

  if (!_globals.Browser.SUPPORTS_TOUCH && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
    document.addEventListener('pointerdown', touchHandler);
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPopperElement;

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _getOffsetDistanceInPx = __webpack_require__(11);

var _getOffsetDistanceInPx2 = _interopRequireDefault(_getOffsetDistanceInPx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a popper element then returns it
* @param {Number} id - the popper id
* @param {String} title - the tooltip's `title` attribute
* @param {Object} settings - individual settings
* @return {Element} - the popper element
*/
function createPopperElement(id, title, settings) {
  var position = settings.position,
      distance = settings.distance,
      arrow = settings.arrow,
      animateFill = settings.animateFill,
      inertia = settings.inertia,
      animation = settings.animation,
      arrowSize = settings.arrowSize,
      size = settings.size,
      theme = settings.theme,
      html = settings.html,
      zIndex = settings.zIndex,
      interactive = settings.interactive;


  var popper = document.createElement('div');
  popper.setAttribute('class', 'tippy-popper');
  popper.setAttribute('role', 'tooltip');
  popper.setAttribute('aria-hidden', 'true');
  popper.setAttribute('id', 'tippy-tooltip-' + id);
  popper.style.zIndex = zIndex;

  var tooltip = document.createElement('div');
  tooltip.setAttribute('class', 'tippy-tooltip tippy-tooltip--' + size + ' leave');
  tooltip.setAttribute('data-animation', animation);

  theme.split(' ').forEach(function (t) {
    tooltip.classList.add(t + '-theme');
  });

  if (arrow) {
    // Add an arrow
    var _arrow = document.createElement('div');
    _arrow.setAttribute('class', 'arrow-' + arrowSize);
    _arrow.setAttribute('x-arrow', '');
    tooltip.appendChild(_arrow);
  }

  if (animateFill) {
    // Create animateFill circle element for animation
    tooltip.setAttribute('data-animatefill', '');
    var circle = document.createElement('div');
    circle.setAttribute('class', 'leave');
    circle.setAttribute('x-circle', '');
    tooltip.appendChild(circle);
  }

  if (inertia) {
    // Change transition timing function cubic bezier
    tooltip.setAttribute('data-inertia', '');
  }

  if (interactive) {
    tooltip.setAttribute('data-interactive', '');
  }

  // Tooltip content (text or HTML)
  var content = document.createElement('div');
  content.setAttribute('class', 'tippy-tooltip-content');

  if (html) {
    var templateId = void 0;

    if (html instanceof Element) {
      content.appendChild(html);
      templateId = '#' + html.id || 'tippy-html-template';
    } else {
      content.innerHTML = document.getElementById(html.replace('#', '')).innerHTML;
      templateId = html;
    }

    popper.classList.add('html-template');
    interactive && popper.setAttribute('tabindex', '-1');
    tooltip.setAttribute('data-template-id', templateId);
  } else {
    content.innerHTML = title;
  }

  // Init distance. Further updates are made in the popper instance's `onUpdate()` method
  tooltip.style[(0, _getCorePlacement2.default)(position)] = (0, _getOffsetDistanceInPx2.default)(distance);

  tooltip.appendChild(content);
  popper.appendChild(tooltip);

  return popper;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createPopperInstance;

var _popper = __webpack_require__(38);

var _popper2 = _interopRequireDefault(_popper);

var _defer = __webpack_require__(5);

var _defer2 = _interopRequireDefault(_defer);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _getInnerElements2 = __webpack_require__(6);

var _getInnerElements3 = _interopRequireDefault(_getInnerElements2);

var _getOffsetDistanceInPx = __webpack_require__(11);

var _getOffsetDistanceInPx2 = _interopRequireDefault(_getOffsetDistanceInPx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a new popper instance
* @param {Object} data
* @return {Object} - the popper instance
*/
function createPopperInstance(data) {
  var el = data.el,
      popper = data.popper,
      _data$settings = data.settings,
      position = _data$settings.position,
      popperOptions = _data$settings.popperOptions,
      offset = _data$settings.offset,
      distance = _data$settings.distance,
      flipDuration = _data$settings.flipDuration;

  var _getInnerElements = (0, _getInnerElements3.default)(popper),
      tooltip = _getInnerElements.tooltip;

  var config = _extends({
    placement: position
  }, popperOptions || {}, {
    modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
      flip: _extends({
        padding: distance + 5 /* 5px from viewport boundary */
      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}),
      offset: _extends({
        offset: offset
      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
    }),
    onUpdate: function onUpdate() {
      var styles = tooltip.style;
      styles.top = '';
      styles.bottom = '';
      styles.left = '';
      styles.right = '';
      styles[(0, _getCorePlacement2.default)(popper.getAttribute('x-placement'))] = (0, _getOffsetDistanceInPx2.default)(distance);
    }
  });

  // Update the popper's position whenever its content changes
  // Not supported in IE10 unless polyfilled
  if (window.MutationObserver) {
    var styles = popper.style;

    var observer = new MutationObserver(function () {
      styles[(0, _prefix2.default)('transitionDuration')] = '0ms';
      data.popperInstance.update();
      (0, _defer2.default)(function () {
        styles[(0, _prefix2.default)('transitionDuration')] = flipDuration + 'ms';
      });
    });

    observer.observe(popper, {
      childList: true,
      subtree: true,
      characterData: true
    });

    data._mutationObserver = observer;
  }

  return new _popper2.default(el, popper, config);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTooltips;

var _getIndividualSettings = __webpack_require__(24);

var _getIndividualSettings2 = _interopRequireDefault(_getIndividualSettings);

var _createPopperElement = __webpack_require__(17);

var _createPopperElement2 = _interopRequireDefault(_createPopperElement);

var _createTrigger = __webpack_require__(20);

var _createTrigger2 = _interopRequireDefault(_createTrigger);

var _getEventListenerHandlers = __webpack_require__(23);

var _getEventListenerHandlers2 = _interopRequireDefault(_getEventListenerHandlers);

var _evaluateSettings = __webpack_require__(21);

var _evaluateSettings2 = _interopRequireDefault(_evaluateSettings);

var _removeTitle = __webpack_require__(12);

var _removeTitle2 = _interopRequireDefault(_removeTitle);

var _globals = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idCounter = 1;

/**
* Creates tooltips for all el elements that match the instance's selector
* @param {Element[]} els
* @return {Object[]} Array of ref data objects
*/
function createTooltips(els) {
  var _this = this;

  return els.reduce(function (a, el) {
    var id = idCounter;

    var settings = (0, _evaluateSettings2.default)(_this.settings.performance ? _this.settings : (0, _getIndividualSettings2.default)(el, _this.settings));

    var html = settings.html,
        reactDOM = settings.reactDOM,
        trigger = settings.trigger,
        touchHold = settings.touchHold;


    var title = el.getAttribute('title');
    if (!title && !html && !reactDOM) return a;

    el.setAttribute('data-tooltipped', '');
    el.setAttribute('aria-describedby', 'tippy-tooltip-' + id);
    (0, _removeTitle2.default)(el);

    var popper = (0, _createPopperElement2.default)(id, title, settings);
    var handlers = _getEventListenerHandlers2.default.call(_this, el, popper, settings);

    var listeners = [];

    trigger.trim().split(' ').forEach(function (event) {
      return listeners = listeners.concat((0, _createTrigger2.default)(event, el, handlers, touchHold));
    });

    a.push({
      id: id,
      el: el,
      popper: popper,
      settings: settings,
      listeners: listeners,
      tippyInstance: _this
    });

    idCounter++;

    return a;
  }, []);
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTrigger;

var _globals = __webpack_require__(0);

/**
* Creates a trigger
* @param {Object} event - the custom event specified in the `trigger` setting
* @param {Element} el - tooltipped element
* @param {Object} handlers - the handlers for each listener
* @param {Boolean} touchHold
* @return {Array} - array of listener objects
*/
function createTrigger(event, el, handlers, touchHold) {
  var listeners = [];

  if (event === 'manual') return listeners;

  // Enter
  el.addEventListener(event, handlers.handleTrigger);
  listeners.push({
    event: event,
    handler: handlers.handleTrigger
  });

  // Leave
  if (event === 'mouseenter') {
    if (_globals.Browser.SUPPORTS_TOUCH && touchHold) {
      el.addEventListener('touchstart', handlers.handleTrigger);
      listeners.push({
        event: 'touchstart',
        handler: handlers.handleTrigger
      });
      el.addEventListener('touchend', handlers.handleMouseleave);
      listeners.push({
        event: 'touchend',
        handler: handlers.handleMouseleave
      });
    }

    el.addEventListener('mouseleave', handlers.handleMouseleave);
    listeners.push({
      event: 'mouseleave',
      handler: handlers.handleMouseleave
    });
  }

  if (event === 'focus') {
    el.addEventListener('blur', handlers.handleBlur);
    listeners.push({
      event: 'blur',
      handler: handlers.handleBlur
    });
  }

  return listeners;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluateSettings;
/**
* Evaluates/modifies the settings object for appropriate behavior
* @param {Object} settings
* @return {Object} modified/evaluated settings
*/
function evaluateSettings(settings) {
  // animateFill is disabled if an arrow is true
  if (settings.arrow) {
    settings.animateFill = false;
  }

  // reassign appendTo into the result of evaluating appendTo
  // if it's set as a function instead of Element
  if (settings.appendTo && typeof settings.appendTo === 'function') {
    settings.appendTo = settings.appendTo();
  }

  return settings;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getArrayOfElements;
/**
* Returns an array of elements based on the selector input
* @param {String|Element|Element[]} selector
* @return {Element[]}
*/
function getArrayOfElements(selector) {
  if (selector instanceof Element) {
    return [selector];
  }

  if (Array.isArray(selector)) {
    return selector;
  }

  return [].slice.call(document.querySelectorAll(selector));
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getEventListenerHandlers;

var _globals = __webpack_require__(0);

var _isVisible = __webpack_require__(7);

var _isVisible2 = _interopRequireDefault(_isVisible);

var _closest = __webpack_require__(4);

var _closest2 = _interopRequireDefault(_closest);

var _cursorIsOutsideInteractiveBorder = __webpack_require__(32);

var _cursorIsOutsideInteractiveBorder2 = _interopRequireDefault(_cursorIsOutsideInteractiveBorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Returns relevant listener callbacks for each ref
* @param {Element} el
* @param {Element} popper
* @param {Object} settings
* @return {Object} - relevant listener handlers
*/
function getEventListenerHandlers(el, popper, settings) {
  var _this = this;

  var position = settings.position,
      delay = settings.delay,
      duration = settings.duration,
      interactive = settings.interactive,
      interactiveBorder = settings.interactiveBorder,
      distance = settings.distance,
      hideOnClick = settings.hideOnClick,
      trigger = settings.trigger,
      touchHold = settings.touchHold,
      touchWait = settings.touchWait;


  var showDelay = void 0,
      hideDelay = void 0;

  var clearTimeouts = function clearTimeouts() {
    clearTimeout(showDelay);
    clearTimeout(hideDelay);
  };

  var _show = function _show() {
    clearTimeouts();

    // Not hidden. For clicking when it also has a `focus` event listener
    if ((0, _isVisible2.default)(popper)) return;

    var _delay = Array.isArray(delay) ? delay[0] : delay;

    if (delay) {
      showDelay = setTimeout(function () {
        return _this.show(popper);
      }, _delay);
    } else {
      _this.show(popper);
    }
  };

  var show = function show(event) {
    return _this.callbacks.wait ? _this.callbacks.wait.call(popper, _show, event) : _show();
  };

  var hide = function hide() {
    clearTimeouts();

    var _delay = Array.isArray(delay) ? delay[1] : delay;

    if (delay) {
      hideDelay = setTimeout(function () {
        return _this.hide(popper);
      }, _delay);
    } else {
      _this.hide(popper);
    }
  };

  var handleTrigger = function handleTrigger(event) {
    var mouseenterTouch = event.type === 'mouseenter' && _globals.Browser.SUPPORTS_TOUCH && _globals.Browser.touch;

    if (mouseenterTouch && touchHold) return;

    // Toggle show/hide when clicking click-triggered tooltips
    var isClick = event.type === 'click';
    var isNotPersistent = hideOnClick !== 'persistent';

    isClick && (0, _isVisible2.default)(popper) && isNotPersistent ? hide() : show(event);

    if (mouseenterTouch && _globals.Browser.iOS() && el.click) {
      el.click();
    }
  };

  var handleMouseleave = function handleMouseleave(event) {

    // Don't fire 'mouseleave', use the 'touchend'
    if (event.type === 'mouseleave' && _globals.Browser.SUPPORTS_TOUCH && _globals.Browser.touch && touchHold) {
      return;
    }

    if (interactive) {
      // Temporarily handle mousemove to check if the mouse left somewhere
      // other than its popper
      var handleMousemove = function handleMousemove(event) {

        var triggerHide = function triggerHide() {
          document.body.removeEventListener('mouseleave', hide);
          document.removeEventListener('mousemove', handleMousemove);
          hide();
        };

        var closestTooltippedEl = (0, _closest2.default)(event.target, _globals.Selectors.TOOLTIPPED_EL);

        var isOverPopper = (0, _closest2.default)(event.target, _globals.Selectors.POPPER) === popper;
        var isOverEl = closestTooltippedEl === el;
        var isClickTriggered = trigger.indexOf('click') !== -1;
        var isOverOtherTooltippedEl = closestTooltippedEl && closestTooltippedEl !== el;

        if (isOverOtherTooltippedEl) {
          return triggerHide();
        }

        if (isOverPopper || isOverEl || isClickTriggered) return;

        if ((0, _cursorIsOutsideInteractiveBorder2.default)(event, popper, settings)) {
          triggerHide();
        }
      };

      document.body.addEventListener('mouseleave', hide);
      document.addEventListener('mousemove', handleMousemove);

      return;
    }

    // If it's not interactive, just hide it
    hide();
  };

  var handleBlur = function handleBlur(event) {
    // Ignore blur on touch devices, if there is no `relatedTarget`, hide
    // If the related target is a popper, ignore
    if (!event.relatedTarget || _globals.Browser.touch) return;
    if ((0, _closest2.default)(event.relatedTarget, _globals.Selectors.POPPER)) return;

    hide();
  };

  return {
    handleTrigger: handleTrigger,
    handleMouseleave: handleMouseleave,
    handleBlur: handleBlur
  };
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIndividualSettings;

var _globals = __webpack_require__(0);

/**
* Returns an object of settings to override global settings
* @param {Element} el - the tooltipped element
* @param {Object} instanceSettings
* @return {Object} - individual settings
*/
function getIndividualSettings(el, instanceSettings) {
  var settings = _globals.DefaultsKeys.reduce(function (acc, key) {
    var val = el.getAttribute('data-' + key.toLowerCase()) || instanceSettings[key];

    // Convert strings to booleans
    if (val === 'false') val = false;
    if (val === 'true') val = true;

    // Convert number strings to true numbers
    if (isFinite(val) && !isNaN(parseFloat(val))) {
      val = parseFloat(val);
    }

    // Convert array strings to actual arrays
    if (typeof val === 'string' && val.trim().charAt(0) === '[') {
      val = JSON.parse(val);
    }

    acc[key] = val;

    return acc;
  }, {});

  return Object.assign({}, instanceSettings, settings);
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hideAllPoppers;

var _globals = __webpack_require__(0);

/**
* Hides all poppers
* @param {Object} exclude - refData to exclude if needed
*/
function hideAllPoppers(exclude) {
  _globals.Store.forEach(function (refData) {
    var popper = refData.popper,
        tippyInstance = refData.tippyInstance,
        _refData$settings = refData.settings,
        appendTo = _refData$settings.appendTo,
        hideOnClick = _refData$settings.hideOnClick,
        trigger = _refData$settings.trigger;

    // Don't hide already hidden ones

    if (!appendTo.contains(popper)) return;

    // hideOnClick can have the truthy value of 'persistent', so strict check is needed
    var isHideOnClick = hideOnClick === true || trigger.indexOf('focus') !== -1;
    var isNotCurrentRef = !exclude || popper !== exclude.popper;

    if (isHideOnClick && isNotCurrentRef) {
      refData.settings.onRequestClose();
      tippyInstance.hide(popper);
    }
  });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _bindEventListeners = __webpack_require__(16);

var _bindEventListeners2 = _interopRequireDefault(_bindEventListeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* To run a single time, once DOM is presumed to be ready
* @return {Boolean} whether the function has run or not
*/
function init() {
  if (init.done) return false;
  init.done = true;

  (0, _bindEventListeners2.default)();

  return true;
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSticky;

var _defer = __webpack_require__(5);

var _defer2 = _interopRequireDefault(_defer);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _isVisible = __webpack_require__(7);

var _isVisible2 = _interopRequireDefault(_isVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Updates a popper's position on each animation frame to make it stick to a moving element
* @param {Object} refData
*/
function makeSticky(refData) {
  var popper = refData.popper,
      popperInstance = refData.popperInstance,
      stickyDuration = refData.settings.stickyDuration;


  var applyTransitionDuration = function applyTransitionDuration() {
    return popper.style[(0, _prefix2.default)('transitionDuration')] = stickyDuration + 'ms';
  };

  var removeTransitionDuration = function removeTransitionDuration() {
    return popper.style[(0, _prefix2.default)('transitionDuration')] = '';
  };

  var updatePosition = function updatePosition() {
    popperInstance && popperInstance.scheduleUpdate();

    applyTransitionDuration();

    (0, _isVisible2.default)(popper) ? window.requestAnimationFrame(updatePosition) : removeTransitionDuration();
  };

  // Wait until Popper's position has been updated initially
  (0, _defer2.default)(updatePosition);
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mountPopper;

var _globals = __webpack_require__(0);

var _followCursorHandler = __webpack_require__(10);

var _followCursorHandler2 = _interopRequireDefault(_followCursorHandler);

var _createPopperInstance = __webpack_require__(18);

var _createPopperInstance2 = _interopRequireDefault(_createPopperInstance);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Appends the popper and creates a popper instance if one does not exist
* Also updates its position if need be and enables event listeners
* @param {Object} data -  the element/popper reference data
*/
function mountPopper(data) {
  var el = data.el,
      popper = data.popper,
      _data$settings = data.settings,
      appendTo = _data$settings.appendTo,
      followCursor = _data$settings.followCursor;

  // Already on the DOM

  if (appendTo.contains(popper)) return;

  appendTo.appendChild(popper);

  if (!data.popperInstance) {
    data.popperInstance = (0, _createPopperInstance2.default)(data);
  } else {
    data.popperInstance.update();
    if (!followCursor || _globals.Browser.touch) {
      data.popperInstance.enableEventListeners();
    }
  }

  // Since touch is determined dynamically, followCursor is set on mount
  if (followCursor && !_globals.Browser.touch) {
    el.addEventListener('mousemove', _followCursorHandler2.default);
    data.popperInstance.disableEventListeners();
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTransitionEnd;

var _globals = __webpack_require__(0);

var _getInnerElements2 = __webpack_require__(6);

var _getInnerElements3 = _interopRequireDefault(_getInnerElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Prepares the callback functions for `show` and `hide` methods
* @param {Object} data
* @param {Number} duration
* @param {Function} callback - callback function to fire once transitions complete
*/
function onTransitionEnd(data, duration, callback) {
  // Make callback synchronous if duration is 0
  if (!duration) {
    return callback();
  }

  var _getInnerElements = (0, _getInnerElements3.default)(data.popper),
      tooltip = _getInnerElements.tooltip;

  var transitionendFired = false;

  var listenerCallback = function listenerCallback(e) {
    if (e.target === tooltip && !transitionendFired) {
      transitionendFired = true;
      callback();
    }
  };

  // Fire callback upon transition completion
  tooltip.addEventListener('webkitTransitionEnd', listenerCallback);
  tooltip.addEventListener('transitionend', listenerCallback);

  // Fallback: transitionend listener sometimes may not fire
  clearTimeout(data._transitionendTimeout);
  data._transitionendTimeout = setTimeout(function () {
    if (!transitionendFired) {
      callback();
    }
  }, duration);
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Utility functions */


/* Core library functions */


var _globals = __webpack_require__(0);

var _reactDom = __webpack_require__(39);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _init = __webpack_require__(26);

var _init2 = _interopRequireDefault(_init);

var _defer = __webpack_require__(5);

var _defer2 = _interopRequireDefault(_defer);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _findIndex = __webpack_require__(34);

var _findIndex2 = _interopRequireDefault(_findIndex);

var _removeTitle = __webpack_require__(12);

var _removeTitle2 = _interopRequireDefault(_removeTitle);

var _elementIsInViewport = __webpack_require__(33);

var _elementIsInViewport2 = _interopRequireDefault(_elementIsInViewport);

var _triggerReflow = __webpack_require__(37);

var _triggerReflow2 = _interopRequireDefault(_triggerReflow);

var _modifyClassList = __webpack_require__(35);

var _modifyClassList2 = _interopRequireDefault(_modifyClassList);

var _getInnerElements4 = __webpack_require__(6);

var _getInnerElements5 = _interopRequireDefault(_getInnerElements4);

var _applyTransitionDuration = __webpack_require__(31);

var _applyTransitionDuration2 = _interopRequireDefault(_applyTransitionDuration);

var _isVisible = __webpack_require__(7);

var _isVisible2 = _interopRequireDefault(_isVisible);

var _noop = __webpack_require__(36);

var _noop2 = _interopRequireDefault(_noop);

var _followCursorHandler = __webpack_require__(10);

var _followCursorHandler2 = _interopRequireDefault(_followCursorHandler);

var _getArrayOfElements = __webpack_require__(22);

var _getArrayOfElements2 = _interopRequireDefault(_getArrayOfElements);

var _onTransitionEnd = __webpack_require__(29);

var _onTransitionEnd2 = _interopRequireDefault(_onTransitionEnd);

var _mountPopper = __webpack_require__(28);

var _mountPopper2 = _interopRequireDefault(_mountPopper);

var _makeSticky = __webpack_require__(27);

var _makeSticky2 = _interopRequireDefault(_makeSticky);

var _createTooltips = __webpack_require__(19);

var _createTooltips2 = _interopRequireDefault(_createTooltips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @param {String|Element|Element[]} selector
* @param {Object} settings (optional) - the object of settings to be applied to the instance
*/
var Tippy = function () {
  function Tippy(selector) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tippy);

    // Use default browser tooltip on unsupported browsers
    if (!_globals.Browser.SUPPORTED) return;

    (0, _init2.default)();

    this.state = {
      destroyed: false
    };

    this.selector = selector;

    this.settings = _extends({}, _globals.Defaults, settings);

    if (settings.show || settings.shown || settings.hide || settings.hidden) {
      console.warn('Callbacks without the `on` prefix are deprecated (with the exception of `wait`).' + ' Use onShow, onShown, onHide, and onHidden instead.');
    }

    this.callbacks = {
      wait: settings.wait,
      show: settings.onShow || settings.show || _noop2.default,
      shown: settings.onShown || settings.shown || _noop2.default,
      hide: settings.onHide || settings.hide || _noop2.default,
      hidden: settings.onHidden || settings.hidden || _noop2.default
    };

    this.store = _createTooltips2.default.call(this, (0, _getArrayOfElements2.default)(selector));
    _globals.Store.push.apply(_globals.Store, this.store);
  }

  /**
  * Returns the reference element's popper element
  * @param {Element} el
  * @return {Element}
  */


  _createClass(Tippy, [{
    key: 'getPopperElement',
    value: function getPopperElement(el) {
      try {
        return (0, _find2.default)(this.store, function (data) {
          return data.el === el;
        }).popper;
      } catch (e) {
        console.error('[getPopperElement]: Element passed as the argument does not exist in the instance');
      }
    }

    /**
    * Returns a popper's reference element
    * @param {Element} popper
    * @return {Element}
    */

  }, {
    key: 'getReferenceElement',
    value: function getReferenceElement(popper) {
      try {
        return (0, _find2.default)(this.store, function (data) {
          return data.popper === popper;
        }).el;
      } catch (e) {
        console.error('[getReferenceElement]: Popper passed as the argument does not exist in the instance');
      }
    }

    /**
    * Returns the reference data object from either the reference element or popper element
    * @param {Element} x (reference element or popper)
    * @return {Object}
    */

  }, {
    key: 'getReferenceData',
    value: function getReferenceData(x) {
      return (0, _find2.default)(this.store, function (data) {
        return data.el === x || data.popper === x;
      });
    }

    /**
    * Update settings
    * @param {DOMElement} - popper
    * @param {string} - name
    * @param {string} - value
    */

  }, {
    key: 'updateSettings',
    value: function updateSettings(popper, name, value) {
      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var newSettings = _extends({}, data.settings, _defineProperty({}, name, value));
      data.settings = newSettings;
    }
  }, {
    key: 'updateForReact',


    /**
    * Update for React
    * @param {DOMElement} - popper
    * @param {ReactElement} - content
    */
    value: function updateForReact(popper, updatedContent) {
      var tooltipContent = popper.querySelector(_globals.Selectors.CONTENT);
      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _data$settings = data.settings,
          useContext = _data$settings.useContext,
          setReactDOMValue = _data$settings.setReactDOMValue;


      if (useContext) {
        setReactDOMValue(_reactDom2.default.createPortal(updatedContent, tooltipContent));
      } else {
        _reactDom2.default.render(updatedContent, tooltipContent);
      }
    }
    /**
    * Shows a popper
    * @param {Element} popper
    * @param {Number} customDuration (optional)
    */

  }, {
    key: 'show',
    value: function show(popper, customDuration) {
      var _this = this;

      if (this.state.destroyed) return;

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _getInnerElements = (0, _getInnerElements5.default)(popper),
          tooltip = _getInnerElements.tooltip,
          circle = _getInnerElements.circle,
          content = _getInnerElements.content;

      if (!document.body.contains(data.el)) {
        this.destroy(popper);
        return;
      }

      this.callbacks.show.call(popper);

      // Custom react
      if (data.settings && data.settings.open === false) {
        return;
      }

      if (data.settings.reactDOM) {
        this.updateForReact(popper, data.settings.reactDOM);
      }
      // end: Custom react

      var el = data.el,
          _data$settings2 = data.settings,
          appendTo = _data$settings2.appendTo,
          sticky = _data$settings2.sticky,
          interactive = _data$settings2.interactive,
          followCursor = _data$settings2.followCursor,
          flipDuration = _data$settings2.flipDuration,
          duration = _data$settings2.duration,
          dynamicTitle = _data$settings2.dynamicTitle;


      if (dynamicTitle) {
        var title = el.getAttribute('title');
        if (title) {
          content.innerHTML = title;
          (0, _removeTitle2.default)(el);
        }
      }

      var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[0] : duration;

      // Prevent a transition when popper changes position
      (0, _applyTransitionDuration2.default)([popper, tooltip, circle], 0);

      (0, _mountPopper2.default)(data);

      popper.style.visibility = 'visible';
      popper.setAttribute('aria-hidden', 'false');

      // Wait for popper's position to update
      (0, _defer2.default)(function () {
        // Sometimes the arrow will not be in the correct position, force another update
        if (!followCursor || _globals.Browser.touch) {
          data.popperInstance.update();
          (0, _applyTransitionDuration2.default)([popper], flipDuration);
        }

        // Re-apply transition durations
        (0, _applyTransitionDuration2.default)([tooltip, circle], _duration);

        // Make content fade out a bit faster than the tooltip if `animateFill`
        if (circle) content.style.opacity = 1;

        // Interactive tooltips receive a class of 'active'
        interactive && el.classList.add('active');

        // Update popper's position on every animation frame
        sticky && (0, _makeSticky2.default)(data);

        // Repaint/reflow is required for CSS transition when appending
        (0, _triggerReflow2.default)(tooltip, circle);

        (0, _modifyClassList2.default)([tooltip, circle], function (list) {
          list.contains('tippy-notransition') && list.remove('tippy-notransition');
          list.remove('leave');
          list.add('enter');
        });

        // Wait for transitions to complete
        (0, _onTransitionEnd2.default)(data, _duration, function () {
          if (!(0, _isVisible2.default)(popper) || data._onShownFired) return;

          // Focus interactive tooltips only
          interactive && popper.focus();
          // Remove transitions from tooltip
          tooltip.classList.add('tippy-notransition');
          // Prevents shown() from firing more than once from early transition cancellations
          data._onShownFired = true;

          _this.callbacks.shown.call(popper);
        });
      });
    }

    /**
    * Hides a popper
    * @param {Element} popper
    * @param {Number} customDuration (optional)
    */

  }, {
    key: 'hide',
    value: function hide(popper, customDuration) {
      var _this2 = this;

      if (this.state.destroyed) return;

      this.callbacks.hide.call(popper);

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _getInnerElements2 = (0, _getInnerElements5.default)(popper),
          tooltip = _getInnerElements2.tooltip,
          circle = _getInnerElements2.circle,
          content = _getInnerElements2.content;

      // custom react
      // Prevent hide if open


      if (data.settings.disabled === false && data && data.settings.open) {
        return;
      }

      var isUnmount = data && data.settings && data.settings.unmountHTMLWhenHide && data.settings.reactDOM;
      // end: custom react

      var el = data.el,
          _data$settings3 = data.settings,
          appendTo = _data$settings3.appendTo,
          sticky = _data$settings3.sticky,
          interactive = _data$settings3.interactive,
          followCursor = _data$settings3.followCursor,
          html = _data$settings3.html,
          trigger = _data$settings3.trigger,
          duration = _data$settings3.duration;


      var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[1] : duration;

      data._onShownFired = false;
      interactive && el.classList.remove('active');

      popper.style.visibility = 'hidden';
      popper.setAttribute('aria-hidden', 'true');

      (0, _applyTransitionDuration2.default)([tooltip, circle, circle ? content : null], _duration);

      if (circle) content.style.opacity = 0;

      (0, _modifyClassList2.default)([tooltip, circle], function (list) {
        list.contains('tippy-tooltip') && list.remove('tippy-notransition');
        list.remove('enter');
        list.add('leave');
      });

      // Re-focus click-triggered html elements
      // and the tooltipped element IS in the viewport (otherwise it causes unsightly scrolling
      // if the tooltip is closed and the element isn't in the viewport anymore)
      if (html && trigger.indexOf('click') !== -1 && (0, _elementIsInViewport2.default)(el)) {
        el.focus();
      }

      // Wait for transitions to complete
      (0, _onTransitionEnd2.default)(data, _duration, function () {
        // `isVisible` is not completely reliable to determine if we shouldn't
        // run the hidden callback, we need to check the computed opacity style.
        // This prevents glitchy behavior of the transition when quickly showing
        // and hiding a tooltip.
        if ((0, _isVisible2.default)(popper) || !appendTo.contains(popper) || getComputedStyle(tooltip).opacity === '1') return;

        el.removeEventListener('mousemove', _followCursorHandler2.default);
        data.popperInstance.disableEventListeners();
        appendTo.removeChild(popper);

        _this2.callbacks.hidden.call(popper);

        // custom react
        if (isUnmount) {
          _reactDom2.default.unmountComponentAtNode(content);
        }
      });
    }

    /**
    * Updates a popper with new content
    * @param {Element} popper
    */

  }, {
    key: 'update',
    value: function update(popper) {
      if (this.state.destroyed) return;

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _getInnerElements3 = (0, _getInnerElements5.default)(popper),
          content = _getInnerElements3.content;

      var el = data.el,
          html = data.settings.html;


      if (html instanceof Element) {
        console.warn('Aborted: update() should not be used if `html` is a DOM element');
        return;
      }

      content.innerHTML = html ? document.getElementById(html.replace('#', '')).innerHTML : el.getAttribute('title') || el.getAttribute('data-original-title');

      if (!html) (0, _removeTitle2.default)(el);
    }

    /**
    * Destroys a popper
    * @param {Element} popper
    * @param {Boolean} _isLast - private param used by destroyAll to optimize
    */

  }, {
    key: 'destroy',
    value: function destroy(popper, _isLast) {
      var _this3 = this;

      if (this.state.destroyed) return;

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var el = data.el,
          popperInstance = data.popperInstance,
          listeners = data.listeners,
          _mutationObserver = data._mutationObserver;

      // Ensure the popper is hidden

      if ((0, _isVisible2.default)(popper)) {
        this.hide(popper, 0);
      }

      // Remove Tippy-only event listeners from tooltipped element
      listeners.forEach(function (listener) {
        return el.removeEventListener(listener.event, listener.handler);
      });

      // Restore original title
      el.setAttribute('title', el.getAttribute('data-original-title'));

      el.removeAttribute('data-original-title');
      el.removeAttribute('data-tooltipped');
      el.removeAttribute('aria-describedby');

      popperInstance && popperInstance.destroy();
      _mutationObserver && _mutationObserver.disconnect();

      // Remove from store
      _globals.Store.splice((0, _findIndex2.default)(_globals.Store, function (data) {
        return data.popper === popper;
      }), 1);

      // Ensure filter is called only once
      if (_isLast === undefined || _isLast) {
        this.store = _globals.Store.filter(function (data) {
          return data.tippyInstance === _this3;
        });
      }
    }

    /**
    * Destroys all tooltips created by the instance
    */

  }, {
    key: 'destroyAll',
    value: function destroyAll() {
      var _this4 = this;

      if (this.state.destroyed) return;

      var storeLength = this.store.length;

      this.store.forEach(function (_ref, index) {
        var popper = _ref.popper;

        _this4.destroy(popper, index === storeLength - 1);
      });

      this.store = null;
      this.state.destroyed = true;
    }
  }]);

  return Tippy;
}();

function tippy(selector, settings) {
  return new Tippy(selector, settings);
}

tippy.Browser = _globals.Browser;
tippy.Defaults = _globals.Defaults;
tippy.disableDynamicInputDetection = function () {
  return _globals.Browser.dynamicInputDetection = false;
};
tippy.enableDynamicInputDetection = function () {
  return _globals.Browser.dynamicInputDetection = true;
};

exports.default = tippy;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyTransitionDuration;

var _globals = __webpack_require__(0);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _matches = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Applies the transition duration to each element
* @param {Element[]} els - Array of elements
* @param {Number} duration
*/
function applyTransitionDuration(els, duration) {
  els.forEach(function (el) {
    if (!el) return;

    var isContent = _matches.matches.call(el, _globals.Selectors.CONTENT);

    var _duration = isContent ? Math.round(duration / 1.3) : duration;

    el.style[(0, _prefix2.default)('transitionDuration')] = _duration + 'ms';
  });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursorIsOutsideInteractiveBorder;

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Determines if the mouse's cursor is outside the interactive border
* @param {MouseEvent} event
* @param {Element} popper
* @param {Object} settings
* @return {Boolean}
*/
function cursorIsOutsideInteractiveBorder(event, popper, settings) {
  if (!popper.getAttribute('x-placement')) return true;

  var x = event.clientX,
      y = event.clientY;
  var interactiveBorder = settings.interactiveBorder,
      distance = settings.distance;


  var rect = popper.getBoundingClientRect();
  var corePosition = (0, _getCorePlacement2.default)(popper.getAttribute('x-placement'));
  var borderWithDistance = interactiveBorder + distance;

  var exceeds = {
    top: rect.top - y > interactiveBorder,
    bottom: y - rect.bottom > interactiveBorder,
    left: rect.left - x > interactiveBorder,
    right: x - rect.right > interactiveBorder
  };

  switch (corePosition) {
    case 'top':
      exceeds.top = rect.top - y > borderWithDistance;
      break;
    case 'bottom':
      exceeds.bottom = y - rect.bottom > borderWithDistance;
      break;
    case 'left':
      exceeds.left = rect.left - x > borderWithDistance;
      break;
    case 'right':
      exceeds.right = x - rect.right > borderWithDistance;
      break;
  }

  return exceeds.top || exceeds.bottom || exceeds.left || exceeds.right;
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementIsInViewport;
/**
* Determines if an element is visible in the viewport
* @param {Element} el
* @return {Boolean}
*/
function elementIsInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findIndex;

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Ponyfill for Array.prototype.findIndex
* @param {Array} arr
* @param {Function} checkFn
* @return index of the item in the array
*/
function findIndex(arr, checkFn) {
  if (Array.prototype.findIndex) {
    return arr.findIndex(checkFn);
  }

  // fallback
  return arr.indexOf((0, _find2.default)(arr, checkFn));
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = modifyClassList;
/**
* Modifies elements' class lists
* @param {Element[]} els - Array of elements
* @param {Function} callback
*/
function modifyClassList(els, callback) {
  els.forEach(function (el) {
    if (!el) return;
    callback(el.classList);
  });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;
function noop() {}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerReflow;

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Triggers a document repaint or reflow for CSS transition
* @param {Element} tooltip
* @param {Element} circle
*/
function triggerReflow(tooltip, circle) {
  // Safari needs the specific 'transform' property to be accessed
  circle ? window.getComputedStyle(circle)[(0, _prefix2.default)('transform')] : window.getComputedStyle(tooltip).opacity;
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ })
/******/ ]);
});

});

unwrapExports(reactTippy);
var reactTippy_1 = reactTippy.Tooltip;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject$5() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 32px;\n  width: 32px;\n  cursor: pointer;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TOOLTIP_ANCHOR = react.css(_templateObject$5());
var TooltipAnchor = /*#__PURE__*/function (_React$Component) {
  inherits(TooltipAnchor, _React$Component);

  var _super = _createSuper$4(TooltipAnchor);

  function TooltipAnchor() {
    classCallCheck(this, TooltipAnchor);

    return _super.apply(this, arguments);
  }

  createClass(TooltipAnchor, [{
    key: "render",
    value: function render() {
      return jsx(reactTippy_1, {
        animation: "fade",
        animateFill: false,
        title: this.props.tooltip
      }, jsx("span", {
        css: STYLES_TOOLTIP_ANCHOR,
        style: this.props.style
      }, this.props.children ? this.props.children : jsx(Information, {
        height: this.props.height ? this.props.height : '24px'
      })));
    }
  }]);

  return TooltipAnchor;
}(React.Component);

function _templateObject2$3() {
  var data = taggedTemplateLiteral(["\n  font-size: 14px;\n  margin-bottom: 12px;\n  line-height: 1.3;\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = taggedTemplateLiteral(["\n  font-family: 'inter-semi-bold';\n  font-size: 14px;\n  padding: 0 0 0 0;\n  margin-bottom: 8px;\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_DESCRIPTION_GROUP_LABEL = react.css(_templateObject$6());
var STYLES_DESCRIPTION_GROUP_DESCRIPTION = react.css(_templateObject2$3());
var DescriptionGroup = function DescriptionGroup(props) {
  return jsx("div", {
    style: props.style
  }, !isEmpty(props.label) ? jsx("div", {
    css: STYLES_DESCRIPTION_GROUP_LABEL
  }, props.label, ' ', props.tooltip ? jsx(TooltipAnchor, {
    tooltip: props.tooltip,
    height: "14px",
    style: {
      paddingTop: 16
    }
  }) : null) : null, !isEmpty(props.description) ? jsx("div", {
    css: STYLES_DESCRIPTION_GROUP_DESCRIPTION
  }, props.description) : null);
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject3$2() {
  var data = taggedTemplateLiteral(["\n  position: absolute;\n  right: 12px;\n  margin-top: 1px;\n  bottom: 12px;\n  transition: 200ms ease all;\n  cursor: pointer;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = taggedTemplateLiteral(["\n  ", "\n  padding: 0 24px 0 24px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15), inset 0 0 0 1px ", ";\n\n  :focus {\n    outline: 0;\n    border: 0;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ", ";\n  }\n\n  ::placeholder {\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\n    color: ", ";\n    opacity: 1; /* Firefox */\n  }\n\n  :-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: ", ";\n  }\n\n  ::-ms-input-placeholder {\n    /* Microsoft Edge */\n    color: ", ";\n  }\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = taggedTemplateLiteral(["\n  position: relative;\n  max-width: 480px;\n  min-width: 188px;\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var INPUT_STYLES = "\n  -webkit-appearance: none;\n  width: 100%;\n  height: 40px;\n  background: ".concat(system.white, ";\n  color: ").concat(system.black, ";\n  border-radius: 4px;\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  justify-content: flex-start;\n  outline: 0;\n  border: 0;\n  box-sizing: border-box;\n  transition: 200ms ease all;\n");
var STYLES_INPUT_CONTAINER = react.css(_templateObject$7());
var STYLES_INPUT = react.css(_templateObject2$4(), INPUT_STYLES, system.darkGray, system.brand, system.darkGray, system.darkGray, system.darkGray);
var STYLES_COPY_AND_PASTE = react.css(_templateObject3$2(), system.brand);
var INPUT_COLOR_MAP = {
  SUCCESS: system.green,
  ERROR: system.red,
  WARNING: system.yellow
};
var Input = /*#__PURE__*/function (_React$Component) {
  inherits(Input, _React$Component);

  var _super = _createSuper$5(Input);

  function Input() {
    var _this;

    classCallCheck(this, Input);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_input", void 0);

    defineProperty(assertThisInitialized(_this), "_handleCopy", function (e) {
      _this._input.select();

      document.execCommand('copy');
    });

    defineProperty(assertThisInitialized(_this), "_handleKeyUp", function (e) {
      if (e.which === 13 && _this.props.onSubmit) {
        _this.props.onSubmit(e);

        return;
      }

      _this.props.onKeyUp(e);
    });

    defineProperty(assertThisInitialized(_this), "_handleChange", function (e) {
      if (!isEmpty(_this.props.pattern) && !isEmpty(e.target.value)) {
        var TestRegex = new RegExp(_this.props.pattern);

        if (!TestRegex.test(e.target.value)) {
          e.preventDefault();
          return;
        }
      }

      if (e.target.value && e.target.value.length > _this.props.max) {
        e.preventDefault();
        return;
      }

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    });

    return _this;
  }

  createClass(Input, [{
    key: "render",
    value: function render() {
      var _this2 = this,
          _EmotionJSX;

      return jsx("div", {
        css: STYLES_INPUT_CONTAINER,
        style: this.props.containerStyle
      }, jsx(DescriptionGroup, {
        tooltip: this.props.tooltip,
        label: this.props.label,
        description: this.props.description
      }), jsx("input", (_EmotionJSX = {
        ref: function ref(c) {
          _this2._input = c;
        },
        css: STYLES_INPUT,
        value: this.props.value,
        name: this.props.name,
        type: this.props.type,
        placeholder: this.props.placeholder,
        onChange: this._handleChange,
        autoComplete: "off",
        readOnly: this.props.readOnly
      }, defineProperty(_EmotionJSX, "type", this.props.type), defineProperty(_EmotionJSX, "style", _objectSpread$1(_objectSpread$1({}, this.props.style), {}, {
        boxShadow: this.props.validation ? "0 1px 4px rgba(0, 0, 0, 0.07), 0 0 4px ".concat(INPUT_COLOR_MAP[this.props.validation]) : null
      })), _EmotionJSX)), this.props.copyable ? jsx(CopyAndPaste, {
        height: "16px",
        css: STYLES_COPY_AND_PASTE,
        onClick: this._handleCopy
      }) : null);
    }
  }]);

  return Input;
}(React.Component);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject3$3() {
  var data = taggedTemplateLiteral(["\n  height: 18px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  cursor: pointer;\n"]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = taggedTemplateLiteral(["\n  position: relative;\n  bottom: 2px;\n  margin-bottom: 8px;\n"]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$8() {
  var data = taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 5px;\n  padding: 15px 15px 3px 15px;\n  display: grid;\n  grid-template-columns: 35px 1fr;\n  position: relative;\n  width: 500px;\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_NOTIFICATION = react.css(_templateObject$8(), system.white);
var STYLES_ICON = react.css(_templateObject2$5());
var STYLES_CLOSE = react.css(_templateObject3$3());
var NOTIF_COLOR_MAP = {
  SUCCESS: system.lightGreen,
  ERROR: system.lightRed,
  WARNING: system.lightYellow,
  INFO: system.lightBlue
};
var ICON_MAP = {
  SUCCESS: jsx(CheckCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.green)
    }
  }),
  ERROR: jsx(XCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.red)
    }
  }),
  WARNING: jsx(AlertCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.yellow)
    }
  }),
  INFO: jsx(InfoCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.lightBlue)
    }
  })
};
var Notification = /*#__PURE__*/function (_React$Component) {
  inherits(Notification, _React$Component);

  var _super = _createSuper$6(Notification);

  function Notification() {
    classCallCheck(this, Notification);

    return _super.apply(this, arguments);
  }

  createClass(Notification, [{
    key: "render",
    value: function render() {
      return jsx("div", {
        css: STYLES_NOTIFICATION,
        style: {
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.07), 0 0 4px 1px ".concat(NOTIF_COLOR_MAP[this.props.status || 'INFO'])
        }
      }, ICON_MAP[this.props.status || 'INFO'], jsx(DescriptionGroup, {
        tooltip: this.props.tooltip,
        label: this.props.label,
        description: this.props.description,
        style: {
          marginBottom: '0'
        }
      }), this.props.onClose ? jsx(X, {
        css: STYLES_CLOSE,
        onClick: this.props.onClose
      }) : jsx("div", null));
    }
  }]);

  return Notification;
}(React.Component);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject2$6() {
  var data = taggedTemplateLiteral(["\n  top: 0;\n  left: 0;\n  padding: 8px 24px 8px 24px;\n  margin: 8px 0 8px 0;\n  display: flex;\n  align-items: center;\n  height: 40px;\n  font-size: ", ";\n  transition: 200ms ease all;\n  cursor: pointer;\n\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = taggedTemplateLiteral(["\n  position: absolute;\n  width: 288px;\n  border-radius: 4px;\n  background-color: ", ";\n  box-shadow: inset 0 0 0 1px ", ", 0 1px 4px rgba(0, 0, 0, 0.07);\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_POPOVER = react.css(_templateObject$9(), system.white, system.border);
var STYLES_POPOVER_ITEM = react.css(_templateObject2$6(), typescale.lvl1, system.brand, system.white);
var PopoverNavigation = /*#__PURE__*/function (_React$Component) {
  inherits(PopoverNavigation, _React$Component);

  var _super = _createSuper$7(PopoverNavigation);

  function PopoverNavigation() {
    classCallCheck(this, PopoverNavigation);

    return _super.apply(this, arguments);
  }

  createClass(PopoverNavigation, [{
    key: "render",
    value: function render() {
      var _this = this;

      return jsx("div", {
        css: STYLES_POPOVER,
        style: this.props.style
      }, this.props.navigation.map(function (each) {
        return jsx("div", {
          key: each.value,
          css: STYLES_POPOVER_ITEM,
          onClick: function onClick() {
            return _this.props.onNavigateTo({
              id: each.value
            });
          }
        }, each.text);
      }));
    }
  }]);

  return PopoverNavigation;
}(React.Component);

defineProperty(PopoverNavigation, "defaultProps", {
  onNavigateTo: function onNavigateTo() {
    console.error('requires onNavigateTo');
  }
});

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject6$1() {
  var data = taggedTemplateLiteral(["\n  font-size: 14px;\n  cursor: pointer;\n  min-width: 10%;\n  width: 100%;\n  line-height: 1.5;\n  padding-top: 4px;\n  overflow-wrap: break-word;\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = taggedTemplateLiteral(["\n  background-color: ", ";\n  height: 24px;\n  width: 24px;\n  border-radius: 24px;\n  pointer-events: none;\n  opacity: 0;\n  transition: 200ms ease opacity;\n  z-index: 1;\n"]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$2() {
  var data = taggedTemplateLiteral(["\n  box-shadow: 0 0 0 1px ", ";\n  background-color: ", ";\n  cursor: pointer;\n  height: 32px;\n  width: 32px;\n  border-radius: 32px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n  margin-right: 16px;\n  flex-shrink: 0;\n"]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = taggedTemplateLiteral(["\n  display: block;\n  width: 100%;\n"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = taggedTemplateLiteral(["\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  height: 1px;\n  width: 1px;\n  position: absolute;\n  top: 0;\n  left: 0;\n"]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  width: 100%;\n  position: relative;\n  margin-bottom: 16px;\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_RADIO = react.css(_templateObject$a());
var STYLES_RADIO_INPUT = react.css(_templateObject2$7());
var STYLES_RADIO_GROUP = react.css(_templateObject3$4());
var STYLES_RADIO_CUSTOM = react.css(_templateObject4$2(), system.darkGray, system.white);
var STYLES_RADIO_CUSTOM_SELECTED = react.css(_templateObject5$1(), system.brand);
var STYLES_RADIO_LABEL = react.css(_templateObject6$1());
var RadioGroup = /*#__PURE__*/function (_React$Component) {
  inherits(RadioGroup, _React$Component);

  var _super = _createSuper$8(RadioGroup);

  function RadioGroup() {
    var _this;

    classCallCheck(this, RadioGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value
        }
      });
    });

    return _this;
  }

  createClass(RadioGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return jsx("form", {
        css: STYLES_RADIO_GROUP
      }, this.props.options.map(function (radio) {
        var checked = _this2.props.selected === radio.value;
        return jsx("label", {
          css: STYLES_RADIO,
          key: "radio-".concat(radio.value)
        }, jsx("span", {
          css: STYLES_RADIO_CUSTOM
        }, jsx("span", {
          css: STYLES_RADIO_CUSTOM_SELECTED,
          style: {
            opacity: checked ? 1 : 0
          }
        })), jsx("input", {
          css: STYLES_RADIO_INPUT,
          type: "radio",
          value: radio.value,
          checked: checked,
          onChange: function onChange() {
            return _this2._handleChange(radio.value);
          }
        }), ' ', jsx("span", {
          css: STYLES_RADIO_LABEL
        }, radio.label));
      }));
    }
  }]);

  return RadioGroup;
}(React.Component);

function _templateObject6$2() {
  var data = taggedTemplateLiteral(["\n  position: absolute;\n  right: 12px;\n  margin-top: 1px;\n"]);

  _templateObject6$2 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = taggedTemplateLiteral(["\n  color: ", ";\n  margin-left: 4px;\n"]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$3() {
  var data = taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15),\n    inset 0 0 0 1px ", ";\n  padding: 0 48px 0 24px;\n"]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$5() {
  var data = taggedTemplateLiteral(["\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0;\n  width: 100%;\n  height: 40px;\n"]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$8() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  position: relative;\n  height: 40px;\n  width: 100%;\n"]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$b() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  position: relative;\n  height: 40px;\n  max-width: 320px;\n  width: 100%;\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var INPUT_STYLES$1 = "\n  -webkit-appearance: none;\n  width: 100%;\n  height: 40px;\n  background: ".concat(system.white, ";\n  color: ").concat(system.black, ";\n  border-radius: 4px;\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  justify-content: flex-start;\n  outline: 0;\n  border: 0;\n  box-sizing: border-box;\n  transition: 200ms ease all;\n");
var STYLES_SELECT_MENU = react.css(_templateObject$b());
var STYLES_SELECT_MENU_FULL = react.css(_templateObject2$8());
var STYLES_SELECT_MENU_ANCHOR = react.css(_templateObject3$5());
var STYLES_SELECT_MENU_LABEL = react.css(_templateObject4$3(), INPUT_STYLES$1, system.darkGray);
var STYLES_SELECT_MENU_CATEGORY = react.css(_templateObject5$2(), system.darkGray);
var STYLES_SELECT_MENU_CHEVRON = react.css(_templateObject6$2());
var SelectMenu = function SelectMenu(props) {
  return jsx(React.Fragment, null, jsx(DescriptionGroup, {
    label: props.label,
    description: props.description,
    tooltip: props.tooltip,
    style: props.containerStyle
  }), jsx("div", {
    css: props.className ? props.className : STYLES_SELECT_MENU
  }, jsx("label", {
    css: STYLES_SELECT_MENU_LABEL,
    htmlFor: "id-".concat(props.name)
  }, props.children, " ", props.category ? jsx("span", {
    css: STYLES_SELECT_MENU_CATEGORY
  }, props.category) : null, jsx(ChevronDown, {
    height: "16px",
    css: STYLES_SELECT_MENU_CHEVRON
  })), jsx("select", {
    css: STYLES_SELECT_MENU_ANCHOR,
    value: props.value,
    onChange: props.onChange,
    name: props.name,
    id: "id-".concat(props.name)
  }, props.options.map(function (each) {
    return jsx("option", {
      value: each.value,
      key: each.value
    }, each.name);
  }))));
};
var SelectMenuFull = function SelectMenuFull(props) {
  return jsx(SelectMenu, _extends_1({}, props, {
    css: STYLES_SELECT_MENU_FULL
  }));
};

function _templateObject$c() {
  var data = taggedTemplateLiteral(["\n  padding: 8px 8px 8px 8px;\n  display: inline-flex;\n  font-family: 'mono';\n  font-size: 12px;\n  letter-spacing: 0.2px;\n  align-items: center;\n  text-transform: uppercase;\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_BANDWIDTH = react.css(_templateObject$c());
var StatUpload = function StatUpload(props) {
  return jsx("div", {
    css: STYLES_BANDWIDTH,
    style: props.style
  }, jsx(BandwidthUp, {
    height: "16px",
    style: {
      marginRight: 8
    }
  }), " ", props.children);
};
var StatDownload = function StatDownload(props) {
  return jsx("div", {
    css: STYLES_BANDWIDTH,
    style: props.style
  }, jsx(BandwidthDown, {
    height: "16px",
    style: {
      marginRight: 8
    }
  }), " ", props.children);
};

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject2$9() {
  var data = taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n  border-bottom: 1px solid ", ";\n  height: 40px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-family: 'inter-semi-bold';\n  transition: 200ms ease all;\n  user-select: none;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject2$9 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TAB_GROUP = react.css(_templateObject$d());
var STYLES_TAB_GROUP_TAB = react.css(_templateObject2$9(), system.gray, system.black, system.white, system.brand);
var TAB_GROUP_SIZE_MAP$1 = {
  1: '100%',
  2: '50%',
  3: '33.33%',
  4: '25%'
};
var TabGroup = /*#__PURE__*/function (_React$Component) {
  inherits(TabGroup, _React$Component);

  var _super = _createSuper$9(TabGroup);

  function TabGroup() {
    var _this;

    classCallCheck(this, TabGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value
        }
      });
    });

    return _this;
  }

  createClass(TabGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return jsx("div", {
        css: STYLES_TAB_GROUP
      }, this.props.options.map(function (tab) {
        var selected = tab.value === _this2.props.value;
        return jsx("div", {
          css: STYLES_TAB_GROUP_TAB,
          key: tab.value,
          style: {
            backgroundColor: selected ? system.white : null,
            width: TAB_GROUP_SIZE_MAP$1[_this2.props.options.length],
            cursor: !selected ? 'pointer' : null,
            borderBottom: !selected ? "1px solid #D7D7D7" : null
          },
          onClick: function onClick() {
            return _this2._handleChange(tab.value);
          }
        }, tab.label);
      }));
    }
  }]);

  return TabGroup;
}(React.Component);

var __jsx$1 = React__default.createElement;
var Folder = function Folder(props) {
  return jsx("svg", {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    height: props.height,
    style: props.style
  }, jsx("path", {
    d: "m11.236 6h.00000005c-.378666-.0002022-.724736-.214271-.894-.553l-.948-1.894.00000002.00000003c-.169264-.338729-.515334-.552798-.894-.553h-6.5-.00000004c-.552285.00000002-1 .447715-1 1v16 .00000015c.00000008.552285.447715 1 1 1h20-.00000004c.552285.00000002 1-.447715 1-1v-13c0-.552285-.447715-1-1-1z",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var getNavigatorAgent = function getNavigatorAgent(userAgent) {
  return userAgent ? userAgent : navigator.userAgent || navigator.vendor || window.opera;
};
var isMobileBrowser = function isMobileBrowser(userAgent) {
  var navigatorAgent = getNavigatorAgent(userAgent);
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ipad|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigatorAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigatorAgent.substr(0, 4));
};

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var WebRectBoundary = /*#__PURE__*/function (_React$PureComponent) {
  inherits(WebRectBoundary, _React$PureComponent);

  var _super = _createSuper$a(WebRectBoundary);

  function WebRectBoundary() {
    var _this;

    classCallCheck(this, WebRectBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_root", undefined);

    defineProperty(assertThisInitialized(_this), "_addListeners", function () {
      _this._removeListeners();

      window.setTimeout(function () {
        if (_this.props.onOutsideRectEvent) {
          if (isMobileBrowser()) {
            window.addEventListener("touchstart", _this._handleOutsideClick);
          } else {
            window.addEventListener("click", _this._handleOutsideClick);
          }
        }

        if (_this.props.captureResize) {
          window.addEventListener("resize", _this._handleWindowResize);
        }

        if (_this.props.captureScroll) {
          window.addEventListener("scroll", _this._handleWindowScroll);
        }
      });
    });

    defineProperty(assertThisInitialized(_this), "_handleOutsideClick", function (e) {
      // NOTE(jim): anything with `data-menu` is also ignored...
      if (!e.target) {
        return;
      }

      if (_this.props.isDataMenuCaptured && typeof e.target.hasAttribute === "function" && e.target.hasAttribute("data-menu")) {
        return;
      }

      if (_this.props.isDataMenuCaptured && e.target.parentNode && typeof e.target.parentNode.hasAttribute === "function" && e.target.parentNode.hasAttribute("data-menu")) {
        return;
      }

      if (_this._root && !_this._root.contains(e.target)) {
        _this._handleOutsideRectEvent(e);
      }
    });

    defineProperty(assertThisInitialized(_this), "_handleWindowResize", function (e) {
      return _this._handleOutsideRectEvent(e);
    });

    defineProperty(assertThisInitialized(_this), "_handleWindowScroll", function (e) {
      return _this._handleOutsideRectEvent(e);
    });

    defineProperty(assertThisInitialized(_this), "_removeListeners", function () {
      window.removeEventListener("touchstart", _this._handleOutsideClick);
      window.removeEventListener("click", _this._handleOutsideClick);
      window.removeEventListener("resize", _this._handleWindowResize);
      window.removeEventListener("scroll", _this._handleWindowScroll);
    });

    defineProperty(assertThisInitialized(_this), "_handleOutsideRectEvent", function (e) {
      _this.props.onOutsideRectEvent(e);
    });

    return _this;
  }

  createClass(WebRectBoundary, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.enabled) {
        return;
      }

      this._addListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._removeListeners();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(props) {
      if (props.enabled) {
        this._addListeners();
      } else {
        this._removeListeners();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return jsx("div", {
        className: this.props.className,
        ref: function ref(c) {
          _this2._root = c;
        },
        style: this.props.style,
        onClick: this.props.onClick
      }, this.props.children);
    }
  }]);

  return WebRectBoundary;
}(React.PureComponent);

defineProperty(WebRectBoundary, "defaultProps", {
  className: undefined,
  captureResize: true,
  captureScroll: true,
  children: null,
  enabled: false,
  isDataMenuCaptured: false,
  onOutsideRectEvent: function onOutsideRectEvent() {}
});

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject2$a() {
  var data = taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  background-color: ", ";\n  border: 2px solid ", ";\n  position: absolute;\n  bottom: -4px;\n  right: -4px;\n  border-radius: 16px;\n"]);

  _templateObject2$a = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$e() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  background-size: cover;\n  background-position: 50% 50%;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);\n  position: relative;\n  background-color: ", ";\n"]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_AVATAR = react.css(_templateObject$e(), system.black);
var STYLES_AVATAR_ONLINE = react.css(_templateObject2$a(), system.green, system.white);

var AvatarEntity = /*#__PURE__*/function (_React$Component) {
  inherits(AvatarEntity, _React$Component);

  var _super = _createSuper$b(AvatarEntity);

  function AvatarEntity() {
    var _this;

    classCallCheck(this, AvatarEntity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {});

    defineProperty(assertThisInitialized(_this), "_handleClick", function (e) {
      if (_this.props.popover) {
        _this.setState({
          visible: !_this.state.visible
        });
      }

      if (_this.props.onClick) {
        _this.props.onClick(e);
      }
    });

    defineProperty(assertThisInitialized(_this), "_handleHide", function () {
      _this.setState({
        visible: false
      });
    });

    return _this;
  }

  createClass(AvatarEntity, [{
    key: "render",
    value: function render() {
      return jsx(WebRectBoundary, {
        css: STYLES_AVATAR,
        captureResize: false,
        captureScroll: true,
        enabled: this.state.visible,
        onOutsideRectEvent: this._handleHide,
        onClick: this._handleClick,
        style: _objectSpread$2(_objectSpread$2({}, this.props.style), {}, {
          width: "".concat(this.props.size, "px"),
          height: "".concat(this.props.size, "px"),
          borderRadius: "".concat(this.props.size, "px"),
          backgroundImage: "url('".concat(this.props.url, "')"),
          cursor: this.props.onClick ? "pointer" : this.props.style
        })
      }, this.state.visible ? this.props.popover : null, this.props.online ? jsx("span", {
        css: STYLES_AVATAR_ONLINE
      }) : null);
    }
  }]);

  return AvatarEntity;
}(React.Component);

function _templateObject6$3() {
  var data = taggedTemplateLiteral(["\n  font-family: 'inter-medium';\n  text-decoration: underline;\n  cursor: pointer;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject6$3 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$3() {
  var data = taggedTemplateLiteral(["\n  flex-shrink: 0;\n  height: 40px;\n  width: 30px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: 200ms ease all;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject5$3 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$4() {
  var data = taggedTemplateLiteral(["\n  padding: 12px 12px 16px 12px;\n  min-width: 10%;\n  width: 100%;\n  align-self: stretch;\n  flex-direction: column;\n  word-break: break-word;\n  overflow-wrap: anywhere;\n  font-size: 12px;\n"]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  align-self: stretch;\n  min-width: 10%;\n  cursor: pointer;\n  transition: 200ms ease all;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$b() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  align-self: stretch;\n  min-width: 10%;\n"]);

  _templateObject2$b = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$f() {
  var data = taggedTemplateLiteral(["\n  font-weight: 400;\n  font-family: 'inter-semi-bold';\n  letter-spacing: 0.2px;\n  padding: 4px 6px 4px 6px;\n  font-size: 10px;\n  text-transform: uppercase;\n  background: ", ";\n  color: ", ";\n  border-radius: 4px;\n  white-space: nowrap;\n"]);

  _templateObject$f = function _templateObject() {
    return data;
  };

  return data;
}
var STORAGE_DEAL_STATES = {
  '0': 'Local file only.',
  '1': 'Searching for miners.',
  '2': 'Proposing storage deal.',
  '3': 'Accepted by miners.',
  '4': 'Data transfer in progress.',
  '5': 'Data transfer complete.',
  '6': 'Stored on network.'
};
var RETRIEVAL_DEAL_STATES = {
  '0': 'Local file',
  '1': 'Available on network',
  '2': 'Retrieval deal proposed.',
  '3': 'Retrieval deal accepted.',
  '4': 'Data transfer in progress.',
  '5': 'Data transfer completed.',
  '6': 'Retrieved from network.'
};
var COMPONENTS_ICON = {
  PNG: jsx(FileImage, {
    height: "24px"
  }),
  FOLDER: jsx(Folder, {
    height: "24px"
  })
};
var STYLES_TABLE_TAG = react.css(_templateObject$f(), system.black, system.white);
var COMPONENTS_TRANSACTION_DIRECTION = {
  '1': jsx("span", {
    css: STYLES_TABLE_TAG,
    style: {
      background: system.green
    }
  }, "+ incoming"),
  '2': jsx("span", {
    css: STYLES_TABLE_TAG
  }, "- outgoing")
};
var COMPONENTS_TRANSACTION_STATUS = {
  '1': jsx("span", {
    css: STYLES_TABLE_TAG
  }, "complete"),
  '2': jsx("span", {
    css: STYLES_TABLE_TAG,
    style: {
      background: system.yellow
    }
  }, "pending")
};
var STYLES_COLUMN = react.css(_templateObject2$b());
var STYLES_TOP_COLUMN = react.css(_templateObject3$6(), system.brand);
var STYLES_CONTENT = react.css(_templateObject4$4());
var STYLES_CONTENT_BUTTON = react.css(_templateObject5$3(), system.green);
var STYLES_TABLE_CONTENT_LINK = react.css(_templateObject6$3(), system.green);
var TableColumn = function TableColumn(props) {
  var tooltipElement = props.tooltip ? jsx(reactTippy_1, {
    animation: "fade",
    animateFill: false,
    title: props.tooltip
  }, jsx("span", {
    css: STYLES_CONTENT_BUTTON
  }, jsx(Information, {
    height: "14px"
  }))) : null;
  var copyableElement = props.copyable ? jsx("span", {
    css: STYLES_CONTENT_BUTTON
  }, jsx(CopyAndPaste, {
    height: "16px"
  })) : null;
  return jsx("span", {
    css: props.top ? STYLES_TOP_COLUMN : STYLES_COLUMN,
    style: props.style
  }, jsx("span", {
    css: STYLES_CONTENT
  }, props.children), tooltipElement, copyableElement);
};
var TableContent = function TableContent(_ref) {
  var type = _ref.type,
      text = _ref.text,
      action = _ref.action,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      onNavigateTo = _ref.onNavigateTo,
      onAction = _ref.onAction;
  var status = data.status,
      online = data.online;

  if (text === null || text === undefined) {
    return null;
  }

  switch (type) {
    case 'DEAL_CATEGORY':
      return jsx(React.Fragment, null, text == 1 ? 'Storage' : 'Retrieval');

    case 'LOCATION':
      return 'United States';

    case 'BUTTON':
      return jsx("span", {
        css: STYLES_TABLE_CONTENT_LINK,
        onClick: function onClick() {
          return onAction({
            type: 'SIDEBAR',
            value: action
          });
        }
      }, text);

    case 'TRANSACTION_DIRECTION':
      return COMPONENTS_TRANSACTION_DIRECTION[text];

    case 'TRANSACTION_STATUS':
      return COMPONENTS_TRANSACTION_STATUS[text];

    case 'ICON':
      return COMPONENTS_ICON[text];

    case 'AVATAR':
      return jsx(AvatarEntity, {
        url: text,
        size: 40,
        online: online
      });

    case 'DEAL_STATUS_RETRIEVAL':
      return RETRIEVAL_DEAL_STATES["".concat(text)];

    case 'DEAL_STATUS':
      return data['deal_category'] === 1 ? STORAGE_DEAL_STATES["".concat(text)] : RETRIEVAL_DEAL_STATES["".concat(text)];

    case 'BANDWIDTH_UPLOAD':
      return jsx(React.Fragment, null, jsx(BandwidthUp, {
        height: "16px",
        style: {
          marginRight: 8
        }
      }), bytesToSize(text));

    case 'BANDWIDTH_DOWNLOAD':
      return jsx(React.Fragment, null, jsx(BandwidthDown, {
        height: "16px",
        style: {
          marginRight: 8
        }
      }), bytesToSize(text));

    case 'MINER_AVAILABILITY':
      return text == 1 ? jsx("span", {
        css: STYLES_TABLE_TAG,
        style: {
          background: system.green
        }
      }, "Online") : null;

    case 'DEAL_AUTO_RENEW':
      return text == 1 ? jsx("span", {
        css: STYLES_TABLE_TAG,
        style: {
          background: system.brand
        }
      }, "true") : jsx("span", {
        css: STYLES_TABLE_TAG
      }, "false");

    case 'NOTIFICATION_ERROR':
      return jsx("span", {
        css: STYLES_TABLE_TAG,
        style: {
          background: system.red
        }
      }, text, " ", pluralize('error', text));

    case 'FILE_DATE':
      return toDate(text);

    case 'FILE_SIZE':
      return bytesToSize(text, 2);

    case 'FILE_LINK':
      // NOTE(jim): Special case to prevent navigation.
      if (!data) {
        return text;
      } // NOTE(jim): Navigate to folers.


      if (data && data.folderId) {
        return jsx("span", {
          css: STYLES_TABLE_CONTENT_LINK,
          onClick: function onClick() {
            return onAction({
              type: 'NAVIGATE',
              value: data.folderId,
              data: data
            });
          }
        }, text);
      } // NOTE(jim): Special case for navigating to a sidebar.


      if (data && data['retrieval_status'] === 1) {
        return jsx("span", {
          css: STYLES_TABLE_CONTENT_LINK,
          onClick: function onClick() {
            return onAction({
              type: 'SIDEBAR',
              value: 'SIDEBAR_FILE_STORAGE_DEAL'
            });
          }
        }, text);
      } // NOTE(jim): Special case to prevent navigation.


      if (data && (data['retrieval_status'] === 5 || data['retrieval_status'] === 4 || data['retrieval_status'] === 3 || data['retrieval_status'] === 2)) {
        return jsx("span", {
          onClick: function onClick() {
            return onAction({
              name: 'File does not exist',
              type: 'ACTION',
              value: 'ACTION_FILE_MISSING'
            });
          }
        }, text);
      } // NOTE(jim): Navigates to file.


      return jsx("span", {
        css: STYLES_TABLE_CONTENT_LINK,
        onClick: function onClick() {
          return onNavigateTo({
            id: 15
          }, data);
        }
      }, text);

    default:
      return text;
  }
};

function _templateObject3$7() {
  var data = taggedTemplateLiteral(["\n  font-size: ", ";\n  line-height: 1.5;\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject3$7 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$c() {
  var data = taggedTemplateLiteral(["\n  font-size: ", ";\n  line-height: 1.1;\n  font-family: 'inter-medium';\n  font-weight: 400;\n\n  color: inherit;\n  text-decoration: none;\n  display: block;\n\n  :hover {\n    color: inherit;\n  }\n\n  :visited {\n    color: inherit;\n  }\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject2$c = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$g() {
  var data = taggedTemplateLiteral(["\n  font-size: ", ";\n  line-height: 1.1;\n  font-family: 'inter-semi-bold';\n  font-weight: 400;\n  color: inherit;\n  text-decoration: none;\n  display: block;\n\n  :hover {\n    color: inherit;\n  }\n\n  :visited {\n    color: inherit;\n  }\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject$g = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_H1 = react.css(_templateObject$g(), typescale.lvl4);
var H1 = function H1(props) {
  if (props.href) {
    return jsx("a", _extends_1({
      css: STYLES_H1
    }, props));
  }

  return jsx("h1", _extends_1({
    css: STYLES_H1
  }, props));
};
var STYLES_H2 = react.css(_templateObject2$c(), typescale.lvl3);
var H2 = function H2(props) {
  if (props.href) {
    return jsx("a", _extends_1({
      css: STYLES_H2
    }, props));
  }

  return jsx("h2", _extends_1({
    css: STYLES_H2
  }, props));
};
var STYLES_P = react.css(_templateObject3$7(), typescale.lvl1);
var P = function P(props) {
  return jsx("p", _extends_1({
    css: STYLES_P
  }, props));
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject4$5() {
  var data = taggedTemplateLiteral(["\n  font-family: 'inter-semi-bold';\n  width: 100%;\n  padding: 0 8px 0 8px;\n  border-bottom: 1px solid ", ";\n  display: flex;\n  align-items: flex-start;\n"]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$8() {
  var data = taggedTemplateLiteral(["\n  display: block;\n  border-bottom: 1px solid ", ";\n"]);

  _templateObject3$8 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$d() {
  var data = taggedTemplateLiteral(["\n  padding: 0 8px 0 8px;\n  border-bottom: 1px solid ", ";\n  display: flex;\n  align-items: flex-start;\n  transition: 200ms ease all;\n\n  :last-child {\n    border: 0;\n  }\n"]);

  _templateObject2$d = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$h() {
  var data = taggedTemplateLiteral(["\n  display: block;\n  width: 100%;\n  padding: 20px;\n  font-size: 12px;\n  color: ", ";\n"]);

  _templateObject$h = function _templateObject() {
    return data;
  };

  return data;
}
var TABLE_COLUMN_WIDTH_DEFAULTS = {
  1: '100%',
  2: '50%',
  3: '33.333%',
  4: '25%',
  5: '20%',
  6: '16.666%',
  7: '14.28%',
  8: '12.5%'
};
var STYLES_TABLE_PLACEHOLDER = react.css(_templateObject$h(), system.black);
var STYLES_TABLE_ROW = react.css(_templateObject2$d(), system.gray);
var STYLES_TABLE_SELECTED_ROW = react.css(_templateObject3$8(), system.gray);
var STYLES_TABLE_TOP_ROW = react.css(_templateObject4$5(), system.gray);
var Table = /*#__PURE__*/function (_React$Component) {
  inherits(Table, _React$Component);

  var _super = _createSuper$c(Table);

  function Table() {
    var _this;

    classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value !== _this.props.selectedRowId ? value : null
        }
      });
    });

    return _this;
  }

  createClass(Table, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      var ac = {};

      if (!data || !data.rows || data.rows.length === 0) {
        return jsx(P, {
          style: {
            padding: 24
          }
        }, "No data.");
      }

      for (var x = 0; x < data.columns.length; x++) {
        ac[data.columns[x].key] = _objectSpread$3(_objectSpread$3({}, data.columns[x]), {}, {
          index: x,
          color: x % 2 !== 0 ? 'rgba(0, 0, 0, 0.01)' : null
        });
      }

      var width = TABLE_COLUMN_WIDTH_DEFAULTS[data.columns.length];
      return jsx(React.Fragment, null, jsx("div", {
        css: STYLES_TABLE_TOP_ROW
      }, data.columns.map(function (c, cIndex) {
        var text = c.hideLabel ? '' : isEmpty(c.name) ? c.key : c.name;
        var localWidth = c.width ? c.width : width;
        var flexShrink = c.width && c.width !== '100%' ? '0' : null;

        if (cIndex === 0 && !c.width) {
          localWidth = '100%';
        }

        return jsx(TableColumn, {
          top: true,
          key: "table-top-".concat(c.key, "-").concat(cIndex),
          style: {
            width: localWidth,
            backgroundColor: ac[c.key].color,
            flexShrink: flexShrink
          },
          tooltip: c.tooltip
        }, text);
      })), data.rows.map(function (r, i) {
        var selected = r.id === _this2.props.selectedRowId;
        return jsx(React.Fragment, {
          key: r.id
        }, jsx("div", {
          css: STYLES_TABLE_ROW
        }, Object.keys(ac).map(function (each, cIndex) {
          var field = ac[each];
          var text = r[each];
          var localWidth = field.width ? field.width : width;
          var flexShrink = field.width && field.width !== '100%' ? '0' : null;

          if (cIndex === 0 && !field.width) {
            localWidth = '100%';
          }

          return jsx(TableColumn, {
            key: "".concat(each, "-").concat(i),
            style: {
              width: localWidth,
              backgroundColor: field.color,
              flexShrink: flexShrink
            },
            copyable: field.copyable
          }, jsx(TableContent, {
            data: r,
            text: text,
            type: field.type,
            action: field.action,
            onNavigateTo: _this2.props.onNavigateTo,
            onAction: _this2.props.onAction
          }));
        })), selected ? jsx("div", {
          css: STYLES_TABLE_SELECTED_ROW
        }, jsx("span", {
          css: STYLES_TABLE_PLACEHOLDER
        }, r.children)) : null);
      }));
    }
  }]);

  return Table;
}(React.Component);

defineProperty(Table, "defaultProps", {
  onNavigateTo: function onNavigateTo() {
    return console.log('No navigation function set');
  },
  onAction: function onAction() {
    return console.log('No action function set');
  }
});

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject$i() {
  var data = taggedTemplateLiteral(["\n  -webkit-appearance: none;\n  width: 100%;\n  min-height: 160px;\n  max-width: 480px;\n  resize: none;\n  background: ", ";\n  color: ", ";\n  border-radius: 4px;\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  justify-content: flex-start;\n  outline: 0;\n  border: 0;\n  box-sizing: border-box;\n  transition: 200ms ease all;\n  padding: 16px 24px 16px 24px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15), inset 0 0 0 1px ", ";\n"]);

  _templateObject$i = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TEXTAREA = react.css(_templateObject$i(), system.white, system.black, system.darkGray);
var Textarea = /*#__PURE__*/function (_React$Component) {
  inherits(Textarea, _React$Component);

  var _super = _createSuper$d(Textarea);

  function Textarea() {
    classCallCheck(this, Textarea);

    return _super.apply(this, arguments);
  }

  createClass(Textarea, [{
    key: "render",
    value: function render() {
      return jsx(TextareaAutosize, {
        css: STYLES_TEXTAREA,
        onChange: this.props.onChange,
        name: this.props.name,
        value: this.props.value
      });
    }
  }]);

  return Textarea;
}(React.Component);

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject2$e() {
  var data = taggedTemplateLiteral(["\n  height: 32px;\n  width: 32px;\n  border-radius: 32px;\n  margin-top: 4px;\n  margin-left: 4px;\n  background: ", ";\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n  transition: transform 200ms ease;\n"]);

  _templateObject2$e = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$j() {
  var data = taggedTemplateLiteral(["\n  display: inline-flex;\n  height: 40px;\n  border-radius: 40px;\n  width: 80px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  background: ", ";\n  transition: background 200ms ease;\n  cursor: pointer;\n  user-select: none;\n"]);

  _templateObject$j = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TOGGLE = react.css(_templateObject$j(), system.black);
var STYLES_DIAL = react.css(_templateObject2$e(), system.white);
var Toggle = /*#__PURE__*/function (_React$Component) {
  inherits(Toggle, _React$Component);

  var _super = _createSuper$e(Toggle);

  function Toggle() {
    var _this;

    classCallCheck(this, Toggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "_handleChange", function () {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: !_this.props.active
        }
      });
    });

    return _this;
  }

  createClass(Toggle, [{
    key: "render",
    value: function render() {
      return jsx("div", {
        css: STYLES_TOGGLE,
        onClick: this._handleChange,
        style: {
          backgroundColor: this.props.active ? system.brand : null
        }
      }, jsx("figure", {
        css: STYLES_DIAL,
        style: {
          transform: this.props.active ? "translateX(40px)" : null
        }
      }));
    }
  }]);

  return Toggle;
}(React.Component);

exports.ButtonDisabled = ButtonDisabled;
exports.ButtonDisabledFull = ButtonDisabledFull;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonPrimaryFull = ButtonPrimaryFull;
exports.ButtonSecondary = ButtonSecondary;
exports.ButtonSecondaryFull = ButtonSecondaryFull;
exports.CardTabGroup = CardTabGroup;
exports.CheckBox = CheckBox$1;
exports.CodeBlock = CodeBlock;
exports.CodeTextarea = CodeTextarea;
exports.DescriptionGroup = DescriptionGroup;
exports.H1 = H1;
exports.H2 = H2;
exports.Input = Input;
exports.Notification = Notification;
exports.P = P;
exports.PopoverNavigation = PopoverNavigation;
exports.RadioGroup = RadioGroup;
exports.SelectMenu = SelectMenu;
exports.SelectMenuFull = SelectMenuFull;
exports.StatDownload = StatDownload;
exports.StatUpload = StatUpload;
exports.TabGroup = TabGroup;
exports.Table = Table;
exports.TableColumn = TableColumn;
exports.TableContent = TableContent;
exports.Textarea = Textarea;
exports.Toggle = Toggle;
exports.TooltipAnchor = TooltipAnchor;
