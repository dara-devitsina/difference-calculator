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

const plain = (diffTree) => {
  const iter = (tree, name) => {
    const result = tree.map((node) => {
      const newNodeName = `${name}${node.name}`;

      switch (node.type) {
        case 'added':
          return `Property '${newNodeName}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${newNodeName}' was removed`;
        case 'modified':
          return `Property '${newNodeName}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'unmodified':
          return null;
        case 'nested':
          return iter(node.children, `${newNodeName}.`);
        default:
          throw new Error(`Unknown type: '${node.type}'!`);
      }
    });
    return result.filter((item) => item).join('\n');
  };
  return iter(diffTree, '');
};

export default plain;
