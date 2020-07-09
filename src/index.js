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

const stringify = (item) => {
  if (_.isObject(item)) {
    const [key, value] = Object.entries(item).flat();
    return `{\n${key}: ${value}\n}`;
  }
  return item;
};

const stylish = (tree) => {
  // console.log(tree);
  const result = tree.reduce((acc, obj) => {
    if (obj.status !== 'nested object') {
      if (obj.status === 'added') {
        return [...acc, `+ ${obj.name}: ${stringify(obj.value)}`];
      } if (obj.status === 'deleted') {
        return [...acc, `- ${obj.name}: ${stringify(obj.value)}`];
      } if (obj.status === 'modified') {
        return [...acc, `+ ${obj.name}: ${stringify(obj.after)}\n- ${obj.name}: ${stringify(obj.before)}`];
      } if (obj.status === 'unmodified') {
        return [...acc, `  ${obj.name}: ${stringify(obj.value)}`];
      }
    }
    return [...acc, `  ${obj.name}: ${stylish(obj.children)}`];
  }, [])

  return `{\n${result.join('\n')}\n}`;
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
