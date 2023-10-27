## 1. Webpack Configuration
Refer to [WEBPACK_CONFIG.md](https://github.com/CBIIT/Data-Model-Navigator/blob/documentation/WEBPACK_CONFIG.md)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Bento UI Building Blocks.

```bash
npm install data-model-navigator
```

## Usage

### 1. redux configuration (Bento app)
``` store
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ddgraph, moduleReducers as submission, versionInfo } from 'data-model-navigator';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';

const reducers = {
  ddgraph,
  versionInfo,
  submission,
  layout,
  stats,
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

export default store;
```
### 2. Create ModelNavigator component (Bento app)
[reference - ICDC Navigator Component] (https://github.com/CBIIT/bento-icdc-frontend/blob/Develop/src/components/Layout/utils.js)
```react
import React from 'react';
import _ from 'lodash';
import { ReduxDataDictionary, getModelExploreData } from 'data-model-navigator';
import store from '../../store';
import {
  filterConfig,
  pdfDownloadConfig,
  readMeConfig,
  controlVocabConfig,
  graphViewConfig,
} from '../../bento/dataDictionaryData';
import env from '../../utils/env';
import { Typography } from '../Wrappers/Wrappers';

const DATA_MODEL = env.REACT_APP_DATA_MODEL;
const DATA_MODEL_PROPS = env.REACT_APP_DATA_MODEL_PROPS;
const DATA_MODEL_README = env.REACT_APP_DMN_README;

async function getData() {
  const response = await getModelExploreData(DATA_MODEL, DATA_MODEL_PROPS);
  Promise.all(
    [
      store.dispatch({
        type: 'REACT_FLOW_GRAPH_DICTIONARY',
        dictionary: response.data,
        pdfDownloadConfig,
        graphViewConfig,
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        payload: {
          data: response.data,
          facetfilterConfig: filterConfig,
          pageConfig: {
            title: "DMN",
            iconSrc: "https://api.placeholder.app/image/85x85",
          },
          readMeConfig: {
            readMeUrl: 'https://raw.githubusercontent.com/rana22/category_partition/main/README.md',
            readMeTitle: 'Understanding the ICDC Data Model',
          },
          pdfDownloadConfig,
          graphViewConfig,
        },
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: response.version,
      }),
    ],
  );
}


const ModelNavigator = () => {
  if (!DATA_MODEL || !DATA_MODEL_PROPS || !DATA_MODEL_README) {
    return (
      <Typography variant="h4" color="error" size="sm">
        <ul>
          {(!DATA_MODEL) && (<li>Provided URL for Data model </li>)}
          {(!DATA_MODEL_PROPS) && (<li>Provided URL for Data model Properties</li>)}
        </ul>
      </Typography>
    );
  }
  getData();
  return (
    <ReduxDataDictionary pdfDownloadConfig={pdfDownloadConfig} />
  );
};

export default ModelNavigator;
```
(Note: DATA_MODEL_README )

### 3. Configuration
[reference - ICDC DMN Configuration]: https://github.com/CBIIT/bento-icdc-frontend/blob/Develop/src/bento/dataDictionaryData.js

**xIntervel & yIntervel space between nodes**
**nodeTree customize position of node to display in the tree (Please include all the nodes to be displayed)**

```

export const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
  dictionaryPrefix: 'ICDC_Data_Model', // Prefix for the dictionary download PDF
  landscape: 'true',
  catagoryIcon: {
    url: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/DMN/Pdf/',
    type: '.png',
  },
  iconSrc: "", // PDF Header Icon SRC (.png only)
  allowDownload: true, // Toggle README PDF downloads
};

see filter ICDC config (above link)

export const graphViewConfig = {
  legend: {
  },
  canvas: {
    fit: {
      x: 0,
      y: 20,
      zoom: 0.7,
      minZoom: 0.7,
      maxZoom: 2,
      xInterval: 250,
      yInterval: 90,
    },
    nodeTree: [
      ['program'],
      ['project'],
      ['study'],
      ['principal_investigator', 'subject', 'image_collection', 'associated_link'],
      ['targeted_therapy', 'non_targeted_therapy', 'surgery', 'radiotherapy', 'subject_status', 'specimen'],
      ['diagnosis', 'specimen', 'demographic'],
      ['node', 'data_file', 'exposure']
    ]
  },
};

```

# DMN development - Sorybook


### 1. Clone Repo
```
1. git clone https://github.com/CBIIT/Data-Model-Navigator.git
```

### 2. Update react-pdf dependency (DO NOT COMMIT THIS CHANGE - KEEP IT LOCAL)
(note: DMN project runs on webpack 5 it is compatible with react-pdf version 3.0.2 or newer version but Bento app runs on webpack 4 which is compatible with only react-pdf version 2.0.21 or older version)
```
"@react-pdf/renderer": "^2.0.21"  -> "@react-pdf/renderer": "^3.0.2",
```
(DO NOT COMMIT THIS CHANGE or pdf download will not work when DMN is deplyed with bento app)
(Solution migrate bento app to webpack 5)

### 3 .NPM INSTALL

### 4 .Start standalone DMN app
```
npm run storybook
```
### 5 Configuration
#### All the configuration are here (https://github.com/CBIIT/Data-Model-Navigator/blob/develop/src/stories/ModelNavigator.js)
