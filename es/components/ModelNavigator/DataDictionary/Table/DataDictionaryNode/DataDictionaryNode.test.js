"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _ = _interopRequireDefault(require("./."));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('DataDictionaryNode', function () {
  var node = {
    id: 'a',
    title: 'test title',
    category: 'test',
    properties: {
      pro1: {},
      pro2: {}
    },
    required: ['pro1']
  };
  var expandFunc = jest.fn();
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    node: node,
    description: 'test description',
    expanded: false,
    onExpandNode: expandFunc
  }));
  it('can render and toggle properties', function () {
    expect(wrapper.find('.data-dictionary-node').length).toBe(1);
    expect(wrapper.find('.data-dictionary-node__property').length).toBe(0);

    // expand node
    var nodeElem = wrapper.find('.data-dictionary-node').first();
    nodeElem.simulate('click');
    expect(expandFunc.mock.calls.length).toBe(1);
    wrapper.setProps({
      expanded: true
    });
    expect(wrapper.find('.data-dictionary-node__property').length).toBe(1);

    // unexpand node
    var closeElem = wrapper.find('.data-dictionary-node__property-close').first();
    closeElem.simulate('click');
    expect(expandFunc.mock.calls.length).toBe(2);
  });
});