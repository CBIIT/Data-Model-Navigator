"use strict";

var _icon_default = _interopRequireDefault(require("./icons/icon_default.svg"));
var _helper = require("./helper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('the DataDictionaryNode', function () {
  it('could generate svg component for undefined types', function () {
    var notDefinedType = 'a_type_that_is_not_defined_because_its_name_is_so_strange';
    expect((0, _helper.getCategoryIconSVG)(notDefinedType)).toEqual(_icon_default["default"]);
  });
});