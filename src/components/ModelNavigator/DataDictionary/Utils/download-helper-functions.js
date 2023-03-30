import { parseDictionaryNodes } from './utils';
/** cluster props according to the category for PDF download */
export function sortByCategory(c2nl, dictionary) {
  const keys = Object.keys(c2nl);
  return Object.values(dictionary).sort((a, b) => keys.indexOf(`${a.category}`) - keys.indexOf(`${b.category}`));
}

export const getNodePropertyCount = (dictionary) => {
  const res = parseDictionaryNodes(dictionary)
    .reduce((acc, node) => {
      acc.nodesCount += 1;
      acc.propertiesCount += Object.keys(node.properties).length;
      return acc;
    }, {
      nodesCount: 0,
      propertiesCount: 0,
    });
  return {
    nodesCount: res.nodesCount,
    propertiesCount: res.propertiesCount,
  };
};

export function category2NodeList(dictionary) {
  const res = Object.keys(dictionary).filter(
    (id) => id.charAt(0) !== '_' && id === dictionary[id].id,
  ).map(
    (id) => dictionary[id],
  ).filter(
    (node) => node.category && node.id,
  )
    .reduce(
      (lookup, node) => {
        if (!lookup[node.category]) {
          lookup[node.category] = [];
        }
        lookup[node.category].push(node);
        return lookup;
      }, {},
    );
  return res;
}
