"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _ = _interopRequireDefault(require("./."));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('DataDictionaryPropertyTable', function () {
  var properties = {
    prop1: {
      description: 'test 1',
      type: 't1'
    },
    prop2: {
      description: 'test 2',
      type: 't2'
    }
  };
  var requiredProps = ['prop1'];
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    properties: properties,
    requiredProperties: requiredProps
  }));
  it('can render', function () {
    expect(wrapper.find(_["default"]).length).toBe(1);
    expect(wrapper.find('.data-dictionary-property-table__required').length).toBe(requiredProps.length);
  });
});