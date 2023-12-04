"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _DataDictionaryTable = _interopRequireWildcard(require("./DataDictionaryTable"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('the DataDictionaryTable component', function () {
  var testDict = {
    a1: {
      id: 'a1',
      category: 'A',
      description: 'whatever',
      properties: []
    },
    a2: {
      id: 'a2',
      category: 'A',
      description: 'whatever',
      properties: []
    },
    b1: {
      id: 'b1',
      category: 'B',
      description: 'whatever',
      properties: []
    },
    b2: {
      id: 'b2',
      category: 'B',
      description: 'whatever',
      properties: []
    },
    b3: {
      id: 'b3',
      category: 'B',
      description: 'whatever',
      properties: []
    },
    b4: {
      id: 'b4',
      category: 'B',
      description: 'whatever',
      properties: []
    }
  };
  it('knows how to organize dictionary types by category', function () {
    var mapping = (0, _DataDictionaryTable.category2NodeList)(testDict);
    expect(Array.isArray(mapping.A)).toBe(true);
    expect(Array.isArray(mapping.B)).toBe(true);
    expect(mapping.A.length).toBe(2);
    expect(mapping.B.length).toBe(4);
  });
  it('renders', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DataDictionaryTable["default"], {
      dictionary: testDict
    }));
    expect(wrapper.find(_DataDictionaryTable["default"]).length).toBe(1);
  });
});