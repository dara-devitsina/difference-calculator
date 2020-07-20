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

      if (item.status !== 'nested object') {
        switch (item.status) {
          case 'added':
            return `Property '${newAncestry}' was added with value: ${normalize(item.value)}`;
          case 'deleted':
            return `Property '${newAncestry}' was removed`;
          case 'modified':
            return `Property '${newAncestry}' was updated. From ${normalize(item.before)} to ${normalize(item.after)}`;
          case 'unmodified':
            return [];
          default:
            throw new Error(`Unknown status: '${item.status}'!`);
        }
      }
      return iter(item.children, `${newAncestry}.`);
    });
    return result.sort().join('\n');
  };
  return iter(tree, '');
};


export default plain;
