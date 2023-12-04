"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactflow = require("reactflow");
var _graph = require("../../Store/actions/graph");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ReduxViewPort = function ReduxViewPort(_ref) {
  var onGraphViewChange = _ref.onGraphViewChange;
  var _useViewport = (0, _reactflow.useViewport)(),
    x = _useViewport.x,
    y = _useViewport.y,
    zoom = _useViewport.zoom;
  // onGraphViewChange(useViewport());
  // useEffect(() => {
  //   console.log(x, y, zoom);
  // }, [x, y, zoom]);
  return null;
};
var mapStateToProps = function mapStateToProps(state) {
  return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onGraphViewChange: function onGraphViewChange(view) {
      return dispatch((0, _graph.onViewChange)(view));
    }
  };
};
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxViewPort);
exports["default"] = _default;