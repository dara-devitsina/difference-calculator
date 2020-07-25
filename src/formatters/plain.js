const normalize = (item) => {
  switch (typeof item) {
    case 'boolean':
      return item;
    case 'number':
      return item;
    case 'string':
      return `'${item}'`;
    case 'object':
      return '[complex value]';
    default:
      throw new Error(`Unknown type: '${typeof item}'!`);
  }
};

const plain = (tree) => {
  const iter = (node, ancestry) => {
    const result = node.flatMap((item) => {
      const newAncestry = `${ancestry}${item.name}`;

      if (item.type !== 'nested object') {
        switch (item.type) {
          case 'added':
            return `Property '${newAncestry}' was added with value: ${normalize(item.value)}`;
          case 'deleted':
            return `Property '${newAncestry}' was removed`;
          case 'modified':
            return `Property '${newAncestry}' was updated. From ${normalize(item.oldValue)} to ${normalize(item.newValue)}`;
          case 'unmodified':
            return [];
          default:
            throw new Error(`Unknown status: '${item.type}'!`);
        }
      }
      return iter(item.children, `${newAncestry}.`);
    });
    return result.sort().join('\n');
  };
  return iter(tree, '');
};

export default plain;
