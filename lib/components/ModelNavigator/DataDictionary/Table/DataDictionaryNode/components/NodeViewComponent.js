"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));
var _ExpandLess = _interopRequireDefault(require("@material-ui/icons/ExpandLess"));
var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));
var _NodeViewComponent = _interopRequireDefault(require("./NodeViewComponent.style"));
var _utils = require("../../../utils");
var _icon_download_PDF = _interopRequireDefault(require("../../icons/icon_download_PDF.svg"));
var _icon_download_TSV = _interopRequireDefault(require("../../icons/icon_download_TSV.svg"));
var _DownloadButton = _interopRequireDefault(require("../../../NodePDF/DownloadButton"));
var _fileManifestConfig = require("../../../../../../config/file-manifest-config");
var _highlightHelper = require("../../../Utils/highlightHelper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NodeViewComponent = function NodeViewComponent(_ref) {
  var classes = _ref.classes,
    node = _ref.node,
    description = _ref.description,
    isSearchMode = _ref.isSearchMode,
    matchedResult = _ref.matchedResult,
    pdfDownloadConfig = _ref.pdfDownloadConfig,
    fileManifestConfig = _ref.fileManifestConfig,
    propertyCount = _ref.propertyCount,
    isExpanded = _ref.isExpanded,
    isOverlay = _ref.isOverlay;
  var csvBtnDownloadConfig = {
    image: _icon_download_TSV["default"],
    fileType: "tsv",
    prefix: (pdfDownloadConfig === null || pdfDownloadConfig === void 0 ? void 0 : pdfDownloadConfig.downloadPrefix) || "ICDC_Data_Loading_Template-"
  };
  var isFileManifest = node.id === "file";
  var isTemplate = node.template === "Yes";
  var fileManifestDownloadSettings = fileManifestConfig || _fileManifestConfig.fileManifestDownloadSettings;
  var getTitle = function getTitle() {
    if (isSearchMode) {
      var nodeTitleFragment = (0, _highlightHelper.getNodeTitleFragment)(matchedResult.matches, (0, _utils.capitalizeFirstLetter)(node.title), "data-dictionary-property-table__span");
      return nodeTitleFragment;
    }
    return (0, _utils.capitalizeFirstLetter)(node.title);
  };
  var getDescription = function getDescription(description) {
    if (isSearchMode) {
      var nodeDescriptionFragment = (0, _highlightHelper.getNodeDescriptionFragment)(matchedResult.matches, description, "data-dictionary-property-table__span");
      return nodeDescriptionFragment;
    }
    return description;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.titleAndDescContainer
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.nodeTitle
  }, getTitle()), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.tagsAndDescriptionContainer
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: classes.nodeDescription
  }, node.desc ? getDescription(node.desc) : description), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.tagsAndBtnContainer
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    startIcon: !isOverlay ? !isExpanded ? /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], null) : /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], null) : null,
    variant: "contained",
    classes: {
      root: classes.propertyCountBtn
    }
  }, propertyCount === 1 ? /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: "11px"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#42779a",
      fontFamily: "Open Sans"
    }
  }, propertyCount), " property") : /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: "11px"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#42779a",
      fontFamily: "Open Sans"
    }
  }, propertyCount), " properties"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.assignmentAndClassTags
  }, node.assignment && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.nodeLabel
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Assignment:"), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.nodeAssignment
  }, (0, _utils.capitalizeFirstLetter)(node.assignment)))), node["class"] && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.nodeLabel
  }, "Class:", /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.nodeClass
  }, (0, _utils.capitalizeFirstLetter)(node["class"])))))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      paddingRight: "10px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_ButtonGroup["default"], null, (isTemplate || isFileManifest && isTemplate) && /*#__PURE__*/_react["default"].createElement(_DownloadButton["default"], {
    config: csvBtnDownloadConfig,
    documentData: node,
    template: node.template,
    isFileManifest: isFileManifest,
    fileName: isFileManifest ? (0, _utils.createFileName)("", (pdfDownloadConfig === null || pdfDownloadConfig === void 0 ? void 0 : pdfDownloadConfig.downloadPrefix) || fileManifestDownloadSettings.filename_prefix) : (0, _utils.createFileName)(node.id, csvBtnDownloadConfig.prefix)
  }), /*#__PURE__*/_react["default"].createElement(_DownloadButton["default"], {
    config: _objectSpread(_objectSpread({}, pdfDownloadConfig), {}, {
      type: "single",
      image: _icon_download_PDF["default"]
    }),
    documentData: node,
    fileName: (0, _utils.createFileName)(node.id, pdfDownloadConfig.prefix)
  })))))));
};
var _default = exports["default"] = (0, _core.withStyles)(_NodeViewComponent["default"])(NodeViewComponent);