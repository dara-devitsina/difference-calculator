import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (before, after) => {
  const file1 = parse(before);
  //console.log(file1);
  
  const file2 = parse(after);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq((keys1.concat(keys2)));

  const cb = (acc, key) => {
  // const positive = `+ ${key}: ${file2[key]}`;
  // const negative = `- ${key}: ${file1[key]}`;
  // const neutral = `  ${key}: ${file1[key]}`;

    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] !== file2[key]) {
        return [...acc, { [key]: file2[key] }, { [key]: file1[key] }];
      }
      return [...acc, { [key]: file1[key] }];
    }
    if (!_.has(file2, key)) {
      return [...acc, { [key]: file1[key] }];
    }
    // if (!_.has(file1, key)) {
    return [...acc, { [key]: file2[key] }];
    // }
  };
  const changes = keys.reduce(cb, []);
  console.log(changes);
  
  const result = changes.map((item) => {
   // console.log(item);
   // return `${key}: ${value}`;
  })
 //console.log(result);
};

const file1 = {
	"host": "hexlet.io",
	"timeout": 50,
	"proxy": "123.234.53.22",
	"follow": false
};

const file2 = {
	"timeout": 20,
	"verbose": true,
	"host": "hexlet.io"
};

//console.log(genDiff(file1, file2));


export default genDiff;
