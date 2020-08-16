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

const stringify = (node, space, depth = 0) => {
 // console.log(depth);
  if (!_.isObject(node)) {
    return node;
  }
  const entries = Object.entries(node);
 // console.log(entries);

  return [
    openSymbol,
    ...(entries.flatMap(([key, value]) => `${addPrefix(key, space.repeat(depth + 1))}: ${stringify(value, space, depth + 1)}`)),
    `${addPrefix(closeSymbol, space.repeat(depth))}`,
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
          return `${addPrefix(item.name, indent, prefixes.added)}: ${stringify(item.value, indentSymbol, depth)}`;
        case 'deleted':
          return `${addPrefix(item.name, indent, prefixes.deleted)}: ${stringify(item.value, indentSymbol, depth)}`;
        case 'modified':
          return [
            `${addPrefix(item.name, indent, prefixes.deleted)}: ${stringify(item.value1, indentSymbol, depth)}`,
            `${addPrefix(item.name, indent, prefixes.added)}: ${stringify(item.value2, indentSymbol, depth)}`,
          ];
        case 'unmodified':
          return `${addPrefix(item.name, indent, prefixes.unmodified)}: ${stringify(item.value, indentSymbol, depth)}`;
        case 'nested':
          return [
            `${addPrefix(item.name, indent, prefixes.unmodified)}: ${openSymbol}`,
            ...(iter(item.children, depth + 2)),
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
