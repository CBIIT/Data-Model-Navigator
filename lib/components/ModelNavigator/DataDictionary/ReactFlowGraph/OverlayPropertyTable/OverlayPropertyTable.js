"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CloseRounded = _interopRequireDefault(require("@material-ui/icons/CloseRounded"));
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _core = require("@material-ui/core");
var _highlightHelper = require("../../Utils/highlightHelper");
var _utils = require("../../Utils/utils");
var _utils2 = require("../../utils");
var _helper = require("../../NodeCategories/helper");
var _DataDictionaryPropertyTable = _interopRequireDefault(require("../../Table/DataDictionaryPropertyTable"));
var _OverlayPropertyTable = _interopRequireDefault(require("./OverlayPropertyTable.style"));
var _NodeViewComponent = _interopRequireDefault(require("../../Table/DataDictionaryNode/components/NodeViewComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var OverlayPropertyTable = /*#__PURE__*/function (_React$Component) {
  _inherits(OverlayPropertyTable, _React$Component);
  var _super = _createSuper(OverlayPropertyTable);
  function OverlayPropertyTable() {
    var _this;
    _classCallCheck(this, OverlayPropertyTable);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "getTitle", function () {
      if (_this.props.isSearchMode) {
        var nodeTitleFragment = (0, _highlightHelper.getNodeTitleFragment)(_this.props.matchedResult.matches, _this.props.node.title, "overlay-property-table__span");
        return nodeTitleFragment;
      }
      return _this.props.node.title;
    });
    _defineProperty(_assertThisInitialized(_this), "getDescription", function () {
      if (_this.props.isSearchMode) {
        var nodeDescriptionFragment = (0, _highlightHelper.getNodeDescriptionFragment)(_this.props.matchedResult.matches, _this.props.node.description, "overlay-property-table__span");
        return nodeDescriptionFragment;
      }
      return _this.props.node.description;
    });
    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.props.onCloseOverlayPropertyTable();
    });
    _defineProperty(_assertThisInitialized(_this), "handleOpenAllProperties", function () {
      _this.props.onOpenMatchedProperties();
    });
    _defineProperty(_assertThisInitialized(_this), "handleDisplayOnlyMatchedProperties", function () {
      _this.props.onCloseMatchedProperties();
    });
    return _this;
  }
  _createClass(OverlayPropertyTable, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        isSearchMode = _this$props.isSearchMode,
        node = _this$props.node,
        hidden = _this$props.hidden;
      if (!node || hidden) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      // const IconSVG = getCategoryIconSVG(node.category);
      // eslint-disable-next-line no-console
      // const searchedNodeNotOpened = isSearchMode && !this.props.isSearchResultNodeOpened;
      var needHighlightSearchResult = isSearchMode;
      // const expanded = true;
      var categoryColor = (0, _helper.getCategoryColor)(node.category);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.table
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.background
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.fixedContainer
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.content
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.header
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.category,
        style: {
          borderLeftColor: categoryColor,
          backgroundColor: (0, _helper.getCategoryBackground)(node.category)
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingLeft: '4px'
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: "".concat(_helper.tableIconUrl).concat(node.category, ".svg"),
        alt: "icon",
        className: classes.categoryIcon
      }), /*#__PURE__*/_react["default"].createElement("h4", {
        style: {
          color: "#FFF"
        },
        className: classes.categoryText
      }, (0, _utils2.capitalizeFirstLetter)(node.category))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        className: classes.iconCloseRounded,
        onClick: this.handleClose
      }, /*#__PURE__*/_react["default"].createElement(_CloseRounded["default"], {
        style: {
          color: "#FFF",
          fontSize: "20px"
        }
      }))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.categoryDivider,
        style: {
          borderLeftColor: (0, _helper.getCategoryColor)(node.category)
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.node,
        style: {
          borderLeftColor: (0, _helper.getCategoryColor)(node.category),
          marginBottom: "0px",
          borderRight: "1px solid #ADBEC4",
          backgroundColor: "white"
        }
      }, /*#__PURE__*/_react["default"].createElement(_NodeViewComponent["default"], {
        node: node,
        description: this.props.description,
        isSearchMode: isSearchMode,
        matchedResult: this.props.matchedResult,
        pdfDownloadConfig: this.props.pdfDownloadConfig,
        propertyCount: Object.keys(node.properties).length,
        isOverlay: true
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.propertyTable,
        style: {
          borderLeftColor: categoryColor
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.property
      }, /*#__PURE__*/_react["default"].createElement(_DataDictionaryPropertyTable["default"], {
        title: node.title,
        properties: node.properties,
        requiredProperties: node.required,
        preferredProperties: node.preferred,
        hasBorder: false,
        onlyShowMatchedProperties: false,
        needHighlightSearchResult: needHighlightSearchResult
        // hideIsRequired={searchedNodeNotOpened}
        ,
        matchedResult: this.props.matchedResult,
        isSearchMode: isSearchMode
      }))))));
    }
  }]);
  return OverlayPropertyTable;
}(_react["default"].Component);
OverlayPropertyTable.propTypes = {
  hidden: _propTypes["default"].bool,
  node: _propTypes["default"].object,
  onCloseOverlayPropertyTable: _propTypes["default"].func,
  isSearchMode: _propTypes["default"].bool,
  matchedResult: _utils.SearchResultItemShape,
  onOpenMatchedProperties: _propTypes["default"].func,
  onCloseMatchedProperties: _propTypes["default"].func,
  isSearchResultNodeOpened: _propTypes["default"].bool
};
OverlayPropertyTable.defaultProps = {
  hidden: true,
  node: null,
  onCloseOverlayPropertyTable: function onCloseOverlayPropertyTable() {},
  isSearchMode: false,
  matchedResult: {},
  onOpenMatchedProperties: function onOpenMatchedProperties() {},
  onCloseMatchedProperties: function onCloseMatchedProperties() {},
  isSearchResultNodeOpened: false
};
var _default = (0, _core.withStyles)(_OverlayPropertyTable["default"])(OverlayPropertyTable);
exports["default"] = _default;