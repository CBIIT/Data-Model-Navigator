import axios from 'axios';
import yaml from 'js-yaml';
import { startCase, merge } from 'lodash';

const version = { commit: '913161064b02bcef024d072873e77c8c79cc1a68', dictionary: { commit: '520a25999fd183f6c5b7ddef2980f3e839517da5', version: '0.2.1-9-g520a259' }, version: '4.0.0-44-g9131610' };

const getData = async (url) => {
  const response = await axios.get(url);
  const data = yaml.safeLoad(response.data);
  return data;
};

export async function getModelExploreData(...urls) {
  const yamlData = await Promise
    .allSettled(urls.map((url) => getData(url)))
    .then((result) => result.map((r) => r.value));

  const modelData = merge(yamlData[0], ...yamlData.slice(1));

  // translate the json file here
  const dataList = {};
  const keyMaps = new Set();
  const cdeMap = new Map();

  // using the following code the convert MDF to Gen3 format
  for (const [key, value] of Object.entries(modelData.Nodes)) {
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
    const No = [];
    if (modelData.Nodes[key].Props != null) {
      for (let i = 0; i < modelData.Nodes[key].Props.length; i++) {
        const nodeP = modelData.Nodes[key].Props[i];
        const propertiesItem = {};
        for (var propertyName in modelData.PropDefinitions) {
          if (propertyName === nodeP) {
            if (modelData.PropDefinitions[propertyName].Key) {
              keyMaps.add({ props: propertyName, node: key });
            }
            propertiesItem.labeled = modelData.PropDefinitions[propertyName].Tags
              ? modelData.PropDefinitions[propertyName]?.Tags?.Labeled
                ? modelData.PropDefinitions[propertyName]?.Tags?.Labeled : undefined : undefined;
            propertiesItem.category = key;
            modelData.PropDefinitions[propertyName].Term ?
              modelData.PropDefinitions[propertyName].Term.length > 0
                ? cdeMap.set(`${key}.${propertyName};${modelData.PropDefinitions[propertyName].Term[0].Code}.${modelData.PropDefinitions[propertyName].Term[0].Version}`, { CDECode: modelData.PropDefinitions[propertyName].Term[0].Code, CDEVersion: modelData.PropDefinitions[propertyName].Term[0].Version })
                : undefined
              : undefined;
            propertiesItem.description = modelData?.PropDefinitions[propertyName]?.Desc;
            propertiesItem.type = modelData?.PropDefinitions[propertyName]?.Type
              || modelData?.PropDefinitions[propertyName]?.Enum;
            propertiesItem.enum = modelData?.PropDefinitions[propertyName]?.Enum
              || modelData.PropDefinitions[propertyName]?.Type?.Enum;
            propertiesItem.src = modelData?.PropDefinitions[propertyName]?.Src;
            propertiesItem.key = modelData?.PropDefinitions[propertyName]?.Key;
            propertiesItem.isIncludedInTemplate = modelData?.PropDefinitions[propertyName]?.Tags?.Template === 'Yes' || !modelData?.PropDefinitions[propertyName]?.Tags?.Template;
            if (modelData.PropDefinitions[propertyName].Req === 'Yes' || String(modelData.PropDefinitions[propertyName].Req).toLowerCase() === 'true') {
              pRequired.push(nodeP);
              propertiesItem['propertyType'] = 'required';
            } else if (modelData.PropDefinitions[propertyName].Req === 'Preferred') {
              pPreffered.push(nodeP);
              propertiesItem['propertyType'] = 'preferred';
            } else {
              pOptional.push(nodeP);
              propertiesItem['propertyType'] = 'optional';
            }

            if (modelData.PropDefinitions[propertyName].Tags &&
              modelData.PropDefinitions[propertyName].Tags.Labeled) {
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

    for (const property in modelData.Relationships) {
      item.multiplicity = startCase(modelData.Relationships[property].Mul);
      const label = propertyName;
      // const multiplicity = modelData.Relationships[propertyName].Mul;
      const required = false;
      for (let i = 0; i < modelData.Relationships[property].Ends.length; i++) {
        const linkItem = {};
        if (modelData.Relationships[property].Ends[i].Src === key) {
          const backref = modelData.Relationships[property].Ends[i].Src;
          const name = modelData.Relationships[property].Ends[i].Dst;
          if (name !== backref) {
            const target = modelData.Relationships[property].Ends[i].Dst;
            const multiplicity = modelData.Relationships[property].Ends[i].Mul
              ? modelData.Relationships[property].Ends[i].Mul
              : modelData.Relationships[property].Mul;
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
          value.links[index].generatedType = modelData.PropDefinitions[targetId.props].Src;
        }
      });
    }
  }
  const newDataList = dataList;
  return {
    data: newDataList,
    cdeMap: cdeMap,
    version: {
      model: modelData.Version,
      ...version,
    },
  };
}
