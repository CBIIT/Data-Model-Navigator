import React, { useEffect, useState } from 'react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
// import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import yaml from 'js-yaml';
import _ from 'lodash';
import store from '../store';
// import AutoComplete from '../stubs/autocomplete';
// import init from '../components/DataDictionaryComponent/dictionaryController';
import ReduxDataDictionary from '../components/DataDictionaryComponent/DataDictionary/ReduxDataDictionary';
// import { ModelExplorer } from '../index';
import { filterConfig } from '../components/DataDictionaryComponent/DataDictionary/bento/dataDictionaryData';

import { CustomThemeProvider } from './ThemeContext';

const nihLogoImg = {
  height: '54px',
  width: '463px',
  marginLeft: '9px',
};

// import store from '../../store';
// import env from '../../utils/env';
// import ReduxDataDictionary from './DataDictionary/ReduxDataDictionary';

/**
 * data model navigator redux configuration 
 * 1. end points
 * 2. styles
 */

const version = { commit: '913161064b02bcef024d072873e77c8c79cc1a68', dictionary: { commit: '520a25999fd183f6c5b7ddef2980f3e839517da5', version: '0.2.1-9-g520a259' }, version: '4.0.0-44-g9131610' };
const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model.yml";
const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model-props.yml";

const readMeConfig=  {
  readMeUrl: 'https://raw.githubusercontent.com/rana22/category_partition/main/README.md',
  readMeTitle: 'Understanding the ICDC Data Model',
};

// example set legend style (position)
//set styling and configuration for autofit actions
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
      zoom: 0.7,
      minZoom: 0.7,
      maxZoom: 2,
    },
  },
}

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/ctdc-model/master/model-desc/ctdc_model_file.yaml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/ctdc-model/master/model-desc/ctdc_model_properties_file.yaml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/gmb-model/main/model-desc/000048_Model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/gmb-model/main/model-desc/000048_Model_Props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/cds-model/main/model-desc/cds-model.yml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/cds-model/main/model-desc/cds-model-props.yml";

// const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/BENTO-TAILORx-model/master/model-desc/bento_tailorx_model_file.yaml";
// const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/BENTO-TAILORx-model/master/model-desc/bento_tailorx_model_properties.yaml";


const getData = async (url) => {
  const response = await axios.get(url);
  const data = yaml.safeLoad(response.data);
  return data;
};

async function init() {
    // let url = 'https://wfy1997.s3.amazonaws.com/schema.json';
    // if (window.location.hash) url = window.location.hash.slice(1);
  
    const icdcMData = await getData(DATA_MODEL);
    const icdcMPData = await getData(DATA_MODEL_PROPS);
  
    // translate the json file here
    const dataList = {};
    const propertyList = [];
    const keyMaps = new Set();

    // using the following code the convert MDF to Gen3 format
    for (const [key, value] of Object.entries(icdcMData.Nodes)) {
      const item = {};
      item.$schema = 'http://json-schema.org/draft-06/schema#';
      item.id = key;
      item.title = key;
      if (value.Tags && 'Category' in value.Tags) {
        item.category = value.Tags.Category;
      } else if ('Category' in value) {
        item.category = (value.Category && value.Category.length > 0)
          ? value.Category : 'Undefined';   
      } else {
        item.category = 'Undefined';
      }
      item.program = '*';
      item.project = '*';
      item.additionalProperties = false;
      item.submittable = true;
      item.constraints = null;
      item.type = 'object';
      item.assignment = value.Tags?.Assignment ? value.Tags?.Assignment : '';
      item.class = value.Tags?.Class ? value.Tags?.Class : '';
      item.desc = value?.Desc ? value?.Desc : '';
      item.description = item.desc;
      item.template = value.Tags?.Template ? value.Tags?.Template : '';
  
      const link = [];
      const properties = {};
      const pRequired = [];
      const pPreffered = [];
      const pOptional = [];

      const Yes = [];
      const No  = [];
      if (icdcMData.Nodes[key].Props != null) {
        for (let i = 0; i < icdcMData.Nodes[key].Props.length; i++) {
          const nodeP = icdcMData.Nodes[key].Props[i];
          const propertiesItem = {};
          for (var propertyName in icdcMPData.PropDefinitions) {
            if (propertyName === nodeP) {
              if (icdcMPData.PropDefinitions[propertyName].Key) {
                keyMaps.add({ props: propertyName, node: key });
              }
              propertiesItem.labeled = icdcMPData.PropDefinitions[propertyName].Tags
                ? icdcMPData.PropDefinitions[propertyName].Tags.Labeled
                  ? icdcMPData.PropDefinitions[propertyName].Tags.Labeled : undefined : undefined;
              propertiesItem.category = key;
              propertiesItem.description = icdcMPData.PropDefinitions[propertyName].Desc;
              propertiesItem.type = icdcMPData.PropDefinitions[propertyName].Type
                || icdcMPData.PropDefinitions[propertyName].Enum;
              propertiesItem.enum = icdcMPData.PropDefinitions[propertyName].Enum
                || icdcMPData.PropDefinitions[propertyName].Type.Enum;
              propertiesItem.src = icdcMPData.PropDefinitions[propertyName].Src;
              propertiesItem.key = icdcMPData.PropDefinitions[propertyName].Key;
              if (icdcMPData.PropDefinitions[propertyName].Req === 'Yes') {
                pRequired.push(nodeP);
                propertiesItem['propertyType'] = 'required';
              } else if (icdcMPData.PropDefinitions[propertyName].Req === 'Preferred') {
                pPreffered.push(nodeP);
                propertiesItem['propertyType'] = 'preferred';
              } else {
                pOptional.push(nodeP);
                propertiesItem['propertyType'] = 'optional';
              }

              if (icdcMPData.PropDefinitions[propertyName].Tags &&
                icdcMPData.PropDefinitions[propertyName].Tags.Labeled) {
                  Yes.push(nodeP);
                  propertiesItem['display'] = 'yes';
              } else {
                  No.push(nodeP);
                  propertiesItem['display'] = 'no';
              }
              propertyList.push({ name: propertyName, ...propertiesItem })
            }
          }
          properties[nodeP] = propertiesItem;
        }
        item.properties = properties;
        item.inclusion = {};
        if (pRequired.length > 0) {
          item.inclusion = {
            ...item.inclusion,
            required: pRequired,
          };
        }
        if (pOptional.length > 0) {
          item.inclusion = {
            ...item.inclusion,
            optional: pOptional,
          };
        }
        if (pPreffered.length > 0) {
          item.inclusion = {
            ...item.inclusion,
            preferred: pPreffered,
          };
        }
        if (Yes.length > 0) {
          item.uiDisplay = {
            ...item.uiDisplay,
            yes: Yes,
          };
        }
        if (No.length > 0) {
          item.uiDisplay = {
            ...item.uiDisplay,
            no: No,
          };
        }
        item.required = pRequired;
        item.preferred = pPreffered;
        item.optional = pOptional;
        item.yes = Yes;
        item.no = No;
      } else {
        item.properties = {};
      }
  
      for (const property in icdcMData.Relationships) {
        item.multiplicity = _.startCase(icdcMData.Relationships[property].Mul);
        const label = propertyName;
        // const multiplicity = icdcMData.Relationships[propertyName].Mul;
        const required = false;
        for (let i = 0; i < icdcMData.Relationships[property].Ends.length; i++) {
          const linkItem = {};
          if (icdcMData.Relationships[property].Ends[i].Src === key) {
            const backref = icdcMData.Relationships[property].Ends[i].Src;
            const name = icdcMData.Relationships[property].Ends[i].Dst;
            if (name !== backref) {
              const target = icdcMData.Relationships[property].Ends[i].Dst;
              const multiplicity = icdcMData.Relationships[property].Ends[i].Mul
                ? icdcMData.Relationships[property].Ends[i].Mul
                : icdcMData.Relationships[property].Mul;
              linkItem.name = name;
              linkItem.backref = backref;
              linkItem.label = label;
              linkItem.target_type = target;
              linkItem.required = required;
              linkItem.multiplicity = multiplicity;
              link.push(linkItem);
            }
          }
        }
      }
  
      item.links = link;
      dataList[key] = item;
    }
  
    for (const [key, value] of Object.entries(dataList)) {
      if (value.links.length > 0) {
        value.links.forEach((el) => {
          if (el.name) {
            dataList[el.name].links.push({
              Dst: el.name, Src: el.backref, multiplicity: el.multiplicity,
            });
          }
        });
      }
    }
  
    // map parent key for the node
    const keyMapList = Array.from(keyMaps);
    for (const [key, value] of Object.entries(dataList)) {
      if (value.links.length > 0) {
        value.links.forEach((c, index) => {
          const targetId = keyMapList.find((item) => item.node === c.target_type);
          if (targetId) {
            value.links[index].targetId = targetId.props;
            value.links[index].generatedType = icdcMPData.PropDefinitions[targetId.props].Src;
          }
        });
      }
    }
    const newDataList = dataList;
    // const properties = Array.from(propertyList);
    // return {
    //   data: newDataList,
    //   version: version,
    // }
    const pdfDownloadConfig = {
      fileType: 'pdf',
      prefix: 'ICDC_Data_Model_',
      landscape: 'true',
    };
  
  Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        // data: newDict
        payload: {
          data: newDataList,
          properties: propertyList,
          facetfilterConfig: filterConfig,
          readMeConfig: readMeConfig,
          graphViewConfig: graphViewConfig,
          pdfDownloadConfig: pdfDownloadConfig
        },
      }),
      store.dispatch({
        type: 'REACT_FLOW_GRAPH_DICTIONARY',
        dictionary: newDataList,
        pdfDownloadConfig: pdfDownloadConfig,
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: version,
      }),
    ],
  );
}

const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
  landscape: 'true',
};

const ModelExplorer = () => {
  init ();
  return <ReduxDataDictionary pdfDownloadConfig={pdfDownloadConfig} />;
}

const ModelNavigator = () =>
  (
    <CustomThemeProvider>
      <Provider store={store}>
        <ModelExplorer  />
      </Provider>
    </CustomThemeProvider>
  );

export default ModelNavigator;