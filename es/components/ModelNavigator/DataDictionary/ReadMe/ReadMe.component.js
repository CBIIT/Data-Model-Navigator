"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadMarkdownPdf = exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
var _marked = require("marked");
var _html2pdf = _interopRequireDefault(require("html2pdf.js"));
var _ReadMe = _interopRequireDefault(require("./ReadMe.style"));
var _ReadMeTheme = _interopRequireDefault(require("./ReadMe.theme.config"));
var _utils = require("../utils");
var _twoPixelFooterLine = _interopRequireDefault(require("./assets/two-pixel-footer-line.png"));
var _icdc_nih_logo = _interopRequireDefault(require("./assets/icdc_nih_logo.png"));
var _icon_download_PDF = _interopRequireDefault(require("../Header/icons/icon_download_PDF.svg"));
var _reactRedux = require("react-redux");
require("./ReadMe.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var date = new Date().toLocaleString("en-us", {
  month: "long",
  year: "numeric",
  day: "numeric"
}).toUpperCase();

/** download pdf of marked down file
 * 1.convert or generate html element of marked object
 * 2. uses html2pdf library to convert html to pdf
 * all the html style from marked down file will be reflected on PDF
 */
var downloadMarkdownPdf = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(title, content) {
    var iconSrc,
      filePrefix,
      footnote,
      html,
      htmlWithPageBreaks,
      readMeContent,
      headerLogo,
      titleEl,
      fileName,
      options,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          iconSrc = _args.length > 2 && _args[2] !== undefined ? _args[2] : _icdc_nih_logo["default"];
          filePrefix = _args.length > 3 && _args[3] !== undefined ? _args[3] : "ICDC_Data_Model-";
          footnote = _args.length > 4 && _args[4] !== undefined ? _args[4] : "";
          html = (0, _marked.marked)(content);
          htmlWithPageBreaks = html.replace(/<!-- PAGE BREAK -->/g, '<div class="page-break"></div>');
          readMeContent = document.createElement("div");
          /** add header logo on first page */
          headerLogo = "<img src='".concat(iconSrc, "' width=\"40%\" alt='logo' />\n  <br> <hr style=\"height:1px\" color=\"#173554\" />");
          readMeContent.innerHTML += headerLogo;
          titleEl = "<br><span style='color: #4D6787; font-size: 18px; font-family: Lato; font-weight: 700';>".concat(title, "</span>");
          readMeContent.innerHTML += titleEl;
          readMeContent.innerHTML += htmlWithPageBreaks;

          /** set pdf fileneam */
          fileName = (0, _utils.createFileName)("read_me", filePrefix);
          /** configure pdf increase pixel of the PDF */
          options = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: fileName,
            image: {
              type: "jpeg",
              quality: 0.98
            },
            html2canvas: {
              dpi: 192,
              scale: 4,
              letterRendering: true,
              useCORS: true
            },
            jsPDF: {
              unit: "in",
              format: "letter",
              orientation: "portrait"
            },
            pagebreak: {
              mode: ["css"]
            }
          };
          (0, _html2pdf["default"])().set(options).from(readMeContent).toPdf().get("pdf").then(function (pdf) {
            var totalPages = pdf.internal.getNumberOfPages();
            var pageSz = pdf.internal.pageSize;
            var pgHeight = pageSz.getHeight();
            var pgWidth = pageSz.getWidth();

            /** set header and footer content for each pdf page
             * page height and width is used for assigning header and footer element
             * adjust height & width for footer
             * adjust height & width for header
             */
            for (var i = 1; i <= totalPages; i++) {
              pdf.setPage(i);
              pdf.setFont("Helvetica");
              pdf.setFontSize(7);
              pdf.setTextColor("#606060");
              pdf.setCharSpace(0.015);
              pdf.text(pgWidth - 2.3, pgHeight - 0.5, "".concat(date, "     |      ").concat(i));
              pdf.text(pgWidth - 8, pgHeight - 0.5, footnote || "CANINECOMMONS.CANCER.GOV/#/ICDC-DATA-MODEL");
              pdf.addImage(_twoPixelFooterLine["default"], "JPEG", pgWidth - 8, pgHeight - 0.75, 7.5, 0.05);
              // if (i === 1) {
              // pdf.addImage(nihLogo, 'JPEG', pgWidth - 7.75, pgHeight - 10.75, 4, 0.5);
              // pdf.addImage(footerLine, 'JPEG', pgWidth - 7.75, pgHeight - 10.15, 7, 0.05);
              // }
            }
          }).save();
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function downloadMarkdownPdf(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.downloadMarkdownPdf = downloadMarkdownPdf;
var ReadMeDialogComponent = function ReadMeDialogComponent(_ref2) {
  var classes = _ref2.classes,
    display = _ref2.display,
    displayReadMeDialog = _ref2.displayReadMeDialog,
    content = _ref2.content,
    title = _ref2.title;
  var pdfConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.ddgraph && state.ddgraph.pdfDownloadConfig;
  });
  var readMeConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.readMeConfig;
  });
  if (!content) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  }
  return /*#__PURE__*/_react["default"].createElement(_ReadMeTheme["default"], null, /*#__PURE__*/_react["default"].createElement(_core.Dialog, {
    classes: {
      paper: classes.dialogPaper
    },
    open: display,
    onClose: displayReadMeDialog,
    maxWidth: "md",
    className: classes.dialogBox,
    BackdropProps: {
      timeout: 500
    },
    BackdropComponent: _core.Backdrop
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.titleContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.title
  }, /*#__PURE__*/_react["default"].createElement("span", null, title)), /*#__PURE__*/_react["default"].createElement("div", {
    item: true,
    xs: 1,
    className: classes.closeBtn
  }, (typeof (readMeConfig === null || readMeConfig === void 0 ? void 0 : readMeConfig.allowDownload) !== "boolean" || (readMeConfig === null || readMeConfig === void 0 ? void 0 : readMeConfig.allowDownload)) && /*#__PURE__*/_react["default"].createElement(_core.Button, {
    className: classes.downloadBtn,
    onClick: function onClick() {
      return downloadMarkdownPdf(title, content, pdfConfig === null || pdfConfig === void 0 ? void 0 : pdfConfig.iconSrc, pdfConfig === null || pdfConfig === void 0 ? void 0 : pdfConfig.prefix, pdfConfig === null || pdfConfig === void 0 ? void 0 : pdfConfig.footnote);
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _icon_download_PDF["default"],
    alt: "pdf download icon",
    className: classes.downloadIcon
  })), /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    onClick: displayReadMeDialog,
    className: classes.closeBtnContainer
  }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
    fontSize: "small",
    className: classes.closeBtnIcon
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.content,
    id: "readMe_content"
  }, /*#__PURE__*/_react["default"].createElement(_reactMarkdown["default"], null, content.replace(/<!-- PAGE BREAK -->/g, "")))));
};
var _default = (0, _core.withStyles)(_ReadMe["default"])(ReadMeDialogComponent);
exports["default"] = _default;