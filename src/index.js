import _ from 'lodash';
import parse from './parsers.js';

const getDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);

  const diff = keys.reduce((acc, key) => {
      if (!_.has(file1, key)) {
        return [...acc, { name: key, value: file2[key], status: 'added' }];
      }
      if (!_.has(file2, key)) {
        return [...acc, { name: key, value: file1[key], status: 'deleted' }];
      }
      if (file1[key] === file2[key]) {
        return [...acc, { name: key, value: file1[key], status: 'unmodified' }];
      }
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return [...acc, { name: key, children: getDiff(file1[key], file2[key]), status: 'nested object' }];
      }
      return [...acc, { name: key, before: file1[key], after: file2[key], status: 'modified' }];
  }, []);
  return diff;
};

const stringify = (item, currentDepth) => {
  if (_.isObject(item)) {
    const space = ' ';
    const [key, value] = Object.entries(item).flat();
      return `{\n${space.repeat(currentDepth + 8)}${key}: ${value}\n${space.repeat(currentDepth + 4)}}`;
  }
  return item;
};

const stylish = (tree) => {
  // console.log(tree);
  const iter = (node, depth) => {
    const space = ' ';
    //console.log(depth);

  const result = node.reduce((acc, obj) => {
    if (obj.status !== 'nested object') {
      if (obj.status === 'added') {
        return [...acc, `${space.repeat(depth + 2)}+ ${obj.name}: ${stringify(obj.value, depth)}`];
      } if (obj.status === 'deleted') {
        return [...acc, `${space.repeat(depth + 2)}- ${obj.name}: ${stringify(obj.value, depth)}`];
      } if (obj.status === 'modified') {
        return [...acc, `${space.repeat(depth + 2)}+ ${obj.name}: ${stringify(obj.after, depth)}\n${space.repeat(depth + 2)}- ${obj.name}: ${stringify(obj.before, depth)}`];
      } if (obj.status === 'unmodified') {
        return [...acc, `${space.repeat(depth + 4)}${obj.name}: ${stringify(obj.value, depth)}`];
      }
    }
    return [...acc, `${space.repeat(depth + 4)}${obj.name}: ${iter(obj.children, depth + 4)}`];
  }, []);

  return `{\n${result.join('\n')}\n${space.repeat(depth)}}`;

}
return iter(tree, 0)
};

const genDiff = (path1, path2) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  const result = getDiff(file1, file2);
  return stylish(result);
  //return result;
  //console.log(result);
  

};

export default genDiff;
