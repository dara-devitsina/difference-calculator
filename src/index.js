import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (before, after) => {
  const file1 = parse(before);
  const file2 = parse(after);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq(keys1.concat(keys2));

  const cb = (acc, key) => {
		if (_.has(file1, key) && _.has(file2, key)) {
			if (file1[key] !== file2[key]) {
				return [...acc, { [`+ ${key}`]: file2[key] }, { [`- ${key}`]: file1[key] }];
			} else {
				return [...acc, { [`  ${key}`]: file1[key] }];
			}
		}
		if (!_.has(file2, key)) {
			return [...acc, { [`- ${key}`]: file1[key] }];
		}
		if (!_.has(file1, key)) {
			return [...acc, { [`+ ${key}`]: file2[key] }];
    } 
	};
  const changes = keys.reduce(cb, []);
  
  const normalized = changes.map((item) => {
    const [key, value] = Object.entries(item).flat();
    return `${key}: ${value}`;
  })

  const result = `{\n${normalized.join('\n')}\n}`;
  return result;

};

export default genDiff;
