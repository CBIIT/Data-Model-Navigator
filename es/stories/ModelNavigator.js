"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _axios = _interopRequireDefault(require("axios"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _lodash = _interopRequireDefault(require("lodash"));
var _store = _interopRequireDefault(require("../store"));
var _ReduxDataDictionary = _interopRequireDefault(require("../components/ModelNavigator/DataDictionary/ReduxDataDictionary"));
var _dataDictionaryData = require("../components/ModelNavigator/bento/dataDictionaryData");
var _ThemeContext = require("./ThemeContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */ // import { storiesOf } from '@storybook/react';
// import AutoComplete from '../stubs/autocomplete';
// import init from '../components/DataDictionaryComponent/dictionaryController';
// import { ModelExplorer } from '../index';
var nihLogoImg = {
  height: '54px',
  width: '463px',
  marginLeft: '9px'
};

// import store from '../../store';
// import env from '../../utils/env';
// import ReduxDataDictionary from './DataDictionary/ReduxDataDictionary';

/**
 * data model navigator redux configuration 
 * 1. end points
 * 2. styles
 */

var version = {
  commit: '913161064b02bcef024d072873e77c8c79cc1a68',
  dictionary: {
    commit: '520a25999fd183f6c5b7ddef2980f3e839517da5',
    version: '0.2.1-9-g520a259'
  },
  version: '4.0.0-44-g9131610'
};
var DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model.yml";
var DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model-props.yml";
var readMeConfig = {
  readMeUrl: 'https://raw.githubusercontent.com/rana22/category_partition/main/README.md',
  readMeTitle: 'Understanding the ICDC Data Model'
};
var assetConfig = {
  iconUrl: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/data_model_pdf_icons/icdc/DMN/'
};
var customNodeTree = [['program'], ['project'], ['study'], ['principal_investigator', 'subject', 'image_collection', 'associated_link'], ['targeted_therapy', 'non_targeted_therapy', 'surgery', 'radiotherapy', 'subject_status', 'specimen'], ['demographic', 'diagnosis', 'specimen'], ['node', 'exposure', 'data_file']];
// example set legend style (position)
//set styling and configuration for autofit actions
var graphViewConfig = {
  legend: {
    styles: {
      legendExpand: {
        position: 'absolute',
        right: '25px',
        top: '300px',
        backgroundColor: '#494949',
        border: '2px solid #5486AF',
        borderTopLeftRadius: '10px 10px',
        borderBottomLeftRadius: '10px 10px',
        paddingBottom: '15px'
      },
      legendCollapse: {
        position: 'absolute',
        right: '25px',
        top: '300px',
        backgroundColor: '#18588C',
        border: '1px solid #125C5D',
        borderTopLeftRadius: '10px 10px',
        borderBottomLeftRadius: '10px 10px'
      }
    }
  },
  canvas: {
    fit: {
      x: 0,
      y: 0,
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 2,
      xInterval: 250,
      yInterval: 90
    }
    // nodeTree: customNodeTree,
  }
};

// const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/c3dc-model/main/model-desc/c3dc-model.yml';
// const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/c3dc-model/main/model-desc/c3dc-model-props.yml';

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/ctdc-model/initial_cmb_rebuild_of_ctdc_data_model/model-desc/ctdc_model_file.yaml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/ctdc-model/initial_cmb_rebuild_of_ctdc_data_model/model-desc/ctdc_model_properties_file.yaml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/gmb-model/main/model-desc/000048_Model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/gmb-model/main/model-desc/000048_Model_Props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/cds-model/main/model-desc/cds-model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/cds-model/main/model-desc/cds-model-props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/BENTO-TAILORx-model/master/model-desc/bento_tailorx_model_file.yaml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/BENTO-TAILORx-model/master/model-desc/bento_tailorx_model_properties.yaml";

var getData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _axios["default"].get(url);
        case 2:
          response = _context.sent;
          data = _jsYaml["default"].safeLoad(response.data);
          return _context.abrupt("return", data);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();
function init() {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var icdcMData, icdcMPData, dataList, propertyList, keyMaps, _i, _Object$entries, _value$Tags, _value$Tags2, _value$Tags3, _value$Tags4, _value$Tags5, _value$Tags6, _Object$entries$_i, key, value, item, link, properties, pRequired, pPreffered, pOptional, Yes, No, i, nodeP, propertiesItem, propertyName, _icdcMPData$PropDefin, _icdcMPData$PropDefin2, _icdcMPData$PropDefin3, _icdcMPData$PropDefin4, _icdcMPData$PropDefin5, property, label, required, _i2, linkItem, backref, name, target, multiplicity, _i3, _Object$entries2, _Object$entries2$_i, _key, _value, keyMapList, _loop, _i4, _Object$entries3, newDataList, pdfDownloadConfig;
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getData(DATA_MODEL);
        case 2:
          icdcMData = _context3.sent;
          _context3.next = 5;
          return getData(DATA_MODEL_PROPS);
        case 5:
          icdcMPData = _context3.sent;
          // translate the json file here
          dataList = {};
          propertyList = [];
          keyMaps = new Set(); // using the following code the convert MDF to Gen3 format
          for (_i = 0, _Object$entries = Object.entries(icdcMData.Nodes); _i < _Object$entries.length; _i++) {
            _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
            item = {};
            item.$schema = 'http://json-schema.org/draft-06/schema#';
            item.id = key;
            item.title = key;
            if (value.Tags && 'Category' in value.Tags) {
              item.category = value.Tags.Category;
            } else if ('Category' in value) {
              item.category = value.Category && value.Category.length > 0 ? value.Category : 'Undefined';
            } else {
              item.category = 'Undefined';
            }
            item.program = '*';
            item.project = '*';
            item.additionalProperties = false;
            item.submittable = true;
            item.constraints = null;
            item.type = 'object';
            item.assignment = (_value$Tags = value.Tags) !== null && _value$Tags !== void 0 && _value$Tags.Assignment ? (_value$Tags2 = value.Tags) === null || _value$Tags2 === void 0 ? void 0 : _value$Tags2.Assignment : '';
            item["class"] = (_value$Tags3 = value.Tags) !== null && _value$Tags3 !== void 0 && _value$Tags3.Class ? (_value$Tags4 = value.Tags) === null || _value$Tags4 === void 0 ? void 0 : _value$Tags4.Class : '';
            item.desc = value !== null && value !== void 0 && value.Desc ? value === null || value === void 0 ? void 0 : value.Desc : '';
            item.description = item.desc;
            item.template = (_value$Tags5 = value.Tags) !== null && _value$Tags5 !== void 0 && _value$Tags5.Template ? (_value$Tags6 = value.Tags) === null || _value$Tags6 === void 0 ? void 0 : _value$Tags6.Template : '';
            link = [];
            properties = {};
            pRequired = [];
            pPreffered = [];
            pOptional = [];
            Yes = [];
            No = [];
            if (icdcMData.Nodes[key].Props != null) {
              for (i = 0; i < icdcMData.Nodes[key].Props.length; i++) {
                nodeP = icdcMData.Nodes[key].Props[i];
                propertiesItem = {};
                for (propertyName in icdcMPData.PropDefinitions) {
                  if (propertyName === nodeP) {
                    if (icdcMPData.PropDefinitions[propertyName].Key) {
                      keyMaps.add({
                        props: propertyName,
                        node: key
                      });
                    }
                    propertiesItem.labeled = icdcMPData.PropDefinitions[propertyName].Tags ? icdcMPData.PropDefinitions[propertyName].Tags.Labeled ? icdcMPData.PropDefinitions[propertyName].Tags.Labeled : undefined : undefined;
                    propertiesItem.category = key;
                    propertiesItem.description = icdcMPData.PropDefinitions[propertyName].Desc;
                    propertiesItem.type = (icdcMPData === null || icdcMPData === void 0 || (_icdcMPData$PropDefin = icdcMPData.PropDefinitions[propertyName]) === null || _icdcMPData$PropDefin === void 0 ? void 0 : _icdcMPData$PropDefin.Type) || icdcMPData.PropDefinitions[propertyName].Enum;
                    propertiesItem["enum"] = (icdcMPData === null || icdcMPData === void 0 || (_icdcMPData$PropDefin2 = icdcMPData.PropDefinitions[propertyName]) === null || _icdcMPData$PropDefin2 === void 0 ? void 0 : _icdcMPData$PropDefin2.Enum) || ((_icdcMPData$PropDefin3 = icdcMPData.PropDefinitions[propertyName]) === null || _icdcMPData$PropDefin3 === void 0 || (_icdcMPData$PropDefin3 = _icdcMPData$PropDefin3.Type) === null || _icdcMPData$PropDefin3 === void 0 ? void 0 : _icdcMPData$PropDefin3.Enum);
                    propertiesItem.src = icdcMPData === null || icdcMPData === void 0 || (_icdcMPData$PropDefin4 = icdcMPData.PropDefinitions[propertyName]) === null || _icdcMPData$PropDefin4 === void 0 ? void 0 : _icdcMPData$PropDefin4.Src;
                    propertiesItem.key = icdcMPData === null || icdcMPData === void 0 || (_icdcMPData$PropDefin5 = icdcMPData.PropDefinitions[propertyName]) === null || _icdcMPData$PropDefin5 === void 0 ? void 0 : _icdcMPData$PropDefin5.Key;
                    if (icdcMPData.PropDefinitions[propertyName].Req === 'Yes') {
                      pRequired.push(nodeP);
                      propertiesItem['propertyType'] = 'required';
                    } else if (icdcMPData.PropDefinitions[propertyName].Req === 'Preferred') {
                      pPreffered.push(nodeP);
                      propertiesItem['propertyType'] = 'preferred';
                    } else {
                      pOptional.push(nodeP);
                      propertiesItem['propertyType'] = 'optional';
                    }
                    if (icdcMPData.PropDefinitions[propertyName].Tags && icdcMPData.PropDefinitions[propertyName].Tags.Labeled) {
                      Yes.push(nodeP);
                      propertiesItem['display'] = 'yes';
                    } else {
                      No.push(nodeP);
                      propertiesItem['display'] = 'no';
                    }
                    propertyList.push(_objectSpread({
                      name: propertyName
                    }, propertiesItem));
                  }
                }
                properties[nodeP] = propertiesItem;
              }
              item.properties = properties;
              item.inclusion = {};
              if (pRequired.length > 0) {
                item.inclusion = _objectSpread(_objectSpread({}, item.inclusion), {}, {
                  required: pRequired
                });
              }
              if (pOptional.length > 0) {
                item.inclusion = _objectSpread(_objectSpread({}, item.inclusion), {}, {
                  optional: pOptional
                });
              }
              if (pPreffered.length > 0) {
                item.inclusion = _objectSpread(_objectSpread({}, item.inclusion), {}, {
                  preferred: pPreffered
                });
              }
              if (Yes.length > 0) {
                item.uiDisplay = _objectSpread(_objectSpread({}, item.uiDisplay), {}, {
                  yes: Yes
                });
              }
              if (No.length > 0) {
                item.uiDisplay = _objectSpread(_objectSpread({}, item.uiDisplay), {}, {
                  no: No
                });
              }
              item.required = pRequired;
              item.preferred = pPreffered;
              item.optional = pOptional;
              item.yes = Yes;
              item.no = No;
            } else {
              item.properties = {};
            }
            for (property in icdcMData.Relationships) {
              item.multiplicity = _lodash["default"].startCase(icdcMData.Relationships[property].Mul);
              label = propertyName; // const multiplicity = icdcMData.Relationships[propertyName].Mul;
              required = false;
              for (_i2 = 0; _i2 < icdcMData.Relationships[property].Ends.length; _i2++) {
                linkItem = {};
                if (icdcMData.Relationships[property].Ends[_i2].Src === key) {
                  backref = icdcMData.Relationships[property].Ends[_i2].Src;
                  name = icdcMData.Relationships[property].Ends[_i2].Dst;
                  if (name !== backref) {
                    target = icdcMData.Relationships[property].Ends[_i2].Dst;
                    multiplicity = icdcMData.Relationships[property].Ends[_i2].Mul ? icdcMData.Relationships[property].Ends[_i2].Mul : icdcMData.Relationships[property].Mul;
                    linkItem.name = name;
                    linkItem.backref = backref;
                    linkItem.label = label;
                    linkItem.target_type = target;
                    linkItem.required = required;
                    linkItem.multiplicity = multiplicity;
                    link.push(linkItem);
                  }
                }
              }
            }
            item.links = link;
            dataList[key] = item;
          }
          for (_i3 = 0, _Object$entries2 = Object.entries(dataList); _i3 < _Object$entries2.length; _i3++) {
            _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2), _key = _Object$entries2$_i[0], _value = _Object$entries2$_i[1];
            if (_value.links.length > 0) {
              _value.links.forEach(function (el) {
                if (el.name) {
                  dataList[el.name].links.push({
                    Dst: el.name,
                    Src: el.backref,
                    multiplicity: el.multiplicity
                  });
                }
              });
            }
          }

          // map parent key for the node
          keyMapList = Array.from(keyMaps);
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var _Object$entries3$_i, key, value;
            return _regeneratorRuntime().wrap(function _loop$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _Object$entries3$_i = _slicedToArray(_Object$entries3[_i4], 2), key = _Object$entries3$_i[0], value = _Object$entries3$_i[1];
                  if (value.links.length > 0) {
                    value.links.forEach(function (c, index) {
                      var targetId = keyMapList.find(function (item) {
                        return item.node === c.target_type;
                      });
                      if (targetId) {
                        value.links[index].targetId = targetId.props;
                        value.links[index].generatedType = icdcMPData.PropDefinitions[targetId.props].Src;
                      }
                    });
                  }
                case 2:
                case "end":
                  return _context2.stop();
              }
            }, _loop);
          });
          _i4 = 0, _Object$entries3 = Object.entries(dataList);
        case 14:
          if (!(_i4 < _Object$entries3.length)) {
            _context3.next = 19;
            break;
          }
          return _context3.delegateYield(_loop(), "t0", 16);
        case 16:
          _i4++;
          _context3.next = 14;
          break;
        case 19:
          newDataList = dataList; // const properties = Array.from(propertyList);
          // return {
          //   data: newDataList,
          //   version: version,
          // }
          pdfDownloadConfig = {
            fileType: 'pdf',
            prefix: 'ICDC_Data_Model_',
            landscape: 'true',
            footnote: 'test'
          };
          Promise.all([_store["default"].dispatch({
            type: 'RECEIVE_DICTIONARY',
            // data: newDict
            payload: {
              data: newDataList,
              properties: propertyList,
              facetfilterConfig: _dataDictionaryData.filterConfig,
              readMeConfig: readMeConfig,
              graphViewConfig: graphViewConfig,
              pdfDownloadConfig: pdfDownloadConfig,
              assetConfig: assetConfig
            }
          }), _store["default"].dispatch({
            type: 'REACT_FLOW_GRAPH_DICTIONARY',
            dictionary: newDataList,
            pdfDownloadConfig: pdfDownloadConfig,
            assetConfig: assetConfig,
            graphViewConfig: graphViewConfig
          }), _store["default"].dispatch({
            type: 'RECEIVE_VERSION_INFO',
            data: version
          })]);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}
var pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
  landscape: 'true'
};
var ModelExplorer = function ModelExplorer() {
  init();
  return /*#__PURE__*/_react["default"].createElement(_ReduxDataDictionary["default"], {
    pdfDownloadConfig: pdfDownloadConfig
  });
};
var ModelNavigator = function ModelNavigator() {
  return /*#__PURE__*/_react["default"].createElement(_ThemeContext.CustomThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
    store: _store["default"]
  }, /*#__PURE__*/_react["default"].createElement(ModelExplorer, null)));
};
var _default = exports["default"] = ModelNavigator;