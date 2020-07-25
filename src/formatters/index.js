import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, neededFormat) => {
  switch (neededFormat) {
    case 'plain':
      return plain(diff);
    case 'json':
      // return JSON.stringify(diff, null, '\t');
      return JSON.stringify(diff);
    default:
      return stylish(diff);
  }
};

export default format;
