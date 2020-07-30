import _ from 'lodash';

const buildDiff = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.union(keys1, keys2)
    .sort()
    .map((key) => {
      if (!_.has(file1, key)) {
        return { name: key, value: file2[key], type: 'added' };
      }
      if (!_.has(file2, key)) {
        return { name: key, value: file1[key], type: 'deleted' };
      }
      if (file1[key] === file2[key]) {
        return { name: key, value: file1[key], type: 'unmodified' };
      }
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return { name: key, children: buildDiff(file1[key], file2[key]), type: 'nested' };
      }
      return {
        name: key, value1: file1[key], value2: file2[key], type: 'modified',
      };
    });
  return keys;
};

export default buildDiff;
