import React, { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ddgraph, versionInfo, changelogInfo, iconMapInfo } from '../components/ModelNavigator/DataDictionary/Store/reducers/graph';
import { moduleReducers as submission } from '../components/ModelNavigator/DataDictionary/Store/reducers/filter';
import ReduxDataDictionary from '../components/ModelNavigator/DataDictionary/ReduxDataDictionary';
import { filterConfig } from '../components/ModelNavigator/bento/dataDictionaryData';
import { getChangelog, getModelExploreData } from '../components/ModelNavigator/DataDictionary/Service/Dictionary';

const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'CDS_',
  templatePrefix: 'CDS_Data_Loading_Template-',
  fileTransferManifestName: "CDS_Data_Loading_Template-file-manifest",
  landscape: 'true',
  footnote: 'test',
  enabled: false,
  // useTimestampInFilename: true, // Uncomment and set to true to use timestamps instead of model version
};

const graphViewConfig = {
  legend: {
    // styles: {
    //   legendExpand: {
    //     position: 'absolute',
    //     right: '25px',
    //     top: '300px',
    //     backgroundColor: '#494949',
    //     border: '2px solid #5486AF',
    //     borderTopLeftRadius: '10px 10px',
    //     borderBottomLeftRadius: '10px 10px',
    //     paddingBottom: '15px',
    //   },
    //   legendCollapse: {
    //     position: 'absolute',
    //     right: '25px',
    //     top: '300px',
    //     backgroundColor: '#18588C',
    //     border: '1px solid #125C5D',
    //     borderTopLeftRadius: '10px 10px',
    //     borderBottomLeftRadius: '10px 10px',
    //   },
    // }
  },
  canvas: {
    fit: {
      x: 0,
      y: 0,
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 2,
      xInterval: 250,
      yInterval: 90,
    },
    // nodeTree: customNodeTree,
  }
}

function buildStore() {
  const reducers = {
    ddgraph,
    versionInfo,
    changelogInfo,
    iconMapInfo,
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

  return store;
}

async function populateStore(store, mdf = "", readMeUrl = "", changelogUrl = "", pdfDownloadEnabled = true, iconMap = {}) {
  const response = await getModelExploreData(...mdf.split("\n"))?.catch((e) => { console.log(e); return null; });
  const changelogMD = await getChangelog(changelogUrl)?.catch((e) => { console.log(e); return null; });

  if (!response?.data || !response?.version) {
    throw new Error('Failed to fetch data');
  }

  const dispatches = [
    store.dispatch({
      type: 'RECEIVE_DICTIONARY',
      payload: {
        data: response.data,
        facetfilterConfig: filterConfig,
        readMeConfig: {
          readMeUrl,
          readMeTitle: "Understanding the Data Model",
        },
        graphViewConfig: graphViewConfig,
        pdfDownloadConfig: { ...pdfDownloadConfig, enabled: pdfDownloadEnabled },
      },
    }),
    store.dispatch({
      type: 'REACT_FLOW_GRAPH_DICTIONARY',
      dictionary: response.data,
      pdfDownloadConfig: { ...pdfDownloadConfig, enabled: pdfDownloadEnabled },
      graphViewConfig: graphViewConfig,
    }),
    store.dispatch({
      type: 'RECEIVE_VERSION_INFO',
      data: response.version,
    }),
  ];

  if (changelogMD?.length) {
    dispatches.push(
      store.dispatch({
        type: 'RECEIVE_CHANGELOG_INFO',
        data: {
          changelogMD,
          changelogTabName: "Version History"
        },
      })
    );
  }

  if (Object.keys(iconMap).length > 0) {
    dispatches.push(
      store.dispatch({
        type: 'RECEIVE_ICON_MAP',
        data: iconMap,
      })
    );
  }

  await Promise.all(dispatches);
}

const ModelNavigator = ({ mdf, readMeUrl, changelogUrl, pdfDownloadEnabled, iconMap }) => {
  const [store, setStore] = React.useState(buildStore());

  useEffect(() => {
    const newStore = buildStore();

    setStore(newStore);
    populateStore(newStore, mdf, readMeUrl, changelogUrl, pdfDownloadEnabled, iconMap);
  }, [mdf, changelogUrl, readMeUrl, pdfDownloadEnabled, iconMap]);

  return (
    <Provider store={store}>
      <ReduxDataDictionary />
    </Provider >
  );
};

export default ModelNavigator;
