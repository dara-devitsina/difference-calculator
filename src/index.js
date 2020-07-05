import _ from 'lodash';
import parse from './parsers.js';

 const genDiff = (before, after) => {
  const file1 = parse(before);
  const file2 = parse(after);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq(keys1.concat(keys2));

  const changes = keys.reduce((acc, key) => {
    const char = 'char';
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
  }, []);

  console.log(changes);
 // const normalized = changes.map((item) => {
 //   const [key, value] = Object.entries(item).flat();
 //   return `${key}: ${value}`;
 // })

 // const result = `{\n${normalized.join('\n')}\n}`;
 // return result; 
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

//console.log(genDiff(before, after));
