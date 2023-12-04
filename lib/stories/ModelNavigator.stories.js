"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Navigator = void 0;
var _react = _interopRequireDefault(require("react"));
var _ModelNavigator = _interopRequireDefault(require("./ModelNavigator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  title: 'Example/ModelNavigator',
  component: _ModelNavigator["default"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
  }
};
exports["default"] = _default;
var Template = function Template(args) {
  return /*#__PURE__*/_react["default"].createElement(_ModelNavigator["default"], args);
};
var Navigator = Template.bind({});
exports.Navigator = Navigator;
Navigator.args = {
  user: {
    name: 'Jane Doe 6767'
  }
};