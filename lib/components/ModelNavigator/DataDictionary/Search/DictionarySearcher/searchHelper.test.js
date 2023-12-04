"use strict";

var _searchHelper = require("./searchHelper");
describe('dictionary search helper', function () {
  var dictionary = {
    a1: {
      title: 'test',
      id: 'a1',
      category: 'A',
      description: 'whatever',
      properties: {
        'test property': {
          description: 'test description',
          type: 'test type'
        }
      }
    },
    a2: {
      title: 'a2',
      id: 'a2',
      category: 'A',
      description: 'whatever',
      properties: {}
    },
    b1: {
      title: 'b1',
      id: 'b1',
      category: 'B',
      description: 'whatever',
      properties: {}
    },
    b2: {
      title: 'b2',
      id: 'b2',
      category: 'B',
      description: 'whatever',
      properties: {}
    },
    b3: {
      title: 'b3',
      id: 'b3',
      category: 'B',
      description: 'whatever',
      properties: {}
    },
    b4: {
      title: 'b4',
      id: 'b4',
      category: 'B',
      description: 'whatever',
      properties: {}
    }
  };
  var searchData = (0, _searchHelper.prepareSearchData)(dictionary);
  it('can search', function () {
    var _searchKeyword = (0, _searchHelper.searchKeyword)(searchData, 'test'),
      result = _searchKeyword.result;
    expect(result.length).toBeGreaterThan(0);
    var summary = (0, _searchHelper.getSearchSummary)(result);
    expect(summary.matchedPropertiesCount).toBe(3); // 3 matches: name, description, and type
    expect(summary.matchedNodeNameAndDescriptionsCount).toBe(1);
    expect(summary.matchedNodeIDsInNameAndDescription).toEqual(['a1']);
    expect(summary.matchedNodeIDsInProperties).toEqual(['a1']);
    expect(summary.generalMatchedNodeIDs).toEqual(['a1']);
  });
  it('can output error if keyword too short', function () {
    var _searchKeyword2 = (0, _searchHelper.searchKeyword)(searchData, 't'),
      result = _searchKeyword2.result,
      errorMsg = _searchKeyword2.errorMsg;
    expect(result).toEqual([]);
    expect(errorMsg).toEqual(_searchHelper.ERR_KEYWORD_TOO_SHORT);
  });
  it('can output error if keyword too long', function () {
    var _searchKeyword3 = (0, _searchHelper.searchKeyword)(searchData, '1234567890123456789012345678901234567890'),
      result = _searchKeyword3.result,
      errorMsg = _searchKeyword3.errorMsg;
    expect(result).toEqual([]);
    expect(errorMsg).toEqual(_searchHelper.ERR_KEYWORD_TOO_LONG);
  });
});