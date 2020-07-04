import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (data) => {
	const file = fs.readFileSync(data, 'utf8');
	const format = path.extname(data);
	if (format === '.json' || format === '') {
	return JSON.parse(file);
} 
 else if (format === '.yml') {
	return yaml.safeLoad(file);
} 
// else if (format === '.ini') {
//	ini.parse;
//}
};

export default parse;
