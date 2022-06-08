import React, { useEffect, useState } from 'react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import yaml from 'js-yaml';
import _ from 'lodash';
import store from '../store';
import Header from '../components/headers';
// import AutoComplete from '../stubs/autocomplete';
// import init from '../components/DataDictionaryComponent/dictionaryController';
import ReduxDataDictionary from '../components/DataDictionaryComponent/DataDictionary/ReduxDataDictionary';
// import { ModelExplorer } from '../index';
import { filterConfig } from '../components/DataDictionaryComponent/DataDictionary/bento/dataDictionaryData';

const nihLogoImg = {
  height: '54px',
  width: '463px',
  marginLeft: '9px',
};

storiesOf('Header', module)
  .add('Header default', () => <Header alt="hello" homeLink="https://www.google.com" />);

// import store from '../../store';
// import env from '../../utils/env';
// import ReduxDataDictionary from './DataDictionary/ReduxDataDictionary';

const version = { commit: '913161064b02bcef024d072873e77c8c79cc1a68', dictionary: { commit: '520a25999fd183f6c5b7ddef2980f3e839517da5', version: '0.2.1-9-g520a259' }, version: '4.0.0-44-g9131610' };
const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model.yml";
const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model-props.yml";

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
      if (icdcMData.Nodes[key].Props != null) {
        for (let i = 0; i < icdcMData.Nodes[key].Props.length; i++) {
          const nodeP = icdcMData.Nodes[key].Props[i];
          const propertiesItem = {};
          for (var propertyName in icdcMPData.PropDefinitions) {
            if (propertyName === nodeP) {
              if (icdcMPData.PropDefinitions[propertyName].Key) {
                keyMaps.add({ props: propertyName, node: key });
              }
              propertiesItem.description = icdcMPData.PropDefinitions[propertyName].Desc;
              propertiesItem.type = icdcMPData.PropDefinitions[propertyName].Type
                || icdcMPData.PropDefinitions[propertyName].Enum;
              propertiesItem.enum = icdcMPData.PropDefinitions[propertyName].Enum
                || icdcMPData.PropDefinitions[propertyName].Type.Enum;
              propertiesItem.src = icdcMPData.PropDefinitions[propertyName].Src;
              propertiesItem.key = icdcMPData.PropDefinitions[propertyName].Key;
              if (icdcMPData.PropDefinitions[propertyName].Req === 'Yes') {
                pRequired.push(nodeP);
              } else if (icdcMPData.PropDefinitions[propertyName].Req === 'No') {
                pOptional.push(nodeP);
              } else if (icdcMPData.PropDefinitions[propertyName].Req === 'Preferred') {
                pPreffered.push(nodeP);
              }
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
        item.required = pRequired;
        item.preferred = pPreffered;
        item.optional = pOptional;
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
  
    // return {
    //   data: newDataList,
    //   version: version,
    // }
  
    Promise.all(
      [
        store.dispatch({
          type: 'RECEIVE_DICTIONARY',
          // data: newDict
          payload: { data: newDataList, facetfilterConfig: filterConfig },
        }),
        store.dispatch({
          type: 'RECEIVE_VERSION_INFO',
          data: version,
        }),
      ],
    );
  }

const ModelExplorer = () => {
  init ();
  return <ReduxDataDictionary />;
}

storiesOf('Data Explorer', module)
  .add('Explorer', () =>
  (
    <Provider store={store}>
      <ModelExplorer />
    </Provider>
  )
);