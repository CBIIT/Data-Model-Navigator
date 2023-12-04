"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var submissionApiPath = 'FIXME-submissionApiPath';
var humanFileSize = function humanFileSize(size) {
  if (typeof size !== 'number') {
    return '';
  }
  var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  var sizeStr = (size / Math.pow(1024, i)).toFixed(2) * 1;
  var suffix = ['B', 'KB', 'MB', 'GB', 'TB'][i];
  return "".concat(sizeStr, " ").concat(suffix);
};
exports.humanFileSize = humanFileSize;
var getSubmitPath = function getSubmitPath(project) {
  var path = project.split('-');
  var programName = path[0];
  var projectCode = path.slice(1).join('-');
  return "".concat(submissionApiPath, "/").concat(programName, "/").concat(projectCode);
};
exports.getSubmitPath = getSubmitPath;
var jsonToString = function jsonToString(data) {
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
exports.jsonToString = jsonToString;
var predictFileType = function predictFileType(dirtyData, fileType) {
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
exports.predictFileType = predictFileType;
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
var parseParamWidth = function parseParamWidth(width) {
  return typeof width === 'number' ? "".concat(width, "px") : width;
};
exports.parseParamWidth = parseParamWidth;
var isPageFullScreen = function isPageFullScreen(pathname) {
  return !!(pathname && (pathname.toLowerCase() === '/dd' || pathname.toLowerCase().startsWith('/dd/') || pathname.toLowerCase() === '/cohort-tools' || pathname.toLowerCase().startsWith('/cohort-tools/')));
};
exports.isPageFullScreen = isPageFullScreen;
var isFooterHidden = function isFooterHidden(pathname) {
  return !!(pathname && (pathname.toLowerCase() === '/dd' || pathname.toLowerCase().startsWith('/dd/')));
};
exports.isFooterHidden = isFooterHidden;
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
var tsvMiddleware = function tsvMiddleware(node) {
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
exports.tsvMiddleware = tsvMiddleware;
var convertToTSV = function convertToTSV(node) {
  var line = tsvMiddleware(node);
  Object.keys(node.properties).forEach(function (key) {
    line += '\t'.concat("".concat(key));
  });
  var text = "".concat(line, "\r\n").concat(node.title);
  return text;
};
exports.convertToTSV = convertToTSV;
var isFileManifest = function isFileManifest(node) {
  return node.id === 'file';
};
exports.isFileManifest = isFileManifest;
var generateFileManifest = function generateFileManifest(node) {
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
exports.generateFileManifest = generateFileManifest;
var generateVocabFullDownload = function generateVocabFullDownload(fullDictionary, format) {
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
exports.generateVocabFullDownload = generateVocabFullDownload;
var generateLoadingExample = /*#__PURE__*/function () {
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
exports.generateLoadingExample = generateLoadingExample;
var downloadLoadingExample = /*#__PURE__*/function () {
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
exports.downloadLoadingExample = downloadLoadingExample;