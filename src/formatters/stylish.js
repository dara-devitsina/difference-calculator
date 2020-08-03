import _ from 'lodash';

const stringify = (item, space = ' ', depth = 0) => {
  const entries = Object.entries(item);
  const result = entries.map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${space.repeat(depth + 1)}${key}: ${value}`;
    }
    return `${space.repeat(depth + 1)}${key}: ${stringify(value, space, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
};

/* const stylish = (diffTree) => {
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
          throw new Error(`Unknown type: '${item.type}'!`);
      }
    });
    return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;
  };
  return iter(diffTree, 0);
}; */

export default stylish;

/* console.log(stringify({
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": "too much"
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}, ' ')); */
