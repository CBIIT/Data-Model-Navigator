import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ddgraph, versionInfo } from '../components/ModelNavigator/DataDictionary/Store/reducers/graph';
import { moduleReducers as submission } from '../components/ModelNavigator/DataDictionary/Store/reducers/filter';
// import store from './store';
import ReduxDataDictionary from '../components/ModelNavigator/DataDictionary/ReduxDataDictionary';
import { filterConfig } from '../components/ModelNavigator/bento/dataDictionaryData';
import { getModelExploreData } from '../components/ModelNavigator/DataDictionary/Service/Dictionary';

const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'CDS_',
  templatePrefix: 'CDS_Data_Loading_Template-',
  fileTransferManifestName: "CDS_Data_Loading_Template-file-manifest",
  landscape: 'true',
  footnote: 'test',
};

const readMeConfig = {
  readMeUrl: 'https://raw.githubusercontent.com/rana22/category_partition/main/README.md',
  readMeTitle: 'Understanding the ICDC Data Model',
};

const assetConfig = {
  iconUrl: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/data_model_pdf_icons/icdc/DMN/'
}

const graphViewConfig = {
  legend: {
    styles: {
      legendExpand: {
        position: 'absolute',
        right: '25px',
        top: '300px',
        backgroundColor: '#494949',
        border: '2px solid #5486AF',
        borderTopLeftRadius: '10px 10px',
        borderBottomLeftRadius: '10px 10px',
        paddingBottom: '15px',
      },
      legendCollapse: {
        position: 'absolute',
        right: '25px',
        top: '300px',
        backgroundColor: '#18588C',
        border: '1px solid #125C5D',
        borderTopLeftRadius: '10px 10px',
        borderBottomLeftRadius: '10px 10px',
      },
    }
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

async function populateStore(store, modelUrl = "", propsUrl = "") {
  const response = await getModelExploreData(modelUrl, propsUrl)?.catch(() => null);
  if (!response?.data || !response?.version) {
    throw new Error('Failed to fetch data');
  }

  Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        payload: {
          data: response.data,
          facetfilterConfig: filterConfig,
          readMeConfig: readMeConfig,
          graphViewConfig: graphViewConfig,
          pdfDownloadConfig: pdfDownloadConfig,
          assetConfig: assetConfig,
        },
      }),
      store.dispatch({
        type: 'REACT_FLOW_GRAPH_DICTIONARY',
        dictionary: response.data,
        pdfDownloadConfig: pdfDownloadConfig,
        assetConfig: assetConfig,
        graphViewConfig: graphViewConfig,
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: response.version,
      }),
    ],
  );
}

const ModelNavigator = ({ modelUrl, propsUrl }) => {
  const [store, setStore] = React.useState(buildStore());

  useEffect(() => {
    const newStore = buildStore();

    setStore(newStore);
    populateStore(newStore, modelUrl, propsUrl);
  }, [modelUrl, propsUrl]);

  return (
    <Provider store={store}>
      <ReduxDataDictionary pdfDownloadConfig={pdfDownloadConfig} />
    </Provider >
  );
};

export default ModelNavigator;
