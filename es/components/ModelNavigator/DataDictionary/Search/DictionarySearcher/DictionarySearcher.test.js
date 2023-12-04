"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _DictionarySearcher = _interopRequireDefault(require("./DictionarySearcher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('DictionarySearcher', function () {
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
      description: 'whatever description.',
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
      description: 'test node description',
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
  var keyword = 'test';
  var updateFunc = jest.fn();
  var resetFunc = jest.fn();
  var createHistoryFunc = jest.fn();
  var saveResultFunc = jest.fn();
  var setSearchFunc = jest.fn();
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DictionarySearcher["default"], {
    dictionary: testDict,
    onSearchResultUpdated: updateFunc,
    onSearchResultCleared: resetFunc,
    onSearchHistoryItemCreated: createHistoryFunc,
    onSaveCurrentSearchKeyword: saveResultFunc,
    setIsSearching: setSearchFunc
  }));
  var dictionarySearcherInstance = wrapper.instance();
  it('can render', function () {
    expect(wrapper.find(_DictionarySearcher["default"]).length).toBe(1);
  });
  it('can autocomplete, search, and reset', function () {
    // type in keyword, and hit enter
    var inputElem = wrapper.find('.auto-complete-input__input-box');
    inputElem.instance().value = keyword;
    var formElem = wrapper.find('.auto-complete-input__form');
    formElem.simulate('submit');
    expect(updateFunc.mock.calls.length).toBe(1);
    expect(saveResultFunc.mock.calls.length).toBe(1);
    expect(createHistoryFunc.mock.calls.length).toBe(1);
    expect(setSearchFunc.mock.calls.length).toBe(2);

    // clear input content, check: reset search result
    var resetElem = wrapper.find('.dictionary-searcher__result-clear');
    resetElem.simulate('click');
    expect(resetFunc.mock.calls.length).toBe(1);

    // call search from outside
    dictionarySearcherInstance.launchSearchFromOutside(keyword);
    expect(updateFunc.mock.calls.length).toBe(2);
  });
});