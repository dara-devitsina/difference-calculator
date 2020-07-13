import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const numberParse = (object) => {
	const entries = Object.entries(object);
	//console.log(entries);
	
	const result = entries.reduce((acc, [key, value]) => {
		if (!_.isObject(value)) {
			const parsedValue = Number.parseInt(value, 10);
			if (Number.isNaN(parsedValue)) {
				return { ...acc, [key]: value };
			} return { ...acc, [key]: Number.parseInt(value, 10) };
		}
		return { ...acc, [key]: numberParse(value) };
	}, {});
	return result;
}

const parse = (data) => {
	const file = fs.readFileSync(data, 'utf8');
	const format = path.extname(data);
	if (format === '.json' || format === '') {
		return JSON.parse(file);
	}
	else if (format === '.yml') {
		return yaml.safeLoad(file);
	}
	else if (format === '.ini') {
		return numberParse(ini.parse(file));
		//return ini.parse(file);
	}
};

export default parse;

const obj = {
	"common": {
		"setting1": "Value 1",
		"setting2": "200",
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
		"abc": "12345"
	}
}

//console.log(numberParse(obj));
