"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodesAndEdges = createNodesAndEdges;
var _lodash = _interopRequireDefault(require("lodash"));
var _study = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/study.svg"));
var _case = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/case.svg"));
var _clinical_trial = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/clinical_trial.svg"));
var _administrative = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/administrative.svg"));
var _biospecimen = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/biospecimen.svg"));
var _analysis = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/analysis.svg"));
var _data_file = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/data_file.svg"));
var _clinical = _interopRequireDefault(require("../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/clinical.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var graphIcons = {
  administrative: _administrative["default"],
  study: _study["default"],
  "case": _case["default"],
  clinical_trial: _clinical_trial["default"],
  biospecimen: _biospecimen["default"],
  analysis: _analysis["default"],
  data_file: _data_file["default"],
  clinical: _clinical["default"]
};
var graphIconColors = {
  administrative: "#9b2e20",
  study: "#9875ff",
  "case": "#ff7f16",
  clinical_trial: "#02a1bb",
  biospecimen: "#00785a",
  analysis: "#b533a9",
  data_file: "#00ad0c",
  clinical: "#1b75bc"
};
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/**
 * Get subgroup links from link
 * @param {object} link - array of links
 * @param {object} nameToNode - key (node name) value (node object) map
 * @param {string} sourceId - source id for subgroup links
 * This function traverse links recursively and return all nested subgroup lnks
 */
var getSubgroupLinks = function getSubgroupLinks(link, nameToNode, sourceId) {
  var subgroupLinks = [];
  if (link.subgroup) {
    link.subgroup.forEach(function (sgLink) {
      if (sgLink.subgroup) {
        subgroupLinks = subgroupLinks.concat(getSubgroupLinks(sgLink, nameToNode, sourceId));
      } else {
        subgroupLinks.push(_objectSpread({
          source: nameToNode[sourceId],
          target: nameToNode[sgLink.target_type],
          exists: 1
        }, sgLink));
      }
    });
  }
  return subgroupLinks;
};
var generateNodes = function generateNodes(nodes, edges, windowWidth) {
  var generatedNodes = nodes.map(function (node, index) {
    return {
      type: "custom",
      position: {
        x: 0,
        y: 0
      },
      id: "".concat(node.id),
      category: "".concat(node.category),
      data: {
        label: _lodash["default"].capitalize(node.name),
        icon: graphIcons[node.category],
        iconColor: graphIconColors[node.category],
        category: "".concat(node.category),
        nodeAssignment: _lodash["default"].capitalize("".concat(node.assignment)),
        nodeClass: _lodash["default"].capitalize("".concat(node["class"])),
        reqPropsCount: node.required ? node.required.length : 0,
        prefPropsCount: node.preferred ? node.preferred.length : 0,
        optPropsCount: node.optional ? node.optional.length : 0
      }
    };
  });
  // console.log(generatedNodes);

  return generatedNodes;
};
var generateEdges = function generateEdges(edges) {
  var DEFAULT_EDGE_TYPE = {
    type: "custom",
    animated: false
  };
  var generatedEdges = edges.map(function (edge, index) {
    return _objectSpread(_objectSpread({}, DEFAULT_EDGE_TYPE), {}, {
      id: "".concat(edge.name, "-").concat(edge.backref),
      source: "".concat(edge.name),
      target: "".concat(edge.backref)
    });
  });
  return generatedEdges;
};
var generateFlowData = function generateFlowData(nodes, edges) {
  return {
    nodes: generateNodes(nodes, edges),
    edges: generateEdges(edges)
  };
};

/**
 * Given a data dictionary that defines a set of nodes
 *    and edges, returns the nodes and edges in correct format
 *
 * @method createNodesAndEdges
 * @param props: Object (normally taken from redux state) that includes dictionary
 *    property defining the dictionary as well as other optional properties
 *    such as counts_search and links_search (created by getCounts) with
 *    information about the number of each type (node) and link (between
 *    nodes with a link's source and target types) that actually
 *    exist in the data
 * @param createAll: Include all nodes and edges or only those that are populated in
 *    counts_search and links_search
 * @param nodesToHide: Array of nodes to hide from graph
 * @returns { nodes, edges } Object containing nodes and edges
 */
function createNodesAndEdges(props, createAll) {
  var nodesToHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ["program"];
  var dictionary = props.dictionary;
  var nodes = Object.keys(dictionary).filter(function (key) {
    return !key.startsWith("_") && dictionary[key].type === "object" && dictionary[key].category !== "internal" && !nodesToHide.includes(key);
  }).map(function (key) {
    var count = 0;
    if (props.counts_search) {
      count = props.counts_search["_".concat(key, "_count")];
    }
    return _objectSpread({
      name: dictionary[key].title,
      count: count
    }, dictionary[key]);
  }).filter(function (node) {
    return createAll || node.count !== 0;
  });
  var nameToNode = nodes.reduce(function (db, node) {
    db[node.id] = node;
    return db;
  }, {});
  var hideDb = nodesToHide.reduce(function (db, name) {
    db[name] = true;
    return db;
  }, {});
  var edges = nodes.filter(function (node) {
    return node.links && node.links.length > 0;
  }).reduce(
  // add each node's links to the edge list
  function (list, node) {
    var newLinks = node.links.map(function (link) {
      return _objectSpread({
        source: node,
        target: nameToNode[link.target_type],
        exists: 1
      }, link);
    });
    return list.concat(newLinks);
  }, []).reduce(
  // add link subgroups to the edge list
  function (list, link) {
    var result = list;
    if (link.target) {
      // "subgroup" link entries in dictionary are not links themselves ...
      result.push(link);
    }
    if (link.subgroup) {
      var sgLinks = getSubgroupLinks(link, nameToNode, link.source.id);
      result = result.concat(sgLinks);
    }
    return result;
  }, []).filter(
  // target type exist and is not in hide list
  function (link) {
    return link.target && link.target.id in nameToNode && !(link.target.id in hideDb);
  }).map(function (link) {
    // decorate each link with its "exists" count if available
    //  (number of instances of link between source and target types in the data)
    var res = link;
    res.exists = props.links_search ? props.links_search["".concat(res.source.id, "_").concat(res.name, "_to_").concat(res.target.id, "_link")] : undefined;
    return res;
  }).filter(
  // filter out if no instances of this link exists and createAll is not specified
  function (link) {
    return createAll || link.exists || link.exists === undefined;
  });

  //assignNodePositions

  return generateFlowData(nodes, edges);
}