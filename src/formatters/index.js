import stylish from './stylish.js';
import plain from './plain.js';

const toFormat = (diffTree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      throw new Error(`Unknown format: '${outputFormat}'!`);
  }
};

export default toFormat;
