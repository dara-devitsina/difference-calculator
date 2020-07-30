import _ from 'lodash';

const stringify = (item, currentDepth) => {
  if (_.isObject(item)) {
    const space = ' ';
    const [key, value] = Object.entries(item).flat();
    return `{\n${space.repeat(currentDepth + 8)}${key}: ${value}\n${space.repeat(currentDepth + 4)}}`;
  }
  return item;
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const space = ' ';
    const result = tree.map((item) => {
      switch (item.type) {
        case 'added':
          return `${space.repeat(depth + 2)}+ ${item.name}: ${stringify(item.value, depth)}`;
        case 'deleted':
          return `${space.repeat(depth + 2)}- ${item.name}: ${stringify(item.value, depth)}`;
        case 'modified':
          return `${space.repeat(depth + 2)}- ${item.name}: ${stringify(item.value1, depth)}\n${space.repeat(depth + 2)}+ ${item.name}: ${stringify(item.value2, depth)}`;
        case 'unmodified':
          return `${space.repeat(depth + 4)}${item.name}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${space.repeat(depth + 4)}${item.name}: ${iter(item.children, depth + 4)}`;
        default:
          throw new Error(`Unknown status: '${item.type}'!`);
      }
    });
    return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
  };
  return iter(diffTree, 0);
};

export default stylish;
