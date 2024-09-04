/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/react-in-jsx-scope */
// import React from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import _, { noop } from 'lodash';

const version = { commit: '913161064b02bcef024d072873e77c8c79cc1a68', dictionary: { commit: '520a25999fd183f6c5b7ddef2980f3e839517da5', version: '0.2.1-9-g520a259' }, version: '4.0.0-44-g9131610' };
const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model.yml';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/4.0.1/cds-model-props.yml';

const getData = async (url) => {
  const response = await axios.get(url);
  const data = yaml.safeLoad(response.data);
  return data;
};

async function getModelExploreData(modelUrl = DATA_MODEL, modelPropsUrl = DATA_MODEL_PROPS, getPermissableValues, replaceEnums) {
  const data = getPermissableValues?.();
  console.log('deets --->', data);
  
  const icdcMData = await getData(modelUrl);
  const icdcMPData = await getData(modelPropsUrl);

  // translate the json file here
  const dataList = {};
  const keyMaps = new Set();
  const cdeMap = new Map();

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
              ? icdcMPData.PropDefinitions[propertyName]?.Tags?.Labeled
                ? icdcMPData.PropDefinitions[propertyName]?.Tags?.Labeled : undefined : undefined;
            propertiesItem.category = key;
            icdcMPData.PropDefinitions[propertyName].Term ? 
              icdcMPData.PropDefinitions[propertyName].Term.length > 0 
                ? cdeMap.set(`${key}.${propertyName};${icdcMPData.PropDefinitions[propertyName].Term[0].Code}.${icdcMPData.PropDefinitions[propertyName].Term[0].Version}`,{CDECode: icdcMPData.PropDefinitions[propertyName].Term[0].Code, CDEVersion: icdcMPData.PropDefinitions[propertyName].Term[0].Version } ) 
                : undefined
                : undefined;
            propertiesItem.description = icdcMPData?.PropDefinitions[propertyName]?.Desc;
            propertiesItem.type = icdcMPData?.PropDefinitions[propertyName]?.Type
              || icdcMPData?.PropDefinitions[propertyName]?.Enum;
            propertiesItem.enum = icdcMPData?.PropDefinitions[propertyName]?.Enum
              || icdcMPData.PropDefinitions[propertyName]?.Type?.Enum;
            propertiesItem.src = icdcMPData?.PropDefinitions[propertyName]?.Src;
            propertiesItem.key = icdcMPData?.PropDefinitions[propertyName]?.Key;
            propertiesItem.isIncludedInTemplate = icdcMPData?.PropDefinitions[propertyName]?.Tags?.Template === 'Yes' || !icdcMPData?.PropDefinitions[propertyName]?.Tags?.Template;
            if (icdcMPData.PropDefinitions[propertyName].Req === 'Yes' || String(icdcMPData.PropDefinitions[propertyName].Req).toLowerCase() === 'true') {
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
        if (el.name && el.name in dataList) {
          dataList[el.name].links.push({
            Dst: el.name, Src: el.backref, multiplicity: el.multiplicity,
          });
        // Only show the error message if the node is "undefined"
        } else if (el.name) {
          console.error(`The node "${el?.name}" has a link to "${el?.backref}" but "${el?.name}" is not defined in the model`);
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
  const res = replaceEnums?.(cdeMap, newDataList, noop);
  console.log('res --->', res);
  return {
    data: newDataList,
    version: {
      model: icdcMData.Version,
      ...version,
    },
  };
}

module.exports.getModelExploreData = getModelExploreData;
