import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const numberParse = (object) => {
  const entries = Object.entries(object);

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
};

const parse = (data) => {
  const file = fs.readFileSync(data, 'utf8');
  const format = path.extname(data);
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file);
    case '.ini':
      return numberParse(ini.parse(file));
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default parse;
