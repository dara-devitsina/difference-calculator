import _ from 'lodash';

const genDiff = (file1, file2) => {
const entries1 = Object.entries(file1);
const entries2 = Object.entries(file2);
const entries = (entries1.concat(entries2));
const result = [];

	for (const [key, value] of entries) {
		if (key[value] === key[value]) {
			const str = `${key}: ${value}`;
			result.push(str);
		}
		if (!_.has(file2, key)) {
			const str = [key, value].join(': ');
			result.push(`- ${str}`);
		}
		if (!_.has(file1, key)) {
			const str = [key, value].join(': ');
			result.push(`+ ${str}`);
		}
		if (file1[key] !== file2[key]) {
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
