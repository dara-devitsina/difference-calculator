import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

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
		return ini.parse(file);
	}
};

export default parse;
