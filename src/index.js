import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

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
    return [...acc, {
      name: key, before: file1[key], after: file2[key], status: 'modified',
    }];
  }, []);
  return diff;
};

const genDiff = (path1, path2, neededFormat) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  // console.log(file1);

  const difference = getDiff(file1, file2);
  // console.log(difference);
  return format(difference, neededFormat);
};

export default genDiff;
