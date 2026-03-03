# Installation

Use the package manager [npm](https://www.npmjs.com/) to install Bento UI Building Blocks.

```bash
npm install data-model-navigator
```

# Usage

## Redux configuration (Bento app)

``` javascript
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

## Create ModelNavigator component (Bento app)

```javascript
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

## Configuration

**xIntervel & yIntervel space between nodes**
**nodeTree customize position of node to display in the tree (Please include all the nodes to be displayed)**

### For Direct Integration (Bento apps)

```javascript
export const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
  downloadPrefix: "ICDC_", // File download prefix added to file name
  landscape: 'true',
  iconSrc: "", // PDF Header Icon SRC (.png only)
  footnote: "", // Override PDF Footer Text
  useTimestampInFilename: undefined, // Controls filename suffix behavior:
                                     // - undefined (default): uses model version if available, otherwise timestamp
                                     // - true: always uses timestamp (YYYY-MM-DD HH-MM-SS)
                                     // - false: uses model version only (no timestamp fallback)
};

export const loadingExampleConfig = {
  type: 'dynamic', // static or dynamic
  url: 'https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json', // premade ZIP for static, config.json for dynamic
}
```

### For crdc-data-model-navigator Applications

If you're using the `crdc-data-model-navigator` React application, configuration is loaded from an external `content.json` file hosted in your data model repository (e.g., `ctdc-data-model-navigator-landing`).

**To configure download filename formatting**, update your `content.json`:

```json
{
  "ui_settings": {
    "configuration": {
      "pageTitle": "CTDC Data Model Navigator",
      "pdfConfig": {
        "downloadPrefix": "CTDC_",
        "footnote": "Cancer Translational Research Data Commons",
        "landscape": true,
        "useTimestampInFilename": true
      }
    }
  },
  "model-files": ["model.yaml"],
  "readme-file": "README.md",
  "current-version": "1.0.0"
}
```

**Configuration Path:** `ui_settings.configuration.pdfConfig.useTimestampInFilename`

**Options:**
- `true`: All downloads use timestamps (e.g., `CTDC_Dictionary_All 2026-03-03 14-30-45.pdf`)
- `false` or omitted: Uses model version if available (e.g., `CTDC_Dictionary_All_v1.2.0.pdf`)

**Applies to all download types:**
- Data Dictionary (PDF, JSON, TSV)
- All Vocabularies (TSV, JSON)
- Submission Templates
- README PDFs
- Individual node/property downloads

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

## Supported Icons

Data Model Navigator can map MDF node categories to predefined icons. Refer to the table
below to see the available icons and their corresponding names.

| Icon Preview | Icon Name |
|------|----------|
|![image](src/assets/icons/administrative.svg)|`administrative`|
|![image](src/assets/icons/analysis.svg)|`analysis`|
|![image](src/assets/icons/biospecimen.svg)|`biospecimen`|
|![image](src/assets/icons/case.svg)|`case`|
|![image](src/assets/icons/clinical_trial_human.svg)|`clinical_trial`|
|![image](src/assets/icons/clinical_trial.svg)|`clinical_trial_canine`|
|![image](src/assets/icons/clinical.svg)|`clinical`|
|![image](src/assets/icons/data_file.svg)|`data_file`|
|![image](src/assets/icons/data_file.svg)|`file`|
|![image](src/assets/icons/imaging.svg)|`imaging`|
|![image](src/assets/icons/notation.svg)|`notation`|
|![image](src/assets/icons/participant.svg)|`participant`|
|![image](src/assets/icons/study.svg)|`study`|

> [!NOTE]
> By default, Model Navigator will map the MDF node `Category` tag to the corresponding `Icon Name` if no Icon Map is provided.

# Development

## Storybook

Start the standalone storybook server to interact with the Model Navigator component and its configurations.

```bash
npm run storybook
```
