import _ from 'lodash';
import parse from './parsers.js';

const getDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);

  const res = keys.reduce((acc, key) => {
    const char = 'char';
    if (!_.isObject(file1[key]) || !_.isObject(file2[key])) {

      if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] !== file2[key]) {
        return [...acc, { [key]: file2[key], [char]: '+' }, { [key]: file1[key], [char]: '-' }];
      }
        return [...acc, { [key]: file1[key], [char]: '  ' }];
    }
    if (!_.has(file2, key)) {
      return [...acc, { [key]: file1[key], [char]: '-' }];
    }
    if (!_.has(file1, key)) {
      return [...acc, { [key]: file2[key], [char]: '+' }];
    }
    }

    else {
      return [...acc, { [key]: getDiff(file1[key], file2[key]) }]
    }
  }, []);
  return res
};

const genDiff = (path1, path2) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  return getDiff(file1, file2);
}

export default genDiff;

const before = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value"
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
    "abc": 12345
  }
};

const after = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": 100500
  }
}

// console.log(genDiff(before, after));
