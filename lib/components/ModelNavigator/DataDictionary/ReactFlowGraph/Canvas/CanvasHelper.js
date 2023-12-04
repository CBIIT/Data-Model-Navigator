"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodePosition = exports.generateSubTree = exports.generateNodeTree = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * This method will execture only once during data initiallization
 * @param {*} distionary 
 * 12/20/2022 - AR
 * Simple Breath First Search to assign node to a tree
 * prerequisite - {dictionary} node hierarchy order
 * optimized for icdc_data_model
 * The level value initially assigned to each node is used for 
 * calculating the position of the node during search filter
 * 
 */
var generateNodeTree = exports.generateNodeTree = function generateNodeTree(dictionary) {
  var nextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var intervel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var nodes = Object.keys(dictionary);
  /**
   * initialize level to zero for all the nodes
   */
  var node2Level = nodes.reduce(function (acc, node) {
    acc[node] = 0;
    return acc;
  }, {});
  /**
   * check only distinct links are processed
   * edge1 = node1 -> node2, edge/link with be included on both nodes
   * edge1 of hierarchy node is selected 
   * 
   * CAUTION
   * Dst - node/point where edge originates (source)
   * Src - node/point where edge ends (target)
   */
  var distinctLinks = {};
  var exploredSoureNodes = {};
  var maxLevel = 0;
  nodes.forEach(function (node, index) {
    var links = dictionary[node].links.filter(function (item) {
      return item.Src !== undefined;
    });
    links.forEach(function (link, linkIndex) {
      var source = link.Dst;
      var target = link.Src;
      if (target && source) {
        // check for circular relation (adverse_event/case)
        if (distinctLinks[source] === target) {
          node2Level[source] -= nextLevel;
          node2Level[target] += nextLevel / intervel;
        } else {
          // assign order based on the level of hierarchy node
          distinctLinks[target] = source;
          var levels = [node2Level[target], node2Level[source] + nextLevel];
          var max = Math.max.apply(Math, levels);
          /**
           * IF - hierarchy is other than root node (program)
           * off_treatment, off_study, canine_ind to case
           * should be above case in the tree
           * 
           * ELSE - will assign level to node 
           * pushes node to bottom of the tree
           */
          if (index > 0 && node2Level[source] === 0) {
            if (node2Level[target] === 0) {
              var level = node2Level[target] + nextLevel / 2;
              node2Level[target] = level;
              max = Math.max(max, level);
            } else {
              // node2Level[source] = node2Level[target] - nextLevel/2;
              // updated 10/18/2023 - AR
              /***
               * incase of multiple root nodes (canine_ind, off_study)
               * node without any parent.
               * assign level to unexplored parent nodes
               */
              if (!exploredSoureNodes[source]) {
                // assign level to parent in a tree
                // one above child node level
                node2Level[source] = node2Level[target] - nextLevel / 2;
              }
            }
          } else {
            node2Level[target] = max;
          }
          maxLevel = Math.max(max, maxLevel);
        }
        exploredSoureNodes[source] = true;
      }
    });
  });

  /**
  * assign max level to node with no edges
  * move to bottom of the tree
  */
  var nodeWithoutEdges = _.cloneDeep(nodes).filter(function (node) {
    return dictionary[node].links && dictionary[node].links.length == 0;
  });
  nodeWithoutEdges.forEach(function (node) {
    node2Level[node] = maxLevel;
  });

  /**
  * create a complete node tree
  * calculate subtree and assign position to node
  */
  var nodeTree = {};
  for (var _i = 0, _Object$entries = Object.entries(node2Level); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (nodeTree[value] === undefined) {
      nodeTree[value] = [];
    }
    nodeTree[value].push(key);
  }
  return nodeTree;
};

/**
* generate sub tree based on filter dictionary
* use case - calculate position of the each filtered node
* @param {*} distionary
* @param {*} nodeTree
*/
var generateSubTree = exports.generateSubTree = function generateSubTree(dictionary, nodeTree) {
  var nodes = Object.keys(dictionary);
  var subtree = {};
  var nextLevel = 0;
  for (var _i2 = 0, _Object$entries2 = Object.entries(nodeTree); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
      key = _Object$entries2$_i[0],
      value = _Object$entries2$_i[1];
    var existingNodes = value.filter(function (item) {
      return nodes.includes(item);
    });
    if (existingNodes.length > 0) {
      subtree[nextLevel] = existingNodes;
      nextLevel += 1;
    }
  }
  return subtree;
};

/**
 * Calculates the node position based on node level
 * 
 * @param {*} dictionary - filtered dictionary
 * @param {*} nodeTree - complete tree
 * @param {*} tabViewWidth - calculate the position
 * @returns postion of the nodes
 * 
 */
var getNodePosition = exports.getNodePosition = function getNodePosition(_ref) {
  var dictionary = _ref.dictionary,
    nodeTree = _ref.nodeTree,
    tabViewWidth = _ref.tabViewWidth,
    _ref$xInterval = _ref.xInterval,
    xInterval = _ref$xInterval === void 0 ? 250 : _ref$xInterval,
    _ref$yInterval = _ref.yInterval,
    yInterval = _ref$yInterval === void 0 ? 90 : _ref$yInterval;
  var subtree = generateSubTree(dictionary, nodeTree);
  var position = {};
  var x = tabViewWidth / 2;
  var _loop = function _loop() {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
      level = _Object$entries3$_i[0],
      nodes = _Object$entries3$_i[1];
    var length = nodes.length;
    /**
     * single node in a level
     * assign position to the middle of the graph horizontally (x)
     * set vertical position based on tree level
     * yIntervel to adjust the distance between each level
     */
    var y = Number(level) * yInterval;
    if (length === 1) {
      position[nodes[0]] = [x, y];
    } else {
      var xMin = x - xInterval * length / 2;
      var interval = xInterval;
      /**
       * adjusted for icdc data model
       */
      if (length < 3) {
        xMin = x - xInterval * (length + 1);
        interval = 2 * xInterval;
      }
      nodes.forEach(function (node, index) {
        var adjustedX = xMin + interval * (index + 1);
        position[node] = [adjustedX, y];
      });
    }
  };
  for (var _i3 = 0, _Object$entries3 = Object.entries(subtree); _i3 < _Object$entries3.length; _i3++) {
    _loop();
  }
  return position;
};