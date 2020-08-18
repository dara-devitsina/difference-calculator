import _ from 'lodash';

const indentSymbol = '  ';
const keyOffset = 2;
const prefixes = {
  added: '+',
  deleted: '-',
  unmodified: ' ',
};
const openSymbol = '{';
const closeSymbol = '}';

const addPrefix = (symbol, indent, prefix = ' ') => `${indent}${prefix} ${symbol}`;

const stringify = (node, space) => {
  if (!_.isObject(node)) {
    return node;
  }
  const nestedIndent = addPrefix(indentSymbol, space);
  return [
    openSymbol,
    ...(_.entries(node).flatMap(([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringify(value, nestedIndent)}`)),
    `${addPrefix(closeSymbol, space)}`,
  ].join('\n');
};

const makeStylish = (diffTree) => {
  const iter = (tree, depth) => tree.flatMap((item) => {
    const indent = indentSymbol.repeat(depth);
    switch (item.type) {
      case 'added':
        return `${addPrefix(item.name, indent, prefixes.added)}: ${stringify(item.value, indent)}`;
      case 'deleted':
        return `${addPrefix(item.name, indent, prefixes.deleted)}: ${stringify(item.value, indent)}`;
      case 'modified':
        return [
          `${addPrefix(item.name, indent, prefixes.deleted)}: ${stringify(item.value1, indent)}`,
          `${addPrefix(item.name, indent, prefixes.added)}: ${stringify(item.value2, indent)}`,
        ];
      case 'unmodified':
        return `${addPrefix(item.name, indent, prefixes.unmodified)}: ${stringify(item.value, indent)}`;
      case 'nested':
        return [
          `${addPrefix(item.name, indent, prefixes.unmodified)}: ${openSymbol}`,
          ...(iter(item.children, depth + keyOffset)),
          `${addPrefix(closeSymbol, indent)}`,
        ];
      default:
        throw new Error(`Unknown type: '${item.type}'!`);
    }
  });
  return [
    openSymbol,
    ...(iter(diffTree, 1)),
    closeSymbol,
  ];
};

export default (tree) => makeStylish(tree).join('\n');
