"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));
var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));
var _KeyboardArrowDown = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowDown"));
var _fileSaver = require("file-saver");
var _jszip = _interopRequireDefault(require("jszip"));
var _renderer = require("@react-pdf/renderer");
var _Pdf = _interopRequireDefault(require("../../LandscapeNodePDF/Pdf"));
var _Pdf2 = _interopRequireDefault(require("../../NodePDF/Pdf"));
var _downloadHelperFunctions = require("../../Utils/download-helper-functions");
var _ReadMe = require("../../ReadMe/ReadMe.component");
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _FILE_TYPE_FULL_DICTI = {
    FILE_TYPE_FULL_DICTIONARY: 'Data Dictionary (PDF)',
    FILE_TYPE_README: 'Data Model README (PDF)',
    FILE_TYPE_TEMPLATES: 'All Data Templates (TSV)',
    FILE_TYPE_CONTROLLED_VOCAB_TSV: 'All Vocabularies (TSV)',
    FILE_TYPE_CONTROLLED_VOCAB_JSON: 'All Vocabularies (JSON)',
    FILE_TYPE_LOADING_EXAMPLE: 'Loading File Examples'
  },
  FILE_TYPE_FULL_DICTIONARY = _FILE_TYPE_FULL_DICTI.FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_README = _FILE_TYPE_FULL_DICTI.FILE_TYPE_README,
  FILE_TYPE_TEMPLATES = _FILE_TYPE_FULL_DICTI.FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV = _FILE_TYPE_FULL_DICTI.FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON = _FILE_TYPE_FULL_DICTI.FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE = _FILE_TYPE_FULL_DICTI.FILE_TYPE_LOADING_EXAMPLE;
var DOWNLOADS = 'Available Downloads';
var fileTypes = [FILE_TYPE_README, FILE_TYPE_FULL_DICTIONARY, FILE_TYPE_TEMPLATES, FILE_TYPE_CONTROLLED_VOCAB_TSV, FILE_TYPE_CONTROLLED_VOCAB_JSON, FILE_TYPE_LOADING_EXAMPLE];
var StyledMenu = (0, _core.withStyles)({
  paper: {
    border: '1px solid #d3d4d5',
    width: '257px',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px'
  }
})(function (props) {
  return /*#__PURE__*/_react["default"].createElement(_Menu["default"], _extends({
    elevation: 0,
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    }
  }, props));
});
var StyledMenuItem = (0, _core.withStyles)(function (theme) {
  return {
    root: {
      padding: '10px',
      color: '#095c85',
      '&:focus': {
        backgroundColor: '#0d71a3',
        color: 'white',
        '& .MuiListItemText-primary': {
          color: theme.palette.common.white
        }
      }
    }
  };
})(_MenuItem["default"]);
var generatePdfDocument = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(object, config, setLoading, fileName, pdfDownloadConfig) {
    var document, blob;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          document = config.type === 'document' ? object : [object];
          _context.next = 3;
          return (0, _renderer.pdf)(config.landscape ? /*#__PURE__*/_react["default"].createElement(_Pdf["default"], {
            nodes: document,
            pdfDownloadConfig: pdfDownloadConfig,
            icon: config.catagoryIcon
          }) : /*#__PURE__*/_react["default"].createElement(_Pdf2["default"], {
            nodes: document
          })).toBlob();
        case 3:
          blob = _context.sent;
          setLoading(false);
          (0, _fileSaver.saveAs)(blob, "".concat(fileName, ".pdf"));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function generatePdfDocument(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var DownloadFileTypeBtn = function DownloadFileTypeBtn(_ref2) {
  var classes = _ref2.classes,
    config = _ref2.config,
    filteredDictionary = _ref2.filteredDictionary,
    readMeContent = _ref2.readMeContent,
    readMeConfig = _ref2.readMeConfig,
    fullDictionary = _ref2.fullDictionary,
    loadingExampleConfig = _ref2.loadingExampleConfig;
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anchorElement = _React$useState2[0],
    setAnchorElement = _React$useState2[1];
  var _useState = (0, _react.useState)('Available Downloads'),
    _useState2 = _slicedToArray(_useState, 2),
    label = _useState2[0],
    setLabel = _useState2[1];
  var _React$useState3 = _react["default"].useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isLoading = _React$useState4[0],
    setLoading = _React$useState4[1];
  var filteredDictionaryC2nl = (0, _downloadHelperFunctions.category2NodeList)(filteredDictionary);
  // eslint-disable-next-line no-unused-vars
  var processedFilteredDictionary = (0, _downloadHelperFunctions.sortByCategory)(filteredDictionaryC2nl, filteredDictionary);
  var fullDictionaryC2nl = (0, _downloadHelperFunctions.category2NodeList)(fullDictionary);
  var processedFullDictionary = (0, _downloadHelperFunctions.sortByCategory)(fullDictionaryC2nl, fullDictionary);
  var pdfDownloadConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.ddgraph && state.ddgraph.pdfDownloadConfig;
  });
  var clickHandler = function clickHandler(event) {
    setLabel('Available Downloads');
    setAnchorElement(event.currentTarget);
  };
  var closeHandler = function closeHandler() {
    setAnchorElement(null);
  };
  var setFileType = function setFileType(value) {
    setLabel(value);
    setAnchorElement(null);
  };
  var downloadFullDictionaryPdf = function downloadFullDictionaryPdf(pdfDownloadConfig) {
    var fileName = (0, _utils.createFileName)((config === null || config === void 0 ? void 0 : config.downloadPrefix) || 'ICDC_Data_Model', '');
    setLoading(true);
    setTimeout(function () {
      generatePdfDocument(processedFullDictionary, config, setLoading, fileName, pdfDownloadConfig);
    }, 50);
  };
  var downloadAllTemplates = function downloadAllTemplates() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ICDC_";
    // eslint-disable-next-line no-unused-vars
    var fullDictionaryTemplates = Object.fromEntries(Object.entries(fullDictionary).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        _key = _ref4[0],
        value = _ref4[1];
      return value.template === 'Yes';
    }));
    var nodesValueArray = Object.values(fullDictionaryTemplates);
    var nodesKeyArray = Object.keys(fullDictionaryTemplates);
    var nodesTSV = nodesValueArray.map(function (elem) {
      return (0, _utils.isFileManifest)(elem) ? {
        type: 'file-manifest',
        content: (0, _utils.generateFileManifest)(elem)
      } : {
        type: 'template',
        content: (0, _utils.convertToTSV)(elem)
      };
    });
    var zip = new _jszip["default"]();
    var titlePrefix = function titlePrefix(nodeTSV) {
      return nodeTSV.type === 'file-manifest' ? prefix + 'File_Transfer_Manifest' : prefix + 'Data_Loading_Template-';
    };
    var nodeName = function nodeName(name) {
      return name === 'file' ? '' : name;
    };
    nodesTSV.forEach(function (nodeTSV, index) {
      return zip.file("".concat((0, _utils.createFileName)(nodeName(nodesKeyArray[index]), titlePrefix(nodeTSV)), ".tsv"), nodeTSV.content);
    });
    zip.generateAsync({
      type: 'blob'
    }).then(function (thisContent) {
      (0, _fileSaver.saveAs)(thisContent, (0, _utils.createFileName)('', prefix + 'Data_Loading_Templates'));
    });
  };
  var download = function download() {
    switch (label) {
      case FILE_TYPE_FULL_DICTIONARY:
        return downloadFullDictionaryPdf(pdfDownloadConfig);
      case FILE_TYPE_README:
        return (0, _ReadMe.downloadMarkdownPdf)(readMeConfig.readMeTitle, readMeContent, config === null || config === void 0 ? void 0 : config.iconSrc, config === null || config === void 0 ? void 0 : config.downloadPrefix, config === null || config === void 0 ? void 0 : config.footnote);
      case FILE_TYPE_TEMPLATES:
        return downloadAllTemplates(config === null || config === void 0 ? void 0 : config.downloadPrefix);
      case FILE_TYPE_CONTROLLED_VOCAB_TSV:
        return (0, _utils.generateVocabFullDownload)(fullDictionary, 'TSV', config === null || config === void 0 ? void 0 : config.downloadPrefix);
      case FILE_TYPE_CONTROLLED_VOCAB_JSON:
        return (0, _utils.generateVocabFullDownload)(fullDictionary, 'JSON', config === null || config === void 0 ? void 0 : config.downloadPrefix);
      case FILE_TYPE_LOADING_EXAMPLE:
        return (loadingExampleConfig === null || loadingExampleConfig === void 0 ? void 0 : loadingExampleConfig.type) === "static" ? (0, _utils.downloadLoadingExample)(loadingExampleConfig === null || loadingExampleConfig === void 0 ? void 0 : loadingExampleConfig.url) : (0, _utils.generateLoadingExample)(loadingExampleConfig === null || loadingExampleConfig === void 0 ? void 0 : loadingExampleConfig.url);
      default:
        return null;
    }
  };
  var getMenuItem = function getMenuItem(type) {
    return /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
      key: type,
      onClick: function onClick() {
        return setFileType(type);
      }
    }, /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
      classes: {
        primary: classes.listItemText
      },
      primary: type
    }));
  };
  var options = fileTypes.filter(function (item) {
    if (item === FILE_TYPE_README && typeof (readMeConfig === null || readMeConfig === void 0 ? void 0 : readMeConfig.readMeUrl) !== "string") {
      return false;
    }
    if (item === FILE_TYPE_README && typeof (readMeConfig === null || readMeConfig === void 0 ? void 0 : readMeConfig.allowDownload) === "boolean") {
      return readMeConfig === null || readMeConfig === void 0 ? void 0 : readMeConfig.allowDownload;
    }
    return true;
  }).map(function (item) {
    return getMenuItem(item);
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ButtonGroup["default"], {
    variant: "contained",
    classes: {
      root: classes.btnGrpRoot,
      contained: classes.btnGrpContained
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    classes: {
      root: classes.availableDownloadDropdownBtn,
      label: classes.availableDownloadDropdownBtnLabel,
      contained: classes.availableDownloadBtnContained
    },
    startIcon: /*#__PURE__*/_react["default"].createElement(_KeyboardArrowDown["default"], null),
    onClick: clickHandler
  }, isLoading ? /*#__PURE__*/_react["default"].createElement("p", null, "Loading...") : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, label)), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    disabled: DOWNLOADS === label,
    onClick: download,
    classes: {
      root: classes.availableDownloadBtn
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    style: {
      height: '19px',
      width: '19px'
    },
    alt: "download icon",
    src: "https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
  }))), /*#__PURE__*/_react["default"].createElement(StyledMenu, {
    id: "customized-menu",
    anchorEl: anchorElement,
    keepMounted: true,
    open: Boolean(anchorElement),
    onClose: closeHandler
  }, options));
};
var styles = function styles() {
  return {
    btnGrpRoot: {
      borderRadius: '10px'
    },
    btnGrpContained: {
      boxShadow: 'none'
    },
    availableDownloadBtnContained: {
      '&:focus': {
        boxShadow: 'none'
      },
      '&:hover': {
        boxShadow: 'none'
      }
    },
    availableDownloadDropdownBtn: {
      minWidth: '258px',
      height: '38px',
      backgroundColor: '#F2F2F2'
    },
    availableDownloadBtn: {
      width: '44px',
      backgroundColor: '#0F4C91',
      '&:hover': {
        backgroundColor: '#0F4C91'
      },
      '&:disabled': {
        backgroundColor: '#A2ABBF'
      }
    },
    availableDownloadDropdownBtnLabel: {
      fontSize: '16px',
      color: '#0D71A3'
    },
    listItemText: {
      fontSize: '15px',
      paddingLeft: '29px',
      fontFamily: 'Lato',
      fontWeight: '500'
    }
  };
};
var _default = (0, _core.withStyles)(styles, {
  withTheme: true
})(DownloadFileTypeBtn);
exports["default"] = _default;