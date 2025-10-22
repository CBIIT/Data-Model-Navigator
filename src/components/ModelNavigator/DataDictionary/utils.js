import * as d3 from 'd3-scale';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { category2NodeList } from './Utils/download-helper-functions';
import { fileManifestDownload } from '../../../config/file-manifest-config';
import Axios from 'axios';

const submissionApiPath = 'FIXME-submissionApiPath';

export const humanFileSize = (size) => {
  if (typeof size !== 'number') {
    return '';
  }
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeStr = (size / (1024 ** i)).toFixed(2) * 1;
  const suffix = ['B', 'KB', 'MB', 'GB', 'TB'][i];
  return `${sizeStr} ${suffix}`;
};

export const getSubmitPath = (project) => {
  const path = project.split('-');
  const programName = path[0];
  const projectCode = path.slice(1).join('-');
  return `${submissionApiPath}/${programName}/${projectCode}`;
};

export const jsonToString = (data, schema = {}) => {
  const replacer = (key, value) => {
    if (value === null) {
      return undefined;
    }
    if (schema[key] === 'number') {
      const castedValue = Number(value);
      if (Number.isNaN(castedValue)) {
        return value;
      }
      return castedValue;
    }
    return value;
  };
  return JSON.stringify(data, replacer, '  ');
};

export const predictFileType = (dirtyData, fileType) => {
  const predictType = fileType;
  const jsonType = 'application/json';
  const tsvType = 'text/tab-separated-values';
  const data = dirtyData.trim();
  if (data.indexOf('{') !== -1 || data.indexOf('}') !== -1) {
    return jsonType;
  }
  if (data.indexOf('\t') !== -1) {
    return tsvType;
  }
  return predictType;
};

/**
 * Little wrapper around setinterval with a guard to prevent an async function
 * from being invoked multiple times.
 *
 * @param {()=>Promise} lambda callback should return a Promise
 * @param {int} timeoutMs passed through to setinterval
 * @return the setinterval id (can be passed to clearinterval)
 */
export async function asyncSetInterval(lambda, timeoutMs) {
  let isRunningGuard = false;
  return setInterval(
    () => {
      if (!isRunningGuard) {
        isRunningGuard = true;

        lambda().then(
          () => { isRunningGuard = false; },
        );
      }
    }, timeoutMs,
  );
}

// export const getCategoryColor = (category) => {
//   const colorMap = {
//     clinical: '#05B8EE',
//     biospecimen: '#27AE60',
//     data_file: '#7EC500',
//     metadata_file: '#F4B940',
//     analysis: '#FF7ABC',
//     administrative: '#AD91FF',
//     notation: '#E74C3C',
//     index_file: '#26D9B1',
//     clinical_assessment: '#3283C8',
//     medical_history: '#05B8EE',
//     satellite: d3.schemeCategory20[11],
//     radar: d3.schemeCategory20[16],
//     stream_gauge: d3.schemeCategory20[19],
//     weather_station: d3.schemeCategory20[10],
//     data_observations: d3.schemeCategory20[3],
//     experimental_methods: d3.schemeCategory20[4],
//     Imaging: d3.schemeCategory20[5],
//     study_administration: d3.schemeCategory20[6],
//     subject_characteristics: d3.schemeCategory20[7],
//   };
//   const defaultColor = '#9B9B9B';
//   return colorMap[category] ? colorMap[category] : defaultColor;
// };

// export function legendCreator(legendGroup, nodes, legendWidth) {
//   // Find all unique categories
//   const uniqueCategoriesList = nodes.reduce((acc, elem) => {
//     if (acc.indexOf(elem.category) === -1) {
//       acc.push(elem.category);
//     }
//     return acc;
//   }, []);
//   uniqueCategoriesList.sort((aIn, bIn) => {
//     const a = aIn.toLowerCase();
//     const b = bIn.toLowerCase();
//     if (a < b) {
//       return -1;
//     } if (a > b) {
//       return 1;
//     }
//     return 0;
//   });

//   const legendFontSize = '0.9em';
//   // Make Legend
//   legendGroup.selectAll('text')
//     .data(uniqueCategoriesList)
//     .enter().append('text')
//     .attr('x', legendWidth / 2)
//     .attr('y', (d, i) => `${1.5 * (2.5 + i)}em`)
//     .attr('text-anchor', 'middle')
//     .attr('fill', (d) => getCategoryColor(d))
//     .style('font-size', legendFontSize)
//     .text((d) => d);

//   legendGroup.append('text')
//     .attr('x', legendWidth / 2)
//     .attr('y', `${2}em`)
//     .attr('text-anchor', 'middle')
//     .text('Categories')
//     .style('font-size', legendFontSize)
//     .style('text-decoration', 'underline');
// }

// export function addArrows(graphSvg) {
//   graphSvg.append('svg:defs')
//     .append('svg:marker')
//     .attr('id', 'end-arrow')
//     .attr('viewBox', '0 -5 10 10')
//     .attr('fill', 'darkgray')
//     .attr('refX', 0)
//     .attr('refY', 0)
//     .attr('markerWidth', 6)
//     .attr('markerHeight', 6)
//     .attr('orient', 'auto')
//     .append('svg:path')
//     .attr('d', 'M0,-5L10,0L0,5');
// }

// export function addLinks(graphSvg, edges) {
//   return graphSvg.append('g')
//     .selectAll('path')
//     .data(edges)
//     .enter()
//     .append('path')
//     .attr('stroke-width', 2)
//     .attr('marker-mid', 'url(#end-arrow)')
//     .attr('stroke', 'darkgray')
//     .attr('fill', 'none');
// }

/**
 * Compute SVG coordinates fx, fy for each node in nodes.
 * Decorate each node with .fx and .fy property as side effect.
 *
 * @param {Array<Node>} nodes each decorated with a position [width,height] in [0,1]
 * @param {*} graphWidth
 * @param {*} graphHeight
 */
export function calculatePosition(nodes, graphWidth, graphHeight) {
  // Calculate the appropriate position of each node on the graph
  const fyVals = [];
  const retNodes = nodes;
  for (let i = 0; i < nodes.length; i += 1) {
    retNodes[i].fx = retNodes[i].position[0] * graphWidth;
    retNodes[i].fy = retNodes[i].position[1] * graphHeight;
    if (fyVals.indexOf(retNodes[i].fy) === -1) {
      fyVals.push(retNodes[i].fy);
    }
  }
  return { retNodes, fyValsLength: fyVals.length };
}

/**
 * Type agnostic compare thunk for Array.sort
 * @param {*} a
 * @param {*} b
 */
export function sortCompare(a, b) {
  if (a === b) { return 0; }
  return a < b ? -1 : 1;
}

export function computeLastPageSizes(filesMap, pageSize) {
  return Object.keys(filesMap).reduce((d, key) => {
    const result = d;
    result[key] = filesMap[key].length % pageSize;
    return result;
  }, {});
}

export function capitalizeFirstLetter(str) {
  const res = str.replace(/_/gi, ' ');
  return res.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Avoid importing underscore just for this ... export for testing
 * @method intersection
 * @param aList {Array<String>}
 * @param bList {Array<String>}
 * @return list of intersecting elements
 */
export function intersection(aList, bList) {
  const key2Count = aList.concat(bList).reduce(
    (db, it) => {
      const res = db;
      if (res[it]) { res[it] += 1; } else { res[it] = 1; }
      return res;
    }, {},
  );
  return Object.entries(key2Count)
    .filter((kv) => kv[1] > 1)
    .map(([k]) => k);
}

export function minus(aList, bList) {
  const key2Count = aList.concat(bList).concat(aList).reduce(
    (db, it) => {
      const res = db;
      if (res[it]) { res[it] += 1; } else { res[it] = 1; }
      return res;
    }, {},
  );
  return Object.entries(key2Count)
    .filter((kv) => kv[1] === 2)
    .map(([k]) => k);
}

export const parseParamWidth = (width) => ((typeof width === 'number') ? `${width}px` : width);

export const isPageFullScreen = (pathname) => (!!((pathname
  && (pathname.toLowerCase() === '/dd'
    || pathname.toLowerCase().startsWith('/dd/')
    || pathname.toLowerCase() === '/cohort-tools'
    || pathname.toLowerCase().startsWith('/cohort-tools/')
  ))));

export const isFooterHidden = (pathname) => (!!((pathname
  && (pathname.toLowerCase() === '/dd'
    || pathname.toLowerCase().startsWith('/dd/')
  ))));

export function createFileName(fileName, filePreFix, modelVersion = undefined, isTemplate = false) {
  const date = new Date();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = (date.getMonth() + 1);
  if (dd < 10) { dd = `0${dd}`; }

  if (mm < 10) { mm = `0${mm}`; }

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) { hours = `0${hours}`; }

  if (minutes < 10) { minutes = `0${minutes}`; }

  if (seconds < 10) { seconds = `0${seconds}`; }

  if (isTemplate && modelVersion) {
    return filePreFix ? `${filePreFix}Data_Loading_Template_${fileName}_${modelVersion}`
      : `${fileName}_${modelVersion}`
  }

  return filePreFix ? `${filePreFix}${fileName}${modelVersion ? `_${modelVersion}` : `${todaysDate} ${hours}-${minutes}-${seconds}`}`
    : `${fileName}${modelVersion ? `_${modelVersion}` : `${todaysDate} ${hours}-${minutes}-${seconds}`}`;
}

/**
 * Filters out properties that should not be included in the template.
 * 
 * @param {Object} node DMN node object.
 * @returns {Object} Property object with properties that should not be in the template removed.
 */
export const filterProperties = (node) => {
  const { properties } = node;
  const filteredProperties = {};

  for (let key in properties) {
    if (!properties[key].isIncludedInTemplate) {
      continue;
    }
    filteredProperties[key] = properties[key];
  }

  return filteredProperties;
}

/**
 * Generates the TSV header line for links between nodes.
 * 
 * @param {*} node The node to generate the TSV header line for.
 * @returns {string} The TSV header line.
 */
export const tsvMiddleware = (node) => {
  let line = 'type';
  const { links } = node;

  if (links && links.length) {
    links.forEach((c) => {
      if (c.targetId && String(c.generatedType).toLowerCase() !== 'loader-generated') {
        line += `${'\t'} ${c.target_type}.${c.targetId}`;
      }
    });
  }

  return line;
};

/**
 * Convert a node to a TSV data loading template.
 * 
 * @param {*} node The node to convert to a TSV template.
 * @returns {string} The TSV template.
 */
export const convertToTSV = (node) => {
  let line = tsvMiddleware(node);

  Object.keys(filterProperties(node)).forEach((key) => {
    line += ('\t').concat(`${key}`);
  });

  const text = `${line}\r\n${node.title}`;
  return text;
};

export const isFileManifest = (node) => node.id === 'file';

/**
 * Creates a TSV of properties for a node.
 * 
 * The properties it will extract are:
 * - title (Label: Node)
 * - property
 * - $.type
 * - $.Term[].Value (Label: CDEFullName)
 * - $.Term[].Version (Label: CDEVersion)
 * - $.Term[].Code (Label: CDECode)
 * - $.Term[].Origin (Label: CDEOrigin)
 * - $.enum (Label: Acceptable Values)
 * - $.propertyType (Label: required)
 * - $.description
 * - $.src
 * - $.key (Label: Key Property)
 * 
 * @param {*} node The node to generate a TSV for.
 * @param {boolean} headerLine Whether to include the header line.
 * @param {boolean} onlyRequired Whether to only include required properties.
 * @returns {string} The TSV for the node.
 */
export const generateNodeTSV = (node, headerLine = true, onlyRequired = false) => {
  let tsv = "";

  if (headerLine) {
    tsv += "Node\tProperty\tType\tCDEFullName\tCDEVersion\tCDECode\tCDEOrigin\tAcceptable Values\tRequired\tDescription\tSrc\tKey Property\n";
  }

  Object.keys(node.properties).forEach((key) => {
    const property = node.properties[key];
    if (onlyRequired && !node?.required?.includes(key)) {
      return;
    }

    tsv += `${node.title || ''}\t`;
    tsv += `${key}\t`;
    tsv += `${formatPropertyType(property)}\t`;
    tsv += `${property?.Term?.map((term) => term.Value).join(", ") || ''}\t`;
    tsv += `${property?.Term?.map((term) => term.Version).join(", ") || ''}\t`;
    tsv += `${property?.Term?.map((term) => term.Code).join(", ") || ''}\t`;
    tsv += `${property?.Term?.map((term) => term.Origin).join(", ") || ''}\t`;
    tsv += `${property.enum instanceof Array ? JSON.stringify(sortAlphabetically(property.enum).map((v) => escapeForTSV(v))) : ''}\t`;
    tsv += `${property.propertyType || ''}\t`;
    tsv += `${escapeForTSV(property.description) || ''}\t`;
    tsv += `${property.src || ''}\t`;
    tsv += `${property.key || 'FALSE'}\n`;
  });

  return tsv;
};

/**
 * Generates a JSON object for a node.
 * 
 * @see generateNodeTSV For the TSV variant of this utility.
 * @param {*} node The node to generate a TSV for.
 * @param {boolean} onlyRequired Whether to only include required properties.
 * @returns {Array<Object>} An array of JSON objects for the node, where each object represents a property.
 */
export const generateNodeJSON = (node, onlyRequired = false) => {
  const properties = [];

  Object.keys(node.properties).forEach((key) => {
    const property = node.properties[key];
    if (onlyRequired && !node?.required?.includes(key)) {
      return;
    }

    properties.push({
      Node: node.title || '',
      Property: key,
      Type: formatPropertyType(property),
      CDEFullName: property.Term?.map((term) => term.Value).join(", ") || '',
      CDEVersion: property.Term?.map((term) => term.Version).join(", ") || '',
      CDECode: property.Term?.map((term) => term.Code).join(", ") || '',
      CDEOrigin: property.Term?.map((term) => term.Origin).join(", ") || '',
      "Acceptable Values": property.enum instanceof Array ? sortAlphabetically(property.enum) : '',
      Required: property.propertyType || '',
      Description: escapeForTSV(property.description) || '',
      Src: property.src || '',
      "Key Property": property.key || false,
    });
  });

  return properties;
};

/**
 * Formats the node's property type for visual display.
 * 
 * @param {*} property 
 * @returns {string} The formatted property type.
 */
export const formatPropertyType = (property) => {
  const { type } = property || {};

  if (!type) {
    return 'Unknown';
  }

  if (typeof type === "string") {
    return type;
  }

  if (Array.isArray(type)) {
    return "string";
  }

  if (
    typeof type === "object" &&
    typeof type.value_type === "string" &&
    type.value_type === "list"
  ) {
    return "list";
  }

  if (typeof type === "object") {
    return JSON.stringify(type);
  }

  return "Unknown";
}

/**
 * Escapes problematic characters for TSV.
 * 
 * @param {string} text The text to escape.
 * @returns {string} The escaped text.
 */
export const escapeForTSV = (text) => {
  if (typeof text !== 'string' || !text) {
    return "";
  }

  return text
    .replace(/\t/g, '')
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/"/g, '""');
};

/**
 * Convert a File node to a TSV data loading template.
 * 
 * @param {*} node The node to convert to a TSV template.
 * @returns {string} The TSV template for the `file` node type.
 */
export const generateFileManifest = (node) => {
  let line = tsvMiddleware(node);
  const filteredNode = filterProperties(node);

  const arr = Object.entries(filteredNode);
  const mergedArr = arr.concat(fileManifestDownload);
  mergedArr.forEach(([key, value]) => {
    if (value.isIncludedInTemplate) {
      line += ('\t').concat(`${key}`);
    }
  });

  const text = `${line}\r\n${node.title}`;
  return text;
};

export const generateVocabFullDownload = (fullDictionary, format, prefix = "ICDC_") => {
  const c2nl = category2NodeList(fullDictionary);
  const enumArr = [];
  const zip = new JSZip();

  Object.keys(c2nl).forEach((category) => {
    const nodes = c2nl[category];
    nodes.forEach(({ title, properties }) => {
      const propertyKeyList = Object.keys(properties);
      propertyKeyList.forEach((propertyKey) => {
        const property = properties[propertyKey];
        if (property.enum instanceof Array) {
          enumArr.push({ title, enums: sortAlphabetically(property.enum), propertyKey });
        }
      });
    });
  });

  const zipFileName = createFileName(prefix + 'Controlled_Vocabularies', '');
  const getFileName = (title, propertyKey, format) => `${createFileName(`${title}-${propertyKey}`, prefix + 'Controlled_Vocabulary-')}.${format}`
  switch (format) {
    case 'TSV': {
      const vocabTSVArr = enumArr.map(({ enums, title, propertyKey }) => {
        let content = '';
        if (enums && enums.length) {
          enums.forEach((item, index) => {
            content += (index === 0) ? item : `${'\n'}${item}`;
          });
        }
        return { content, title, propertyKey };
      });

      vocabTSVArr.forEach(({ title, propertyKey, content }) => zip.file(getFileName(title, propertyKey, 'tsv'), content));
      zip.generateAsync({ type: 'blob' }).then((thisContent) => {
        saveAs(thisContent, zipFileName);
      });
    }
      break;
    // eslint-disable-next-line no-lone-blocks
    case 'JSON': {
      enumArr.forEach(({ title, enums, propertyKey }) => zip.file(getFileName(title, propertyKey, 'json'), JSON.stringify(enums)));
      zip.generateAsync({ type: 'blob' }).then((thisContent) => {
        saveAs(thisContent, zipFileName);
      });
    }
      break;
    default:
      break;
  }
};

export const generateLoadingExample = async (configUrl = "https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json") => {
  const zip = new JSZip();

  // fetch config
  const { loadingExamples, title } = await (await Axios.get(configUrl)).data
  try {
    const titleArr = Object.keys(loadingExamples);
    const res = await Promise.all(Object.values(loadingExamples).map((example) => Axios.get(example)));
    const data = res.map((res, index) => ({
      title: titleArr[index],
      content: res.data,
      format: titleArr[index].split('.')[1]
    }));


    data.forEach(({ title, content, format }) => { zip.file(`${createFileName(title)}.${format}`, content); });
    zip.generateAsync({ type: 'blob' }).then((thisContent) => {
      saveAs(thisContent, createFileName(title));
    });
  } catch {
    throw Error("Failed to fetch example files");
  }
}

export const downloadLoadingExample = async (zipUrl = "") => {
  window.open(zipUrl, '_blank');
};

/**
 * Generates a Data Dictionary file name.
 * 
 * @param {string} prefix The prefix for the file name. Usually a Model name. (e.g. "ICDC_")
 * @param {string|null} nodeName The name of the node to generate the file name for. If null, it's omitted
 * @param {boolean} onlyRequired Whether the download included only required properties.
 * @param {string|number|undefined} modelVersion The version of the model to include in the file name. If undefined, it's omitted.
 */
export const getDictionaryFilename = (prefix, nodeName, onlyRequired, modelVersion) => {
  let filename = `${prefix || ""}Dictionary`;
  if (nodeName) {
    filename += `_${nodeName}`;
  }
  if (onlyRequired) {
    filename += "_Required";
  } else {
    filename += "_All";
  }
  if (modelVersion) {
    filename += `_${modelVersion}`;
  }

  return filename;
};

/**
 * Performs a case-insensitive sort of an array of strings. Does not mutate the original array.
 * 
 * @param {Readonly<Array<string>>} arr 
 * @returns {Array<string>} The sorted array.
 */
export const sortAlphabetically = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }

  return [...arr].sort((a, b) => a?.toLowerCase()?.localeCompare(b?.toLowerCase()));
};

/**
 * A utility function to compute the approximate width of a text element
 * rendered on an SVG canvas.
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 * @param text The text to measure
 * @param fontFamily The font family of the text element
 * @param fontSize The font size of the text element
 * @param fontWeight The font weight of the text element
 * @returns The computed width of the text element or 0 if the width is not available
 */
export const calculateTextWidth = (
  text,
  fontFamily = "Arial",
  fontSize = "11px",
  fontWeight = "normal"
) => {
  if (!text || typeof text !== "string" || text.length === 0) {
    return 0;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  try {
    context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const { width } = context.measureText(text);
    return typeof width === "number" && width > 0 ? width : 0;
  } catch (e) {
    return 0;
  }
};
