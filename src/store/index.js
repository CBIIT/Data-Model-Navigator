import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import stats from '../components/Stats/StatsState';
import { reducers as modelReducers } from '../components/DataDictionaryComponent/reducers';
import { ddgraph, versionInfo } from '../components/DataDictionaryComponent/DataDictionary/reducers';
// import submission from '../components/DataDictionaryComponent/reducers';

const reducers = {
  ddgraph,
  versionInfo,
};

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(ReduxThunk, loggerMiddleware),
);

const storeKey = 'submission';

const initialState = {
  allActiveFilters: {},
  unfilteredDictionary: {},
  filteredDictionary: {},
  activeFilter: false,
  filtersCleared: false,
  filterGroup: '',
  filterHashMap: new Map(),
};

store.injectReducer = (key, reducer) => {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
};

store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  modelReducers[type] ? modelReducers[type](state, payload) : state));

export default store;
