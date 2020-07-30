import _ from 'lodash';

const prettify = (item) => {
  if (_.isString(item)) {
    return `'${item}'`;
  }
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return item;
};

const plain = (diffTree) => {
  const iter = (tree, node) => {
    const result = tree.map((item) => {
      const newNode = `${node}${item.name}`;

      switch (item.type) {
        case 'added':
          return `Property '${newNode}' was added with value: ${prettify(item.value)}`;
        case 'deleted':
          return `Property '${newNode}' was removed`;
        case 'modified':
          return `Property '${newNode}' was updated. From ${prettify(item.value1)} to ${prettify(item.value2)}`;
        case 'unmodified':
          return null;
        case 'nested':
          return iter(item.children, `${newNode}.`);
        default:
          throw new Error(`Unknown status: '${item.type}'!`);
      }
    })
      .filter((item) => item !== null);
    return result.join('\n');
  };
  return iter(diffTree, '');
};

export default plain;
