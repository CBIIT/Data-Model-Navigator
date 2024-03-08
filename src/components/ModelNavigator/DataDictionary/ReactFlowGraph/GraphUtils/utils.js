import _ from "lodash";
import studyIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/study.svg";
import caseIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/case.svg";
import clinicalTrialIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/clinical_trial.svg";
import adminIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/administrative.svg";
import biospecimenIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/biospecimen.svg";
import analysisIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/analysis.svg";
import dataFileIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/data_file.svg";
import clinicalIcon from "../../../DataDictionary/ReactFlowGraph/Canvas/assets/graph_icon/clinical.svg";

const graphIcons = {
  administrative: adminIcon,
  study: studyIcon,
  case: caseIcon,
  clinical_trial: clinicalTrialIcon,
  biospecimen: biospecimenIcon,
  analysis: analysisIcon,
  data_file: dataFileIcon,
  clinical: clinicalIcon,
};

const graphIconColors = {
  administrative: "#9b2e20",
  study: "#9875ff",
  case: "#ff7f16",
  clinical_trial: "#02a1bb",
  biospecimen: "#00785a",
  analysis: "#b533a9",
  data_file: "#00ad0c",
  clinical: "#1b75bc",
};
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/**
 * Get subgroup links from link
 * @param {object} link - array of links
 * @param {object} nameToNode - key (node name) value (node object) map
 * @param {string} sourceId - source id for subgroup links
 * This function traverse links recursively and return all nested subgroup lnks
 */
const getSubgroupLinks = (link, nameToNode, sourceId) => {
  let subgroupLinks = [];
  if (link.subgroup) {
    link.subgroup.forEach((sgLink) => {
      if (sgLink.subgroup) {
        subgroupLinks = subgroupLinks.concat(
          getSubgroupLinks(sgLink, nameToNode, sourceId)
        );
      } else {
        subgroupLinks.push({
          source: nameToNode[sourceId],
          target: nameToNode[sgLink.target_type],
          exists: 1,
          ...sgLink,
        });
      }
    });
  }
  return subgroupLinks;
};

const generateNodes = (nodes, edges, windowWidth) => {
  const generatedNodes = nodes.map((node, index) => {
    return {
      type: "custom",
      position: { x: 0, y: 0 },
      id: `${node.id}`,
      category: `${node.category}`,
      data: {
        label: _.capitalize(node.name),
        icon: graphIcons[node.category],
        iconColor: graphIconColors[node.category],
        category: `${node.category}`,
        nodeAssignment: _.capitalize(`${node.assignment}`),
        nodeClass: _.capitalize(`${node.class}`),
        reqPropsCount: node.required ? node.required.length : 0,
        prefPropsCount: node.preferred ? node.preferred.length : 0,
        optPropsCount: node.optional ? node.optional.length : 0,
      },
    };
  });
  // console.log(generatedNodes);

  return generatedNodes;
};

const generateEdges = (edges) => {
  const DEFAULT_EDGE_TYPE = {
    type: "custom",
    animated: false,
  };

  const generatedEdges = edges.map((edge, index) => {
    return {
      ...DEFAULT_EDGE_TYPE,
      id: `${edge.name}-${edge.backref}`,
      source: `${edge.name}`,
      target: `${edge.backref}`,
    };
  });

  return generatedEdges;
};

const generateFlowData = (nodes, edges) => {
  return {
    nodes: generateNodes(nodes, edges),
    edges: generateEdges(edges),
  };
};

/**
 * Given a data dictionary that defines a set of nodes
 *    and edges, returns the nodes and edges in correct format
 *
 * @method createNodesAndEdges
 * @param props: Object (normally taken from redux state) that includes dictionary
 *    property defining the dictionary as well as other optional properties
 *    such as counts_search and links_search (created by getCounts) with
 *    information about the number of each type (node) and link (between
 *    nodes with a link's source and target types) that actually
 *    exist in the data
 * @param createAll: Include all nodes and edges or only those that are populated in
 *    counts_search and links_search
 * @param nodesToHide: Array of nodes to hide from graph
 * @returns { nodes, edges } Object containing nodes and edges
 */
export function createNodesAndEdges(
  props,
  createAll,
  nodesToHide = ["program"]
) {
  const { dictionary } = props;
  const nodes = Object.keys(dictionary)
    .filter(
      (key) =>
        !key.startsWith("_") &&
        dictionary[key].type === "object" &&
        dictionary[key].category !== "internal" &&
        !nodesToHide.includes(key)
    )
    .map((key) => {
      let count = 0;
      if (props.counts_search) {
        count = props.counts_search[`_${key}_count`];
      }
      return {
        name: dictionary[key].title,
        count,
        ...dictionary[key],
      };
    })
    .filter((node) => createAll || node.count !== 0);

  const nameToNode = nodes.reduce((db, node) => {
    db[node.id] = node;
    return db;
  }, {});
  const hideDb = nodesToHide.reduce((db, name) => {
    db[name] = true;
    return db;
  }, {});

  const edges = nodes
    .filter((node) => node.links && node.links.length > 0)
    .reduce(
      // add each node's links to the edge list
      (list, node) => {
        const newLinks = node.links.map((link) => ({
          source: node,
          target: nameToNode[link.target_type],
          exists: 1,
          ...link,
        }));
        return list.concat(newLinks);
      },
      []
    )
    .reduce(
      // add link subgroups to the edge list
      (list, link) => {
        let result = list;
        if (link.target) {
          // "subgroup" link entries in dictionary are not links themselves ...
          result.push(link);
        }
        if (link.subgroup) {
          const sgLinks = getSubgroupLinks(link, nameToNode, link.source.id);
          result = result.concat(sgLinks);
        }
        return result;
      },
      []
    )
    .filter(
      // target type exist and is not in hide list
      (link) =>
        link.target &&
        link.target.id in nameToNode &&
        !(link.target.id in hideDb)
    )
    .map((link) => {
      // decorate each link with its "exists" count if available
      //  (number of instances of link between source and target types in the data)
      const res = link;
      res.exists = props.links_search
        ? props.links_search[
            `${res.source.id}_${res.name}_to_${res.target.id}_link`
          ]
        : undefined;
      return res;
    })
    .filter(
      // filter out if no instances of this link exists and createAll is not specified
      (link) => createAll || link.exists || link.exists === undefined
    );

  //assignNodePositions

  return generateFlowData(nodes, edges);
}
