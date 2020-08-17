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
  const entries = Object.entries(node);
  const nestedIndent = addPrefix(indentSymbol, space);
  return [
    openSymbol,
    ...(entries.flatMap(([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringify(value, nestedIndent)}`)),
    `${addPrefix(closeSymbol, space)}`,
  ].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const indent = indentSymbol.repeat(depth);

    const result = tree.flatMap((item) => {
      // console.log(depth);

      switch (item.type) {
        case 'added':
          // формируем строку вида `{отступ}{префикс} {имя}: {значение}`
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
    return result;
  };
  return `${openSymbol}\n${iter(diffTree, 1).join('\n')}\n${closeSymbol}`;
};

export default stylish;

// console.log(stringify({ hello: 'world' }, ' '));

// console.log(stringify({
//   common: {
//     setting1: 'Value 1',
//     setting2: 200,
//     setting3: true,
//     setting6: {
//       key: 'value',
//       doge: {
//         wow: 'too much',
//       },
//     },
//   },
//   group1: {
//     baz: 'bas',
//     foo: 'bar',
//     nest: {
//       key: 'value',
//     },
//   },
//   group2: {
//     abc: 12345,
//     deep: {
//       id: 45,
//     },
//   },
// }, ' '));
