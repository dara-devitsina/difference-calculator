import _ from 'lodash';
import fs from 'fs';

const genDiff = (json1, json2) => {
  const j1 = fs.readFileSync(json1, 'utf8');
  const j2 = fs.readFileSync(json2, 'utf8');

  const file1 = JSON.parse(j1);
  const file2 = JSON.parse(j2);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq((keys1.concat(keys2)));

  const cb = (acc, key) => {
    const positive = `+ ${key}: ${file2[key]}`;
    const negative = `- ${key}: ${file1[key]}`;
    const neutral = `  ${key}: ${file1[key]}`;

    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] !== file2[key]) {
        return [...acc, positive, negative];
      }
      return [...acc, neutral];
    }
    if (!_.has(file2, key)) {
      return [...acc, negative];
    }
    // if (!_.has(file1, key)) {
    return [...acc, positive];
    // }
  };
  const changes = keys.reduce(cb, []);
  const result = ['{', ...changes, '}'];
  return result.join('\n');
};

export default genDiff;
