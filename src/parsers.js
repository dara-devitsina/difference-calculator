import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

/* const parseNumber = (object) => _.mapValues(object, (value) => {
  if (!_.isObject(value)) {
    return Number.parseFloat(value) || value;
  }
  return parseNumber(value);
}); */

const parseNumber = (object) => _.mapValues(object, (value) => (!_.isObject(value)
  ? Number.parseFloat(value) || value : parseNumber(value)));

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseNumber(ini.parse(data));
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default parse;
