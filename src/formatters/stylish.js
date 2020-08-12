import _ from 'lodash';

const indentSymbol = ' ';
const keyOffset = 2;
const prefixes = {
  added: '+',
  deleted: '-',
  unmodified: ' ',
};
const openSymbol = '{';
const closeSymbol = '}';
const additionalSpaces = '  ';

const addPrefix = (symbol, indent, prefix = ' ') => `${indent}${prefix} ${symbol}`;

const stringify = (node, space) => {
  if (_.isObject(node)) {
    const iter = (item, depth) => {
      const entries = Object.entries(item);
      const result = entries.flatMap(([key, value]) => {
        if (!_.isObject(value)) {
          // формируем строку вида `{отступ}{префикс} {имя}: {значение}`,
          // где отступ - это кол-во пробелов, пришедшее из stylish + additionalSpaces,
          // "умноженные" на глубина + 2
          // таким образом, с каждым увеличением глубины на 2 отступ увеличивается на 4 пробела
          return `${addPrefix(key, `${space}${additionalSpaces.repeat(depth + keyOffset)}`)}: ${value}`;
        }
        return `${addPrefix(key, `${space}${additionalSpaces.repeat(depth + keyOffset)}`)}: ${iter(value, depth + keyOffset)}`;
      });
      return [
        `${openSymbol}`,
        `${result.join('\n')}`,
        `${addPrefix(closeSymbol, space.repeat(depth + 1))}`,
      ].join('\n');
    };
    return iter(node, 0);
  }
  return node;
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const indent = indentSymbol.repeat(depth + keyOffset);

    const result = tree.flatMap((item) => {
      switch (item.type) {
        case 'added':
          // формируем строку вида `{отступ}{префикс} {имя}: {значение}`
          return `${addPrefix(item.name, indent, prefixes.added)}: ${stringify(item.value, indent)}`;
        case 'deleted':
          return `${addPrefix(item.name, indent, prefixes.deleted)}: ${stringify(item.value, indent)}`;
        case 'modified':
          return `${addPrefix(item.name, indent, prefixes.deleted)}: ${stringify(item.value1, indent)}\n${addPrefix(item.name, indent, prefixes.added)}: ${stringify(item.value2, indent)}`;
        case 'unmodified':
          return `${addPrefix(item.name, indent, prefixes.unmodified)}: ${stringify(item.value, indent)}`;
        case 'nested':
          return [
            `${addPrefix(item.name, indent, prefixes.unmodified)}: ${openSymbol}`,
            ...(iter(item.children, depth + 4)), // с каждой итерацией прибавляем к глубине 4,
            // таким образом indent у всех детей с каждым погружением увеличивается на 4 пробела
            `${addPrefix(closeSymbol, indent)}`,
          ].join('\n');
        default:
          throw new Error(`Unknown type: '${item.type}'!`);
      }
    });
    return result;
  };
  return `{\n${iter(diffTree, 0).join('\n')}\n}`;
};

export default stylish;

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
