"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _Header = _interopRequireDefault(require("./Header.component"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ReduxDataDictionaryHeader = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dictionary: state.submission.dictionary,
      fullDictionary: state.submission.unfilteredDictionary
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps)(_Header["default"]);
}();
var _default = exports["default"] = ReduxDataDictionaryHeader;