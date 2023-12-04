"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
var _utils = require("../../Utils/utils");
var _helper = require("../../NodeCategories/helper");
var _DataDictionaryPropertyTable = _interopRequireDefault(require("../DataDictionaryPropertyTable"));
require("./DataDictionaryNode.css");
var _DataDictionaryNode2 = _interopRequireDefault(require("./DataDictionaryNode.style"));
var _NodeViewComponent = _interopRequireDefault(require("./components/NodeViewComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable react/forbid-prop-types */ // import { PDFDownloadLink } from '@react-pdf/renderer';
// eslint-disable-next-line no-unused-vars
// import PdfDocument from '../../NodePDF';
var NODE_STATE = {
  OPEN: "open",
  CLOSE: "close"
};
var DataDictionaryNode = /*#__PURE__*/function (_React$Component) {
  _inherits(DataDictionaryNode, _React$Component);
  var _super = _createSuper(DataDictionaryNode);
  function DataDictionaryNode() {
    var _this;
    _classCallCheck(this, DataDictionaryNode);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "notHorizontal", true);
    _defineProperty(_assertThisInitialized(_this), "handleCloseNode", function () {
      var onExpandNode = _this.props.onExpandNode;
      onExpandNode(null);
    });
    _defineProperty(_assertThisInitialized(_this), "handleDownloadTemplate", function (e, format) {
      var node = _this.props.node;
      e.stopPropagation(); // no toggling
      (0, _utils.downloadTemplate)(format, node.id);
    });
    return _this;
  }
  _createClass(DataDictionaryNode, [{
    key: "handleClickNode",
    value:
    // supports landscape orientation

    function handleClickNode(nodeID) {
      var _this$props = this.props,
        expanded = _this$props.expanded,
        onExpandNode = _this$props.onExpandNode;
      if (!expanded) {
        onExpandNode(nodeID, NODE_STATE.OPEN);
      } else {
        onExpandNode(nodeID, NODE_STATE.CLOSE);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        node = _this$props2.node,
        pdfDownloadConfig = _this$props2.pdfDownloadConfig,
        description = _this$props2.description,
        expanded = _this$props2.expanded;
      var propertyCount = Object.keys(node.properties).length;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.node,
        style: {
          borderLeftColor: (0, _helper.getCategoryColor)(node.category)
        },
        onClick: function onClick() {
          return _this2.handleClickNode(node.id);
        },
        onKeyPress: function onKeyPress() {
          return _this2.handleClickNode(node.id);
        },
        role: "button",
        tabIndex: 0
      }, /*#__PURE__*/_react["default"].createElement(_NodeViewComponent["default"], {
        node: node,
        isExpanded: expanded,
        description: description,
        pdfDownloadConfig: pdfDownloadConfig,
        propertyCount: propertyCount
      })), expanded && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.property,
        style: {
          borderLeft: "5px solid ".concat((0, _helper.getCategoryColor)(node.category)),
          borderBottom: "1px solid #adbec4"
        }
      }, /*#__PURE__*/_react["default"].createElement(_DataDictionaryPropertyTable["default"], {
        title: node.title,
        properties: node.properties,
        requiredProperties: node.required,
        preferredProperties: node.preferred
        // horizontal // supports horizontal orientation
      })));
    }
  }]);
  return DataDictionaryNode;
}(_react["default"].Component);
DataDictionaryNode.propTypes = {
  node: _propTypes["default"].object.isRequired,
  description: _propTypes["default"].string,
  expanded: _propTypes["default"].bool,
  onExpandNode: _propTypes["default"].func
};
DataDictionaryNode.defaultProps = {
  description: "",
  expanded: false,
  onExpandNode: function onExpandNode() {}
};
var _default = exports["default"] = (0, _core.withStyles)(_DataDictionaryNode2["default"])(DataDictionaryNode);