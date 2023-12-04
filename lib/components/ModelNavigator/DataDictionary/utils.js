"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncSetInterval = asyncSetInterval;
exports.calculatePosition = calculatePosition;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.computeLastPageSizes = computeLastPageSizes;
exports.convertToTSV = void 0;
exports.createFileName = createFileName;
exports.humanFileSize = exports.getSubmitPath = exports.generateVocabFullDownload = exports.generateLoadingExample = exports.generateFileManifest = exports.downloadLoadingExample = void 0;
exports.intersection = intersection;
exports.jsonToString = exports.isPageFullScreen = exports.isFooterHidden = exports.isFileManifest = void 0;
exports.minus = minus;
exports.predictFileType = exports.parseParamWidth = void 0;
exports.sortCompare = sortCompare;
exports.tsvMiddleware = void 0;
var d3 = _interopRequireWildcard(require("d3-scale"));
var _jszip = _interopRequireDefault(require("jszip"));
var _fileSaver = require("file-saver");
var _downloadHelperFunctions = require("./Utils/download-helper-functions");
var _fileManifestConfig = require("../../../config/file-manifest-config");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var submissionApiPath = 'FIXME-submissionApiPath';
var humanFileSize = exports.humanFileSize = function humanFileSize(size) {
  if (typeof size !== 'number') {
    return '';
  }
  var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  var sizeStr = (size / Math.pow(1024, i)).toFixed(2) * 1;
  var suffix = ['B', 'KB', 'MB', 'GB', 'TB'][i];
  return "".concat(sizeStr, " ").concat(suffix);
};
var getSubmitPath = exports.getSubmitPath = function getSubmitPath(project) {
  var path = project.split('-');
  var programName = path[0];
  var projectCode = path.slice(1).join('-');
  return "".concat(submissionApiPath, "/").concat(programName, "/").concat(projectCode);
};
var jsonToString = exports.jsonToString = function jsonToString(data) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var replacer = function replacer(key, value) {
    if (value === null) {
      return undefined;
    }
    if (schema[key] === 'number') {
      var castedValue = Number(value);
      if (Number.isNaN(castedValue)) {
        return value;
      }
      return castedValue;
    }
    return value;
  };
  return JSON.stringify(data, replacer, '  ');
};
var predictFileType = exports.predictFileType = function predictFileType(dirtyData, fileType) {
  var predictType = fileType;
  var jsonType = 'application/json';
  var tsvType = 'text/tab-separated-values';
  var data = dirtyData.trim();
  if (data.indexOf('{') !== -1 || data.indexOf('}') !== -1) {
    return jsonType;
  }
  if (data.indexOf('\t') !== -1) {
    return tsvType;
  }
  return predictType;
};

/**
 * Little wrapper around setinterval with a guard to prevent an async function
 * from being invoked multiple times.
 *
 * @param {()=>Promise} lambda callback should return a Promise
 * @param {int} timeoutMs passed through to setinterval
 * @return the setinterval id (can be passed to clearinterval)
 */
function asyncSetInterval(_x, _x2) {
  return _asyncSetInterval.apply(this, arguments);
} // export const getCategoryColor = (category) => {
//   const colorMap = {
//     clinical: '#05B8EE',
//     biospecimen: '#27AE60',
//     data_file: '#7EC500',
//     metadata_file: '#F4B940',
//     analysis: '#FF7ABC',
//     administrative: '#AD91FF',
//     notation: '#E74C3C',
//     index_file: '#26D9B1',
//     clinical_assessment: '#3283C8',
//     medical_history: '#05B8EE',
//     satellite: d3.schemeCategory20[11],
//     radar: d3.schemeCategory20[16],
//     stream_gauge: d3.schemeCategory20[19],
//     weather_station: d3.schemeCategory20[10],
//     data_observations: d3.schemeCategory20[3],
//     experimental_methods: d3.schemeCategory20[4],
//     Imaging: d3.schemeCategory20[5],
//     study_administration: d3.schemeCategory20[6],
//     subject_characteristics: d3.schemeCategory20[7],
//   };
//   const defaultColor = '#9B9B9B';
//   return colorMap[category] ? colorMap[category] : defaultColor;
// };
// export function legendCreator(legendGroup, nodes, legendWidth) {
//   // Find all unique categories
//   const uniqueCategoriesList = nodes.reduce((acc, elem) => {
//     if (acc.indexOf(elem.category) === -1) {
//       acc.push(elem.category);
//     }
//     return acc;
//   }, []);
//   uniqueCategoriesList.sort((aIn, bIn) => {
//     const a = aIn.toLowerCase();
//     const b = bIn.toLowerCase();
//     if (a < b) {
//       return -1;
//     } if (a > b) {
//       return 1;
//     }
//     return 0;
//   });
//   const legendFontSize = '0.9em';
//   // Make Legend
//   legendGroup.selectAll('text')
//     .data(uniqueCategoriesList)
//     .enter().append('text')
//     .attr('x', legendWidth / 2)
//     .attr('y', (d, i) => `${1.5 * (2.5 + i)}em`)
//     .attr('text-anchor', 'middle')
//     .attr('fill', (d) => getCategoryColor(d))
//     .style('font-size', legendFontSize)
//     .text((d) => d);
//   legendGroup.append('text')
//     .attr('x', legendWidth / 2)
//     .attr('y', `${2}em`)
//     .attr('text-anchor', 'middle')
//     .text('Categories')
//     .style('font-size', legendFontSize)
//     .style('text-decoration', 'underline');
// }
// export function addArrows(graphSvg) {
//   graphSvg.append('svg:defs')
//     .append('svg:marker')
//     .attr('id', 'end-arrow')
//     .attr('viewBox', '0 -5 10 10')
//     .attr('fill', 'darkgray')
//     .attr('refX', 0)
//     .attr('refY', 0)
//     .attr('markerWidth', 6)
//     .attr('markerHeight', 6)
//     .attr('orient', 'auto')
//     .append('svg:path')
//     .attr('d', 'M0,-5L10,0L0,5');
// }
// export function addLinks(graphSvg, edges) {
//   return graphSvg.append('g')
//     .selectAll('path')
//     .data(edges)
//     .enter()
//     .append('path')
//     .attr('stroke-width', 2)
//     .attr('marker-mid', 'url(#end-arrow)')
//     .attr('stroke', 'darkgray')
//     .attr('fill', 'none');
// }
/**
 * Compute SVG coordinates fx, fy for each node in nodes.
 * Decorate each node with .fx and .fy property as side effect.
 *
 * @param {Array<Node>} nodes each decorated with a position [width,height] in [0,1]
 * @param {*} graphWidth
 * @param {*} graphHeight
 */
function _asyncSetInterval() {
  _asyncSetInterval = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(lambda, timeoutMs) {
    var isRunningGuard;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          isRunningGuard = false;
          return _context3.abrupt("return", setInterval(function () {
            if (!isRunningGuard) {
              isRunningGuard = true;
              lambda().then(function () {
                isRunningGuard = false;
              });
            }
          }, timeoutMs));
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _asyncSetInterval.apply(this, arguments);
}
function calculatePosition(nodes, graphWidth, graphHeight) {
  // Calculate the appropriate position of each node on the graph
  var fyVals = [];
  var retNodes = nodes;
  for (var i = 0; i < nodes.length; i += 1) {
    retNodes[i].fx = retNodes[i].position[0] * graphWidth;
    retNodes[i].fy = retNodes[i].position[1] * graphHeight;
    if (fyVals.indexOf(retNodes[i].fy) === -1) {
      fyVals.push(retNodes[i].fy);
    }
  }
  return {
    retNodes: retNodes,
    fyValsLength: fyVals.length
  };
}

/**
 * Type agnostic compare thunk for Array.sort
 * @param {*} a
 * @param {*} b
 */
function sortCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}
function computeLastPageSizes(filesMap, pageSize) {
  return Object.keys(filesMap).reduce(function (d, key) {
    var result = d;
    result[key] = filesMap[key].length % pageSize;
    return result;
  }, {});
}
function capitalizeFirstLetter(str) {
  var res = str.replace(/_/gi, ' ');
  return res.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Avoid importing underscore just for this ... export for testing
 * @method intersection
 * @param aList {Array<String>}
 * @param bList {Array<String>}
 * @return list of intersecting elements
 */
function intersection(aList, bList) {
  var key2Count = aList.concat(bList).reduce(function (db, it) {
    var res = db;
    if (res[it]) {
      res[it] += 1;
    } else {
      res[it] = 1;
    }
    return res;
  }, {});
  return Object.entries(key2Count).filter(function (kv) {
    return kv[1] > 1;
  }).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      k = _ref2[0];
    return k;
  });
}
function minus(aList, bList) {
  var key2Count = aList.concat(bList).concat(aList).reduce(function (db, it) {
    var res = db;
    if (res[it]) {
      res[it] += 1;
    } else {
      res[it] = 1;
    }
    return res;
  }, {});
  return Object.entries(key2Count).filter(function (kv) {
    return kv[1] === 2;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
      k = _ref4[0];
    return k;
  });
}
var parseParamWidth = exports.parseParamWidth = function parseParamWidth(width) {
  return typeof width === 'number' ? "".concat(width, "px") : width;
};
var isPageFullScreen = exports.isPageFullScreen = function isPageFullScreen(pathname) {
  return !!(pathname && (pathname.toLowerCase() === '/dd' || pathname.toLowerCase().startsWith('/dd/') || pathname.toLowerCase() === '/cohort-tools' || pathname.toLowerCase().startsWith('/cohort-tools/')));
};
var isFooterHidden = exports.isFooterHidden = function isFooterHidden(pathname) {
  return !!(pathname && (pathname.toLowerCase() === '/dd' || pathname.toLowerCase().startsWith('/dd/')));
};
function createFileName(fileName, filePreFix) {
  var date = new Date();
  var yyyy = date.getFullYear();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  if (dd < 10) {
    dd = "0".concat(dd);
  }
  if (mm < 10) {
    mm = "0".concat(mm);
  }
  var todaysDate = "".concat(yyyy, "-").concat(mm, "-").concat(dd);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }
  if (seconds < 10) {
    seconds = "0".concat(seconds);
  }
  return filePreFix ? "".concat(filePreFix).concat(fileName, " ").concat(todaysDate, " ").concat(hours, "-").concat(minutes, "-").concat(seconds) : "".concat(fileName, " ").concat(todaysDate, " ").concat(hours, "-").concat(minutes, "-").concat(seconds);
}
var tsvMiddleware = exports.tsvMiddleware = function tsvMiddleware(node) {
  var line = 'type';
  var links = node.links;
  if (links && links.length) {
    links.forEach(function (c) {
      if (c.targetId && String(c.generatedType).toLowerCase() !== 'loader-generated') {
        line += '\t'.concat(" ", c.target_type, ".").concat(c.targetId);
      }
    });
  }
  return line;
};
var convertToTSV = exports.convertToTSV = function convertToTSV(node) {
  var line = tsvMiddleware(node);
  Object.keys(node.properties).forEach(function (key) {
    line += '\t'.concat("".concat(key));
  });
  var text = "".concat(line, "\r\n").concat(node.title);
  return text;
};
var isFileManifest = exports.isFileManifest = function isFileManifest(node) {
  return node.id === 'file';
};
var generateFileManifest = exports.generateFileManifest = function generateFileManifest(node) {
  var line = tsvMiddleware(node);
  var arr = Object.entries(node.properties);
  var mergedArr = arr.concat(_fileManifestConfig.fileManifestDownload);
  mergedArr.forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];
    if (value.src !== 'Loader-derived') {
      line += '\t'.concat("".concat(key));
    }
  });
  var text = "".concat(line, "\r\n").concat(node.title);
  return text;
};
var generateVocabFullDownload = exports.generateVocabFullDownload = function generateVocabFullDownload(fullDictionary, format) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ICDC_";
  var c2nl = (0, _downloadHelperFunctions.category2NodeList)(fullDictionary);
  var enumArr = [];
  var zip = new _jszip["default"]();
  Object.keys(c2nl).forEach(function (category) {
    var nodes = c2nl[category];
    nodes.forEach(function (_ref7) {
      var title = _ref7.title,
        properties = _ref7.properties;
      var propertyKeyList = Object.keys(properties);
      propertyKeyList.forEach(function (propertyKey) {
        var property = properties[propertyKey];
        if (property["enum"]) {
          enumArr.push({
            title: title,
            enums: property["enum"],
            propertyKey: propertyKey
          });
        }
      });
    });
  });
  var zipFileName = createFileName(prefix + 'Controlled_Vocabularies', '');
  var getFileName = function getFileName(title, propertyKey, format) {
    return "".concat(createFileName("".concat(title, "-").concat(propertyKey), prefix + 'Controlled_Vocabulary-'), ".").concat(format);
  };
  switch (format) {
    case 'TSV':
      {
        var vocabTSVArr = enumArr.map(function (_ref8) {
          var enums = _ref8.enums,
            title = _ref8.title,
            propertyKey = _ref8.propertyKey;
          var content = '';
          if (enums && enums.length) {
            enums.forEach(function (item, index) {
              content += index === 0 ? item : '\n'.concat(item);
            });
          }
          return {
            content: content,
            title: title,
            propertyKey: propertyKey
          };
        });
        vocabTSVArr.forEach(function (_ref9) {
          var title = _ref9.title,
            propertyKey = _ref9.propertyKey,
            content = _ref9.content;
          return zip.file(getFileName(title, propertyKey, 'tsv'), content);
        });
        zip.generateAsync({
          type: 'blob'
        }).then(function (thisContent) {
          (0, _fileSaver.saveAs)(thisContent, zipFileName);
        });
      }
      break;
    // eslint-disable-next-line no-lone-blocks
    case 'JSON':
      {
        enumArr.forEach(function (_ref10) {
          var title = _ref10.title,
            enums = _ref10.enums,
            propertyKey = _ref10.propertyKey;
          return zip.file(getFileName(title, propertyKey, 'json'), JSON.stringify(enums));
        });
        zip.generateAsync({
          type: 'blob'
        }).then(function (thisContent) {
          (0, _fileSaver.saveAs)(thisContent, zipFileName);
        });
      }
      break;
    default:
      break;
  }
};
var generateLoadingExample = exports.generateLoadingExample = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var configUrl,
      zip,
      _yield$yield$Axios$ge,
      loadingExamples,
      title,
      titleArr,
      res,
      data,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          configUrl = _args.length > 0 && _args[0] !== undefined ? _args[0] : "https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json";
          zip = new _jszip["default"](); // fetch config
          _context.next = 4;
          return _axios["default"].get(configUrl);
        case 4:
          _context.next = 6;
          return _context.sent.data;
        case 6:
          _yield$yield$Axios$ge = _context.sent;
          loadingExamples = _yield$yield$Axios$ge.loadingExamples;
          title = _yield$yield$Axios$ge.title;
          _context.prev = 9;
          titleArr = Object.keys(loadingExamples);
          _context.next = 13;
          return Promise.all(Object.values(loadingExamples).map(function (example) {
            return _axios["default"].get(example);
          }));
        case 13:
          res = _context.sent;
          data = res.map(function (res, index) {
            return {
              title: titleArr[index],
              content: res.data,
              format: titleArr[index].split('.')[1]
            };
          });
          data.forEach(function (_ref12) {
            var title = _ref12.title,
              content = _ref12.content,
              format = _ref12.format;
            zip.file("".concat(createFileName(title), ".").concat(format), content);
          });
          zip.generateAsync({
            type: 'blob'
          }).then(function (thisContent) {
            (0, _fileSaver.saveAs)(thisContent, createFileName(title));
          });
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](9);
          throw Error("Failed to fetch example files");
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 19]]);
  }));
  return function generateLoadingExample() {
    return _ref11.apply(this, arguments);
  };
}();
var downloadLoadingExample = exports.downloadLoadingExample = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var zipUrl,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          zipUrl = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "";
          window.open(zipUrl, '_blank');
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function downloadLoadingExample() {
    return _ref13.apply(this, arguments);
  };
}();