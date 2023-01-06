import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import stats from '../components/Stats/StatsState';
// import { reducers as modelReducers } from '../components/DataDictionaryComponent/reducers';
import { ddgraph, versionInfo } from '../components/ModelNavigator/DataDictionary/Store/reducers/graph';
// import submission from '../components/DataDictionaryComponent/reducers';
import { moduleReducers as submission } from '../components/ModelNavigator/DataDictionary/Store/reducers/filter';

const reducers = {
  ddgraph,
  versionInfo,
  submission,
};

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(ReduxThunk, loggerMiddleware),
);

store.injectReducer = (key, reducer) => {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
};

// store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
//   modelReducers[type] ? modelReducers[type](state, payload) : state));

export default store;
