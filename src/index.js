import _ from 'lodash';

const genDiff = (file1, file2) => {
const keys1 = Object.keys(file1);
const keys2 = Object.keys(file2);
const keys = _.uniq((keys1.concat(keys2)));

const result = [];
	for (const key of keys) {
		if (_.has(file1, key) && _.has(file2, key)) {
			if (file1[key] !== file2[key]) {
				const str1 = `+ ${key}: ${file2[key]}`;
				const str2 = `- ${key}: ${file1[key]}`;
				result.push(str1);
				result.push(str2);
			} else {
				const str = `${key}: ${file1[key]}`;
				result.push(str);
			}
		}
			if (!_.has(file2, key)) {
				const str = `- ${key}: ${file1[key]}`;
				result.push(str);
			}
			if (!_.has(file1, key)) {
				const str = `+ ${key}: ${file2[key]}`;
				result.push(str);
			}
	}

// console.log(result.join('\n'));
console.log(result);


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
