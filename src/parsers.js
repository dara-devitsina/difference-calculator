import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parseNumber = (object) => _.mapValues(object, (value) => (_.isObject(value)
  ? parseNumber(value)
  : Number.parseFloat(value) || value));

const parse = (data, inputFormat) => {
  switch (inputFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseNumber(ini.parse(data));
    default:
      throw new Error(`Unknown format: '${inputFormat}'!`);
  }
};

export default parse;
