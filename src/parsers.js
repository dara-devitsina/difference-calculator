import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const numberParse = (object) => _.mapValues(object, (value) => {
  if (!_.isObject(value)) {
    const parsedValue = Number.parseFloat(value);
    if (Number.isNaN(parsedValue)) {
      return value;
    }
    return Number.parseFloat(value);
  }
  return numberParse(value);
});

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return numberParse(ini.parse(data));
    default:
      throw new Error(`Unknown format: '${extension}'!`);
  }
};

export default parse;
