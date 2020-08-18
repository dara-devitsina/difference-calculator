import _ from 'lodash';

const stringify = (item) => {
  if (_.isString(item)) {
    return `'${item}'`;
  }
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return item;
};

const makePlain = (diffTree) => {
  const iter = (tree, parentNodeName) => {
    const result = tree.flatMap((node) => {
      const currentNodeName = node.name;
      const propertyName = `${parentNodeName}${currentNodeName}`;

      switch (node.type) {
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${propertyName}' was removed`;
        case 'modified':
          return `Property '${propertyName}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'unmodified':
          return null;
        case 'nested':
          return iter(node.children, `${propertyName}.`);
        default:
          throw new Error(`Unknown type: '${node.type}'!`);
      }
    });
    return result.filter((item) => item);
  };
  return iter(diffTree, '');
};

export default (tree) => makePlain(tree).join('\n');
