import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (file1, file2) => {
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
			} else {
				return [...acc, neutral];
			}
		}
		if (!_.has(file2, key)) {
			return [...acc, negative];
		}
		if (!_.has(file1, key)) {
			return [...acc, positive];
		}
	};
	const changes = keys.reduce(cb, []);
	const result = ['{', ...changes, '}'];
	return result.join('\n');
};

const json1 = {
	"host": "hexlet.io",
	"timeout": 50,
	"proxy": "123.234.53.22",
	"follow": false
};

const json2 = {
	"timeout": 20,
	"verbose": true,
	"host": "hexlet.io"
};

console.log(genDiff(json1, json2));

// {
//	host: hexlet.io
// + timeout: 20
// - timeout: 50
// - proxy: 123.234.53.22
// + verbose: true
// - follow: false
// }
