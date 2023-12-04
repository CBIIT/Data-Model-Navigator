"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versionInfo = exports.ddgraph = void 0;
var _utils = require("../../Utils/utils");
var actionTypes = _interopRequireWildcard(require("../actions/actionTypes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ddgraphInitialState = {
  isGraphView: true,
  layoutInitialized: false,
  nodes: [],
  edges: [],
  graphBoundingBox: [],
  legendItems: [],
  hoveringNode: null,
  highlightingNode: null,
  relatedNodeIDs: [],
  secondHighlightingNodeID: null,
  dataModelStructure: null,
  overlayPropertyHidden: true,
  canvasBoundingRect: {
    top: 0,
    left: 0
  },
  needReset: false,
  tableExpandNodeID: null,
  searchHistoryItems: (0, _utils.getSearchHistoryItems)(),
  graphNodesSVGElements: null,
  currentSearchKeyword: '',
  searchResult: [],
  matchedNodeIDs: [],
  matchedNodeIDsInProperties: [],
  matchedNodeIDsInNameAndDescription: [],
  isSearchMode: false,
  isSearching: false,
  highlightingMatchedNodeID: null,
  highlightingMatchedNodeOpened: false,
  dictionary: {},
  pdfDownloadConfig: {}
};
var ddgraph = exports.ddgraph = function ddgraph() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ddgraphInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'TOGGLE_GRAPH_TABLE_VIEW':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          isGraphView: action.isGraphView,
          overlayPropertyHidden: true
        });
      }
    case 'GRAPH_LAYOUT_CALCULATED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          nodes: action.nodes,
          edges: action.edges,
          graphBoundingBox: action.graphBoundingBox,
          layoutInitialized: true
        });
      }
    case 'GRAPH_LEGEND_CALCULATED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          legendItems: action.legendItems
        });
      }
    case 'GRAPH_UPDATE_HOVERING_NODE':
      {
        var newHoveringNode = state.nodes.find(function (n) {
          return n.id === action.nodeID;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          hoveringNode: newHoveringNode
        });
      }
    case 'GRAPH_UPDATE_CANVAS_BOUNDING_RECT':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          canvasBoundingRect: action.canvasBoundingRect
        });
      }
    case 'GRAPH_UPDATE_RELATED_HIGHLIGHTING_NODE':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          relatedNodeIDs: action.relatedNodeIDs
        });
      }
    case 'GRAPH_UPDATE_SECOND_HIGHLIGHTING_NODE_CANDIDATES':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          secondHighlightingNodeCandidateIDs: action.secondHighlightingNodeCandidateIDs
        });
      }
    case 'GRAPH_UPDATE_PATH_RELATED_TO_SECOND_HIGHLIGHTING_NODE':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          pathRelatedToSecondHighlightingNode: action.pathRelatedToSecondHighlightingNode
        });
      }
    case 'GRAPH_UPDATE_DATA_MODEL_STRUCTURE':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          dataModelStructure: action.dataModelStructure,
          dataModelStructureRelatedNodeIDs: action.dataModelStructureRelatedNodeIDs,
          dataModelStructureAllRoutesBetween: action.routesBetweenStartEndNodes
        });
      }
    case 'GRAPH_SET_OVERLAY_PROPERTY_TABLE_HIDDEN':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          overlayPropertyHidden: action.isHidden
        });
      }
    case 'GRAPH_CANVAS_RESET_REQUIRED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          needReset: action.needReset
        });
      }
    case 'GRAPH_RESET_HIGHLIGHT':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightingNode: null,
          secondHighlightingNodeID: null,
          tableExpandNodeID: null
        });
      }
    case 'REACT_FLOW_GRAPH_DICTIONARY':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          dictionary: action.dictionary,
          pdfDownloadConfig: action.pdfDownloadConfig,
          graphConfig: action.graphConfig,
          assetConfig: action.assetConfig,
          graphViewConfig: _objectSpread(_objectSpread({}, action.graphViewConfig), state.graphViewConfig)
        });
      }
    case 'REACT_FLOW_SET_GRAPH_DATA':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          nodes: action.nodes,
          edges: action.edges
        });
      }
    case 'REACT_FLOW_GRAPH_CLICK_NODE':
      {
        var newArray;
        if (state.highlightedNodes) {
          if (state.highlightedNodes.includes(action.nodeID)) {
            newArray = state.highlightedNodes.filter(function (el) {
              return el !== action.nodeID;
            });
          } else {
            newArray = [].concat(_toConsumableArray(state.highlightedNodes), [action.nodeID]);
          }
        } else {
          newArray = [action.nodeID];
        }
        if (state.isSearchMode) {
          // clicking node in search mode opens property table
          return _objectSpread(_objectSpread({}, state), {}, {
            highlightingMatchedNodeID: action.nodeID,
            highlightingNode: state.dictionary[action.nodeID],
            highlightingMatchedNodeOpened: false,
            overlayPropertyHidden: false,
            expandNodeView: false,
            highlightedNodes: newArray
          });
        }
        // if serach mode is false
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightingMatchedNodeID: action.nodeID,
          highlightingNode: state.dictionary[action.nodeID],
          highlightingMatchedNodeOpened: false,
          overlayPropertyHidden: true,
          expandNodeView: true,
          highlightedNodes: newArray
        });
      }
    case 'GRAPH_CLICK_NODE':
      {
        if (state.isSearchMode) {
          // clicking node in search mode opens property table
          return _objectSpread(_objectSpread({}, state), {}, {
            highlightingMatchedNodeID: action.nodeID,
            highlightingMatchedNodeOpened: false,
            overlayPropertyHidden: false
          });
        }
        var newHighlightingNode = null;
        var newSecondHighlightingNodeID = null;
        if (action.nodeID) {
          // if no node is selected, select this node as highlight node
          if (!state.highlightingNode) {
            newHighlightingNode = state.nodes.find(function (n) {
              return n.id === action.nodeID;
            });
          } else if (state.highlightingNode) {
            newHighlightingNode = state.highlightingNode;

            // if is clicking the same node
            if (state.highlightingNode.id === action.nodeID) {
              // if no second node is selected, regard this as cancel selecting
              if (!state.secondHighlightingNodeID) {
                newHighlightingNode = null;
              }
            } else if (state.secondHighlightingNodeCandidateIDs.length > 1 && state.secondHighlightingNodeCandidateIDs.includes(action.nodeID)) {
              // regard as canceling selecting second highlight node
              if (state.secondHighlightingNodeID === action.nodeID) {
                newSecondHighlightingNodeID = null;
              } else {
                // select this as second highlight node
                newSecondHighlightingNodeID = action.nodeID;
              }
            }
          }
        }
        var newTableExpandNodeID = newHighlightingNode ? newHighlightingNode.id : null;
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightingNode: newHighlightingNode,
          secondHighlightingNodeID: newSecondHighlightingNodeID,
          tableExpandNodeID: newTableExpandNodeID
        });
      }
    case 'GRAPH_CLICK_BLANK_SPACE':
      {
        var _newHighlightingNode = state.highlightingNode;
        var _newSecondHighlightingNodeID = state.secondHighlightingNodeID;
        var _newTableExpandNodeID = state.tableExpandNodeID;
        if (state.highlightingNode) {
          if (state.secondHighlightingNodeID) {
            _newSecondHighlightingNodeID = null;
          } else {
            _newHighlightingNode = null;
            _newTableExpandNodeID = null;
          }
        }
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightingNode: _newHighlightingNode,
          secondHighlightingNodeID: _newSecondHighlightingNodeID,
          tableExpandNodeID: _newTableExpandNodeID
        });
      }
    case 'TABLE_EXPAND_NODE':
      {
        var _newHighlightingNode2 = null;
        if (action.nodeID) {
          _newHighlightingNode2 = state.nodes.find(function (n) {
            return n.id === action.nodeID;
          });
        }
        return _objectSpread(_objectSpread({}, state), {}, {
          tableExpandNodeID: action.nodeID,
          highlightingNode: _newHighlightingNode2,
          secondHighlightingNodeID: null
        });
      }
    case 'TABLE_EXPAND_NODES':
      {
        var nodeState = action.nodeState,
          nodeID = action.nodeID;
        var _newHighlightingNode3 = null;
        var expandedNodeIDs = [];
        if (nodeID) {
          _newHighlightingNode3 = state.nodes.find(function (n) {
            return n.id === nodeID;
          });
          switch (nodeState) {
            case 'open':
              if (state.tableExpandNodeID) {
                if (state.tableExpandNodeID.length) {
                  expandedNodeIDs = [nodeID].concat(_toConsumableArray(state.tableExpandNodeID));
                } else {
                  expandedNodeIDs.push(nodeID);
                }
              } else {
                expandedNodeIDs.push(nodeID);
              }
              break;
            case 'close':
              if (state.tableExpandNodeID) {
                if (state.tableExpandNodeID.length) {
                  expandedNodeIDs = _toConsumableArray(state.tableExpandNodeID);
                  expandedNodeIDs.splice(expandedNodeIDs.findIndex(function (n) {
                    return n === nodeID;
                  }), 1);
                }
              }
              break;
            default:
              break;
          }
        }
        return _objectSpread(_objectSpread({}, state), {}, {
          tableExpandNodeID: expandedNodeIDs,
          highlightingNode: _newHighlightingNode3,
          secondHighlightingNodeID: null
        });
      }
    case 'SEARCH_SET_IS_SEARCHING_STATUS':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          isSearching: action.isSearching
        });
      }
    case 'SEARCH_RESULT_UPDATED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          searchResult: action.searchResult,
          matchedNodeIDs: action.searchResultSummary.generalMatchedNodeIDs,
          matchedNodeIDsInNameAndDescription: action.searchResultSummary.matchedNodeIDsInNameAndDescription,
          matchedNodeIDsInProperties: action.searchResultSummary.matchedNodeIDsInProperties,
          isGraphView: true,
          isSearchMode: true,
          highlightingMatchedNodeID: null,
          highlightingMatchedNodeOpened: false,
          highlightingNode: null,
          secondHighlightingNodeID: null,
          tableExpandNodeID: null
        });
      }
    case 'SEARCH_CLEAR_HISTORY':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          searchHistoryItems: (0, _utils.clearSearchHistoryItems)()
        });
      }
    case 'SEARCH_HISTORY_ITEM_CREATED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          searchHistoryItems: (0, _utils.addSearchHistoryItems)(action.searchHistoryItem)
        });
      }
    case 'GRAPH_NODES_SVG_ELEMENTS_UPDATED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          graphNodesSVGElements: action.graphNodesSVGElements
        });
      }
    case 'SEARCH_RESULT_CLEARED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          searchResult: [],
          matchedNodeIDs: [],
          currentSearchKeyword: '',
          isSearchMode: false,
          highlightingMatchedNodeID: null,
          highlightingMatchedNodeOpened: false
        });
      }
    case 'SEARCH_SAVE_CURRENT_KEYWORD':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          currentSearchKeyword: action.keyword
        });
      }
    case 'GRAPH_MATCHED_NODE_OPENED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightingMatchedNodeOpened: action.opened
        });
      }
    case actionTypes.ON_REACT_FLOW_PANEL_CLICK:
      return _objectSpread(_objectSpread({}, state), {}, {
        expandNodeView: false
      });
    case actionTypes.ON_REACT_FLOW_NODE_DRAG_START:
      return _objectSpread(_objectSpread({}, state), {}, {
        expandNodeView: false
      });
    case actionTypes.ON_REACT_FLOW_GRAPH_VIEW_CHANGE:
      var view = action.view;
      return _objectSpread(_objectSpread({}, state), {}, {
        reactFlowView: (0, _utils.onViewChange)(view)
      });
    case actionTypes.ON_REACT_FLOW_NODE_FOCUS:
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedNodeId: action === null || action === void 0 ? void 0 : action.nodeID
      });
    case actionTypes.CNAVAS_WIDTH_CHANGE:
      return _objectSpread(_objectSpread({}, state), {}, {
        graphViewConfig: (0, _utils.onCnavasWidthChange)(_objectSpread(_objectSpread({}, action), state))
      });
    default:
      return state;
  }
};
var versionInfo = exports.versionInfo = function versionInfo() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'RECEIVE_VERSION_INFO':
      return _objectSpread(_objectSpread({}, state), {}, {
        dictionaryVersion: action.data.dictionary.version || 'unknown',
        apiVersion: action.data.version || 'unknown'
      });
    default:
      return state;
  }
};