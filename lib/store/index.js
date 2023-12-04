"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reduxThunk = _interopRequireDefault(require("redux-thunk"));
var _reduxLogger = require("redux-logger");
var _graph = require("../components/ModelNavigator/DataDictionary/Store/reducers/graph");
var _filter = require("../components/ModelNavigator/DataDictionary/Store/reducers/filter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import stats from '../components/Stats/StatsState';
// import { reducers as modelReducers } from '../components/DataDictionaryComponent/reducers';

// import submission from '../components/DataDictionaryComponent/reducers';

var reducers = {
  ddgraph: _graph.ddgraph,
  versionInfo: _graph.versionInfo,
  submission: _filter.moduleReducers
};
var loggerMiddleware = (0, _reduxLogger.createLogger)();
var store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), (0, _redux.applyMiddleware)(_reduxThunk["default"], loggerMiddleware));
store.injectReducer = function (key, reducer) {
  reducers[key] = reducer;
  store.replaceReducer((0, _redux.combineReducers)(reducers));
};

// store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
//   modelReducers[type] ? modelReducers[type](state, payload) : state));
var _default = store;
exports["default"] = _default;