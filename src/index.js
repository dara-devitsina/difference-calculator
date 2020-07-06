import _ from 'lodash';
import parse from './parsers.js';

const getDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);

  const res = keys.reduce((acc, key) => {
    const status = 'status';
    if (!_.isObject(file1[key]) || !_.isObject(file2[key])) {

      if (_.has(file1, key) && _.has(file2, key)) {
        if (file1[key] !== file2[key]) {
          return [...acc, { ['name']: key, ['value']: file2[key], [status]: 'updated', ['before']: file1[key], ['after']: file2[key] }/*, { ['name']: key, ['children']: file1[key], [status]: 'deleted' }*/];
        }
        return [...acc, { ['name']: key, ['value']: file1[key], [status]: 'unchanged' }];
      }
      if (!_.has(file2, key)) {
        return [...acc, { ['name']: key, ['value']: file1[key], [status]: 'deleted' }];
      }
    //  if (!_.has(file1, key)) {
        return [...acc, { ['name']: key, ['value']: file2[key], [status]: 'added' }];
    //  } 
    }
      return [...acc, { ['name']: key, ['children']: getDiff(file1[key], file2[key]) }];

  }, []);
  return res;
  //console.log(res);
};

const stylish = (tree) => {
  // console.log(tree);
  const result = tree.reduce((acc, item) => {

if (!_.has(item, 'children')) {
    if (item.status === 'updated') {
      return [...acc, `+ ${item.name}: ${item.after}`, `- ${item.name}: ${item.before}`];
    } if (item.status === 'added') {
      return [...acc, `+ ${item.name}: ${item.value}`];
    } if (item.status === 'deleted') {
      return [...acc, `- ${item.name}: ${item.value}`];
    } return [...acc, `  ${item.name}: ${item.value}`];
} return [...acc, `  ${item.name}: ${stylish(item.children)}`]
  }, []);
  return result;
};

const genDiff = (path1, path2) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  const result = getDiff(file1, file2);
  return stylish(result);
  //console.log(stylish(result))
};

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
