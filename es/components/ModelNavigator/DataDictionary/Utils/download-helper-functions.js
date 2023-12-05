"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.category2NodeList = category2NodeList;
exports.getNodePropertyCount = void 0;
exports.sortByCategory = sortByCategory;
var _utils = require("./utils");
/** cluster props according to the category for PDF download */
function sortByCategory(c2nl, dictionary) {
  var keys = Object.keys(c2nl);
  return Object.values(dictionary).sort(function (a, b) {
    return keys.indexOf("".concat(a.category)) - keys.indexOf("".concat(b.category));
  });
}
var getNodePropertyCount = exports.getNodePropertyCount = function getNodePropertyCount(dictionary) {
  var res = (0, _utils.parseDictionaryNodes)(dictionary).reduce(function (acc, node) {
    acc.nodesCount += 1;
    acc.propertiesCount += Object.keys(node.properties).length;
    return acc;
  }, {
    nodesCount: 0,
    propertiesCount: 0
  });
  return {
    nodesCount: res.nodesCount,
    propertiesCount: res.propertiesCount
  };
};
function category2NodeList(dictionary) {
  var res = Object.keys(dictionary).filter(function (id) {
    return id.charAt(0) !== '_' && id === dictionary[id].id;
  }).map(function (id) {
    return dictionary[id];
  }).filter(function (node) {
    return node.category && node.id;
  }).reduce(function (lookup, node) {
    if (!lookup[node.category]) {
      lookup[node.category] = [];
    }
    lookup[node.category].push(node);
    return lookup;
  }, {});
  return res;
}