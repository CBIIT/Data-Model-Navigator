"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _OverlayPropertyTable = _interopRequireDefault(require("./OverlayPropertyTable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('OverlayPropertyTable', function () {
  var node = {
    id: 'a',
    category: 'test',
    title: 'node A',
    description: 'node A description',
    required: [],
    properties: {}
  };
  it('can render overlay property table correctly', function () {
    var hiddenTable1 = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_OverlayPropertyTable["default"], {
      node: null,
      hidden: false
    }));
    expect(hiddenTable1.find('.overlay-property-table').length).toBe(0);
    var hiddenTable2 = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_OverlayPropertyTable["default"], {
      node: node,
      hidden: true
    }));
    expect(hiddenTable2.find('.overlay-property-table').length).toBe(0);
    var closeFunc = jest.fn();
    var table = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_OverlayPropertyTable["default"], {
      node: node,
      hidden: false,
      onCloseOverlayPropertyTable: closeFunc
    }));
    expect(table.find('.overlay-property-table').length).toBe(1);
    var closeButtonElem = table.find('.overlay-property-table__close').first();
    closeButtonElem.simulate('click');
    expect(closeFunc.mock.calls.length).toBe(1);
  });
});